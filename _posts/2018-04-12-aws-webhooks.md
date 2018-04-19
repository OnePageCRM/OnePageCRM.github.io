---
layout: post
title: "Managing webhooks with AWS services"
slug: "aws-webhooks"
category: blog
post_image: "/assets/images/articles/aws_webhooks_top.png"
author: pawel
date: 2018-04-12 09:00:00
excerpt: "Here in OnePageCRM we are utilizing some of Amazon Web Services in
          order to provide the best CRM system on the planet. One of our latest 
          features, which is currently in a closed beta program, is email sync 
          which is being provided by our partner Nylas."
---

_**Disclaimer:** This post contains a short description from a technology point of
view on how we are serving webhooks in our system. If you are interested in more 
details, please contact us at [devteam@onepagecrm.com](mailto:devteam@onepagecrm.com)._

Here in OnePageCRM we are utilizing some of [Amazon Web Services][aws] in order to 
provide the best CRM system on the planet. One of our latest features, which is 
currently in a closed beta program, is email sync which is being provided by our 
partner [Nylas][nylas]. This feature allows you,  in real time to sync emails from 
your email provider with the corresponding contact in your OnePagecrm account.

In this post I will  discuss  how the whole system operates.

### The medium: webhook

<img src="/assets/images/aws-webhooks/webhooks.svg" alt="Webhooks" style="margin: 0 10px 10px 0; width: 100px; float: left" />
What is that “webhook” you may ask. Following [Wikipedia definition][wikipedia]
webhook is nothing else than user-defined HTTP callback which is usually 
triggered by some event like pushing new commit to your repository, comments 
on a blog post or when someone  submits a contact form on your website. 
In plain English, when some event will occur, one server will send a HTTP 
request to another server with information about such event. So we can call 
it a one way communication channel between different servers and how such 
webhook will be processed is only under the matter of developer creativity!

<div class="clear: both"></div>

### The actor: Nylas webhook

<img src="/assets/images/aws-webhooks/nylas-email-sync.svg" alt="Nylas" style="margin: 0 10px 10px 0; width: 100px; float: left" />
Let’s start at the moment when you will send an email to your customer or you 
will receive such and this contact exists in your OnePageCRM account (i.e. your 
contact has proper email address assigned). When you have our email sync 
feature on and connected to your email account, Nylas Sync Engine will detect 
this event and will send a webhook to the OnePageCRM server. This webhook will 
contain information about a new email in your either inbox or outbox. Have I 
said “OnePageCRM servers”? My mistake; webhooks are actually being sent to AWS 
and processed there before the email itself will be subject to investigation 
within the OnePageCRM system itself.

<div class="clear: both"></div>

### The doorkeeper: Amazon API Gateway

<img src="/assets/images/aws/api-gateway.svg" alt="Amazon API Gatway" style="margin: 0 10px 10px 0; width: 100px; float: left" />
As mentioned Nylas Sync Engine sends a webhook, which is a simple `HTTP POST` 
request, speaks with a service called [Amazon API Gateway][apigateway]. We 
can call this service a very powerful front door which can be used to build very 
powerful APIs. 

With use of API Gateway you can either:
* forward traffic to your EC2, ECS or external servers,
* process request in serverless environment (we’ll discuss this in a minute),
* simply mock some response.

Of course you can mix all of these three within a single API (e.g. you can use 
EC2/ECS/Lambda feature to process data upload and redirect to storage 
provider in order to fetch data). In our case we will limit ourselves 
only to a single resource responding to two HTTP methods: `GET` and `POST` as 
it is required by Nylas Sync Engine. 

<div class="clear: both"></div>

### The operation room: Amazon Lambda

<img src="/assets/images/aws/lambda.svg" alt="AWS Lambda" style="margin: 0 10px 10px 0; width: 100px; float: left" />
When our webhook is received by API Gateway it is further delivered to and processed 
by [AWS Lambda][lambda] service. Lambda is Amazon’s serverless function execution 
service which allows us to run our code in “pure cloud” without the need of 
having to configure our server (and yes, we know old Chinese proverb saying 
_that there is no cloud and only someone’s else computer_).

It’s important to know that within Amazon’s infrastructure, Lambda function 
is not focused only on serving HTTP requests coming through API Gateway 
that may be triggered e.g. after some object will be uploaded to S3 storage 
service, an email will come through SES service or simply execution may be 
triggered manually. Every lambda function which is being called with three 
parameters: `event` which is subject of the call (in our case it is the object 
describing HTTP request together with webhook data itself prepared by API Gateway 
method configuration), `context` which describes environment within which 
function is being called and `callback` which is “pointer” (yes, it’s hard to 
speak about pointers in such languages like Javascript) to callback function which 
Lambda execution environment is expecting to be called with function execution result.

Result of such function call is then sent back to API Gateway service where it 
may or may not be processed (it comes as an object and when unprocessed `JSON` 
response with such object will be prepared by default) and sent back to the client.

<div class="clear: both"></div>

### The servant: NodeJS

