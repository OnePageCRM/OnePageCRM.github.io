OnePageCRM.github.io
====================

The developer site is built using [Jekyll][1] with [bootstrap 3][2] as it's front end framework. It's hosted on [Github Pages][3]

<br>

## API Documentation
Our [API documentation][4] has recently been updated to use Swagger and conforms to the OpenAPI 3 Specification. It is maintained in the following [repository][5], where you can submit questions, bugs, or better yet pull requests!

Alternatively you may wish to ask your question(s) on our [Developer Forum][6].

<br>

## Changes (staff)
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
    excerpt: "Short text about post. Used as summary in blog list & meta tags for social sharing / SEO"
    graphic: /img/feature-graphic.png (used in meta tags for social sharing)
    ---

You can also add an optional `extract:` if you want to customize the extract shown on the `/blog` page. If you don't specify this it will use the first paragraph.

To make any updates to the API documentation, you will need to make changes to the `swagger.yaml` file in the [Swagger repository][5].

<br>

## Changes (non staff)

If you find a bug in our documentation, or think something could be clearer, we'd love to hear from you.
Just open a ticket in this repo, the [Swagger repo][5], or our [Developer Forum][6] and one of our developers will get to it when time allows.

Alternatively, if you would like to make the changes yourself, we'd love to accept pull requests. Just fork the repo make your changes and submit a pull request related to the ticket you've opened.

<br>

## Deployment

If you've made local changes to the repository, you can start the server with the command: `jekyll serve`.

When you're happy with the changes, simply commit and push to the master branch. Github pages takes care of the deployment.

<br>

## API Browsers

A javascript API browser is also in this repo at `/api_browser`. It's built in `Angular.js`. 
There are also dev and staging versions for testing with development servers.

  [1]: http://jekyllrb.com
  [2]: http://getbootstrap.com
  [3]: https://pages.github.com
  [4]: https://developer.onepagecrm.com/api
  [5]: https://github.com/OnePageCRM/swagger
  [6]: http://forum.developer.onepagecrm.com
