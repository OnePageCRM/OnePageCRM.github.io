---
layout: post
title: "We've got Swagger"
slug: "weve-got-swagger"
category: blog
author: cillian
date: 2019-03-01 09:00:00
graphic: "/assets/images/api/weve-got-swagger/feature-graphic.png"
post_image: "/assets/images/api/weve-got-swagger/feature-graphic.png"
excerpt: "But for the realization of a truly connected world, we need to first 'set in stone' an agreed-upon format to describe the ways we exchange data. There is simply no way around the fact that when things become standardized, they are generally easier to use and more widely accessible."
---

I can send my kettle a tweet, and it will begin to boil... these are exciting times we live in no doubt! But in a world where I expect my kettle to boil when I tap a button on my phone; therein lies a problem of communication. 

Modern businesses need to use code in order to access important data, and the best way to connect and share data is through APIs. APIs are supposed to connect people and allow access to external services and the sharing of great developments.

<br>

As application developers, we can understand the importance of both using and providing APIs. Of course we want to leverage the expertise of others if it’s available to us, like we should provide our expertise to others if we are already solving a complex problem.

But for the realization of a truly connected world, we need to first "set in stone" an agreed-upon format to describe the ways we exchange data. There is simply no way around the fact that when things become standardized, they are generally easier to use and more widely accessible.

<br>

<div id="oai-logo" style="width:100%; margin-bottom:20px; text-align:center">
  <img 
    alt="OAI (OpenAPI Initiative)"
    class="img-responsive"
    style="width:40%"
    src="/assets/images/api/weve-got-swagger/oai-logo.png">
    <div style="margin-top:0px; padding-bottom:15px;">
      <small><a target="_blank" href="https://github.com/OAI/OpenAPI-Style-Guide">Image source</a></small>
    </div>
</div>

Here is where the OAI (OpenAPI Initiative) comes in. This is an open governance structure under the Linux Foundation, founded by a consortium of forward-looking industry experts from companies like Google, Microsoft and IBM.

The main purpose of the OAI is to head the collaborative project to define the OAS (OpenAPI Specification). 

Put simply they are trying to make it easier to define and document APIs in the hopes that it will improve the interoperability of systems and reduce the barrier to communication between independent services.

<br>

### Swagger Specification

Swagger came into the equation when its v2.0 specification was donated by SmartBear to the OAI to be adopted as the OpenAPI Specification v3.0.

Swagger is an open description format for APIs, meaning any API that adheres to the Swagger specification is easy to understand, easy to adjust, and easy to consume. Quite simply, it makes it easier for distributed systems to communicate with one another. A consumer can understand and communicate with a remote service with a minimal amount of implementation logic.

<br>

In addition to defining an API, Swagger has some really nice benefits such as generating code, documentation, and even test cases given the API description file. 

Swagger switches the focus to a design-first approach to APIs, even though it can be added retrospectively to implementation-first APIs. The design-first approach forces you to think more comprehensively about the problem domain and the most appropriate and logical solution which fits this domain.

<br>

### Our API Documentation

Previously, OnePageCRM had provided its API documentation using Jekyll and GitHub Pages. This was a bit of a pain for a few reasons:

**Lack of Separation**<br>
The API documentation was scattered across multiple files and folders within the developer site project. It was not clear where or how to make a change, but more importantly, there was no logical separation between it and the rest of the project.

**Design Requirements**<br>
When adding to or updating the API docs, you would have to add the details of the change (e.g. new field, resource, endpoint etc.), as well as the layout or cosmetics (e.g. Should we put a table here? What colour should this label be? etc.).

It was becoming less and less of an inviting task.

<br>

<div id="oai-logo" style="width:100%; margin-bottom:20px; text-align:center">
  <img 
    alt="I don't like it"
    class="img-responsive"
    style="width:80%"
    src="/assets/images/api/weve-got-swagger/i-dont-like-it.gif">
    <div style="margin-top:-15px; padding-bottom:15px;">
      <small>
        <a target="_blank" href="https://giphy.com/gifs/reactionseditor-do-not-want-dislike-3owzVQ23NzdKvVALUA">
          Image source
        </a>
      </small>
    </div>
</div>

<br>

Coupling these complaints of the previous system along with the many additional benefits of Swagger, it was a "no-brainer". OnePageCRM's API documentation has now undoubtedly gotten some Swagger about it (pun very much intended)!

One of the reasons that documentation takes up so much development time is because it needs to be very organized and navigable. You have to worry about where to put examples, how to organize your methods, and how much detail to provide for each call. 

<br>

### The Results

Using Swagger we were able to solve the two biggest problems with our old documentation, and it has helped us reduce a lot of the difficulty and time-consuming nature of maintaining great API documentation.

The definition of our API now lives within its own completely separate project and repository. Our developer site (which hosts the docs) is configured to fetch the documentation from this separate repo, and present it with all the correct formatting and styling etc.

Since we use Swagger, we don’t have to worry about how to organize or display the API documentation (for the most part). We simply manipulate the definition of our API, and Swagger takes care of displaying the end product in a way that is clean, easy to read and understand.

<br>

<div id="oai-logo" style="width:100%; margin-bottom:20px; text-align:center">
  <img 
    alt="Swagger Cat"
    class="img-responsive"
    style="width:50%"
    src="/assets/images/api/weve-got-swagger/swagger-cat.jpg">
    <div style="margin-top:-15px; padding-bottom:15px;">
      <small>
        <a target="_blank" href="https://memegenerator.net/instance/72258418/swagger-cat-weve-got-swagger">
          Image source
        </a>
      </small>
    </div>
</div>

<br>

### Future

Additionally Swagger can generate API clients in a multitude of languages helping to boost our potential integrations and just generally make the lives of devs who have to work with the OnePageCRM API easier (we're all about improving the lives of devs, including our own 😜).

We also hope that this will be the first step towards having the next major version of our API be a design-first approach.

<br>

<div id="oai-logo" style="width:100%; margin-bottom:20px; text-align:center">
  <img 
    alt="Everything's coming up Millhouse"
    class="img-responsive"
    style="width:60%"
    src="/assets/images/api/weve-got-swagger/coming-up-millhouse.gif">
    <div style="margin-top:-15px; padding-bottom:15px;">
      <small>
        <a target="_blank" href="https://giphy.com/gifs/season-10-the-simpsons-10x19-3o6MbdDgPPdxki4jD2">
          Image source
        </a>
      </small>
    </div>
</div>

<br>

In the process of rewriting our documentation we have exposed lots of new features of the API. We hope you enjoy using them!

We would love to hear your thoughts about our new API documentation in the comments below.