<img src="/assets/images/aws/nodejs-sdk.svg" alt="NodeJS SDK" style="margin: 0 10px 10px 0; width: 100px; float: left" />
AWS Lambda allows developers to run code with use of various programming languages; 
when this post was written, it was possible to write Lambda function with NodeJS, 
Java, C# or Python. In our case we have chosen NodeJS as we have a number of very 
good developers skilled within this technology.

In order to use NodeJS within Lambda, we will need to create ZIP archive containing 
all package files (including `package.json`) - if you have a project in a separate 
directory, ZIP archive should contain content of it, not the directory itself.

If you have a module (let’s say it’s `index.js` in main project directory) and you 
want to create some function which will be executed as Lambda one, you have to define 
it within following way:
 
<pre>
  <code class="javascript">
  // index.js file content
  
  exports.functionName = function(event, context, callback)
  {
    /* ... function body ... */
  }
  </code>
</pre>

Such function will be further accessible through `index.functionName` identifier.

When providing a webhook URL within Nylas dashboard, it is required that the given 
URL will accept the following requests:
* `GET` request is “challenge-response” one which is being used by Nylas if given 
   URL is valid; Such request should literally return string given as query parameter.
* `POST` request which will contain data about events like new email creation, 
  account sync status change etc.

In order to provide a required feature, we created a single resource within the API 
Gateway service which responds to GET and POST methods and for every method we are 
defining corresponding lambda functions:
* `GET` request, we are simply returning string found as query parameter; 
  the important thing here is that when we will return string from Lambda 
  function it will still be treated as “JSON data” within API Gateway and by 
  default it will be serialized which means that double quotes will be added 
  around the string; and because it’s not exactly the same what Nylas expects 
  to get in response, it will tell us that our callback URL is invalid; 
  therefore we have to configure our API gateway to convert “string object” 
  into actual string and return plain text response.
* `POST` request, where we are have webhook data. First we validate the data 
  by signature check (Nylas sends us signature within HTTP request headers),
  and then the data itself is processed, multiple events are being isolated 
  (as within single webhook we can receive information about more than one
  event), initially filtered and then sent to further processing 
  via Amazon SQS described below.


<div class="clear: both"></div>

### The messenger: Amazon SQS

<img src="/assets/images/aws/sqs.svg" alt="Amazon SQS" style="margin: 0 10px 10px 0; width: 100px; float: left" />
[Amazon Simple Queue Service][sqs] is the perfect method to implement communication 
between different independent elements of the system. It is being built as system 
of message queues where various system components can either send or receive 
messages. In our case after webhook data will be processed, we are creating a 
number of messages like “new email with ID1 in account X” or 
“account Y sync status has changed to Z” and Lambda function sends such message 
to predefined list of queues. From the other side, OnePageCRM servers responsible 
for all background jobs processing are continuously reading  messages from 
those queues and finally processing emails itself deciding if it should be 
stored within your account or not.

<div class="clear: both"></div>

### The glue: Amazon CloudFormation

<img src="/assets/images/aws/cloudformation.svg" alt="Amazon CloudFormation" style="margin: 0 10px 10px 0; width: 100px; float: left" />
As you can see, we are using a number of different services from Amazon Web 
Services palette. And, as you may expect, manual configuration of all of those 
will be small hell even for an experienced system administrator. In order 
to help with that, AWS provides service called [Amazon CloudFormation][awscfn]. 
CloudFormation implements “infrastructure as a code” process which allows 
you to manage your architecture via machine-readable configuration files instead 
of command-line tools of web interfaces. With use of CloudFormation for this 
particular scenario we are defining the following elements:
* API Gateway resource with corresponding methods,
* Lambda functions,
* connections between API Gateway methods and corresponding Lambda functions,
* API Gateway request & response processing rules,
* various execution policies and execution roles.

Elements like SQS queues are not included within configuration itself (but we can 
always create SQS queue as part of it) but queue names are being passed as 
stack parameter (single configuration instance of CloudFormation is being 
called stack). Also Nylas secret key, which then is being used in Lambda 
to check request signature is being provided as stack parameter.

Amazon CloudFormation is using JSON files to describe the infrastructure itself. 
As the system grows, it is very hard to manage such files, therefore there 
is a number of tools which may help you with that. Here in OnePageCRM we are 
using library called [Troposphere][troposphere] which allows to define your 
stack as Python script.

And that is how the whole process of webhooks processing looks within OnePageCRM 
system. You can read about other projects the team are working on in our 
Blog and any questions can be asked in our [developer forum][forum]. 
Remember [we are still hiring][hiring], if you think you would like to 
try your skills within the world of Rails, MongoDB and NodeJS, then we 
would love to hear from you!

<div class="clear: both"></div>

[aws]: https://aws.amazon.com 
[nylas]: https://www.nylas.com/
[wikipedia]: https://en.wikipedia.org/wiki/Webhook
[apigateway]: https://aws.amazon.com/api-gateway/
[lambda]: https://aws.amazon.com/lambda/
[sqs]: https://aws.amazon.com/sqs/
[awscfn]: https://aws.amazon.com/cloudformation/
[troposphere]: https://github.com/cloudtools/troposphere
[forum]: http://forum.developer.onepagecrm.com/
[hiring]: https://www.onepagecrm.com/hiring
