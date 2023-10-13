---
layout: post
title: "Uploading attachments to different resource through OnePageCRM API"
slug: "uploading-attachments-through-opc-api"
category: blog
post_image: /assets/images/api-attachments/header-image.png
author: sajed
date: 2023-10-13 09:30:00
excerpt: "When you make an integration with OnePageCRM, you may would like to allow the users to be able to attach documents to different resources at OnePageCRM while keeping the actual documents on AWS S3."
graphic: /assets/images/api-attachments/header-image.png
---

### Introduction

In this blog post, we will explore the process of seamlessly uploading attachments to various resources through the OnePageCRM API while securely storing the actual documents on AWS S3. This integration empowers users to effortlessly associate documents with different resources in their OnePageCRM accounts. We will break down the process into three main steps to ensure a comprehensive understanding.

### Understanding the workflow

Your uploaded document will be stored on an AWS S3 bucket managed by OnePageCRM. This document can then be referenced from within your OnePageCRM account, such as within a contact's notes. The key steps involved in this process are as follows:

1- Send and initiating request to OnePagrCRM API with the contact ID to which the document will belong.

2- From the previoue request, you should receive an s3 pre-signed url along with some other neccessary metadata that you can use to upload your document directly to AWS S3.

3- When you have uploaded your document successfully to AWS S3, Inform OnePageCRM back again sending the document's metadata from S3.

You can find more details on those 3 steps below.

#### Step 1: Initiating the Upload Process

You should start first by sending a request to the following endpoint from OnePageCRM's API:
GET: `/attachments/s3_form?contact_id=<CONTACT_ID>`
where `<CONTACT_ID>` should be replaced with the id of the contact to which the uploaded document will belong.

You should then get a response like the following
ex:
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
`"url": "https://onepagecrm-up-eu-central-1.s3.eu-central-1.amazonaws.com/"` that you can use to upload your document directly to AWS S3, along with other `fields`.
The received data will help you with the next step.

#### Step 2: Uploading the document to AWS S3

Now, that you have received the necessary information that you need to upload your document, you can upload it directly to AWS S3 by make a `POST` request to the URL that's received in the previous section which was `https://onepagecrm-up-eu-central-1.s3.eu-central-1.amazonaws.com/`
You will alos need to include all the received parameter from the `fields` in your request's body.

The requests's body has has to be of type `form-data`
You should add the following fields (from the previous request) to the body in the same order:
`acl`
`success_action_status`
`policy`
`x-amz-credential`
`x-amz-algorithm`
`x-amz-date`
`x-amz-signature`
`key`
`filename`
`file` of type FILE. this is the file that you woulk like to upload

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

Where `<PATH_TO_THE_FILE_TO_UPLOAD>` should be replaced with the path to the file you would like to upload,
`<FILENAME>` should be replaces with the name of the file that you are uploading.
And you also need to make sure that the other fields are filled with the values that you have received in the previous request from the last section.

Notes:
-> Maximum file size is 10 MB / 10485760 bytes.
-> You should not exceed your available storage from your OnePageCRM account


#### Step 3: Informing OnePageCRM back after a successful upload to AWS S3

Now that you have your file uploaded successfully to AWS S3, OnePageCRM app does not know yet about yet, so you should now send one last request to OnePageCRM to notify it that you have uploaded the file successfully to the pre-signed URL, And you should also specify to which resource you would like to attach the uploaded file.

for example, if you would like to attach the uploaded attachment to a `note` inside of the `contact` that you used its ID in the very first request, Then, you should get the ID of that note `<NOTE_ID>` and send a request like the following one:
POST: `/attachments`
with a body like the following:
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

Where `reference_type` should equal to type of the resource to which you want to attach the uploaded file, `note` in our example. However, you can use any other type.
`<NOTE_ID>` should be replaced with the ID of the note, that has to be a note inside of the contact whom ID was used.
`<CONTACT_ID>` should be replaced with the contact ID from the very first request.
`<FILENAME>` should equal the same file name that's provided in the previous request while uploading the file to AWS S3.
`<FILE_SIZE>` should equal the size of the file that you have already uploaded, `428174` for example.

Now, you can open your OnePageCRM in your browser, head to the contact with the ID that you have used during the process, You should see the file added to the note with the provided ID.

### Conclusion

These steps collectively enable you to seamlessly manage and associate documents with various resources within your OnePageCRM account, all while leveraging the robust capabilities of AWS S3 for secure document storage.

As you implement this process, please keep in mind the maximum file size limit of 10 MB and ensure that you do not exceed your available storage within your OnePageCRM account.

By following these steps, you can effectively harness the power of OnePageCRM's API and AWS S3 for efficient document management within your CRM platform. Your users will benefit from easy access to relevant documents, enhancing their experience and productivity.

Let us know if you made a similar integration!
