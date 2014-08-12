---
layout: post
title: "API Updates"
slug: "api-updates"
category: blog
author: ruairi
date: 2014-08-12 13:24:22
---

Last week we released an update to the OnePageCRM API .
These changes were needed due to some internal changes to OnePageCRM and to simplify the codebase maintenance and testing.
The changes should be beneficial for everybody using the API as it is now much more stable.

We have tested these changes internally and we don't expect they will cause problems for anybody.
If you come across any issues, please get in touch on the forum and we will help you out
as quickly as possible.

As for the changes themselves they are quite minor. Here are a list of them:

1. In some places the error string has been changed from `incomplete_request_data` to `invalid_request_data`. The error code remains the same.
2. A contact can no longer be updated without specifying an owner id. To use the existing contact owner id as the owner id add `partial=1` to the query parameters
3. New error format:

```javascript
{
  'error_message': 'A validation error has occurred',
  'error_name': 'invalid_request_data',
  'errors': {
              'company': 'Either last name or company name are required to create a Contact.',
              'lastname': 'Either last name or company name are required to create a Contact.'
            },
  'message': 'Invalid request data',
  'status': 400
}
````

The `errors` field has been added which gives more information about why an error occurred.

You can explore our API using the [API Browser][1].

[1]: http://developer.onepagecrm.com/api_browser