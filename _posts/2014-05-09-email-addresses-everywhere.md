---
layout: post
title: "Email addresses everywhere!"
slug: "email-addresses-everywhere"
category: blog
author: peter
date: 2014-05-30 13:24:22
excerpt: OnePageCRM uses an email address as the unique account identifier. This means that you can only have a single OnePageCRM account per email address. Our team uses different ways to get around this during testing.

---

OnePageCRM uses an email address as the unique account identifier. This means that you can only have a single OnePageCRM account per email address.

This isn't generally a problem, as most people only need the one OnePageCRM account.

Not so for our development and testing teams, who are constantly creating and deleting accounts on their local development environments and testing servers.

Different developers here deal with this in different ways. Paweł, our CTO, has his own email server setup, with a catchall mailbox for that domain.
I haven't had time to setup my own email domain yet, so I use two different methods.
These techniques are probably familiar with most readers, but I'm highlighting them here just in case.

### Sharklasers
[Sharklasers.com](http://sharklasers.com) lets you create a disposable email address, without login or registration. It gives you a new unique email address every time you visit the site and lets you view any emails sent to this account. When you close the window, the account is gone and your emails are lost. It's a really simple service, works well, and is free!

### name+string@domain.com
The other technique I use is detailed in this [blog post](http://gmailblog.blogspot.ie/2008/03/2-hidden-ways-to-get-more-from-your.html). We use Google Apps at OnePageCRM so I have a near infinite number of email addresses available to me, just by adding a `+somestring` between my name and the `@`.
This is really useful for creating accounts for different scenarios, and all emails pipe directly to my main email account.
I'm not sure if this method will work with other email providers, but if you're using a gmail account it's a really handy way to filter your emails.

I hope these tips are of use to somebody. 
Let us know in the forum what techniques you use, and if you have any other tips and tricks like this we would love to hear them.
