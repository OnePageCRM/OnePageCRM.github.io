---
layout: post
title: "Sage Integration"
slug: "sage-integration"
category: blog
post_image: "/assets/images/articles/sage.png"
author: matt
date: 2018-06-15 09:00:00
excerpt: "Here at OnePageCRM, we’ve started working on an integration with Sage, an online accounting application."
graphic: /assets/images/sage/sagelogo.jpg
---


Here at OnePageCRM, we’ve started working on an integration with Sage, an online accounting application. Sage provides a variety of cloud based accounting software, allowing users to keep track of money and clients, create quotes, invoices and the ability to connect to your bank account. 

As part of my internship in OnePageCRM, I was given the Sage integration as my main project. Over the course of a few months I gained insight into web development, integrating with other software, and user interactions. Let me share my experience. OnePageCRM is currently integrated with two other financial apps, Xero and Quote Roller, therefore as the basic functionality was in place for these integrations I was able to use it as a model. The Sage integration is quite simple: when a user clicks on a deal in OnePageCRM, a pop up window appears with the various invoice or estimate fields.  Once the user is satisfied with the information they click ‘send’, and voila!  The invoice or estimate is sent to Sage. 

<div class="text-align: center">
    <img src="/assets/images/sage/pic-02.png" alt="" class="img-responsive"
     style="width: 100%; position: relative" /><br />
</div>

After registering for a Sage developer account, the first step was the authentication process.  The aim was to allow Sage users to authorize OnePageCRM to access their data without sharing their actual login details. To do this, I needed to make a request to Sage’s authentication server and receive an authorization code, which would then be exchanged for an access token.  Initially I ran into some difficulty with this, as it can be challenging to adapt to working with a new API, and I struggled to figure out where in the process I was going wrong.

However, Sage provides a variety of resources to developers, and these proved to be very insightful in this situation. What I found most useful was their <a href="https://github.com/Sage/sageone_api_ruby_sample/tree/v3" target="_blank">sample app</a>.  A simple, bare bones application is available on their GitHub that gave an overview of their API functionality.  It brings the developer through each step in the authentication process, and allows them to make basic calls to the Sage API - creating, updating and deleting contacts.

<div class="text-align: center">
    <img src="/img/sage/pic-03.png" alt="" class="img-responsive"
     style="width: 100%; position: relative" /><br />
</div>

As an undergraduate student this was particularly useful to me, but I can imagine any developer would benefit from having a base to work off of when beginning to work with a new API. As so many websites can have complex API documentation, it was refreshing to see a model like this implemented!

Once I was able to successfully authenticate with Sage, I moved on to the main functionality of the project: the popup form.  As previously mentioned, I had two other integrations to use as a model which gave me a useful head start. After the basics of the form were set up I implemented the search bar, which calls the API to search for contacts in Sage. If no contact exists, a new one can be created. Finally, when the form is saved, the information is posted to Sage as either an estimate or an invoice, as previously chosen by the user.

When I began work on this project I asked myself was there really a need for more than one integration fulfilling similar roles. However, as I gained familiarity with the various software, I began to realise just how many seemingly minor differences there were between the three applications that could change each one’s appeal.  For example, the estimate functionality of Sage could be a crucial requirement for someone’s business, and access to that may make their daily tasks that bit easier.  

As a developer, I’ve learned that it’s important to recognise the broad range of necessities different users may have, and to always be open-minded to new applications that could lead to a better user experience.  The OnePageCRM team are continuously seeking new ways to improve the app and this way of working has taught me to do the same! 

Developing this integration for OnePageCRM has been a valuable and interesting experience for me, particularly as a software developer in training.

Have you any experience with Sage software? I would love to hear more; leave us your comments below. 

