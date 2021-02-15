---
layout: webhooks_more
title: "Create Contact via URL"
---

## Create Contact via URL

You can use URL parameters to automatically populate the Add Contact form in your OnePageCRM account.

Click on the link and your OnePageCRM account will open on the Add Contact page with the form already populated.

For example, you can quickly add Johnny Bravo to your contacts list by going to this URL:
{% highlight http %}
http://app.onepagecrm.com/add_new_contact?firstname=Johny&lastname=Bravo&company=Cartoon%20Network&tags[]=beefcake
{% endhighlight %}

### Sample
We think there's loads of situations this could come in handy. For example, if you run an online shop, you may want to add some of your best customers to OnePageCRM for the support team to follow up with at a later date.

As the records come into your internal database, you could add a link to each one.

<table class="table">
  <thead>
    <tr><th>Firstname</th><th>Lastname</th><th>Company</th><th></th></tr>
  </thead>
  <tbody>
    <tr><td>Johnny</td><td>Bravo</td><td>Cartoon Network</td><td><a target="_blank" href="http://app.onepagecrm.com/add_new_contact?firstname=Johny&lastname=Bravo&company=Cartoon%20Network">Add to OnePageCRM </a></td></tr>
    <tr><td>Kung Foo</td><td>Panda</td><td>Dreamworks</td><td><a target="_blank" href="http://app.onepagecrm.com/add_new_contact?firstname=Kung%20Foo&lastname=Panda&company=Dreamworks">Add to OnePageCRM </a></td></tr>
  </tbody>
</table>

Clicking on a link will open OnePageCRM in a new tab, with the Add Contact form open and filled out with the relevant details.

<img alt="OnePageCRM" class="img-responsive" src="/assets/images/quickcontact.png"/>

You can then edit the contacts details, and when you are happy, hit save.

### Parameters
This feature will work on most parameters in the create contact form. Currently it won't work with the address and lead source fields, or custom fields.

{% highlight http %}
https://app.onepagecrm.com/add_new_contact?firstname=Johny&lastname=Bravo&company=Cartoon Network&tags[]=beefcake&email=jb@cartoonnetwork.com&phone=555555&web=http://en.wikipedia.org/wiki/Johnny_Bravo&job_title=model&background=Johny tried to hit on me&status=prospect
{% endhighlight %}

<table class="table">
  <thead><tr><th>Field</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><code>firstname</code></td><td>Johnny</td></tr>
    <tr><td><code>lastname</code></td><td>Bravo</td></tr>
    <tr><td><code>company</code></td><td>Cartoon Network</td></tr>
    <tr><td><code>email</code></td><td>jb@cartoonnetwork.com</td></tr>
    <tr><td><code>phone</code></td><td>+555 555</td></tr>
    <tr><td><code>web</code></td><td>www.cartoonnetwork.com</td></tr>
    <tr><td><code>job_title</code></td><td>Model</td></tr>
    <tr><td><code>background</code></td><td>Johny tried to hit on me</td></tr>
    <tr><td><code>status</code></td><td>Prospect</td></tr>
    <tr><td><code>tags[]</code></td><td>Beefcake</td></tr>
  </tbody>
</table>

Tags are stored as an array, so `tags[]` is the parameter required.For each tag, you will need to pass in a separate `tags[]` parameter. 
For example:

{% highlight http %}
http://app.onepagecrm.com/add_new_contact?firstname=Johny&tags[]=beefcake&tags[]=pompadour
{% endhighlight %}