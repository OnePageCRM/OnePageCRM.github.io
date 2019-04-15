---
layout: post
title: "OnePageCRM integrates with Office365"
slug: "integration-with-office365"
category: blog
author: vlad
date: 2019-04-11 09:00:00
graphic: "/assets/images/articles/office365_dev_blog_header.png"
post_image: "/assets/images/articles/office365_dev_blog_header.png"
excerpt: "This is a story of a yet another OAuth2 integration implemented on OPCRM side, now with Office365 using their Microsoft Graph API. I’m going to share my experience and give my feedback of using this API here."
---
This is a story of a yet another OAuth2 integration implemented on OPCRM side, now with Office365 using their Microsoft Graph API. I’m going to share my experience and give my feedback of using this API here.

This integration allows users to create email templates, send bulk emails and add the human touch by adding a personal phrase to individual emails...

<div class="text-align: center">
    <img src="/assets/images/office365/outlook365_devblog_scr1.png" alt="Easily send emails in bulk" class="img-responsive" /><br />
</div>

Well first of all I need to say that in order to make this integration happen (as well as other/future ones dedicated to emails sending via 3rd party APIs) I had to do some refactoring of an already existing integration with Google mail. Given the documentation from Microsoft and having existing Google integration I understood what it should look like, so I changed the shape of the code without changing its functionality. After that everything seemed to be ok, at least from a design point of view, but then came implementation issues…

Microsoft Graph API library for ruby (v.1.0) is written in a generalized way: it has an xml file representing data structures & types and some code wrapping the response into ruby objects respecting types description. It’s very nice to have such a thin wrapper over data, but for me it was difficult to debug it. Ideally, if there was more documentation available or even a community forum it would have made the process a little easier.

<div class="text-align: center">
    <img src="/assets/images/office365/microsoft-graph.png" alt="Microsoft graph" class="img-responsive" /><br />
</div>

My biggest win (over my stupidity) was that I couldn’t use library types in calls to API, they only wrap the response. For instance I created a FileAttachment instance and tried to pass it to `post` method fairly assuming that it will be well serialized and sent to MS endpoint but instead I got some strange errors :) So my mistake was that I was trying to work with API in the terms and data structures it provided me with. Instead I had to send objects that I created and serialized myself, that didn’t seem comfortable to me, but finally it worked. 

The main problem was with attachments: I could not attach files directly to my message, there’s a limitation of 4MB per POST request on the MS endpoint side, so we can only guess the size of a file to be uploaded, because POST request can contain headers info and their length may vary, so the final attachment file size is a bit less than 4 Mb. How much less -- you should calculate somehow by subtracting the headers length from 4MBs. It’s not very convenient, but it is what it is. The format of the attachment data that is to be sent should be passed as a Base64 encoded string. I expected the API library to take a regular ruby hash with parameters to be serialized and sent to the endpoint, but I wanted too much. Though I prepared attachment file data and converted it into base64-encoded string, it didn’t work because API library doesn’t do any transformations or serialization so I had to do the whole POST request 100% myself composing request body myself. It was a hash serialized to string that had file attachment base64-encoded data and some other params saying that this attachment is really a file attachment. 

So the whole procedure took several steps:
 1. Create a draft message in outlook account
 2. Attach files to it with separate POST requests 
 3. Send the message

That looked a bit strange for me because I got used to working with multipart content types when sending an email with attachments. Anyway the endpoint works as it works and complaining about it was a waste of time :)

I learned from this experience not expecting too much from mediator libraries which seem to like a thin wrapper over HTTP(s) calls and preparing myself a payload with properly serialized (and sometimes encoded) data. 

Another thing I noted was that this API doesn’t provide signature data like Gmail does, MS docs say that signature is stored in the mail client (not MS account), so that’s why it’s not provided. I also tried to fetch email aliases from MS email account, I expected them to come in `proxy_addresses` method of `me` object returned from API as I expected it from the documentation. I created several aliases but none of them appeared in the response.

So if you’re reading this post and succeeded to fetch email aliases then I’d like really love to hear more in the comments below!

Finally working with MS API was more a surprise for me than a regular oauth integration, maybe it’s just my own impression or I started with more expectations than I should have had, but it was a good lesson and I learned something new from it. 

Now [Outlook /Office 365](https://www.onepagecrm.com/blog/outlook-office-365-email-integration){:target="_blank"}  integration is live, I hope it becomes a good utility for OnePageCRM users.

We’d love to hear your thoughts about our new integration in the comments below.

