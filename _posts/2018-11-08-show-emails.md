---
layout: post
title: "Showing Emails in OnePageCRM Mobile"
slug: "ios-show-emails"
category: blog
post_image: /assets/images/ios/email_image2.png
author: elano
date: 2018-11-08 09:00:00
excerpt: "Here at OnePageCRM, we always want to bring more functionality to the mobile applications. Being able to see emails and their attachments was one of the features that has been requested for a long time."
graphic: /assets/images/ios/email_image2.png
---

Here at OnePageCRM, we always want to bring more functionality to the mobile applications. Being able to see emails and their attachments was one of the features that has been requested for a long time.

The most recent update for the <a target="_blank" href="https://itunes.apple.com/ie/app/onepagecrm-simple-sales-crm/id692777054?mt=8">iOS application</a>, added this much anticipated possibility.

<div class="text-align: center">
    <img src="/assets/images/ios/ios_email_contact_view.png"alt="Email contact view in iOS"  class="img-responsive"
     style="width: 50%; position: relative; left: 25%;" />
     <br /><br />
</div>

As an iOS developer here at OnePageCRM I will explain the steps we took to add this functionality to the iOS application.

The first thing that we needed to change, to be able to add this functionality, was a new API endpoint: <b>/api/v3/contacts/{contact_id}/email_messages.json</b>

The response from this endpoint, contains an array of email messages, which would look something like the following:

```JSON
{
    "email_messages": [
      {
        "email_message": {
          "id": "5bdb11681787fabbe683b1eb",
          "type": "email_send",
          "contact_ids": [
            "58edfbf600d4af9e3b7e93e9"
          ],
          "send_time": "2018-11-01T14:44:56Z",
          "message_id": "CADVjCOqcL=e_-cEjNfevrR7-yp3xKmnxsvamJfps_xqtDFv8bA@mail.gmail.com",
          "sender": "blog@bigcompany.co.uk",
          "recipients": {
            "to": [
              "jbloggs@bigcompany.co.uk"
            ],
            "cc": [],
            "bcc": []
          },
          "url": "",
          "subject": "RED DEAD REDEMPTION 2 REVIEW",
          "plain_content": "Red Dead Redemption 2 is a sprawling Western tale of loyalty... So let’s start at the beginning: It’s 1899 and American outlaws are an endangered species...",
          "html_content": "<div style=\"font-family: sans-serif, Arial, Helvetica\"><a href=\"https://www.ign.com/games/red-dead-redemption-2\" target=\"_blank\" rel=\"noopener noreferrer\">Red Dead Redemption 2</a> is a sprawling Western tale of loyalty...<br/><br/><br/><img src='https://onepagecrm-up-sa-east-1.s3.sa-east-1.amazonaws.com/58edfbf600d4af9e3b7e93e9/1541083454780/rdr2-screenshot-110-1540464386332.jpg' width=auto height=auto />So let’s start at the beginning: It’s 1899 and American outlaws are an endangered species....</div>",
          "status": "sent",
          "incoming_email": false,
          "attachments": []
        }
      }
    ]}

```

It's important to highlight 4 fields from the above JSON:

 **- html_content:** The content of the email (with html tags for formatting).<br/>
 **- plain_content:** The content of the email (without any formatting).<br/>
 **- type:**  The type of email (it can be `"email_send"` or `"bcc_email"`). The first one is for when you send an email from within <a target="_blank" href="https://help.onepagecrm.com/article/386-how-to-connect-your-gmail-account-create-templates-and-send-bulk-emails">OnePageCRM</a>, the second is when the email is captured by the email <a target="_blank" href="https://help.onepagecrm.com/article/187-how-to-use-email-dropbox-address">dropbox method (BCC).</a><br/>
 **- url:** This field contains a link (only when the email is of type bcc_email). For this type of email, the `"html_content"` is empty, and to get the content with tags it's necessary to request the content from this url.

The email layout in the OnePageCRM mobile app is a little different from the `"html_content"` in the JSON. We have to parse and rearrange the string `"html_content"`, in order to display it on the screen.

To show the email's content for the user, we use the <a target="_blank" href="https://developer.apple.com/documentation/webkit/wkwebview">WKWebView</a> view. This view is a type of web view that can show HTML tags with the correct formatting. Emails have text, images, font, colors and attachments - the app needs to show all of them.

<div class="text-align: center">
    <img src="/assets/images/ios/ios_email_email_view.png"alt="iOS Email view" class="img-responsive"
     style="width: 50%; position: relative; left: 25%;" />
     <br /><br />
</div>

Because of the attachments, the web view is in the first section of a table. The second section shows attachments (like deals, notes or calls). The content of the attachments is in the **attachments** JSON array. The fields in the JSON are the same as in other endpoints (deals, notes or calls).

<div class="text-align: center">
    <img src="/assets/images/ios/ios_email_attachments.png"alt="iOS Email attachments" class="img-responsive"
     style="width: 50%; position: relative; left: 25%;" />
     <br /><br />
</div>

Ray Tomlinson in the 60s probably never thought that his invention would help to change the world. Today it's impossible to live without emails, and to be able to see your emails with each contact, will help you to ensure you don't miss anything while on the go.

If you’ve any questions or ideas for my next blog post. Let us know in the comments or in our <a target="_blank" href="http://forum.developer.onepagecrm.com">forum</a>.
