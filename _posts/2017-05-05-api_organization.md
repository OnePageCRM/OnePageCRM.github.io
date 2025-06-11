---
redirect_from:
  - /blog/2017/05/05/organizations-for-mobile/
  - /blog/2017/05/05/organizations-for-mobile.html
  - /2017/05/05/organizations-for-mobile/
layout: post
title: "Organizations for Mobile"
slug: "organizations-for-mobile"
category: blog
author: elano
date: 2017-05-05 15:00:00
---

The mobile version <strong>3.4.0</strong> of OnePageCRM is out for iOS and Android and one of the big changes in this version is the way it handles organizations (originally called companies). 

To work with organizations, the API was updated, and I'm going to show some of the new features of the mobile update.

See Anakin's organization information at the bottom of the screen, beside the organization icon:

<div style="text-align: center">
<img src="/assets/images/api-organization/contact.png" alt="Location of contact"  class="img-responsive" style="width: 50%" /><br />
</div>

After clicking the organization info, you will be brought to a a seperate screen to view all the information of the organization in more detail. See below:

<div style="text-align: center">
<img src="/assets/images/api-organization/organization.png" alt="Organisation info picture"  class="img-responsive" style="width: 50%" /><br />
</div>

With the new API updates:

To request an organization's information and resources we now use the following: 
`companies/{company_id}.format`

Using the following sub-endpoint:
`companies/{company_id}/linked_contacts.json`
We can do the following:
- (GET) list the linked contacts of a company
- (POST) link a contact to a company
- (DELETE) un-link a contact from a company

In the new mobile update, linked contacts are listed after the organization's contacts. See R2-D2 below:

<div style="text-align: center">
<img src="/assets/images/api-organization/linked_contact.png" alt="Linking a contact"  class="img-responsive" style="width: 50%" /><br />
</div>

Another important change is how to change a contact's organization. We call this act of changing a contact's organization a `SPLIT`.

We can change to another existing organization, or it could be a new one (which will be created automatically).

To split a contact from one organization to another (or to remove org. altogether):
`contacts/{contact_id}/split.format`

Request body:     
`{"company_name":"New Organization Name"}`

To change the organization on mobile, simply change the text in the Organization field in the edit contact form:

<div style="text-align: center">
<img src="/assets/images/api-organization/edit_contact.png" alt="Editing a contact"  class="img-responsive" style="width: 50%" /><br />
</div>

You can read more in our [API docs][1] and any questions you may have can be asked in our [developer forum][2].

 [1]: http://developer.onepagecrm.com/#companies
 [2]: http://forum.developer.onepagecrm.com
