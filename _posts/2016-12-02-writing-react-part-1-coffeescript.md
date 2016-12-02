---
layout: post
title: "Writing React - part 1 : Coffeescript"
slug: "writing-react-part-1-coffeescript"
category: blog
author: liam
date: 2016-12-02 09:00:00
excerpt: "his week I gave a talk on building a chess game using Ruby on Rails and Reactjs..."
---



<div style="text-align: center; margin: 0 auto;">
  <img src="/img/react/react.png" class="img-responsive" alt="Delivery time!" />
  <em>The future?</em>
</div>
<br />

>This week I gave a talk on building a chess game using Ruby on Rails and Reactjs. The questions and discussions afterwards reminded me of the struggle of starting with a new framework - and prompted me to write up our experiences with adopting an edge framework into an existing app.
>If you are interested in this talk (or even attending any future if you are lucky enough to live in Galway), here are links to the [presentation][1], [code][2] and [event][3]

Just over a year ago we began our journey into using ReactJS with OnePageCRM. Since then we have converted parts of our application into React. It isn't an easy transition, and we experienced a wide variety of problems trying to integrate a new view rendering framework into an existing application without a full rewrite.

One problem with most JS frameworks is a lack of resources on how to design, build and  implement non-trivial systems. Todo list and example apps are all great for showing off how great / easy efficient your framework is. But learning how to adapt it to your own DSL, frameworks and applications is an uphill struggle. I'm going to give some insights into how we work with React, Reflux and some related libraries - what problems were experienced and how they were fixed / paved over. Please head over to the [forum][1] if you would like to ask any questions.


##Introduction to React


[React][5] was developed by Facebook to fix User Interface (UI) consistency - interacting with one part of the complex page wouldn't always update a notification or unread counter.
Whatever you hear about performance improvements, this is the core feature of React. It is a **Declarative view rendering library** which depends upon a **uni-directional data flow**. It isn't a fully fledged framework like [AngularJS][6] or [Ember][7]




###Components

In React, a UI is written via a series of [components][8]. These are custom versions of HTML elements (`<div>`, `<span>`, `<a>` etc. ), which comprise of both visual elements and some self-contained logic. In essence, it's just another [web components][9] implementation. These components and be nested and reused, just like HTML elements.

HTML's nested DOM structure is a great way of representing UI. But it can get cumbersome. When you have a defined and strict UI, you will have to keep on repeating yourself, using the same nesting and css classes for common elements.
This is similar to writing a game and not being able to get productive because you keep on operating on `int X`, `int Y` and `int Z` and manually manipulating them with matrices. You get stuck down with the low level and lose oversight. Somewhere an `X` and `Y` co-ordinate will be mistakenly swapped and errors occur. You should just move on to defining `Coordinate`, `Vector` and `Object` classes and abstract away teh details.

React components enable you to use this abstraction for those nitty-gritty HTML components. Components can be inherited from (given an ES 6 + compatible language with [classes][10]), or wrapped in other components to create [Higher Order Components][11] (HOC).


###Uni Directional data flow

<div style="text-align: center">
<img src="/img/react/react-flow-diagram.png" class="img-responsive" alt="Delivery time!" />
<em>Uni-directional data flow of React (Source: <a href="https://facebook.github.io/flux/docs/overview.html">Facebook</a>)</em>
</div>
<br />


This is what makes React special. Traditionally, web developers would make web systems interactive by listening for user input events and modifying the HTML based on these. This is fine for making a web page interactive, but when writing full web applications this becomes brittle. The order in which the view is manipulated becomes important. Code is duplicated and modified for slightly different elements. One events modification can break another listener - so expensive event delegation is used. As edge cases are discovered, they are easier to patch up than resolve the source of the issue.

The unidirectional data flow of React solves many of these problems - but only if strictly adhered to. As per the image below, data can only flow from a parent component to a child component, trickling down through the DOM. This means the application's state won't suddenly be modified by a child component.

For a component to change the state, it has to trigger an `action` which modifies the data at the top level.




###Resources I like

- [Arkency][19] are actively blogging and teaching about using React with Coffeescript and Rails. Their [resources][20] give a great insight into working with this stack, and they have some nice [teaching bundles][21] on the subject at the moment.
- Read through projects written in React. A good way to learn a new framework is to read how others write it. [React Rocks][22] has a couple of reactjs CoffeeScript examples for you too explore. They of course also offer examples in other languages. Reading code is difficult - it takes longer to read code than write it. Take a look here for some great tips on [how to read code][23]
- Read the [official docs][24] from back to front at least once. Get familiar with them and it will be easier to find what you need when you need it, and you will learn about the most time consuming "gotchas" and edge cases before getting stuck on them.
- Sign up to the [official blog][25] feed with your favourite RSS reader. This will keep you ahead of the courve for future updates and features.






[1]: https://drive.google.com/file/d/0B-mJaOUNSKhlS1BPM1dwRGpzeXc/view?usp=sharing
[2]: https://github.com/caffeinated-tech/board-game-demo
[3]: https://www.meetup.com/rubyreact/events/235620726/
[4]: http://forum.developer.onepagecrm.com/
[5]: https://facebook.github.io/react/
[6]: https://angularjs.org/
[7]: http://emberjs.com/
[8]: https://facebook.github.io/react/docs/react-component.html
[9]: http://webcomponents.org/
[10]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
[11]: https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.dn2vt0pcx

[19]: http://arkency.com/
[20]: http://blog.arkency.com/2015/11/arkency-react-dot-js-resources/
[21]: http://reactkungfu.us5.list-manage.com/track/click?u=1bb42b52984bfa86e2ce35215&id=97a84b772b&e=fe17aeabeb
[22]: https://react.rocks/tag/CoffeeScript
[23]: http://www.skorks.com/2010/05/why-i-love-reading-other-peoples-code-and-you-should-too/
[24]: https://facebook.github.io/react/docs/hello-world.html
[25]: https://facebook.github.io/react/feed.xml



