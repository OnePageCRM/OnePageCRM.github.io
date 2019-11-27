---
layout: post
title: "Split Pane and Conquering Design Challenges"
slug: "split-pane-and-conquering-design-challenges"
category: blog
post_image: /assets/images/split_pane/header_image.png
author: ania
date: 2019-10-22 09:00:00
excerpt: "I’ve always thought about frontend coding as something magical. It brings beautiful static designs to life. It turns them into something pretty, but also readable and useful. It makes them accessible for different users, browsers, platforms and devices (this can be the most challenging part of our job, but also - when successful - the most satisfying)."
graphic: /assets/images/split_pane/header_image.png
---

I’ve always thought about frontend coding as something magical. It brings beautiful static designs to life. It turns them into something pretty, but also readable and useful. It makes them accessible for different users, browsers, platforms and devices (this can be the most challenging part of our job, but also - when successful - the most satisfying).

Frontend combines two different spheres: the art of creation, and the world of technology. This is why I like it so much!

I know that `CSS` is not strictly considered a tech language - its main role is prettification. Nonetheless it does exist in the world of tech, and it is constantly being improved and developed.
Fortunately, I can do things now in `CSS` that, a few years ago, I would never had imagined. 
[Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/){:target="_blank"}, [Grid](https://css-tricks.com/snippets/css/complete-guide-grid/){:target="_blank"} and [Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*){:target="_blank"}
are each great examples of this.

<div style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:80%;"
    src="/assets/images/split_pane/Strip-Deprime-de-la-codeuse-650-finalenglishV2.jpg">
    <p><a href="https://www.commitstrip.com/en/2019/04/29/front-end-traditions/" target="_blank">Image source</a></p>
</div>

They say frontend developers are learning all the time. We are never bored. New languages are created. New ideas, tools and concepts are constantly emerging. 
This is very inspiring but can be overwhelming at the same time. Luckily, to know specific technologies is not so important. 
The most important thing is to be able to solve problems and be a creative thinker. And that is the most interesting part of this job.
I’m always open to learning new things in design; in fact, I look forward to it. The only thing which kills my creativity is boredom.

I’ve been working with OnePageCRM for almost 10 years now. As the app is growing, we’re constantly challenged to design something new on a weekly basis.
For the most part, these changes are small. What really excites me is when there is a big UI change. I simply love getting stuck into these types of projects.

Hence, this blog post is about my experience with a new design project called “Split Pane”.


<div style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:100%;"
    src="/assets/images/split_pane/Split-Pane-Action-Stream-2.png">
</div>

<br/>

### The idea of Split Pane

The idea of Split Pane was to give every user the option to easily switch between Single Column and Split Pane views.
You would use Single Column view if you want an ultra focused view of the contact and all it’s details, and Split Pane view for quick light touches when qualifying leads.
You can read more [here](https://www.onepagecrm.com/blog/split-pane-action-stream-view/){:target="_blank"}.

And this is the part where our CEO made a confession, Split Pane had been available long before Single Column view.
So the idea was not new, but the concept of changing the layout in a split second without reloading the page, now that was going to be a challenge!

<div style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:80%;"
    src="/assets/images/split_pane/Strip-Niji-PSD-vs-CSS-650-finalenglish.jpg">
    <p><a href="https://www.commitstrip.com/en/2018/06/26/psd-vs-css/" target="_blank">Image source</a></p>
</div>

### In practice

So my first question was; How can I let the user access two layouts for the same page?

This is, in fact, very simple in `CSS`.
We are using two `CSS` classes for the `<body>` of the page, one set of `CSS` rules for common elements of the two views, and two different sets of rules just for the differences in each layout.
Quick and simple.

Unfortunately this method is not without its difficulties either.
When creating the frontend design for an app like OnePageCRM, I had to keep lots of things in mind.
For example I needed to make sure I kept the simplified design, but also ensure that it remained elegant, given that there is lots of content in small boxes next to one another surrounded by icons, tooltips and popups.
All of those elements have to look nice and clear, be readable, useful, pixel perfect and responsive, all at the same time.

In addition, with our new view switching feature, they have to fit smoothly into two layouts where one of them has two (or three if we consider the left menu) separate panels, with separate scrolls and fixed positioned elements, which always have to be visible.
The elements must fit perfectly when the user is changing the view or the size of the window or editing data on the page.
It could have easily been a nightmare from the `HTML` and `CSS` point of view.

Not to mention, the OnePageCRM app already has a lot of options and functions where the user can change their settings, as well as some in-built user specific settings (for account owner, administrator, user, focused user).

As a result, the main page or UI can look different for two users, even in the same browser, resolution and view.
<br><br>


### What was the hardest part?

The main task was to improve the existing layout of the current application, adapt it to the new design by rewriting the `CSS` code, and most importantly not to break anything along the way.

I ran into some big problems with the
[responsiveness](https://developers.google.com/web/fundamentals/design-and-ux/responsive/?hl=en){:target="_blank"}
and
[pixel perfect design](https://www.nirmal.com.au/exactly-pixel-perfect-web-design/){:target="_blank"}.
Is it even possible to apply both these extreme design concepts at the same time? I had to find a compromise.

I received three concepts of the precisely designed layout for small, medium and large screens.

The plan was to have perfect alignments, line spacing, typography and sizing, and at the same time make the elements fluid and fit well for different resolutions and views.
I had to use a little bit from both design concepts (responsive and pixel perfect) and create something in between.

<div style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:80%;"
    src="/assets/images/split_pane/Strip-The-4-th-of-may-650-finalenglsih-1.jpg" />
    <p><a href="https://www.commitstrip.com/en/2016/05/04/not-everyone-is-made-for-front-end-design/?" target="_blank">Image source</a></p>
</div>

<strong>Here are the main points I had to consider:</strong>

* (Obviously) fit the elements smoothly into the two layouts, for different browsers and resolutions, and keep control of almost every pixel.
* Keep in mind that we display different content for different users (roles of the user, their settings, instant editing). Any bug or issue could completely destroy the design, which is built on, and depends on, these rules.
* Ensure the design was the same no matter what the browser. I have to admit I couldn’t avoid all hacks (we still support IE11 after all).
* Keep the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself){:target="_blank"} (Don't Repeat Yourself) principal in mind. It's a basic job for every programmer, but it's not such an easy task when working with an app the size of OnePageCRM.
<br><br>

### What CSS rule was the most helpful?

Luckily `CSS` (as a language with a limited set of rules) can also be very clever and surprisingly comprehensive.

In the end, I could find a solution for almost every problem.
All I had to do was to analyze the issue and think about all the possibilities and dependencies, make some prototypes, and then use the best solution.

* [Cascading](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade){:target="_blank"} - This is a basic feature of css. In this case it was the concept of two body classes toggled when a user is changing the view. It gave me a lot of freedom in styling differently the same content for each of the layouts. I am using those classes mainly for style the main structure of the page.

<div style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:80%;"
    src="/assets/images/split_pane/single.png" />
    <p>Single Column view</p>
</div>


<div style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:80%;"
    src="/assets/images/split_pane/split.png" />
    <p>Split Pane view</p>
</div>


* [Media queries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp){:target="_blank"} - This is necessary rule in a  responsive design.
In my project it is used mostly for creating the breaking points of small, medium and large screens.

<div style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:80%;"
    src="/assets/images/split_pane/breakpoints.png" />
</div>


Compromise 1: Some of the elements on the page need  to have a fixed size like left menu, logo and top menus. The Contact list and Contact view could adapt to the available space.

Compromise 2:  On very small screens, we are hiding the right panel and the view is back to its basic fixed one column state.

* [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/){:target="_blank"} - Flexbox can be a very powerful rule used to create the whole structure of the page. I use it mostly for small elements like contact lists, activities, bars or some tables. This is the most helpful CSS rule for content changing instantly and ensuring the page is responsive when there are many elements in the same block which have to fit  to one another almost like a puzzle but at the same time be able to change based on the resolution.
<div style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:80%;"
    src="/assets/images/split_pane/breakpoints2.png" />
</div>


* [Calc()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc){:target="_blank"} rule all together with `overflow hidden` or `overflow ellipsis` and `min/max-width` - I use this a lot. It is very helpful for ever-changing content focused on small ‘one-line’ areas.

* Additional ‘special’ CSS classes - Sometimes I needed the ‘special’ css classes for ‘special’ situations.


Implementing Split Pane was not an easy task but one I really enjoyed. It was the perfect opportunity to improve old code, learn new things and to resolve new ‘interesting’ problems.

This blog has given me food for thought, maybe in the next article I will describe in detail all improvements and CSS tricks I used in our design. You’ll have to wait and see…..


-----
Image references:
[OnePageCRM](https://www.onepagecrm.com/){:target="_blank"} and [CommitStrip](http://www.commitstrip.com/en/?){:target="_blank"}

