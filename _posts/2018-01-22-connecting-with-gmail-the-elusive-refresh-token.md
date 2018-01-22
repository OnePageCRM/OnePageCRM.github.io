---
layout: post
title: "Connecting with Gmail - The elusive refresh token"
slug: "connecting_with_gmail_elusive_refresh_token"
category: blog
author: john
date: 2018-01-22 09:00:00
excerpt: "Here at OnePageCRM we recently released a new beta feature where we integrated with the Gmail API."
---


Here at OnePageCRM we recently released a new beta feature where we integrated with the Gmail API.
This feature will allow you to connect your OnePageCRM account with your Gmail account and send emails from directly inside OnePageCRM, you can read more about this new feature here - <a href='http://help.onepagecrm.com/article/342-send-an-email-from-onepagecrm' > Send an Email from OnePageCRM. </a>

We were very excited to release this feature as we think it will be very powerful and really help all of our users to send great emails but connecting with Gmail brought it's own set of problems.

On connecting with the Gmail API you are supplied with an `access_token` that you submit with all your requests and let's Google know which application is accessing the account.
As a precautionary measure Google only allow this `access_token` to be used for 30 minutes after which the user must reconnect their account. Now it’s not practical to ask a user to reconnect their Gmail account every half hour, that’s why Google can also provide `refresh_tokens` when the account is connected. This `refresh_token` can be used to get a fresh `access_token` when the old one has expired.

A small issue with this is that Google do not always provide the refresh token, you must explicitly ask for it. In their <a href='https://developers.google.com/identity/protocols/OAuth2WebServer'>documentation</a> Google specify that you should request offline access to ensure you get a refresh token, unfortunatley in practice this does not always gaurentee that you will get the `refresh token`.

We were using this method of connecting with Gmail and noticed that quite often some users were having to reconnect their Gmail accounts due to authorization issues, on further inspection we noticed that none of these accounts were being supplied with `refresh tokens` meaning that we had no way of getting a fresh `access_token` when the old one expired.

We noticed that Google does not supply a `refresh_token` unless the user explicitly grants access to the account.

<div style="text-align: center">
<img class="img-responsive" src="/img/gmail_auth_screen.png" />
</div>

Now this was happening sometimes and not on others so after looking into it we discovered a parameter that could be added to the authorization URL that would ensure the user was asked to explicitly grant access to their account. 
```json
"approval_prompt": "force"
```
Using this combination of 
```json
"approval_prompt": "force"
"access_type": "offline"
```
would ensure that a refresh token would be supplied as you were specifying that you wanted offline access and the user would always be prompted to grant this, all was good in the world until one day it just stopped working!
We were back to getting the same errors of users have authentication problems. A quick look at the affected accounts told us that the same issue was occurring again, no `refresh_token` was being supplied
As it happens Google changed this parameter from  `"approval_prompt": "force"` to `"prompt"="consent"`
This change did not seem to be documented anywhere and it required crawling through some <a href="https://github.com/google/oauth2client/issues/453">GitHub issue report comments</a> to find the change.

Finally the use of 
```json
"prompt": "consent"
"access_type": "offline"
```
has done the trick and users are now guarenteed to get a refresh token on connection with their Gmail Account meaning that they can connect once and enjoy the power of our new email send faeture without the fear of experiencing the dreaded authorization issues.

Have you had any experience of working with the Gmail API or tried out our new email send feature? Let us know in the comments.