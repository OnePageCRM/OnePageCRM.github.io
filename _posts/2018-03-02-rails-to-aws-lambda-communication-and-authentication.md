---
layout: post
title: "Rails to AWS lambda: Communication and authentication"
slug: "rails_to_aws_lambda_communication_and_authentication"
category: blog
author: liam
date: 2018-03-02 09:00:00
excerpt: "Here at OnePageCRM our stack predominantly consists of a Ruby on Rails backend with a coffeescript Frontend of ReactJS and some legacy JQuery"
---


Here at OnePageCRM our stack predominantly consists of a Ruby on Rails backend with a coffeescript Frontend of ReactJS and some legacy JQuery. But that doesn't mean we don't like to branch out and delve into new technologies.

As we are looking to maintain performance and reduce strain on our [Majestic Monolith](https://m.signalvnoise.com/the-majestic-monolith-29166d022228), the shiny new buzz-word of serverless computation  caught our eye. Specifically we have been looking at [AWS Lambda](https://aws.amazon.com/lambda/?sc_channel=PS&sc_campaign=acquisition_UK&sc_publisher=google&sc_medium=lambda_b&sc_content=lambda_e&sc_detail=aws%20lambda&sc_category=lambda&sc_segment=186455828798&sc_matchtype=e&sc_country=UK&s_kwcid=AL!4422!3!186455828798!e!!g!!aws%20lambda&ef_id=WZqeZAAAAbjkoozC:20180219162517:s), a service where functions can be executed on various triggers (including the AWS Api Gateway). This means you will only be billed for the execution time, rather than for keeping a server running 24/7. 

<br/>
## Serverless Computation

The potential advantages from developing new features on this platform looked promising: Firstly, the new feature won't impact the core systems performance, except where communication happens (probably a queue system like SQS or simply a HTTP API). Secondly, there is no upfront cost of running a beefy server for a new feature which will see low usage until the user-base grows. Thirdly there is no effort needed in upgrading to a more powerful server as the capacity is reached. Instead we pay for only as much CPU time as is used and can scale (almost) infinitely.

AWS Lambda offers a range of runtime environments to write functions in:
* JavaScript (Node.js)
* Python
* Java (Java 8 compatible)
* C# (.NET Core) 
* Go

Checkout the [Lambda FAQ](https://aws.amazon.com/lambda/faqs/) for more details


As ruby isn't supported (or at least [not easily](http://www.adomokos.com/2016/06/using-ruby-in-aws-lambda.html)), we are opting for a NodeJS setup. As we already use ReactJS, this will let us tinker with the server-side rendering feature and keep with a familiar language. 

To develop Lambda functions locally, we used a handy toolkit - the [serverless framework](https://github.com/serverless/serverless#). It supports Javascript and speeds up development as the lambda stack can be emulated locally, saving you the time of waiting for lengthy deployments.

After deciding on our new features stack, it was time to sort out the main act -  communication, authentication and authorization.


<br/>
## Communication formats to consider

As briefly mentioned, there are two main methods to trigger Lambda functions: a [Web API](https://en.wikipedia.org/wiki/Web_API) or a [message queue](https://en.wikipedia.org/wiki/Message_queue). There is a third option, of using the [AWS SDK](https://aws.amazon.com/tools/) (in our case the [ruby gem](https://rubygems.org/gems/aws-sdk-lambda/versions/1.0.0.rc8)) from within a rails server to [invoke](https://docs.aws.amazon.com/sdkforruby/api/Aws/Lambda/Client.html#invoke-instance_method) lambda functions directly. I'm dismissing this as it removes one of the core advantages I'm looking for; to reduce load on the rails server.

<br/>
### Web API

This should be relatively straightforward to anyone familiar with web applications. Create a simple API interface sending / receiving JSON data. For this, [AWS API Gateway](https://aws.amazon.com/api-gateway/) needs to be configured to accept HTTP requests and pass them onto the corresponding Lambda functions. This can be a tedious configuration process, but with serverless it's all done via a single config file (see this [official example](https://github.com/serverless/examples/blob/master/aws-node-simple-http-endpoint/serverless.yml)).

<br/>
### Message Queue

There is a plethora of message queue system which would be suitable for this integration. AWS's most suitable offering is [AWS Kinesis](https://aws.amazon.com/kinesis/) into which messages can be inserted via the corresponding [ruby gem](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/Kinesis/Client.html#put_record-instance_method). The alternative of [AWS SQS](https://aws.amazon.com/sqs/) (simple queue service) needs to be paired with [AWS SNS](https://aws.amazon.com/sns/) (simple notification service) so that the lambda function can be informed that there is a new message for it to process. 

Compared to interfacing with the AWS SDK lambda gem to execute functions, these solutions have the advantage of being fire-and-forget requests made by the rails server. Time is saved rails server doesn't have to wait for the lambda function to complete and return it's result.

<br/>
### Choice

My choice of communication method is the Web API. It gives the advantage of completely decoupling the lambda function from the rails server, as it can be accessed directly from the client (the user's browser). This does however mean that our method of Authentication needs to be suitable for HTTP requests.

<br/>
## Authentication formats to consider

There exist almost too authentication methods for HTTP requests to count. Thankfully they are all fairly similar and can be split by two properties: format and encryption. You can choose almost any encryption algorithm depending on how secure you need it to be or how fast the authentication needs to occur. Let's focus on the format:

<br/>
### Basic Authentication

[Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) is very straightforward and offers no encryption by default, which is why it should be exclusively used with secure HTTPS requests. It appends username and password to the front of the URL:

```
    https://username:password@example.com
```

<br/>
### Cookies

[Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) are a form of authentication specific to browsers (though they could be used for server-server communication too). A Cookie is simply a text field containing some metadata such as:

* What domain it originated from
* If it can be read by the client side Javascript, or only the browser
* How long it should be kept

Typically a session cookie (ie. one used for authentication) is created by the server and sent to the browser in a special header within the HTTP Response. The browser will then automatically include the cookie with every future request to the same domain.

<br/>
### Token

[Tokens](https://jwt.io/introduction/) work in the same vein as cookies, except we skip the automated browser functionality which includes the cookie with every request. One reason to manually do what cookies do for free is the domain limitation of cookies. A session cookie can only be sent to the domain where it originated. So authentication data set by example.com cannot be sent to google.com. 

One major downside of tokens is that they are lost on page refresh/redirect as they are usually handled by javascript. Cookies, on the other hand, can be kept for years. But this inconvenience is greatly reduced by the rise of [Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application), where the page is almost never reloaded / changed.

<br/>
### Choice

As in this scenario, we are generating auth data in a Rails server to be passed to Lambda functions, cookies fall away as a possibility (though they would work if both rails and lambda were accessible on sub-domains on the [same parent-domain](https://stackoverflow.com/questions/18492576/share-cookie-between-subdomain-and-domain)). 

By default, basic auth is unencrypted so it isn't the safest method to use. This makes web tokens my main choice.

<br/>

## Summary

Going through the options available, I've decided on HTTP requests with JWT authentication. JWT is a well defined standard but the [official specifications](https://tools.ietf.org/html/rfc7519) are terse to read so I would always advise using libraries rather than generating complicated auth data yourself. Check back for my next blog post on implementing JWT authentication in Ruby and NodeJS.

<br/>
<br/>