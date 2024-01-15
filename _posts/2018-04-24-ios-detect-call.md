---
redirect_from:
  - /2018/05/24/ios-detect-call/
layout: post
title: "Detecting a call with CallKit"
slug: "ios-detect-call"
category: blog
post_image: "/assets/images/articles/onepagecrm_blog_detecting_CallKit.gif"
author: elano
date: 2018-05-24 09:00:00
excerpt: "OnePageCRM automatically opens a call result form, following the end of a phone call, so users can log it easily in the CRM."
graphic: /assets/images/ios/onepagecrm_blog_detecting_CallKit.gif
---

OnePageCRM is all about simplicity, smart defaults and getting away from excessive admin and data entry. The mobile apps are no exception to this. With this in mind, we automatically open a call result form, following the end of a phone call, so users can log it easily in the CRM.

This way, users never lose timely information and don't need to go through extra steps to log a call result. To do this, the mobile app needs to detect when a user makes a call and when the call has ended.

It's very easy to initiate a phone call with Swift, you just need to do:

```swift
UIApplication.shared.open(URL(string: "tel://999888777"), options: [:], completionHandler: nil)
```

<br />
But when you do this, the system asks the user if they want to allow the call be initiated.

<div class="text-align: center">
    <img src="/assets/images/ios/onepagecrm_contact.PNG  "alt="Contact in OnePageCRM" class="img-responsive"
     style="width: 50%; position: relative; left: 25%;" />
     <br /><br />
</div>

Since we do not have access to the system menu selections, only performing some action following a successful call initiation was a little tricky.

With iOS 10, Apple introduced `CXCallObserver` that should be used for <a href="https://getvoip.com/library/what-is-voip/" target="_blank">VOIP calls</a> (that was the original idea). But with this new kit (`CXCallObserver` is part of `CallKit`) we can do some cool things, even if we're not working with VOIP calls.

To successfully observe the end of a call, we can do something like:

```swift
class ViewController {

    import CallKit

    let callObserver = CXCallObserver()

    override func viewDidLoad()
    {
        callObserver.setDelegate(self, queue: nil)
    }
}

@available(iOS 10.0, *)
extension ViewController: CXCallObserverDelegate {

    func callObserver(_ callObserver: CXCallObserver, callChanged call: CXCall) {
        if call.hasEnded == true {
            print("call ended")
        }
    }
}
```

<br />
The delegate function of `CXCallObserver` is `callObserver`. The function is called after every phone call and the parameter `call` has the property `hasEnded`. If `hasEnded` is true the user has just finished a phone call.

So now we can do something about it, like show the call result form so the user can log it in OnePageCRM. It's important to notice that we are detecting <b>every</b> phone call, not just those initiated from our app.

A simple boolean can help us filter out unwanted calls:

```swift
var isMakingCall = false

func makeCall()
{
    self.isMakingCall = true
    UIApplication.shared.open(URL(string: "tel://999888777"), options: [:], completionHandler: nil)
}

func openAfterCall()
{
    self.isMakingCall = false
    Print("after make call!")
}

@available(iOS 10.0, *)
extension ViewController: CXCallObserverDelegate {

    func callObserver(_ callObserver: CXCallObserver, callChanged call: CXCall) {
        if call.hasEnded == true {
            openAfterCall()

        }
    }
}
```

<br />
Now we are only taking note of calls that we are interested in.

I hope that you enjoyed reading. We would love to hear your questions and experiences with `CallKit`!
