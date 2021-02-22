---
layout: post
title: "Draft.js and colorful Quick Quotes"
slug: "draft-js-and-colorful-quick-quotes"
category: blog
post_image: /assets/images/draft/header_image.png
author: victor
date: 2019-08-22 09:00:00
excerpt: "OnePageCRM is constantly evolving. Over the last number of years, we have started to slowly incorporate React into some parts of our application. It wasn't an easy transition, and we have overcome a number of obstacles integrating this new view rendering framework into our existing application without a full rewrite."
graphic: /assets/images/draft/header_image.png
---

OnePageCRM is constantly evolving.

Over the last number of years, we have started to slowly incorporate [React](https://reactjs.org/){:target="_blank"} into some parts of our application. It wasn't an easy transition, and we have overcome a number of obstacles integrating this new view rendering framework into our existing application without a full rewrite. However, we’re happy to say that all new features are now using React.

Since we already implemented React for text editing functionality, we decided to pick the [Draft.js](https://draftjs.org/){:target="_blank"} library. Draft.js is a library for building rich text editors. It allows you to build your editor for your needs - whether you're just looking to support a few inline text styles or building a complex text editor for composing long-form articles.
In Draft.js, everything is customizable – it provides the building blocks so that you have full control over the user interface.


Every time a  user in OnePageCRM composes  a new email message, he uses the Draft.js library.


<div style="width:100%; margin-bottom:20px; text-align:center">
  <imgalt="creating a draft" 
    class="img-responsive"
    style="width:100%;"
    src="/assets/images/draft/image_1.png">
</div>


Beside text editing, users are allowed to format the text in different ways - customize fonts, size, style and color. Also, they are  given options to insert images, links, files and so on. It is our custom rich text editor built using Draft.js which enables us to offer these options.

Another cool feature built in React is [Quick Quotes](https://www.onepagecrm.com/blog/boost-sales-quick-quotes){:target="_blank"}. It allows users to quickly send quotes directly from within OnePageCRM using deal items and their own email client. The original release had the quote text with one plain text color block, however our latest update allows users to customize the colour of the Quote block to quickly catch the reader's attention. Using Draft.js I was able to customize this color component and here’s how I did it...

<br/>
### Implementation

The right way to achieve this is to set `blockStyleFn` callback for the editor. It allows to specify classes that should be applied to blocks at the render time. In context of Draft.js and QuickQuotes, the block is a piece of text - one line with text or even an empty line.

In our case it looks like this:

<br/>
```coffeescript
blockStyleFn: (contentBlock) =>
  type = contentBlock.getType()
  colorName = ReactModules.settings.quoteBlockColor
  if type is 'qq-block'
    colorClass = 'qq-block-' + colorName
    type + ' ' + colorClass # for example will return "qq-block qq-block-yellow"
```
<br />

And then in CSS we need to define these classes:

<br/>
```scss
.draft-editor {
    .qq-block {
        padding-left: 10px;
    }
    .qq-block-grey {
        background: #F6F5F5;
    }
    .qq-block-yellow {
        background: #FFFFE0;
    }
    .qq-block-green {
        background: #EDFFEB;
    }
}
```
<br />

As a result, the Quick Quotes block now has a color. Even if the user wants to edit or add new lines, the color still persists. Also, styling allows us to add a little padding to the left-hand side, that makes the quote look even better.


<div style="width:100%; margin-bottom:20px; text-align:center">
  <imgalt="quick quotes draft"
    class="img-responsive"
    style="width:100%;"
    src="/assets/images/draft/image_2_qq.png">
</div>


You can read more about block styling in Draft.js [here](https://draftjs.org/docs/advanced-topics-block-styling){:target="_blank"}.

<br/>
### Solving performance problems

Whilst coding the color update, I also rewrote some other parts of the Quick Quotes feature. I  noticed that the insertion of a large list of deal items (more than 1,000) makes the page unresponsive and this definitely needed to be fixed. I started to investigate the problem and, after some ‘digging’ and lots of code review, I found the problem.

This is the code before:

<br/>
```coffeescript
# here we re-assemble Quick Quotes blocks (lines) to configure and join together
for block in blocks
  contentState = editorState.getCurrentContent()
  selection = editorState.getSelection()
  rawObject = Draft.convertToRaw(editorState.getCurrentContent())

  enterObject =
    depth: block.depth
    key: block.key
    text: block.text
    type: block.type
    entityRanges: []
    inlineStyleRanges: []

  rawObject.blocks.push(enterObject)
  newContentState = Draft.convertFromRaw(rawObject)

  editorState = Draft.EditorState.push(editorState, newContentState, 'insert-fragment')
  editorState = Draft.EditorState.moveSelectionToEnd(editorState)
```
<br />

The solution here is to initialize `editorState` in the beginning and update its content only in the end:

<br/>
```coffeescript
editorState = Draft.EditorState.createEmpty()
rawObject = Draft.convertToRaw(editorState.getCurrentContent())

# process each line of QuickQuotes
for block in blocks
  enterObject =
    depth: block.depth
    key: block.key
    text: block.text
    type: block.type
    entityRanges: []
    inlineStyleRanges: []

  rawObject.blocks.push(enterObject)

newContentState = Draft.convertFromRaw(rawObject)
editorState = Draft.EditorState.push(editorState, newContentState, 'insert-fragment')
editorState = Draft.EditorState.moveSelectionToEnd(editorState)
editorState.getCurrentContent() # return content
```
<br />

It looks obvious, and it is! This change helped to make the insertion of Quick Quotes fast again.

<br/>
### What I learned...

Draft.js is a powerful tool. It allows to you make complex stuff work quite smoothly. We used its capabilities to improve the Quick Quotes functionality and give the user the option to customize the quote block color. Draft.js is a library that is not easy to master, and I found there was a lack of ready to use solutions available online. I quickly realized that you must have a deeper understanding of how Draft.js works, and its functionality will help you to solve problems by yourself.

<br/>
Here are some resources I found very useful in my time using Draft.js:

 1. Draft.js official docs [https://draftjs.org/docs/getting-started](https://draftjs.org/docs/getting-started){:target="_blank"}
 2. Very good explanation articles on  ([GitHub repository](https://github.com/fatman-/learn-draftjs){:target="_blank"}))
 3. A configurable rich text editor built with Draft.js [https://www.draftail.org](https://www.draftail.org/){:target="_blank"}
 4. More resources about Draft.js collected in one place [https://github.com/nikgraf/awesome-draft-js](https://github.com/nikgraf/awesome-draft-js){:target="_blank"}

<br/>

-----
Image references:
[OnePageCRM](https://www.onepagecrm.com/){:target="_blank"} and [Jakpost.travel](http://www.jakpost.travel/){:target="_blank"}

