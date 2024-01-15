---
redirect_from:
  - /2014/07/21/api-tools-updated/
layout: post
title: "API Tools Updated"
category: blog
author: ruairi
tags: draft
excerpt: Lately we have been focusing on making it easier for developers to use the OnePageCRM API. We've put together an API browser and a new python client.
date: 2014-07-21 09:18:00
---

Lately we have been focusing on making it easier for developers to
use the OnePageCRM API. We had some discussions amongst ourselves about how
best to do this I think we've put together some nice tools together that will hopefully be
of use to everybody.

The first tool we have created is an API browser which allows anybody to login
with their OnePageCRM account and make GET requests to our API. To try it out
head to [developer.onepagecrm.com/api_browser](http://developer.onepagecrm.com/api_browser). 
Log in with your user name and password and then try some requests to see what they return. 
The browser is still under active development so if anybody has any thoughts on how to make it
better we want to hear about it so post them in the forum.

Another project we have been working on is updating the python sample.
The previous version of the sample was quite basic but provided an insight into
how to use the API. The new version provides the means to make GET, POST, PUT
and DELETE requests to the api in a simple way.
Here are some examples of how to use the new client

```python
from onepagecrm import OnePageCRM, RequestError, UnknownError

username = 'xxxxxx'
password = 'xxxxxx'
client = OnePageCRM.login(username, password)
# Save these for later so that the username and password don't need to be
# stored
user_id = client.user_id
api_key = client.api_key
client = OnePageCRM(user_id, api_key)
contacts = client.get('contacts')['contacts']
# To view the current sales, statuses, lead sources etc data you can call
client.sales
client.statuses
client.lead_sources
client.team_stream
client.contact_counts
# These are automatically updated whenever a request returns them so you will
# always have the most up to date information

# To filter contacts
client.get('contacts', if_modified_since='2014-07-10')['contacts']
# This form works with all filtering options that area available within the API
# check out the documentation for more options

# To create new a new note
contact = client.post('contacts', {'first_name': 'Michael',
                                   'last_name': 'Fitzgerald',
                                   'company_name': 'OnePageCRM'})['contact']
contact_id = contact['id']
text = 'Had a meeting today in cafe 47 with Michael to discuss new features'
client.post('notes', {'text': text,
                      'contact_id': contact_id,
                      'date': '2014-07-21'})

# To perform a an update
contact['background'] = 'CEO of OnePage'
contact = client.put('contacts', contact_id, contact)['contact']

# To do a partial update
update = {'background': 'CEO of OnePageCRM'}
contact = client.patch('contacts', contact_id, update)['contact']

# Finally to delete a resource
client.delete('contacts', contact_id)

# By default the data is returned as a dictionary but there is also an
# experimental response format that allows access to the returned data as
# attributes to an object. To enable this set the response type to object
# like in the example below.
client = OnePageCRM.login(username, password, response_type='object')
contacts = client.get('contacts').contacts
contact_ids = [c.contact.id for c in contacts]
```

For more information on this client and how to use it head to [github.com/onepagecrm/python_client](http://github.com/onepagecrm/python_client)

