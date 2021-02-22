---
layout: post
title: "Mercurial Precommit Hooks"
slug: "mercurial-precommit"
category: blog
post_image: "/assets/images/articles/pry_logo.png"
author: peter
date: 2014-12-18 13:24:22
excerpt: Mercurial precommit hooks let you prevent rouge code getting committed to your repository. At OnePageCRM, we use it to stop debugging information reaching our development servers.
---

As our development team has expanded over the last year, debug information has crept into the repository on more than one occasion.

There are two lines of code that our developers frequently use to debug during development that should never be committed.

The first is `binding.pry`. 

[Pry][1] is a powerful alternative to the standard IRB shell for Ruby. We use it to stop the execution of code and drop into an interactive ruby shell at any position in the codebase.
It's really useful for development, but if there is a rogue `binding.pry` left anywhere in the code after it has been pushed to a development server, execution will stop and the server will hang! A number of times while working with another developers code, I have been left scratching my head for a few minutes as to why the page was not loading.

The second line that can be a problem is `focus: true`.

<img class="img-responsive  "alt="Focus in reference to testing"  src="/assets/images/focus_true.png" />

We use this in our Rspec tests to tell [Guard][3] to only run the particular tests we want to work with. It stops Rspec from running your full test suite, which is great when you are developing a new feature. It's not so great when someone else has left a `focus: true` in the repository and after you pull the latest code, your tests run suspiciously fast!

To stop myself accidentally commiting these two lines into our Mercurial repository, I've added the following to my `~/.hgrc` file:

{% highlight bash %}
[hooks]
precommit.removeDebug = hg diff -S | grep -v '^-' | (! egrep 'binding.pry')
precommit.removeFocus:True = hg diff -S | grep -v '^-' | (! egrep 'focus: true')
{% endhighlight %}

Check out the [hgbook][2] for more information on using hooks with Mercurial.


  [1]: https://github.com/pry/pry
  [2]: http://hgbook.red-bean.com/read/handling-repository-events-with-hooks.html
  [3]: https://github.com/guard/guard