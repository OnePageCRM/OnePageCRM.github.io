---
redirect_from:
  - /blog/2021/12/06/mongodb-analysis-comparing-mongo-and-rails/
  - /2021/12/06/mongodb-analysis-comparing-mongo-and-rails/
layout: post
title: "MongoDB analysis: Comparing the Models in your Rails app with what is actually in your database"
slug: "mongodb-analysis-comparing-mongo-and-rails"
category: blog
post_image: /assets/images/mongodb-rails-comparison/header-image.png
author: john
date: 2021-12-06 09:30:00
excerpt: "When you have a large team working on an application where Models and indexes are added, updated and removed quite often it can happen that what you have written in your Models may not exactly match what currently exists in your database."
graphic: /assets/images/mongodb-rails-comparison/header-image.png
---

### Why might my database not look like my codebase?

When you have a large team working on an application where Models and indexes are added, updated and removed quite often it can happen that what you have written in your Models may not exactly match what currently exists in your database. The two can become out of sync over time.
For example if you remove a model in code but forget to wipe it from your database or if you create an index in code but not in the database. The older your database gets and the more people join your team the more likely this is to happen.

It’s a good idea to compare the two every so often to be sure that they match.

I will be looking specifically at a MongoDB (v.4.4) database in use with a Ruby on Rails Application using Mongoid to communicate.
We can do all of our analysis from the Rails console, so a ruby script that you run every couple of months might be a good idea here (Keep reading to the bottom to find a sample one that we use here at OnePageCRM).

### Useful terms

Lets quickly have a look at some useful terms that we will use throughout this article.

**Ruby On Rails:** is a server-side web application framework written in Ruby. This is where you write all of your code for your web app and plan what your database and indexes will ideally look like.

**MongoDB:** a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. This is the actual database that stores all your data for the application. As it is independent of the application the two can drift apart unless kept up to date.

**Mongoid:** an Object-Document-Mapper (ODM) for MongoDB written in Ruby. Allows our Ruby on Rails application to communicate with the MongoDB database.

**Model:** a Ruby class that can add database records (think of whole rows in an Excel table), find particular data you're looking for, update that data, or remove data. These are written in your Rails application and represent what collections and indexes you want to create in the database.

**Collection:** A collection is a grouping of MongoDB documents. A collection is the equivalent of a table in a relational database system. These will be created for each of the Models you have in your Rails application.

**Index:** a special data structure that holds the data of few fields of documents on which the index is created. Indexes improve the speed of search operations in database because instead of searching the whole document, the search is performed on the indexes that holds only few fields. It is vitally important to monitor these indexes, find out which ones are working and which aren't. You can drastically improve your apps performance with good indexes.


### Read preference for you application

Read preference describes how MongoDB clients route read operations to the members of a replica set. It is important to see which database in the cluster your application is reading from.
All read preference modes except primary may return stale data because secondaries replicate operations from the primary in an asynchronous process. Ensure that your application can tolerate stale data if you choose to use a non-primary mode.
To check this on MongoID use the following command

```ruby
read_preferance = Mongoid.default_client.read_preference&.dig('mode') || 'no preference set'
```

### Gather information from Codebase

Generally you can say that what is in your codebase is what you want, this is where you have spent time sculpting and creating the perfect models and indexes. You would like your database to be populated exactly as you have specified in the codebase. So let’s gather the info on this “ideal” case first.
First things first we need to know about all of our models in the codebase, Rails won’t load all of these into memory each time we start the rails console so we need to ask it to eager load them.

```ruby
Mongoid.models.count
#=> 0
Rails.application.eager_load!
Mongoid.models.count
#=> 100
```

If you use any other Rails engines in your application you can eager load the models from each of these as well

```ruby
Rails::Engine.subclasses.each do |engine|
 engine.eager_load!
end
```

Now we can iterate through each of our models and collect info on all of the indexes we specify for them.
It is possible to look at the index `options` and determine if it is a background index or sparse index to ensure that the index in the database has the same options.
We can see these index specifications for each model using `index_specifications`

