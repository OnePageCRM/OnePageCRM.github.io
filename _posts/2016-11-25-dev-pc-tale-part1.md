---
layout: post
title: "The Tale of Developers PC - Part 1"
slug: "developers-pc-tale-part1"
category: blog
author: pawel
date: 2016-11-25 09:00:00
excerpt: "We, as developers, are spending most of our time with computers..."
---

We, as developers, are spending most of our time with computers. No matter if
we are writing new lines of code, [blaming existing code][1] written by other
team members, running tests suite, [Googling][2] or checking [StackOverflow][3]
with big hope of finding solution for coding problems, every single component
of our laptops does not have easy life. Moreover, some of those operations
like running all [Cucumber][4] tests take a lot of time and/or a lot of
hardware resources which makes our computers very busy, and, let's state that,
almost unusuable.

Therefore to keep us (and our laptops) [more happy][5], we have
decided to delegate the most heavy work somewhere else. And from word to word
we have decided to purchase new machine to the office where every of us
will have easy access. And that's how project "Dev's PC" started.

Because building computers by having a choice of chosing every single
component is so nerdy (and therefore fun) we have decided to go this way
and finally we have ended up with following configuration:

* ASUS M5A97 motherboard,
* AMD FX-8300 CPU (8 cores ready for hard work with speed of 3.3GHz),
* 32GB 1.6GHz Kingston-made RAM (4x8GB),
* 120GB Samsung SSD disk (for being fast, dedicated for root partition),
* 2TB Toshiba magnetic spin disk (for big storage, dedicated for /home mount point),
* graphics card... none (who needs it for the server which will be sitting
  somewhere in the office corner doing its job and producing some additional
  heat so needed during cold winter days...).

After completing order we just had to wait for our new toy being delivered.
And after few days big box appeared in our office...

<div style="text-align: center">
<img src="/img/devpc/part1-box.jpg" class="img-responsive" alt="Delivery time!" />
<em>Xmas gift in November!</em>
</div>
<br />

When we got the hardware, it was the best time to think about software and its
main part, which is operating system. There were few ideas what should be
installed by finally decision has been made to take CentOS. There are few
reasons for that:
* in our [AWS environment][6] our servers are running under [Amazon Linux][7],
  which is based on Red Hat Enterprise Linux and CentOs is known as open source
  alternative of it,
* current version will provide full packages update up to the end of 2020
  and security packages update up to middle of 2024, which will allow us
  to forget about major OS updates for long time,
* as "enterprise" distribution provides very stable environment.

Because our server does not contain any graphics card, we have decided to go
with headless installation. With [small help of the Internet][8] proper
installation image has been prepared and transferred into spare USB stick...

<div style="text-align: center">
<img src="/img/devpc/part1-usb.jpg" class="img-responsive" alt="Transferring data" />
<em>Server setup <strong>has not</strong> been supported by any brewery company.</em>
</div>
<br />

Everything has been connected, VNC viewer has been launched in one of the
laptops, computer has been booted, blinking LED started indicating that there
is some I/O traffic but... we haven't received any incoming VNC session.

So we have no other choice than introduce "Plan B". With great help of Liam
after small chat his computer allowed us to borrow its graphics card which
we were able to temporary connect to our machine.

<div style="text-align: center">
<img src="/img/devpc/part1-before.jpg" class="img-responsive" alt="Preparation for update" />
<em>Everyone wanted to mess inside, but Cillian and Liam were first</em>
</div>

<br /><br />

<div style="text-align: center">
<img src="/img/devpc/part1-after.jpg" class="img-responsive" alt="AMD Radeon inside" />
<em>Don't show it to Liam's PC... may be jealous and could ask for divorce...</em>
</div>

<br />

When our brand new shiny machine&trade;&reg;&copy; has been extended by
graphics unit, we have connected some spare monitor and we have found
very interesting things:
* [SecureBoot][9] was on, so no way of having easy way of booting custom-build
  boot images,
* default boot settings were set to "boot from Samsung SDD & Windows Boot Manager",
* during the boot we have been welcomed by Windows setup wizard (does it mean
  that if you will select <em>No Operating System Required</em> in your
  hardware specification then you are getting free gift from Redmond?).

But when we have found out reasons of our previous problems and by fixing them
with few BIOS settings updates, we have finally been welcomed by
<strong>proper</strong> installation screen.

<div style="text-align: center">
<img src="/img/devpc/part1-grub.jpg" class="img-responsive" alt="CentOS 7 GRUB" />
<em>Let the party begin!</em>
</div>

<br />

<em>To be continued...</em>


 [1]: http://insights.dice.com/2013/01/23/10-ways-to-say-your-code-sucks-without-getting-punched/
 [2]: http://www.urbandictionary.com/define.php?term=Googling
 [3]: http://stackoverflow.com/
 [4]: https://cucumber.io/
 [5]: https://www.entrepreneur.com/article/249528
 [6]: https://aws.amazon.com/vpc/
 [7]: https://aws.amazon.com/amazon-linux-ami/
 [8]: https://wiki.centos.org/TipsAndTricks/VncHeadlessInstall
 [9]: http://www.howtogeek.com/116569/htg-explains-how-windows-8s-secure-boot-feature-works-what-it-means-for-linux/
