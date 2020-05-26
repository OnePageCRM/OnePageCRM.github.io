---
layout: post
title: "Announcement: API endpoint update to TLS v1.2"
slug: "announcement-api-endpoint-update-to-tls-v1.2"
category: blog
post_image: /assets/images/tls_update.png
author: kevin
date: 2020-05-25 09:30:00
excerpt: "OnePageCRM will be removing support for TLS v1.0 and TLS v1.1 on the 1st July. Please review as you will be required to update if you are using the OnePageCRM API."
graphic: /assets/images/tls_update.png
---

Security is very important to us here at OnePageCRM, so we must continuously update every aspect of our software stack to ensure that our applications, and your data, remain safe and secure.

When you visit any secure `HTTPS` site, including OnePageCRM, your connection is encrypted. The setup of this encryption happens during an initial handshake between your browser and our servers. This encryption is called `TLS` (Transport Layer Security) or, formally, `SSL` (Secure Sockets Layer).

There are many versions of SSL/TLS.

* SSL 2.0 => Deprecated in 2011.
* SSL 3.0 => Deprecated in 2015.
* TLS 1.0 => Deprecated in March 2020.
* TLS 1.1 => Deprecated in March 2020.
* TLS 1.2 => Current version widely supported.

If you are using a modern web browser and visit a site that doesn't support TLS v1.2, then you will see an error message telling you the site isn't secure. Browsers are very good at keeping you informed as they will warn you when a site is not secure.

<b>At OnePageCRM, we will be removing support for TLS v1.0 and TLS v1.1 on July 1st 2020, as part of our best practice and to ensure we are up to date with the most secure version.</b> This is in line with Google Chromes <a href="https://security.googleblog.com/2018/10/modernizing-transport-security.html" target="_blank">recommendations</a>.   


If you’re using the OnePageCRM API, there are some steps, or in true OnePageCRM style, Actions, which you need to take…

<b>You (or your IT team) will need to make sure that your systems support TLS v1.2.</b> In order to help you with this, we have set up an endpoint that only supports TLS v1.2. If your applications work with this endpoint, then you will be all set for the update on July 1st 2020. This endpoint is <a href="https://apitls12.onepagecrm.com" target="_blank">https://apitls12.onepagecrm.com</a>.

In order to test, you can do the following:

* Test your systems using this endpoint address: <a href="https://apitls12.onepagecrm.com" target="_blank">https://apitls12.onepagecrm.com</a>.
Note: This is a test endpoint only and will be disabled on the 1st July 2020. Please  do not use it in your production code. This endpoint address is a Production Endpoint so any changes made here affect your data in OnePageCRM.

* You can use the sample test code below for reference:

A bash one liner: 
{% highlight bash %}
curl --tlsv1.2 --tls-max 1.2 https://apitls12.onepagecrm.com/api/v3/pingdom
{% endhighlight %}

Ruby Sample code below:
{% highlight ruby %}
require "net/http"

uri = URI.parse('https://apitls12.onepagecrm.com/api/v3/pingdom')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

begin
    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
    puts "Thank you. Everything is working"
rescue Errno::ECONNRESET => e
    puts "TLS v1.2 is not supported. Please upgrade your integration."
end

{% endhighlight %}

If you get a `200 OK` response, then you are good to go.

If you get an error, then you will need to upgrade your application/environment to support TLS v1.2.

If you have any questions or require any additional information, please leave a comment below, and we will be happy to help you.


