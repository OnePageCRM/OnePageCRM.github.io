---
redirect_from:
  - /blog/2015/02/11/git-precommit/
  - /2015/02/11/git-precommit/
layout: post
title: "Git Pre-Commit Hooks"
slug: "git-precommit"
category: blog
author: peter
date: 2015-02-11 13:24:22
excerpt: I recently wrote a short article on how we use Mercurial pre-commit hooks to stop debug code from reaching our development servers. The team has just completed a transition to Git, so here's an updated article about our Git pre-commit hooks.
---

The Git vs Mercurial debate has been raging in OnePageCRM since I started here this time last year. As the team has grown, the Git evangelists have outnumbered the Mercurial refuseniks, and the team finally made the transition earlier this month.

The main reasons we decided to move were the amount of modern tools and services that easily integrate with Git, and [Git Flow][1] - a branching strategy that really suits how our team is working.

In the early days of the changeover, a familiar problem popped up - developers accidentally committing debug information to the repository. We had become lazy and complacent, relying on our Mercurial pre-commit hooks to warn us when we tried to commit a `binding.pry` or `focus: true`
So, an update to our internal instructions was required.

By default, every Git repository has a `.git/hooks` folder which contains samples for the different kind of hooks.

To create a pre-commit hook, you need write a script, name the file `pre-commit` and make it executable.

{% highlight bash %}
touch pre-commit
chmod 775 pre-commit
{% endhighlight %}

I copied our new pre-commit script from [Bartłomiej Danek][2] on Coderwall (Thanks Bartłomiej!). I edited it slightly to add some extra keywords that we want to exclude.
Here's the final script we are using:

{% highlight ruby %}

#!/usr/bin/env ruby
exit 0 if ARGV.include?('--no-verify')
keywords = %w(binding.pry console.log)
keywords.push('focus:\ true')
keywords.push(':focus\ =>\ true')
keywords.push('sidekiq/testing/inline')
keywords.push('.worker.new.perform')
files_changed = %x(git diff-index --name-only HEAD --).split
%x(git grep -q -E "#{keywords.join('|')}" #{files_changed.join(' ')})
if $?.exitstatus.zero?
  puts "# Check following lines:"
  files_changed.each do |file|
    keywords.each do |keyword|
      %x(git grep -q #{keyword} #{file})
      if $?.exitstatus.zero?
        line = %x(git grep -n '#{keyword}' #{file} | awk -F ":" '{print $2}').split.join(', ')
        puts "#\t\033[31m#{file}\033[0m contains #{keyword} at line \033[33m#{line}\033[0m."
      end
    end
  end
  exit 1
end

{% endhighlight %}

When I try to run `git commit` with some dirty code, I get the following error:

{% highlight bash %}
# Check following lines:
# spec/models/user_spec.rb contains focus:\ true at line 47.
# spec/models/user_spec.rb contains :focus\ =>\ true at line 59.
{% endhighlight %}

All I need to do now is to ask the rest of the development team to add this file to their .git/hooks directory.

I was surprised at how easy and useful this feature is. The temptation to add other hooks enforcing coding style is strong, but I'll hold myself back for now!

  [1]: http://danielkummer.github.io/git-flow-cheatsheet/
  [2]: https://coderwall.com/p/cuq7vg/git-hooks-how-don-t-push-nasty-code
