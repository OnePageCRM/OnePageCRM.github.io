---
layout: api
title: "Introduction"
category: doc
date: 2014-02-19 14:05:55
order: 2
---



## Introduction & Updates

Welcome to our new updated APi Version 3.0.

There are some major changes for interacting with the API and some useful new features we will go over here:
Sending/Receiving Data

The API can now send and receive data in XML, YAML and JSON, as well as receive data as URL encoded query strings.

To send and receive XML, YAML or JSON you need to include the correct content-type header and replace the .format in the url.
Type  Content-Type  .format
JSON  application/json  .json
YAML  application/x-yaml  .yml
XML   application/xml   .xml

When sending a POST/PUT request with an empty body you need to make sure that the content-length header is present and set to zero, otherwise the API will throw an error. This is handled for you by most HTTP or Network libraries in most languages but some such as Python don't’ set the content-length header when sending an empty request body.
Partial Updates

You can partially update or create resources through our API now by including the value partial=1 in the POST/PUT request’s body or url query string. This is the equivalent of using the emerging RESTful API standard’s PATCH method.

When creating a resource ‘partially’ using a POST request you don’t need to include all of the resource’s fields. All fields will be automatically set to null if they aren’t included. Note that the POST could still fail when partially creating a resource but not including the minimum required fields.

When updating a resource ‘partially’ using a PUT request any fields you don’t include will stay the same as before.

Warning: You need to exercise caution though when updating sub resources of resources partially. If you tried only updating a contact’s phone numbers you need to include all phone numbers in the hash that you don’t want to be deleted, as we don’t extend the partial update feature to sub resources.
Sparse Responses:

You can request sparse responses now by including the value sparse=1 in the PUT/POST request’s body or url query string for GET calls. This will give you a faster response as any empty fields will be completely omitted from the response body.
