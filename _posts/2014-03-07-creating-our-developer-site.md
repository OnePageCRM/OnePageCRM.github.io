---
layout: api
title: "Creating developer.OnePageCRM.com"
slug: "creatingdevsite"
category: blog
date: 2014-03-07 12:39:48
---

![Developers!]({{ site.url }}/img/developers.jpg)


I recently started with OnePageCRM and one of the first tasks I was assigned was to work with the developer community. The OnePageCRM developer community have created some great integrations and add ons using our API and Webhooks. 

With the launch of version 3 of our API, we decided it was a good time to revamp our developer documentation. 
The old documentation was part of our [marketing](http://onepagecrm.com) website and we weren't satisfied that this was the best place for it. Our [blog](http://blog.onepagecrm.com) site has lots of great information for the end users of OnePageCRM, but we didn't want to confuse the casual customers with complicated documentation.

Eventually the discussion resulted in a totally new portal - [developer.onepagecrm.com](http://developer.onepagecrm.com)!

### Technology Stack
When starting any project from scratch, I like to keep the following in mind when choosing the stack to use:

*  The technologies should be fun to use
*  It should help me to learn something new
*  The end product should look good with minimal design work

We decided to use [Jekyll](http://jekyllrb.com) to create this site. Jekyll is a static site generator that generates a HTML site from a collection of HTML or markdown files. It includes a templating engine so you don't have to repeat yourself and because the end result is just HTML, you don't need to setup any databases.

A great thing about Jekyll is that it's compatible with [Github Pages](http://pages.github.com). Github let you host a website on their infrastructure for free. It's very simple, all you need to do is create a repository with a particular name, upload your HTML or Jekyll based site to it and a few minutes later your site will appear. We use Mercurial internally at OnePageCRM, but I'm a git fan at heart so it was nice to be back in my comfort zone!

To make the site look presentable, we've used the [Bootstrap](http://getbootstrap.com) framework. This resulted in a site that looks similar to many other developer sites out there. We regard this as a good thing - it's clean, simple and as a busy developer we know you wouldn't have time to appreciate our photoshop skills anyway!

This setup is 100% [Buzzword Compliant](http://en.wikipedia.org/wiki/Buzzword_compliant) and is used by a huge number of project pages and blogs. 

### CTRL - F
We have kept the API page as simple as possible - it's just one long page with all of our API documentation. This was intentional - I'm a heavy user of the ctrl-f function of my browser. By keeping all the documentation on the same page you can quickly find what you're looking for. 

Of course we've also included a normal navigation bar to to help if you're not sure what you're looking for.

### Get in touch
We have included a [developer forum](/forum) to help us engage directly with developers who are creating integrations and apps using the OnePageCRM API. 
The OnePageCRM development team will be monitoring the forum and will answer any queries here.

We would also love to hear any ideas or suggestions about how we could improve the developer portal.
