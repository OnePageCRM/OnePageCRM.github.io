---
layout: post
title: "API Rate Limit"
slug: "api-rate-limit"
category: blog
author: peter
date: 2014-11-11 13:24:22
---

Due to a large number of calls coming from some IP addresses, from the 13th of November 2014 we will be rate limiting calls to the OnePageCRM API.

The API will throttle on a sliding scale and will allow an average of 5 requests per second, with bursts of up to 10 requests.

This means that your integration would have to be very busy to hit these limits. If we find these limits are too lenient, we may change the number of permitted requests in the future.

If you find you are coming up against this limit, please get in touch with us on the [developer forum][2].

### How we implemented it

Our API is built in Ruby on Rails, and to implement this rate limit, we are using the [Improved Rack Throttle][1] gem. 

We simply added the gem to our gemfile, and created a `throttle_rate_limit.rb` file in our rails initializers.

In this file, we require `rack/throttle` and configure the middleware like this:

    config.middleware.use Rack::Throttle::SlidingWindow, { 
      :burst => 10,
      :average => 5,
      :rules => { :url => /api/ },
      :cache => Dalli::Client.new,
      :key_prefix => :throttle }

We use Dalli and Memcached to store the IP addresses that are accessing the API.


  [1]: https://github.com/bensomers/improved-rack-throttle
  [2]: http://forum.developer.onepagecrm.com