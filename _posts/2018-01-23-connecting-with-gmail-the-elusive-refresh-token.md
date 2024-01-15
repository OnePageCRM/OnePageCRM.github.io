---
redirect_from:
  - /2018/01/23/connecting_with_gmail_elusive_refresh_token/
layout: post
title: "Connecting with Gmail - The elusive refresh token"
slug: "connecting_with_gmail_elusive_refresh_token"
category: blog
author: john
date: 2018-01-23 09:00:00
excerpt: "Here at OnePageCRM we recently released a new beta feature where we integrated with the Gmail API."
---


Here at OnePageCRM we recently released a new beta feature where we integrated with the Gmail API. This feature will allow you to connect your OnePageCRM account with your Gmail account and send emails from directly inside OnePageCRM. Read more about this new feature here - <a href='http://help.onepagecrm.com/article/342-send-an-email-from-onepagecrm' target="_blank"> Send an Email from OnePageCRM. </a>

Like with all new features comes a few teething problems and connecting with Gmail was no different.

Let me share my experience; On connecting with the Gmail API you are supplied with an `access_token` that you submit with all your requests and lets Google know which application is accessing the account. As a precautionary measure Google only allow this `access_token` to be used for 30 minutes after which the user must reconnect their account. Now it’s not practical to ask a user to reconnect their Gmail account every half hour, that’s why Google can also provide `refresh_tokens` when the account is connected. This `refresh_token` can be used to get a fresh `access_token` when the old one has expired.

A small issue with this is that Google do not always provide the `refresh_token`, you must explicitly ask for it!  In their <a href='https://developers.google.com/identity/protocols/OAuth2WebServer' target="_blank">documentation</a> Google specify that you should request offline access to ensure you get a `refresh_token`, unfortunately in practice this does not always guarantee that you will get the `refresh_token`.


Using this method of connecting with Gmail, we noticed some users having to reconnect their Gmail accounts due to authorization issues. On further inspection it was observed that  these accounts were not being supplied with `refresh_tokens`, meaning that we had no way of retrieving a fresh `access_token` when the old one expired. In order for Google to supply a `refresh-token`, the user must explicitly grant access to the account..

<div style="text-align: center">
<img alt="Gmail authentication screen"  class="img-responsive" src="/assets/images/gmail_auth_screen.png" />
</div>

It was difficult to understand exactly why this was happening because it was only a problem for some users but not all. After some research  we discovered a parameter that could be added to the authorization URL that would ensure the user was asked to explicitly grant access to their account.
 
```json
"approval_prompt": "force"
```
The magic combination: 
```json
"approval_prompt": "force"
"access_type": "offline"
```
This would confirm a user is requesting offline access and ensure a `refresh_token` would be supplied.
All was good in the world until one day it just stopped working! We were back to getting the same errors of users having authentication problems. A quick look at the affected accounts told us that the same issue was occurring again, no `refresh_token` was being supplied.  As it happens Google changed this parameter from `"approval_prompt": "force"` to `"prompt"="consent"` This change did not seem to be documented anywhere and it required crawling through some <a href="https://github.com/google/oauth2client/issues/453" target="_blank">GitHub issue report comments</a> to find the change.

Finally the use of 
```json
"prompt": "consent"
"access_type": "offline"
```
has done the trick and users are now guaranteed to get a `refresh_token` on connection with their Gmail Account meaning that they can connect once and enjoy the power of our new email send feature without the fear of experiencing the dreaded authorization issues.

Have you had any experience of working with the Gmail API or tried out our new email send feature? Let us know in the comments.