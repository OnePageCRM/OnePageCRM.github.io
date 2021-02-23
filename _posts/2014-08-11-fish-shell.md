---
layout: post
title: "Fish Shell"
slug: "fish-shell"
category: blog
author: peter
date: 2014-08-11 13:24:22
excerpt: I've been using Linux since 2007 and have been constantly learning more shell terminal tricks. I recently changed my default shell from Bash to Fish Shell, and I really love the improvement. It's easy to install and comes with loads of features out of the box. Read on to see how to install and configure Fish.
---

I've been using Linux since 2007 and since then I've gradually been learning more and more about Linux's killer app, the Terminal. As my career is developing I find I spend more and more time in the shell and I'm constantly finding quicker and easier ways to do common things using the command line.

I always knew the standard bash shell could be configured and modified, but I could never justify the time to play around with it.

I recently came across [Fish Shell][1].
Fish shell is a modern replacement for the bash shell and comes with loads of cool features including:

 -  Auto suggestions
 -  Syntax highlighting
 -  Better completions
 -  Friendly help pages
 -  Colours!

Best of all it gives you most of these features straight out of the box.

Here's how I installed Fish Shell on my Ubuntu 14.04 machine.

    sudo apt-get install fish

If you aren't using Ubuntu, you can find downloads for other Linux distros, OSX and even Windows on the [Fish Shell][1] homepage.

You can try out fish shell from your existing bash terminal by simply typing `fish`.
If you like what you see, you can set fish to be the default terminal:

    chsh -s /usr/bin/fish

Then logout and log back in.

## It gets even better
Fish shell by itself is a huge improvement on bash, but for me it got even better when I found the [Oh my fish][2] project.  
The Oh my fish project page has detailed installation instructions and I'm not going to repeat them here.  
Once you have Oh my fish installed, edit the `~/.config/fish/config.fish` file to specify the themes and plugins you want to use.  
I'm using the following plugins:

 -  git
 -  rails
 -  rvm
 -  sublime
 -  node

The default theme is great - it gives a nice neat command line prompt and git repository information in the command prompt.
As I use a mix of Mercurial and Git, I decided to change this theme slightly to also show Mercurial repo information on the command prompt.
I copied my theme from the default `robbyrussell` theme. Click on the link below to see the full code for my theme.


<div class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title">
      <a data-toggle="collapse"  href="#fishtheme">
        Fish Theme <code>~/.oh-my-fish/themes/peterarmstrong/fish_prompt.fish </code>
      </a>
    </h4>
  </div>
  <div id="fishtheme" class="panel-collapse collapse">
    <div class="panel-body">



{% highlight bash %}
# name: PeterArmstrong
function _git_branch_name
  echo (command git symbolic-ref HEAD ^/dev/null | sed -e 's|^refs/heads/||')
end

function hg_prompt
    if hg root >/dev/null 2>&1
        set_color normal
        printf ' on '
        set_color magenta
        printf '%s' (hg branch ^/dev/null)
        set_color normal
    end
end

function _hg_branch_name
  echo (command hg branch ^/dev/null)
end

function _is_git_dirty
  echo (command git status -s --ignore-submodules=dirty ^/dev/null)
end

function _is_hg_dirty
  echo (command hg status ^/dev/null)
end

function fish_prompt
  set -l last_status $status
  set -l cyan (set_color -o cyan)
  set -l yellow (set_color -o yellow)
  set -l red (set_color -o red)
  set -l blue (set_color -o blue)
  set -l green (set_color -o green)
  set -l normal (set_color normal)

  if test $last_status = 0
      set arrow "$green➜ "
  else
      set arrow "$red➜ "
  end
  set -l cwd $cyan(basename (prompt_pwd))

  if [ (_git_branch_name) ]
    set -l git_branch $red(_git_branch_name)
    set git_info "$blue git:($git_branch$blue)"

    if [ (_is_git_dirty) ]
      set -l dirty "$yellow ✗"
      set git_info "$git_info$dirty"
    end
  end

  if [ (_hg_branch_name) ]
    set -l hg_branch $red(_hg_branch_name)
    set hg_info "$blue hg:($hg_branch$blue)"

    if [ (_is_hg_dirty) ]
      set -l dirty "$yellow ✗"
      set hg_info "$hg_info$dirty"
    end
  end

  echo -n -s $arrow $cwd $git_info $hg_info $normal ' '
end
{% endhighlight %}

    </div>
  </div>
</div>


If you would like to use my theme, just copy the code above to:

    ~/.oh-my-fish/themes/peterarmstrong/fish_prompt.fish

Then in your `~/.config/fish/config.fish` file, change the theme line to
    
    # Theme
    set fish_theme peterarmstrong


I've really enjoyed using Fish Shell for the past while and now feel like I'd be lost without it!
I hope you get a chance to try out Fish Shell. 
If you do, let us know how you get on by posting a comment or sharing your config file in the forum!



  [1]: http://fishshell.com
  [2]: https://github.com/oh-my-fish/oh-my-fish