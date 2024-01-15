---
redirect_from:
  - /2023/12/20/how-to-solve-tech-issues-effectively-a-simple-problem-solving-framework/
layout: post
title: "How to solve tech issues effectively | A simple problem-solving framework"
slug: "how-to-solve-tech-issues-effectively-a-simple-problem-solving-framework"
category: blog
post_image: /assets/images/solving-tech-issues.png
author: kevin
date: 2023-12-20 08:00:00
excerpt: "As the saying goes, 'you cannot control what you cannot measure'. I remember rolling my eyes at this notion back in college. Now, as I reflect on some of the most significant yet straightforward technical improvements over the past year or so, I am reminded of this concept."
graphic: /assets/images/solving-tech-issues.png
---

As the saying goes, "you cannot control what you cannot measure." I remember rolling my eyes at this notion back in college. Now, as I reflect on some of the most significant yet straightforward technical improvements over the past year or so, I am reminded of this concept.

Today, I'd like to share with you some examples of how this principle has come to life here at OnePageCRM.

## Our approach to solving tech problems
Let's call it the "problem-solving framework."

When you solve a technical problem, that's great. However, it's more important to establish a process that detects and solves the problems, ensuring that your time and energy are well spent.

For us, addressing this organizational problem involves three key components:
1. Visibility: The ability to create dashboards that showcase the aspects people care about and highlight the issues we encounter.
2. Process: A routine of reviewing these dashboards and engaging in discussions during a 15-minute meeting following some of our daily standups. The presenter of this meeting rotates every two weeks, fostering skill-sharing and collaborative problem-solving.
3. Autonomy: Encouraging ownership and trust to identify and fix problems as they arise.

While I totally just made up these components—visibility, process, and autonomy—I think they do a good job encapsulating our approach.

Now, I'd like to delve into some specific areas where we've seen significant improvement by applying this framework.

### Making tech problems visible

A few months ago, John [wrote an excellent article](https://developer.onepagecrm.com/blog/2023/03/30/how-to-monitor-and-update-your-out-of-date-gems-in-rails/) about monitoring and upgrading Gems in a Rails application. I highly recommend reading it for the technical details and tools that can help you with this process.

Here, I'd like to add two observations.

First, we didn't immediately upgrade gems. That would have been a one-time upgrade, neglecting the underlying visibility and process issues. Instead, we began by making the problem visible.

We created a tab on our daily monitoring dashboard that includes a list of outdated gems, along with top-level metrics like the number of gems with security vulnerabilities and the percentage of outdated gems.

This daily visibility highlighted the issue for everyone, both now and for the future, in a way that a one-time upgrade wouldn't have.

### Emphasizing the process

The second point to emphasize is the process.

If our gems were out of date, it meant that upgrading them wasn't part of our regular progress. A single Herculean effort to upgrade is not the solution.

We asked ourselves, "What is the smallest possible automated step we can take to address this problem?" With this question in mind, we decided that a weekly CI/CD process to auto-create a PR (and run tests) for updating the patch version of test Gems was the tiniest, almost risk-free change. So, we implemented it.

The critical aspect here isn't what we were updating, but the standardized automated process that we could build upon. Over the following month, we gradually increased the scope of our updates. Now, we have reached a point where a full update of dev and test gems, and minor version updates of production gems, happen mostly automatically (with final review and merge being manual). We still manually update major versions of most gems.

This approach has eliminated all security issues in our gems and reduced our outdated gem percentage from ~60% to ~23%, a figure that continues to fall weekly.

### The role of proactivity
The second area where we've seen significant improvement is quite different in nature, yet strikingly similar in terms of the underlying problem and our approach to the solution.

The issue at hand is backend process performance problems, particularly when they become noticeable to users. One example of this is email sending delays.

While we have always prioritized user-facing performance, implementing our "visibility, process, autonomy" framework revealed additional areas for improvement.

When responding to support issues, one of our developers highlighted the problem of delays in processing crucial, time-sensitive backend jobs under high-load situations. Although we were aware of this issue, incorporating it into a dashboard provided actionable insights.

For every Sidekiq queue, we started collecting and graphing both the size and the latency of the queue over time. We then divided the graph into two separate charts:
 - one for "time-sensitive" queues
 - and another for "non-time-sensitive" queues.

Upon reviewing this dashboard, we promptly reallocated resources to address the most pressing concerns.

However, as we continued monitoring these charts over the following weeks, it became evident that we needed semi-automatic scaling and alerting for some of the time-sensitive queues.

As a result of these efforts, we now proactively monitor, alert, and address problems that were once only detectable when users complained to our support team. This proactive approach enables us to resolve issues before users even notice them, greatly enhancing the overall user experience.

### Incident postmortems

A third area where we have experienced significant improvement is in our system availability.

Just 3-4 years ago, outages were a common occurrence. However, at that time, each outage seemed unique and unrelated, as we lacked a comprehensive view of the bigger picture. Eventually, we reached a tipping point and introduced the concept of blameless postmortems.

We began conducting postmortems after every outage, engaging the entire team in blameless discussions about the problems, causes, process issues, infrastructure issues, documentation shortcomings, and more.

Moreover, we made it a habit to explore not just short-term solutions, but also long-term, conceptually sound resolutions. Over time, these discussions led to numerous small projects that collectively eliminated most of our problematic single points of failure.

Naturally, we have seen substantial improvements in our reliability, allowing for better sleep and overall peace of mind. But one particularly rewarding outcome of this is the library of postmortem documents we've amassed, which detail our learning and evolution over time. The entire team has access to this valuable resource.

By bringing visibility and fostering discussion, these postmortems have empowered us to address and resolve underlying issues, further enhancing our system's reliability and performance.

To keep this important continuous improvement process going, we are now ratcheting down the criteria that trigger a postmortem. This ensures that we keep this important continuous improvement process compounding.

### On the road to continuous improvement

In conclusion, by embracing the “you can not control what you can not measure” principle, we have significantly improved various aspects of our systems.

In this post, I’ve highlighted just 3 of these areas. While we are by no means perfect and still have a long way to go, our commitment to visibility, collaborative problem-solving, and individual autonomy has helped foster a culture of continuous improvement, resulting in a more reliable, user-friendly, and efficient platform.

I hope that sharing our experiences encourages other organizations to adopt similar approaches, ultimately leading to better products and services for everyone.
