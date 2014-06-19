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

### Step 1
In your API client, make a `POST` call to:
{% highlight http %}
https://app.onepagecrm.com/api/v3/openid/init_session.json
{% endhighlight %}

The body of this post call should be like this:

{% highlight json %}
{ "return_url": "https://onepagecrm.myclient.com" }
{% endhighlight %}

The `return_url` parameter is where you would like Google to redirect to after authentication

This call will return a response like this:
{% highlight json %}
{"status" : 0,
 "message" : "OK",
 "timestamp" : 1403176957,
 "data" : 
  {"sid" : "3e7d0485-b586-4352-8aa5-92c31dadbdc4",
   "key" : "tcnIR_WTaGX6XQVyb2MC",
   "expires" : 1403180557
  }
}
{% endhighlight %}

### Step 2
Next make a `POST` call to:
{% highlight http %}
https://app.onepagecrm.com/api/v3/openid/login.json
{% endhighlight %}

The body of this post call should be like this:

{% highlight json %}
{ "sid": "3e7d0485-b586-4352-8aa5-92c31dadbdc4" }
{% endhighlight %}
The `sid` parameter is the parameter received in Step 1.

This call will return a response like this:

{% highlight json %}
{"status" : 0,
 "message" : "OK",
 "timestamp" : 1403177169,
 "data" : 
  {"url" : 
    "https://www.google.com/accounts/o8/ud?openid.ax.mode=fetch_request&openid.ax.required=email%2Cfirstname%2Clastname&openid.ax.type.email=http%3A%2F%2Faxschema.org%2Fcontact%2Femail&openid.ax.type.firstname=http%3A%2F%2Faxschema.org%2FnamePerson%2Ffirst&openid.ax.type.lastname=http%3A%2F%2Faxschema.org%2FnamePerson%2Flast&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.ax=http%3A%2F%2Fopenid.net%2Fsrv%2Fax%2F1.0&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.realm=http%3A%2F%2Flocalhost%3A3000%2F&openid.return_to=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv3%2Fopenid%2Fgoogle_callback%3Fsid%3D3e7d0485-b586-4352-8aa5-92c31dadbdc4&openid.sreg.optional=email%2Cfullname"
  }
}

{% endhighlight %}

The `url` parameter is the URL redirect to the Google authentication page.
Your client will need to redirect to this URL so the user can log in to their Google account.
After login, the user will be redirected to the URL as specified in the `return_url` parameter from Step 1.

### Step 3

Finally, make a `POST` call to:
{% highlight http %}
https://app.onepagecrm.com/api/v3/openid/finalize_session.json
{% endhighlight %}

The body of this post call should be like this:

{% highlight json %}
{ "sid" : "3e7d0485-b586-4352-8aa5-92c31dadbdc4",
  "key" : "tcnIR_WTaGX6XQVyb2MC"
}
{% endhighlight %}
The `sid` and `key` parameters are the parameters received in Step 1.

If everything has gone according to plan, this call will return a response similar to the response from `bootstrap.json`. This will include `user_id` and `auth_key` parameters, which can then be used for subsequent API calls.