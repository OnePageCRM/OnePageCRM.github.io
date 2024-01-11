---
layout: post
title: "Upload Files via OnePageCRM API: Three-Step Tutorial"
slug: "upload-files-via-onepagecrm-api"
category: blog
post_image: /assets/images/api-attachments/header-image.png
author: sajed
date: 2024-03-04 09:30:00
excerpt: "In this blog post, we’ll explore the process of uploading documents and files from any app through the OnePageCRM API while securely storing them on AWS S3."
graphic: /assets/images/api-attachments/header-image.png
---

In this blog post, we’ll explore the process of uploading documents and files from any app through the OnePageCRM API while securely storing them on AWS S3.

You’ll learn how to build a custom API integration to effortlessly bring important documents to your OnePageCRM account. 

If you ever felt the pressure of manually uploading document after document from different apps to your CRM, this blog post is for you.

## Workflow overview: How to upload files via API

OnePageCRM has a [free API](https://developer.onepagecrm.com/api) that allows you to easily connect different apps to your CRM account. By following the steps in this tutorial, you can keep all important files inside OnePageCRM.

With this API integration, your uploaded files will be stored on an AWS S3 bucket managed by OnePageCRM. These files can then be referenced from within your OnePageCRM account, for example, within [Contact's notes](https://www.onepagecrm.com/blog/organize-client-notes/). 

Here’s how it works:

1. Send an initiating request to OnePagrCRM API with the Contact’s ID which the document will belong to.
2. From this initial request, you’ll receive an `S3 pre-signed URL` along with some other necessary metadata that you can use to upload your files directly to AWS S3.
3. When you have uploaded your file successfully to AWS S3, inform OnePageCRM by sending back the file’s metadata from S3.

Let’s dive deeper into these three steps below.

### Step 1. Initiate the uploading process

You should start first by sending a request to the following endpoint from OnePageCRM's API: 

`/attachments/s3_form?contact_id=<CONTACT_ID>` where `<CONTACT_ID>` should be replaced with the ID of the contact which the uploaded document will belong to.

You should then get a response similar to this one:

```
{
    "status": 0,
    "message": "OK",
    "timestamp": 1697212380,
    "data": {
        "quota": 214748364800,
        "storage_left": 214692599468,
        "display_quota": "200 GB",
        "url": "https://onepagecrm-up-eu-central-1.s3.eu-central-1.amazonaws.com/",
        "fields": {
            "acl": "private",
            "success_action_status": 201,
            "policy": "...",
            "x-amz-credential": "...",
            "x-amz-algorithm": "AWS4-HMAC-SHA256",
            "x-amz-date": "20231013T155300Z",
            "x-amz-signature": "...",
            "key": "",
            "x-ignore-pattern": "<CONTACT_ID>/__timestamp__/${filename}"
        }
    }
}
```

You will notice that you have received a pre-signed url: 

`"url": "https://onepagecrm-up-eu-central-1.s3.eu-central-1.amazonaws.com/"` 

You can use this URL to upload your document directly to AWS S3 alongside other `fields`. 

You’ll use these received data in the second step.

### Step 2. Upload files via API to AWS S3

Once you have received the necessary information, you can upload your file directly to AWS S3 by making a `POST` request to the URL from the previous step.

Here’s this URL: `https://onepagecrm-up-eu-central-1.s3.eu-central-1.amazonaws.com/` 

Here’s what to do next with the `POST` request:

- Use the `form-data` type for the request’s body,
- Include all the received parameters from the `fields` in your request's body,
- Add several 10 fields from the previous request to the body of your new request (mentioned below),
- List these fields in the same order as below: 

```
`acl`
`success_action_status`
`policy`
`x-amz-credential`
`x-amz-algorithm`
`x-amz-date`
`x-amz-signature`
`key`
`filename`
`file` 
```

of type `FILE`. This is the file that you want to upload.

You can use any tool to send this request. In this post, we’ll have an example with a Client for URL (cURL). 

cURL lets you exchange data between your device and a server through a command-line interface (CLI). You can use it from your command line directly. Please refer to [https://curl.se/](https://curl.se/) for more information about cURL.

Here is an example using cURL:

```
curl --location 'https://onepagecrm-up-eu-central-1.s3.eu-central-1.amazonaws.com/' \
--form 'acl="private"' \
--form 'success_action_status="201"' \
--form 'policy="XXX"' \
--form 'x-amz-credential="XXX"' \
--form 'x-amz-algorithm="AWS4-HMAC-SHA256"' \
--form 'x-amz-date="20231013T180852Z"' \
--form 'x-amz-signature="XXX"' \
--form 'key="<CONTACT_ID>/1697212380/<FILENAME>"' \
--form 'filename="<FILENAME>"' \
--form 'file=@"<PATH_TO_THE_FILE_TO_UPLOAD>"'
```

Replace `<PATH_TO_THE_FILE_TO_UPLOAD>` with the path to the file you want to upload.

`<FILENAME>` should be replaced with the name of the file that you are uploading. 

Make sure that other fields are filled with the values that you have received in your first request (see Step 1).

Keep in mind a few things:

- The maximum allowed file size is 10 MB/10485760 bytes.
- You should not exceed your available storage on your OnePageCRM account (go to your [Document’s page](https://app.onepagecrm.com/documents) inside OnePageCRM).

### Step 3. Inform OnePageCRM about a successful upload to AWS S3

Once you have your file uploaded successfully to AWS S3, OnePageCRM doesn’t know about this yet. That’s why you need to send one last request to OnePageCRM to notify the app that you have uploaded the file successfully to the pre-signed URL. 

In this request, you need to specify which resource you want to attach the uploaded file to.

For example, imagine you want to attach the file to a `note` inside of the `contact` whose ID you used in the very first request. In this case, you need to get the ID of that note `<NOTE_ID>` and send a request similar to: 

POST: `/attachments` with a body like the following one:

```
{
  "reference_id": "<NOTE_ID>",
  "reference_type": "note",
  "contact_id": "<CONTACT_ID>",
  "name": "<FILENAME>",
  "key": "<CONTACT_ID>/1697212380/<FILENAME>",
  "size": <FILE_SIZE>
}
```

`reference_type` should be equal to the type of the resource where you want to add/attach your uploaded file (`note` in our example). However, you can use any other resource type, such as: `deal`, `call`, `meeting`, `photo` for a Contact, `avatar` for a user’s profile picture, or an `account_document` to upload files to the CRM’s [Document’s page](https://www.onepagecrm.com/blog/documents-repository/).

`<NOTE_ID>` should be replaced with the ID of the note inside of the Contact which ID was used.

`<CONTACT_ID>` should be replaced with the Contact’s ID from the very first request.

`<FILENAME>` should be equal to the same file name that is provided in the second request (see Step 2).

`<FILE_SIZE>` should be equal to the size of the file that you have already uploaded (for example, `428174`).

Once you are finished with all the steps, you can open your OnePageCRM account, head over to the contact whose ID you used—and you’ll see the file added to the specified note. 

## Conclusion

By following these steps, you’ll be able to seamlessly manage and associate files with various resources within your OnePageCRM account, all while leveraging the robust capabilities of AWS S3 for [secure document storage](https://www.onepagecrm.com/blog/documents-repository/). Your users will benefit from easy access to relevant documents, enhancing their experience and productivity.

As you implement this process, please keep in mind the maximum file size limit of 10 MB and ensure that you do not exceed your available storage on your OnePageCRM account.

Let us know if you made a similar integration! OnePageCRM has [a variety of integrations built](https://www.onepagecrm.com/features/integrations/) and keeps expanding its offerings.