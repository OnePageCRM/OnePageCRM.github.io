---
layout: post
title: "The Tale of Developers PC - Part 1"
slug: "developers-pc-tale-part1"
category: blog
author: pawel
date: 2016-11-25 09:00:00
excerpt: "We, as developers, are spending most of our time with computers..."
---

We, as developers, spend most of our time with computers. It doesn’t matter if
we are writing new lines of code, [blaming existing code][1] (written by other
team members), running test suites, [Googling][2] or checking [StackOverflow][3]
with hopes of finding a solution for coding problems; we make our laptops work
hard! On top of this, certain operations (like running all [Cucumber][4] tests)
take a lot of time and/or hardware resources which can put strain on even
the most powerful computers.

So, to keep us (and our laptops) [more happy][5], we’ve decided to outsource
most of this ‘heavy work’ to a special ‘server’. And as a result, we bought a
new, shared developer machine for the office to act as the server for what we
call project “Dev’s PC” (or DPC for short).

Building a computer from scratch and choosing the individual components is
about the nerdiest thing you can do. And as developers it is our duty to
follow this path to the end (it’s also a lot of fun).

We settled on the following configuration for DPC:

* ASUS M5A97 motherboard.
* AMD FX-8300 CPU (8 cores ready for hard work with speeds of 3.3GHz).
* 32GB 1.6GHz Kingston-made RAM (4x8GB).
* 120GB Samsung SSD disk (for being fast, dedicated for root partition).
* 2TB Toshiba magnetic spin disk (for big storage, dedicated for /home mount point).
* Graphics card… none (who needs it for a server which will be sitting
  somewhere in the office corner doing its job and producing some additional
  heat so badly needed during cold winter days...).

After completing the order, we just had to wait for our new toy to be delivered.
And after few days this big box appeared in the office...

<div style="text-align: center">
<img src="/assets/images/devpc/part1-box.jpg" class="img-responsive" alt="Delivery time!" />
<em>Xmas gift in November!</em>
</div>
<br />

After receiving the hardware, the next step was to decide what software we
would use - starting with the operating system. We had a few different
suggestions but in the end CentOS won out. Here’s our logic behind this:
* Our [AWS environment][6] servers are running [Amazon Linux][7], which is
  based on Red Hat Enterprise Linux and CentOS and is known as open
  source alternative of it.
* The current version will provide full package updates up to the end of 2020
  and security package updates up to middle of 2024, so we can forget about
  major OS updates for long time.
* The “enterprise” distribution provides very stable environment.

We went for a headless installation since DPC doesn’t have a graphics card.
We [used the Internet][8] proper installation image on a USB to install the
OS on the machine.

<div style="text-align: center">
<img src="/assets/images/devpc/part1-usb.jpg" class="img-responsive" alt="Transferring data" />
<em>Server setup <strong>has not</strong> been supported by any brewery company.</em>
</div>
<br />

With everything connected, the VNC viewer was launched on one of the laptops
and DPC was booted. The blinking LED was telling us that
there’s some I/O traffic but we were not receiving any incoming VNC session,
so it was time to do some investigating.

In the end, we had to introduce “Plan B” to the equation. With the help of
Liam’s (voluntarily dismantled) personal computer, we ‘borrowed’ it’s graphics
card so we could temporarily it to connect to DPC.

<div style="text-align: center">
<img src="/assets/images/devpc/part1-before.jpg" class="img-responsive" alt="Preparation for update" />
<em>Everyone wanted to mess inside, but Cillian and Liam were first</em>
</div>

<br /><br />

<div style="text-align: center">
<img src="/assets/images/devpc/part1-after.jpg" class="img-responsive" alt="AMD Radeon inside" />
<em>Don't show it to Liam's PC... may be jealous and could ask for divorce...</em>
</div>

<br />

Thanks to the the new graphics unit, our brand new shiny machine - DPC&trade;&reg;&copy;
was also hooked up to a monitor and we could begin the investigation.

* We found that [SecureBoot][9] was on, so there was no easy way to boot
  the custom-built boot images. Also the default boot settings were set to
  “boot from Samsung SDD & Windows Boot Manager”.
* During the boot we were also welcomed by the Windows setup wizard
  (apparently if you select ‘No Operating System Required’ in your
  hardware specification then you still get a free gift from Redmond?).

Once we discovered the reasons behind the previous problems, a few simple fixes
and BIOS settings updates, we were finally been welcomed by **proper** installation screen.

<div style="text-align: center">
<img src="/assets/images/devpc/part1-grub.jpg" class="img-responsive" alt="CentOS 7 GRUB" />
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
