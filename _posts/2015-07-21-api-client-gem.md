---
layout: post
title: "API Client Ruby Gem"
slug: "api-client-gem"
category: blog
author: peter
date: 2015-07-21 13:24:22
---

I have published a basic API wrapper to RubyGems.org.
The gem does not abstract all API calls to ruby methods but simply gives the `GET`, `POST`, `PUT` and `DELETE` methods.
The gem handles the authentication with the OnePageCRM API.


You can install this gem by running:
{% highlight bash %}
gem install onepagecrm
{% endhighlight %}


You can try out the gem in an interactive ruby session like this:

{% highlight ruby %}
irb:> require 'onepagecrm'
irb:> api_client = OnePageCRM.new('user@example.com', 'password')
irb:> api_client.get('contacts.json')
irb:> api_client.post('contacts.json', {'last_name': 'Bravo', 'first_name': 'Johnny'} )
{% endhighlight %}

You can view the code on [Github][1].
We would love to hear your feedback on how you are using this gem.

  [1]: https://github.com/OnePageCRM/onepagecrm-gem
