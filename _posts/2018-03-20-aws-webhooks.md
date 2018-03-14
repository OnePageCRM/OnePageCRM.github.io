---
layout: post
title: "Managing webhooks with AWS services"
slug: "aws-webhooks"
category: blog
author: pawel
date: 2018-03-12 16:51:15
---

_**Dissclaimer:** This post contains implementation details (AKA Nerd content) of one of OnePageCRM
features. If you don't fully understand it or you have any comments about that, feel free to put a 
comment and join the discussion._

### Introduction

As Liam mentioned in his few previous posts, here in OnePageCRM we are utilizing some of
[Amazon Web Services][aws] on order to provide the best CRM system on this planet. One of 
elements highly using it, which is currently in closed beta program, is email sync feature
which is being provided by our partner [Nylas][nylas]. This feature allows you, almost in
real time, sync emails which you exchange with your customers with corresponding 
contact in your OnePagecrm account. 

In this post I will try to describe from technical site how the whole system is operating.

### The medium: webhook

What is that "webhook" you may ask. Following [Wikipedia definition][wikipedia] webhook is
nothing else than user-defined HTTP callback which is usually triggered by some
event like pushing new commit to your repository, placing comment on some blog post
or when someone will submit contact form on your website. In plain English,
when some event will occur, one server when it happened will send HTTP request to
other one with information about such event. So we can call it one way communication
channel between different servers. And how such webhook will be processed is only
under the matter of developer creativity :). 

### The actor: Nylas webhook

<img src="/img/aws-webhooks/nylas-email-sync.svg" alt="Nylas" style="margin: 0 10px 10px 0; width: 100px; float: left" />
Let's start at the moment when you will send an email to your customer or you
will receive such and you have contact in your OnePageCRM account which corresponds
to your customer (i.e. your contact has proper email address assigned). And when you
have our email sync feature on and connected your email account, Nylas Sync Engine
will detect this event and will send webhook to OnePageCRM server with information
about new email in your either inbox or outbox. Have I said "OnePageCRM servers"? My
mistake; webhooks actually is being sent to AWS and processed there before the
email itself will be subject of investigation within OnePageCRM system itself.

<div class="clear: both"></div>

### The doorkeeper: Amazon API Gateway

<img src="/img/aws/api-gateway.svg" alt="Amazon API Gatway" style="margin: 0 10px 10px 0; width: 100px; float: left" />
When mentioned earlier Nylas Sync Engine is sending webhook, which is simple HTTP
POST request, it actually speaks with service called [Amazon API Gateway][apigateway].
We can call this service as very powerfull front door which can be used to build
very powerfull APIs. With use of API Gateway you can either:

* forward traffic to your EC2, ECS or external servers
* process request in serverless environement as we'll do this in a minute
* simply mock some response

Of course you can mix all of those three within single API (e.g. you can use 
EC2/ECS/Lambda feature to process data upload and redirect to storage provider
in order to fetch data). In our case we will limit ourselves only to single 
resource responding to two HTTP methods: GET and POST as it is required by 
Nylas Sync Engine (laterwe'll describe a bit more in details meaning of 
those two methods in this scenario).

<div class="clear: both"></div>

### The operation room: Amazon Lambda

### The servant: NodeJS

### The messenger: Amazon SQS

### The glue: Amazon CloudFormation

<script type="text/javascript">
setTimeout(function(){document.location.reload();}, 10000);
</script> 

[aws]: https://aws.amazon.com 
[nylas]: https://www.nylas.com/
[webhook]: https://en.wikipedia.org/wiki/Webhook
[apigateway]: https://aws.amazon.com/api-gateway/