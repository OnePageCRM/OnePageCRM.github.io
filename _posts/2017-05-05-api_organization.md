---
layout: post
title: "Organization API update"
slug: "organization-api-update"
category: blog
author: elano
date: 2017-05-05 15:00:00
---

The mobile version 3.4.0 of OnePageCRM is out for iOS and Android and one of the big changes in this version is the way it handles organizations (originally it was called companies). To work with organization the API was updated and I'm going to show some of the new functionalities.

<div class="text-align: center">
<img src="/img/api-organization/contact.png" alt="" class="img-responsive"
 style="width: 50%; position: relative; left: 25%" /><br />
</div>

An organization now have its own section in a contact and after click on it, it's possible see all the organization's information.

<div class="text-align: center">
<img src="/img/api-organization/organization.png" alt="" class="img-responsive"
 style="width: 50%; position: relative; left: 25%" /><br />
</div>

To request the organization's information: **companies/{company_id}.format**

Now it's possible to list(POST)/link(PUT)/unlink(DELETE) a contact to an organization: **companies/{company_id}/linked_contacts.json**

In the mobile version the linked contacts are listed after the organization's contacts.

<div class="text-align: center">
<img src="/img/api-organization/linked_contact.png" alt="" class="img-responsive"
 style="width: 50%; position: relative; left: 25%" /><br />
</div>

Other important new functionality is change a contact's organization. It could be to a new one (which will create a new organization automatically) or to one that already exists.

Example:
**https://app.onepagecrm.com/api/v3/contacts/{contact_id}/split.format**

Body:
`{"company_name":"new organization"}`

<div class="text-align: center">
<img src="/img/api-organization/edit_contact.png" alt="" class="img-responsive"
 style="width: 50%; position: relative; left: 25%" /><br />
</div>

You can search for more information in the [API page][1] and any doubt can be posted in the [forum][2] .

 [1]: http://developer.onepagecrm.com/#companies
 [2]: http://forum.developer.onepagecrm.com
