OnePageCRM.github.io
====================

The developer site is built using [Jekyll][1] with [bootstrap 3][2] as it's front end framework. It's hosted on [Github Pages][3]

## Changes - OPCRM staff
To create a new blog post on the developer forum, create a new file in the `_posts` directory.
You can use markdown or HTML. The filename must be in this format: `YYYY-MM-DD-title.md`
The first bit of a post should be like this:

    ---
    layout: post
    title: "API Client Ruby Gem"
    slug: "api-client-gem"
    category: blog
    author: peter
    date: 2015-07-21 13:24:22
    ---

You can also add an optional `extract:` if you want to customize the extract shown on the `/blog` page. If you don't specify this it will use the first paragraph.

To add a new section to the actual API docs (v3), add a post as normal. The posts are sorted by date, so change the date in the filename and at the start of the file to fit in the appropriate sort order.

The start of an API document part needs to look like this:
   
    ---
    layout: api
    title: "Notes"
    slug: "notes"
    category: mainresources
    date: 2014-03-04 10:29:33
    ---

### Changes - non OPCRM staff

If you find a bug in our documentation, or think something could be clearer, we'd love to hear from you.
Just open a ticket in the repo and one of our developers will get to it when time allows.
Alternatively, if you would like to make the changes yourself, we'd love to accept pull requests. Just fork the repo make your changes and submit a pull request related to the ticket you've opened.

## Deployment

When you're happy with the changes, simply commit and push to the master branch. Github pages takes care of the deployment.


# API Browsers

A javascript API browser is also in this repo at `/api_browser`.
It's built in Angular.js. There are also dev and staging versions for testing with development servers.

  [1]: http://jekyllrb.com/
  [2]: http://getbootstrap.com
  [3]: https://pages.github.com/