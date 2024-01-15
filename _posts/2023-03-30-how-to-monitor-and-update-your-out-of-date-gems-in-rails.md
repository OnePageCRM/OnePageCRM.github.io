---
redirect_from:
  - /2023/03/30/how-to-monitor-and-update-your-out-of-date-gems-in-rails/
layout: post
title: "How to monitor and update your out-of-date Gems in Rails" 
slug: "how-to-monitor-and-update-your-out-of-date-gems-in-rails"
category: blog
post_image: /assets/images/monitoring-gems/ruby-on-rails-gems-guide.png
author: john
date: 2023-03-30 09:30:00
excerpt: "In this article, we’ll cover the process that we’ve undertaken here at OnePageCRM to monitor the Gems in our Rails application for security and performance enhancements. It will help you to stay up to date, get all the benefits of performance increases, and stay safe with the latest security patches."
graphic: /assets/images/design-principles/header-image.png
---

In this article, we’ll cover the process that we’ve undertaken here at OnePageCRM to monitor the Gems in our Rails application for security and performance enhancements. It will help you to stay up to date, get all the benefits of performance increases, and stay safe with the latest security patches. 

Let's jump in.

### What are Ruby Gems?

Ruby Gems are libraries of code that you can use in your Rails application. These libraries allow you to pull in common code for things like:

* interacting with external APIs, 
* interacting with your database, 
* or running background tasks. 

In other words, libraries allow you to move quickly without having to write the code from scratch.

For example, if I wanted to start making HTTP requests from my application I could just import the Faraday Gem in my Gemfile and then I have all the power of the Faraday Gem to make these requests.

### Is it safe to use Ruby Gems?

While it is great to have all these external libraries at your fingertips, it can be a scary prospect to be using someone else's code directly in your application.

Generally, if any issues are found with Gems they will be reported to the maintainer of the Gem and they will make updates accordingly. A lot of maintainers work continuously on their Gems to improve performance and add functionality.

### Why should I keep my gems at the latest version?

Keeping your Gems up to date will ensure the latest security patches and keep your application as safe as possible.

Gems are versioned and generally follow the semantic versioning scheme, which means their version numbers follow the format of ‘major.minor.patch’ e.g. 1.0.1. Each time a new version of the Gem is released one of these numbers is incremented. If there are breaking changes with the previous version, then the major version will be updated. 

This version control helps with several things:

Users of the Gem see at a glance if they have to update some of our code to get the new version of the Gem to work. 
Developers of the Gem can release new updates and security patches for their Gems regularly. 
Users of the Gem can choose to upgrade to the new version whenever they like.

### Monitoring Ruby Gems used by your application

Monitoring is a key part of keeping your Gems up to date. 

You need to be able to see what Gems you have installed, which ones are out of date, and, most importantly, which ones have known security vulnerabilities (the good news is that you don’t have to do this manually, but we’ll get into that later).

### Tools for monitoring Gems

There are a number of great tools to help us look into our Gems and give us an overview of the situation we are in.

Firstly let's look at `bundler-audit`: https://github.com/rubysec/bundler-audit

Add this Gem to your Gemfile, and it will scan all installed versions of Gems in your application and let you know which ones have known security vulnerabilities. The scan results include the severity of the vulnerability, the CVE reference, and the version where the vulnerability is fixed.

This gives you a to-do list of all Gems that need to be updated and you can prioritize by how critical the vulnerability is.

e.g.
```
$ bundle-audit
=>
Name: actionpack
Version: 3.2.10
Advisory: OSVDB-91452
Criticality: Medium
URL: http://www.osvdb.org/show/osvdb/91452
Title: XSS vulnerability in sanitize_css in Action Pack
Solution: upgrade to ~> 2.3.18, ~> 3.1.12, >= 3.2.13

Name: actionpack
Version: 3.2.10
Advisory: OSVDB-91454
Criticality: Medium
URL: http://osvdb.org/show/osvdb/91454
Title: XSS Vulnerability in the `sanitize` helper of Ruby on Rails
Solution: upgrade to ~> 2.3.18, ~> 3.1.12, >= 3.2.13

Name: actionpack
Version: 3.2.10
Advisory: OSVDB-89026
Criticality: High
URL: http://osvdb.org/show/osvdb/89026
Title: Ruby on Rails params_parser.rb Action Pack Type Casting Parameter Parsing Remote Code Execution
Solution: upgrade to ~> 2.3.15, ~> 3.0.19, ~> 3.1.10, >= 3.2.11
```

