---
redirect_from:
  - /blog/2021/03/31/pin-files-to-contacts/
  - /2021/03/31/pin-files-to-contacts/
layout: post
title: "Pin Files to Contacts"
slug: "pin-files-to-contacts"
category: blog
post_image: /assets/images/pin-files-to-contact/header_image.png
author: vlad
date: 2021-03-31 09:30:00
excerpt: "Introducing Pin files to contacts, with this update, you will be able to easily find important documents and files you've attached quickly by pinning them to your contacts. Once you do, they will be prominently displayed under your contacts' background information."
graphic: /assets/images/pin-files-to-contact/header_image.png
---

Introducing <i>Pin files to contacts</i>, with this update, you will be able to easily find important documents and files you've attached quickly by pinning them to your contacts. Once you do, they will be prominently displayed under your contacts' background information. You can also access all pinned files from contacts in the same organization under the Account View.

<div style="width:640px;max-width: 100%;text-align:center;margin: 0 auto 20px;">
  <img alt="pin files to contact"
    class="img-responsive"
    style="width:100%;"
    src="/assets/images/pin-files-to-contact/pin_file_to_contact.png">
</div>

So from an engineering perspective, what was involved? In this short blog I’ll explain what was involved…

<br/><br/>
### Solving design problems

Once I was briefed on the task and I had a good understanding of what we wanted to achieve, I started to think about the different elements involved, like:


* Displaying it in pages (show all vs show first row)
* Sorting pinned attachments,
* The places that pinned contacts should be displayed in like: the contact page, organization view, activity page etc. 


And as the saying goes, <i>the devil is in the details</i>.

This update is not a major one, in fact it looks like a simple one from the initial glance, I mean it’s not rocket science. But it still requires extra thinking when it comes to design as sometimes this can be the invisible part of the project.

The language we coded it in was [Ruby on Rails](https://rubyonrails.org/){:target="_blank"}, so there was no major surprises here, however, the main difficulty when designing this project was to decide between the following:
to create a standalone container for attachments or incorporate the pin functionality into the current attachments container. The current container is used everywhere in displaying attachments for notes, deals, calls, emails etc. so adding new functionality and also changing code for the current container requires testing in all these various places where it’s already been used. But introducing a new component may produce code duplication that will require us supporting a bigger code base and as a result, cause two different places to look out for possible bugs instead of one.

Keeping the balance between potential over engineering and having too many responsibilities in one component and supporting several (specialized) components for managing attachments is not always an obvious choice.

Nevertheless, after weighing up the options, the decision was finally made to create a new component. The main similarity between the existing attachments container and the new <i><b>pinned</b></i> attachments container, was the enumeration of the attachments in the list in the “for” loop (Ruby in Rails code) so it allowed me to release the feature as quickly as possible.

Along with the new components, I had to create a new storage area for attachments data and a new Reflux store to store all the necessary data. Attachments themselves are stored in a separate (general) attachments store, but all the auxiliary data (like sort order etc. ) is stored in this new store.

<br/><br/>
### Final thoughts
This project was quite straight forward but it was not an easy task overall. What I mean here is that I had to thoroughly check all the places that affected this update and be very careful about changes. In saying that, this is already a well known practice here in OnePageCRM but even more so for this project it was a necessary requirement.

During the implementation of this feature update, I was motivated by the end goal and getting this simple yet powerful update in the hands of our users. You can check it out [here](https://www.onepagecrm.com/blog/pin-files-to-contacts/){:target="_blank"}. Testing was hugely important and I’m pleased to say the release of this feature went very smoothly.

Another project completed, looking forward to what’s next…..
