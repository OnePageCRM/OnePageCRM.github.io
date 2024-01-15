---
redirect_from:
  - /2018/08/09/developing-microservices-in-the-cloud-for-the-cloud/
layout: post
title: "Developing Microservices in the Cloud for the Cloud"
slug: "developing-microservices-cloud"
category: blog
post_image: "/assets/images/articles/developing-microservices-in-the-cloud-for-the-cloud.png"
author: leonard
date: 2018-08-09 13:00:00
excerpt: "Things are rather less straightforward when developing a service oriented
or microservices oriented web application in the cloud for the cloud. On the one hand,
the proliferation of cloud infrastructure providers offering fully managed compute,
networking, storage and other services has vastly reduced the amount of work
required to create a production environment for enterprise software delivery. "
graphic: /assets/images/articles/developing-microservices-in-the-cloud-for-the-cloud.jpg
---

<style>

.card {
  width: 200px;
  margin: 1em auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 5px solid #eee;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);  
}

.no-margins {
  margin: 0px !important;
}

.jeff {
  width: 200px;
  height: 200px;
}

.github-blockquote {
  background: #f9f9f9;
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: .53m 10px;
}

.github-blockquote:before {
  color: #ccc;
  font-size: 4em;
  line-height: .1em;
  margin-right: .25em;
  vertical-align: -.43m;
}

.github-blockquote p {
  display: inline;
  padding-left: 5px;
}

li{
 list-style-type: none;
}

</style>

To develop a traditional web application, you stood up a collection of services and resources locally that attempted to emulate the production environment as nearly as possible. This meant installing, configuring, provisioning, and securing web servers, application servers, mail servers, database servers and databases, in-memory data structure stores, and so on, typically on a physical machine, such as a laptop or desktop. All this before writing a line of application code! Later, servers, databases, services and applications would be hosted elsewhere, typically offsite. Then, either you managed it yourself, remotely perhaps, or your overworked but heroically cheerful system administrator lent a hand. Or maybe you’d farm it out to a service provider. Your life was complicated, sure. But the development process itself was familiar, reasonably well understood, and Google had answers for everything; sample code so shiny you could groom yourself in its reflection; and life was good, simple and clean. In a nutshell, the development process had three essential steps:

* `1. Clone the repo`
* `2. Follow the steps in the README (religiously)`
* `3. Write code`

Things are rather less straightforward when developing a service oriented or microservices oriented web application in the cloud for the cloud. On the one hand, the proliferation of cloud infrastructure providers offering fully managed compute, networking, storage and other services has vastly reduced the amount of work required to create a production environment for enterprise software delivery. On the other, the local development environment has been replaced (or partly replaced) by a proliferation of remote, virtual black boxes inside virtual black boxes, inside…

<div id="wrapping-jeff-bezos" style="width:100%; text-align:center">
  <img class="jeff" src="/assets/images/articles/jeff-bezos-caricature.png">
</div>

This is to be expected. If, as Dijkstra has argued, the art of software development is the art of managing complexity then what better way to do it than with abstractions (and Jeff Bezos). But once the developer has finally built an utterly useless [pet store API](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-from-example.html) and waded through the 900,000 page [developer guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-dg.pdf), what does developing for the cloud look like from the vantage point of your desk?


Actually, it looks a lot like a serial killers skin suit, artfully stitched together from whatever comes to hand and lashings of care and ingenuity. Suppose you are building a web application that takes user input from a form, stores the form data to a database, extracts customer relevant data and stores it in your CRM. Now suppose you are going to develop this new application with a microservices oriented architecture. Excellent.

```
 - on-demand, infinitely scalable compute, out of the box,
 - billing in the milliseconds,
 - identity and access management, out of the box,
 - elastic load balancing, out of the box,
 - managed networking, and zero-config NoSQL databases, out of the box,
 - infrastructure as a template,
 - AI for sorting pictures of kittens and Donald Trump in assorted baseball caps.
```

But what to do with all this from one cycle of your watchful transpiler to the next? Mix and match a few cloud services and a few local dev servers, and maybe the DynamoDB jar file running out of a local directory? Or maybe run Serverless locally, with the API Gateway plugins, but maybe manage your dead letter queues with SQS in the real, but serve your JavaScript bundle from a local node server you hacked together for just that one project? Or, maybe you could emulate just S3 locally with Zenko’s Scality Cloud Server? Or maybe look up Saltstack and emulate everything locally? Or maybe do everything in the browser, throw in a web IDE, Postman, and the AWS console, and the AWS CLI, and, and, and... Yup. Skin suit.

<div style="width:100%; text-align:center; background-image: url('assets/images/articles/automated-chaos.png')">
  <div class="card">
    <img class="no-margins" src="/assets/images/articles/love-your-suit.jpg">
  </div>
  <div style="margin-top: -15px; padding-bottom: 15px">
    <small><code>Love your suit!</code></small>
  </div>
</div>

This is not to suggest that Jeff Bezos is an unfeeling psychopath. Nor do I mean to disconfirm the proposition. Nor, for that matter, am I suggesting that developing cloud services and infrastructure locally is a murderously chaotic patchwork of scripts, and plugins, and frameworks, jar files and console sessions, and tearful afternoons on stackoverflow just trying to get the words out, just trying to find that one articulate developer who has not only answered the question in one paragraph with immaculate sample code, but who has also framed the question precisely as you would have done, had you realized that <i>that</i> was what you were trying to say. All that being said, it <i>can</i> be a chaotic process and the development environment can be difficult to nail down.

Containerization addresses some problems. A number of serverless frameworks are available with an impressive ecosystem of plugins and middleware to locally emulate many or most of the cloud services of interest. On the other hand, you could develop your application in Cloud 9, and hammer away at the Lambda or API Gateway consoles, copy-pasting auth tokens and handler events from one test widget to another, periodically revisiting the Node server that is serving your UI bundle to see if it is retrieving anything other than a misleading `200` or `403`. Or just give way to uncontrollable sobbing when everything is in the end a malformed lambda proxy response.

This is a ruthless caricature of the situation on the ground. But it illustrates the idea. The answer to the question about developing microservice oriented web applications for the cloud is all about choosing the sweet spot on a spectrum of development options ranging from locally emulating the production environment en masse to working exclusively in the cloud with tools and services delivered entirely over the network. Identifying the sweet spot is rather more challenging but ultimately boils down to a utilitarian conversation between the members of your development team. That is, your choice of framework, IDE, toolchain, or how you choose to interact with AWS services all depends on what works best for your team.

So don’t despair! The solution to the problem of developing microservices oriented web applications for the cloud, at your desk, lies in a return to essentials. In the words of the fictional criminal psychopath, Dr Hannibal Lecter, creatively embellishing the meditations of the stoic philosopher Marcus Aurelius:

<blockquote class="github-blockquote">
  <p>“Of each particular thing, ask what is it in itself? What is its nature?”</p>
</blockquote>

The nature of developing cloud services (in the cloud) for the cloud boils down to a variation on three essential and all too familiar principles:

  * `1. Clone all the repos`
  * `2. Make all the skinsuits`
  * `3. Write code`
