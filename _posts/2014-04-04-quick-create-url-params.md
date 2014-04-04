---
layout: post
title: "Create Contact via URL"
slug: "quick-create-url-params"
category: blog
author: peter
date: 2014-04-04 13:24:22
---

We recently released a really simple way to create a new contact.
You can use URL parameters to automatically populate the Add Contact form in your OnePageCRM account.
Click on the link and your OnePageCRM account will open on the Add Contact page with the form already populated.

For example, you can quickly add Johnny Bravo to your contacts list by going to this URL:
{% highlight http %}
http://app.onepagecrm.com/add_new_contact?firstname=Johny&lastname=Bravo&company=Cartoon%20Network&tags[]=beefcake
{% endhighlight %}

### Sample
OK great - what's the point of this you might ask.  We think there's loads of situations this could come in handy. For example, if you run an online shop, you may want to add some of your best customers to OnePageCRM for the support team to follow up with at a later date.

As the records come into your internal database, you could add a link to each one.

<table class="table">
  <thead>
    <tr>
      <td>
        Firstname
      </td>
      <td>
        Lastname
      </td>
      <td>
        Company
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Johnny
      </td>
      <td>
        Bravo
      </td>
      <td>
        Cartoon Network
      </td>
      <td>
        <a target="blank" href="http://app.onepagecrm.com/add_new_contact?firstname=Johny&lastname=Bravo&company=Cartoon%20Network">Add to OnePageCRM </a>
      </td>
    </tr>
    <tr>
      <td>
        Kung Foo
      </td>
      <td>
        Panda
      </td>
      <td>
        Dreamworks
      </td>
      <td>
        <a target="blank" href="http://app.onepagecrm.com/add_new_contact?firstname=Kung%20Foo&lastname=Panda&company=Dreamworks">Add to OnePageCRM </a>
      </td>
    </tr>
  </tbody>
</table>

Clicking on a link will open OnePageCRM in a new tab, with the Add Contact form open and filled out with the relevant details.

<img class="img-responsive" src="/img/quickcontact.png"/>

You can then edit the contacts details, and when you are happy, hit save.