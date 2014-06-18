---
layout: api
title: "Login with Google"
slug: "google-login"
category: basics
date: 2014-02-20 11:22:07
---

You can login to the OnePageCRM web application using a Google account. 
You can also authenticate with our API using your Google account.

There are three different endpoints you will need to work with to achieve this.
There are three different 

### Step 1
In your API client, make a `POST` call to:
{% highlight http %}
https://app.onepagecrm.com/api/v3/openid/init_session.json
{% endhighlight %}
The body of this post call should be like this:

{% highlight json %}
{ 'return_url': 'https://onepagecrm.myclient.com' }
{% endhighlight %}


### Step 2

### Step 3