Another great tool is `bundle_report`, it is part of the Gem `next_rails`: https://github.com/fastruby/next_rails

`bundle_report` will scan your Gemfile and let you know what Gems are outdated or what Gems are incompatible with your desired version of rails. For example, if we wanted to upgrade to Rails 7 and want to know which Gems would prevent us from doing that we could use:

```
$ bundle_report compatibility --rails-version=7.0
=> 
Incompatible with Rails 6.0 (with new versions that are compatible):
These gems will need to be upgraded before upgrading to Rails 6.0.

responders 2.4.1 - upgrade to 3.1.0
```

If we wanted to see all of the outdated Gems in our application we can run:

```
$ bundle_report outdated
=>
faker 3.1.0: released 3 months ago (latest version, 3.1.1, released about 2 months ago)
faraday 1.10.3: released 2 months ago (latest version, 2.7.4, released about 2 months ago)
```

Each of these gives us more actionable lists to work through to quickly focus on the Gems that need updates.

### Discovering interdependencies

Gems, of course, utilize other Gems the same way all applications do. 

For example, if a Gem needs to be able to make HTTP requests, it will probably import the Faraday Gem as its maintainer doesn’t want to have to write that code from scratch. This means that not only is your application dependent on the Gems you use but also on the Gems that those Gems use. In other words, sometimes your application can be held at a certain version until all of your used Gems become compatible with later versions.

Imagine you have an application with 2 Gems A and B.

Gem A requires another Gem, Gem C. It requires Gem C at a maximum version 2.

Gem B also requires Gem C but it requires Gem C at maximum version 3.

<div style="width:640px;max-width: 100%;text-align:center;margin: 0 auto 20px;">
  <img alt="gem dependencies"
    class="img-responsive"
    style="width:100%;"
    src="/assets/images/monitoring-gems/ruby-on-rails-gems-interdependencies.png">
</div>

Now imagine Gem B has released an update to fix a security issue. 

You are keen to update this Gem and close this potential security risk. But here’s the catch: the updated version of Gem B requires a minimum version of Gem C to be 2.1 

In this case, you are stuck and can’t make the upgrade as Gem A requires this Gem at maximum version 2. Until Gem A releases an update where it allows Gem C to be version 2.1, you cannot update Gem B.

When you have a big application with lots of Gems, this can happen often especially as new security issues are flagged and different maintainers fix them at different rates.

In order to see which Gems are dependent on each other so you can get an idea of which Gems are holding your upgrades from happening, you can use the `gem dependency` command, with -R flag to indicate that you’d like to see reverse dependencies.

E.g.

```
gem dependency -R
=>
Gem gyoku-1.3.1
  builder (>= 2.1.2)
  rake (>= 0, development)
  rspec (>= 0, development)
  Used by
	akami-1.3.1 (gyoku (>= 0.4.0))
	savon-2.13.1 (gyoku (~> 1.2))

```


This command shows the installed version of the Gem and which other Gems are holding it at this version. For example, here the gyoku Gem is at version 1.3.1 and the akami and savon Gems have restrictions on the version of this Gem, because of the restriction with savon we could not upgrade gyoku to version 2.

This will give you a better understanding of what Gems you can actually upgrade and what is blocking these upgrades.

### Monitoring should be a team responsibility

Now that you have the power to see all of your Gem security vulnerabilities, outdated Gems and Gem upgrades blocked by dependencies, how do you use this information?

It is important that your team can view this information quickly and easily to monitor the current state of your Gems.

At OnePageCRM, we have daily jobs that run and collect this information and present it on an internal page that anyone on the team can access. This gives any developer complete understanding of the Gems they are using, which ones need to be upgraded, which ones have known security issues and which ones will block the upgrade process.

As everyone has access to this information the job of constant updates can be spread across the team and just like bugs and security updates in our own code the entire team now works together to keep our Gems updated. 

<b><u>Since we introduced this process we have noticed a 25% drop in outdated gems in our code base and the removal of all Gems with security vulnerabilities.</u></b>

It is very difficult to fix what you cannot see, increasing our monitoring of these problems really helped us to understand and fix the problems themselves.