```ruby
Mongoid.models.each do |model|
 index_specs = model.index_specifications
 
 # collect index names
 index_specs.map{|x| x.options[:name] || x.name}
 
 #collect all background indexes
 index_specs.select{|x| x.options[:background]}
 
 # collect all sparse indexes
 index_specs.select{|x| x.options[:sparse]}
end
```

### Gather information from Database

Next we want to gather the same information but directly from Mongo this time, `Mongoid.default_client.collection` will give us direct access to each collection in MongoDB.

```ruby
Mongoid.default_client.collections.each do |collection|
 # collect index names
 collection.indexes.map{|x| x['name'] }
 
 #collect all background indexes
 collection.indexes.select{|x| x['background'] }
 
 # collect all sparse indexes
 collection.indexes.select{|x| x['sparse'] }
end
```

As we have direct access to the Mongo client we can get some very useful information on our indexes.
It's possible to get the index usage information, this allows us to find indexes that were created but never used, which would let us know that we need to amend our queries in code to use these or we should just remove them.

```ruby
Mongoid.default_client.collections.each do |collection|
 # collect unused indexes in DB
 unused_indexes = collection.aggregate(
   [
     {'\$indexStats' => {}},
     {'\$group' => {:_id => { :name => '\$name'}, :accesses => {'\$sum' => '\$accesses.ops'}}},
     {'\$project' => {:_id => 0, :name=> '\$_id.name', :accesses => '\$accesses'}},
   ]
 ).select do |usage_info|
   usage_info['accesses'].zero?
 end.map do |usage_info|
   usage_info['name']
 end
 # omit ID index as it is default for all models and doesn't show in index_specifications
 unused_indexes - ['_id_']
end
```

### Comparing

Now we can use the information we’ve gathered to compare what models and indexes we have in our codebase with the collections and indexes we have in the actual database.

Firstly we want to see what models are in our database but not in our codebase.
These would be old models that once existed in the codebase but were removed and never removed from database.
We can more than likely remove these and all of their indexes to reduce the overall size of our DB

```ruby
# Models in DB but not in code
Mongoid.default_client.collections.map{|c| c.name.to_s} - Mongoid.models.map{|m| m.collection_name.to_s}
```

Next reverse this and lets see if there are any Models in code that are not in the DB.
Might happen if there was a Model that was created in code and then forgotten about and never used. Could be a good indication to remove it from your codebase

```ruby
# Models in code but not in DB
Mongoid.models.map{|m| m.collection_name.to_s} - Mongoid.default_client.collections.map{|c| c.name.to_s}
```

Now with the models that exist in both codebase and database you can compare the indexes from both and see if there are any differences.
Here’s what you should look out for:
<br><br>
- Models with indexes in DB that are not in code
  - These are more than likely old indexes that can now be removed from your database
- Models with indexes in code that are not in DB
  - These are indexes that exist in your code but not in your database, you should create these in the database
- Compare background and sparse options from database and codebase.
  - If indexes are marked with these specific options in code then it was more than likely done for a good reason and it should be matched in the databse. Worth looking into if indexes have different options.
- Unused indexes, seen from Mongo collection analysis
  - Models with indexes in DB that are never used! Consider removing these or amending the queries you expected to use them.
<br><br>

### Conclusion

As developers we often think that whatever we write in code will be mirrored perfectly by the database but they can often move out of sync with each other and it is a good idea to check up on this every so often.
You might be surprised there could be a huge collection in your database from years ago that’s taking up lots of space or an index that was supposed to speed everything up might not even be used or maybe it was never even created.
It’s easy to keep track of this kind of thing with a small team and a small codebase but once it starts to grow it’s a good idea to automate these checks and have it report to you 

At OnePageCRM I have written a ruby script that will perform all of this analysis and compile a report for us which we run every month just so we can keep an eye on what’s happening.
You can see the file here and run it on any Rails, Mongo app that you have:
https://gist.github.com/JohnMaguir/02fd21e4785964635058f955a3550421

Let us know if you run it on your application and if you found anything that surprised you!
