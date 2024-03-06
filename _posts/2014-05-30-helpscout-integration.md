---
redirect_from:
  - /blog/2014/06/12/helpscout-integration/
  - /2014/06/12/helpscout-integration/
layout: post
title: "Helpscout Integration"
slug: "helpscout-integration"
category: blog
author: peter
date: 2014-06-12 13:24:22
excerpt: We have recently completed an integration with Helpscout, a great help desk application. This integration was super simple and doesn't use either API. Here's how we did it.
---

We have recently completed an integration with Helpscout, a great help desk application. This integration was super simple and doesn't use either the OnePageCRM API, nor the Helpscout API.

Helpscout support [Custom Apps](http://developer.helpscout.net/custom-apps/), enabling you to pull data from a 3rd party source directly into your Helpscout sidebar. This can be a static or dynamically created snippet of HTML. All you need to do is provide the endpoint URL of this snippet and it will be displayed in the Helpscout sidebar. 

In our case we use a dynamically created snippet. Helpscout send a webhook which contains the details of the current conversation. We generate a dynamic HTML snippet, pulling the contact's details from OnePageCRM based on the email address and sending it back to Helpscout.

If the contact isn't found in OnePageCRM, we use a really simple method of integrating with OnePageCRM, our [Create Contact via URL](http://developer.onepagecrm.com/webhooksmore/quickcreateurlparams.html) feature. 
We simply build a URL based on the contact details sent from Helpscout.

For example, if Johnny Bravo sent us an email to support, and wasn't already in our OnePageCRM account, a link to a URL like this would be generated in our Helpscout sidebar.

{% highlight http %}
http://app.onepagecrm.com/add_new_contact?firstname=Johny&lastname=Bravo&email=jb@cartoonnetwork.com

{% endhighlight %}

The user can simply click on this link and they are brought to their OnePageCRM account with a pre-populated add contact page. They can add in any other details for this contact and save it.


Our integration was initially created as a Custom App in Helpscout. This made it really easy for us to test it during development. When we were happy with the application, the team from Helpscout wrapped it up into an official, one-click install integration.

You can checkout our [Helpscout app here](https://www.helpscout.net/apps/onepagecrm/), read the marketing blurb [here](http://blog.onepagecrm.com/applications-updates/integration-helpscout) and enable it in your OnePageCRM account on the [apps page](https://app.onepagecrm.com/apps/)