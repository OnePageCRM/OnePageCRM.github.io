---
redirect_from:
  - /2016/12/02/working_with_timezones_swift/
layout: post
title: "Working with timezones (Swift)"
slug: "working-with-timezones-swift"
category: blog
post_image: "/assets/images/articles/timezone.png"
author: elano
date: 2016-12-02 09:00:00
---

The new OnePageCRM mobile app for iOS was developed in Swift 2.3 and one of many things that I needed to worry about was timezones.

One of the fields returned by the API in the login request (https://app.onepagecrm.com/api/v3/login.json) is the time zone configured in that account, for example:  

```json
"time_zone": "Europe/Amsterdam"
```

Any time information that needs to be shown first needs to be converted to the right timezone. It's import to notice that the time information comes in timestamp format and the **NSDate object doesn't have timezone information**, so we need to set it in the **NSDateFormatter**.

We can do this with the code:

```swift
let timeStamp = 1480273353
let date = NSDate(timeIntervalSince1970: timeStamp)
let timeZone = NSTimeZone(name: "Europe/Amsterdam")
let format = NSDateFormatter()
format.dateFormat = "HH:mm"
dateFormatter.timeZone = timeZone

let timeFormatted  = dateFormatter.stringFromDate(date)
```

Now the right time is in timeFormatted and It can be used to show the time to the user. =)
