---
redirect_from:
  - /2022/07/18/single-responsibility-and-separation-of-concerns-principles/
layout: post
title: "Single responsibility and Separation of concerns principles [Real use cases]" 
slug: "single-responsibility-and-separation-of-concerns-principles"
category: blog
post_image: /assets/images/design-principles/header-image.png
author: hassan
date: 2022-07-18 09:30:00
excerpt: "The Single responsibility and Separation of concerns principles are two important design principles in object-oriented programming. In this blog post, we will look into how developers can use them and avoid the most common mistakes. We will also look at examples of how developers can produce robust and maintainable software by following and combining these principles."
graphic: /assets/images/design-principles/header-image.png
---

The *Single responsibility and Separation of concerns principles* are two important design principles in object-oriented programming. 

In this blog post, we will look into how developers can use them and avoid the most common mistakes. We will also look at examples of how developers can produce robust and maintainable software by following and combining these principles.
<br><br>

### What is a single responsibility principle?


The *Single responsibility principle* (SRP) is one of the five design principles of object-oriented programming. They are referred to as SOLID principles. SOLID is an acronym that stands for:

**S**ingle Responsibility Principle <br>
**O**pen/Closed Principle <br>
**L**iskov Substitution Principle <br>
**I**nterface Segregation Principle <br>
**D**ependency Inversion
<br>

Although all of these principles are important, this blog post will focus on the *Single responsibility principle*. 

According to this principle, a module should have one and only one reason to change. But software systems are changing regularly to satisfy users' and stakeholders' needs and requirements. That’s why we can rephrase this principle as follows: “a module should be responsible to one and only one user or stakeholder (actor)”.

Let’s imagine that we are developing an HR system. In this case, should the function that calculates employee salary belong to an HR module/class or to an employee module/class? 

According to the explanation by Uncle Bob in the Clean Architecture book, it should belong to the HR system because salary calculation is an HR’s and not an employee’s responsibility.
<br><br>

### What is a separation of concerns principle?

This principle is closely related to the *Single responsibility principle*.

*Separation of concerns* is a software architecture principle that is responsible for separating an application into distinct sections. According to this principle, every section should fix a separate concern. 

The goal of this principle is to set a well-organized system where every section/part of the application does its role perfectly and is able to adapt to changes.
<br><br>

### Can we merge these two principles together?

What will happen if we merge these two principles together? We will get reusable blocks of code that are less tightly coupled.

Nevertheless, many developers focus only on the *Single responsibility principle*. They try to separate and modularize as much as they can by adding layers to every module and classifying a function to the right layer. 

This leads to a problem: by focusing too much on one principle, many developers forget to apply other principles. For example, by applying the *Separation of concerns principle* developers can make this layer really clean and reusable. 
<br><br>

### How can developers use the single responsibility and separation of concerns principles?

