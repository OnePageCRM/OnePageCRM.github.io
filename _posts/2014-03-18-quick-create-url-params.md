---
layout: post
title: "Quick Create a contact with URL Parameters"
slug: "quick-create-url-params"
category: blog
author: peter
date: 2014-03-18 13:24:22
---

We recently released a really simple way to create a new contact.
You can use URL parameters to automatically populate the Add Contact form in your OnePageCRM account.
Click on the link and your OnePageCRM account will open on the Add Contact page with the form already populated.

For example, you can quickly add Johnny Bravo to your contacts list by going to this URL:
{% highlight http %}
http://app.onepagecrm.com/add_new_contact?firstname=Johny&lastname=Bravo&tags[]=CartoonNetwork&tags[]=beefcake
{% endhighlight %}

## Sample
OK great - what's the point of this you might ask. There's loads of places this could come in handy. For example, if you had an internal list of contacts:

<table class="table">
  <thead>
    <tr>
      <td>
        Firstname
      </td>
      <td>
        Lastname
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
    </tr>
    <tr>
      <td>
        Kung Foo
      </td>
      <td>
        Panda
      </td>
    </tr>
  </tbody>
</table>

You could add a link to each one:


<table class="table">
  <thead>
    <tr>
      <td>
        Firstname
      </td>
      <td>
        Lastname
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
        <a href="http://staging.onepagecrm.com/add_new_contact?firstname=Johny&lastname=Bravo">Add to OnePageCRM </a>
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
        <a href="http://staging.onepagecrm.com/add_new_contact?firstname=Kung%20Foo&lastname=Panda">Add to OnePageCRM </a>
      </td>
    </tr>
  </tbody>
</table>