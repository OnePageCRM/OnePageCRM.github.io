---
redirect_from:
  - /blog/2015/10/28/android-speed-dialer/
  - /blog/2015/10/28/android-speed-dialer.html
  - /2015/10/28/android-speed-dialer/
layout: post
title: "Android Speed Dialer"
slug: "android-speed-dialer"
category: blog
author: cillian
date: 2015-10-28 13:55:22
---

Busy sales people lead very busy lives, so any way you can help in making their lives marginally less busy, will guarantee your popularity among them. This post briefly outlines the development of the OnePageCRM Speed Dialer app from a technical viewpoint. 

Should you wish to learn more about the motivations behind it, or require an in-depth description of its features, head over to our resource [blog][1].

Previous to starting the Speed Dialer app, I had just coordinated the launch of my first personal app to go live in Google Play. As a relative newcomer to the Android development scene, and as someone who has always believed in up-skilling, I had just completed the new [Developing Android Apps][2] course, developed by Udacity & Google. At the time, I was pretty keen to impress and was confident in my ability to design a great app.

The Speed Dialer app acts as a frontend UI which essentially allows a user to make some API requests to the OnePageCRM backend. That's what most apps are beneath the hood; a means of updating database values of a particular service you use. 

The OPCRM API offers detailed documentation and an active Developer Forum, two things an external developer making a client application values highly. The process of signing a request for the purpose of authentication was the only thing which required a second read. Once that was working, all the 'difficulties' of working with an external API had been resolved, and I could get on with developing the application.

Speed Dialer allows you to make calls to a list of contacts in the CRM. Any starred contact with a Next Action and a phone number will appear in the app. The Speed Dialer ensures you have all your prospects in a predefined call list before you hit the road.

<img alt ="Speed dialler info"  class="img-responsive" src="/assets/images/speed-dialer-info-graphic.png" />

It’s quite a straight-forward implementation, not a fancy app; it does something simple, and it does it well. We would love to hear your feedback on the app, and if there is anything you really like, or want to see added or improved. 

You will be able to download the app from Friday 15th October 2015, from [Google Play][3]. 

  [1]: http://www.onepagecrm.com/blog/new-recruit-new-speed-dialer-app
  [2]: https://www.udacity.com/course/developing-android-apps--ud853
  [3]: https://play.google.com/store/apps/details?id=com.onepagecrm.onepagecrmdialler