In [OnePageCRM](https://onepagecrm.com), we believe in the power of neat and clean code. I’ll give you two examples of how we use these two principles.

***Example 1**: We decided to make every thread function run from a single separation layer that handles all thread functions (i.e background, main threads, etc.).


```swift
    class ThreadHelper: NSObject {

        private static let serialQueue = DispatchQueue(label: "onepagecrm.ThreadHelper.serialQueue")
    
        static func execAtBackgroundThread(function: @escaping () -> Void)
        {
            DispatchQueue.global().async(execute: function)
        }
    
        static func execAtMainThread(function: @escaping () -> Void)
        {
            DispatchQueue.main.async(execute: function)
        }
    
        static func execAtSerialQueue(function: @escaping () -> Void) {
            serialQueue.async(execute: function)
        }
    }
```
<br><br>
As you can see, this layer is responsible for threads. It helps us to decouple responsibilities, reuse code and prevent repetitions. Moreover, if there is any modification, we can do it in one place: we don’t need to go to different threads and update them one by one. This is how we follow the Single responsibility principle.

In this example, every function is responsible for one thing. In OnePageCRM, we don't write functions with boolean flag arguments. Instead, we write two different functions with two separated responsibilities.

<span style="color:red">**Bad practice is :**</span>
```swift
    static func execThread(isBackGround : Bool , function: @escaping () -> Void)
    {
	    if isBackGround {
		    DispatchQueue.global().async(execute: function)
        }else{
	        DispatchQueue.main.async(execute: function)
        }
    }
```
<br>

This bad practice example can happen when developers focus on the *Single responsibility principle* while forgetting about other principles and design patterns.
<br><br>

**Example 2**: This example will focus on the *Separation of concerns principle* and is separated into two points: one with a non-business logic function and another one with a business function.


1. For non-business logic, we use this principle with functions like:
*       ( hideActivityIndicator ) — this function contains either one line of code or multiple lines of code. We encapsulate the code and hide the indicator in just one line of code. But if we decide to change the indicator and have multiple lines of code, we need to change only one function because one function has one responsibility.
*       ( hideKeyboard ) is used to hide the keyboard. When a user hides the keyword, we call the endEditing function. In this case, we encapsulate a default function because if there is any update from Apple, we can simply modify one function.
<br><br>
There are many more similar examples.
<br><br>
2. For business logic functions, we also use the *Separation of concerns principle*:
*       ( loadCompanyInformation ) function is used to load company information. It sends a request for this information. There is another function: ( handleCompanyResponse ) handles company response and receives a response with its arguments. By using two different functions, we separate the request and response from each other. In other words, one function is responsible for the request and another function is responsible for the response. This way, we follow the *Separation of concerns principle*: one function for one responsibility.

There are many more examples of these principles and how it is useful for coding but it is not possible to cover them all in one blog post. 
<br><br>

### Why is it important to follow these principles?

Let’s see what can happen if you don’t use at least one of these principles.

Some developers ignore the Single responsibility principle. They use just one class/struct to contain various requests for networking. In this case, there is a lot of coupling and code repeating happening. This code is hard to test and difficult to maintain. There are also a lot of unforeseen side effects if you need to do any changes. 

For example:

```swift
    struct HelperClass {
    static func parseHTML(htmlMessage : String) -> String {}
    static func openUrl( url : String) -> Void {}
    static func downloadFile(fromUrl url : String) -> Void {}
    }
```
<br><br>
As you can see, this class has a lot of responsibilities. This is not good for software engineering: nothing is classified or sorted. That’s why it is difficult to understand what this struct is for.

Sometimes developers also ignore the *Separation of concerns principle*. Let’s look at the following function example before refactoring:


```swift
    private func closeAfterChangeContact(_ contactId: String)
    {
        hideActivityIndicator()
        
        if didRestrictedUserChangeOwner() {
            afterDelete()
            AlertHelper.showSimpleMessage(text: Messages.assignedRestrictedUserContact, numberOfLines: 2, duration: 1.2, quickShow: true)
            return
        }
        
        if self.contact.id != nil {
          
            if needSplitCompany && self.contact.companySize == 1 {
                sendCompanyDeletedNotification()
            }
            //updateTabs()
            close(true)
        }else {
            if let newScanImage = cardScanAttachmentImage {
                createNoteUserCase.createEmptyNoteWithAttachment(newScanImage, for: contactId) { [weak self](isOk) in
                    self?.cardScanAttachmentImage = nil
                    self?.didNewContactAdded(contactId: contactId)
                }
            }else {
                didNewContactAdded(contactId: contactId)
            }
        }
    }

```
<br><br>
As you can see, the main responsibility of this function is to close the screen after the contact was added. But there are other responsibilities, for example: to validate restricted user change, present alert, send a notification about the deleted company, notify about the new contact added. That’s a lot of responsibilities for one function.

In this example, if you need to change any line of code or fix a bug, there will be some unpredictable side effects. And this is just a small example. Imagine a complex software with multiple functions like this one.
<br><br>

### Conclusion: Design principles are important

Make sure you design your system as well as you can. Clean architecture can save you many sleepless nights and unexpected issues.

If you learn more about principles and design patterns and stick to following them, you will not only broaden your knowledge about coding and system designs but also build robust applications.


