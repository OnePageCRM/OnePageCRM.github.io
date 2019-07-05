---
layout: post
title: "How to improve the testability of Model View Controller on iOS"
slug: "how-to-improve-the-testability-of-model-view-controller-on-ios"
category: blog
post_image: /assets/images/mvvm/mvvm-header-imagev2.jpg
author: elano
date: 2019-06-15 09:00:00
excerpt: "When you develop an application, you can choose one of many architectures. For iOS the easiest and most common is MVC (Model View Controller). But it’s only after you dive right into the project, you may find that it can often be difficult to test and change the code."
graphic: /assets/images/mvvm/mvvm-header-imagev2.jpg
---

When you develop a mobile application, you can choose one of many architectures. For iOS the easiest and most common is **MVC** (Model View Controller). But sometimes after you dive deeper into the project, you may find that it can often be difficult to test and change the code.

Each architecture that you might choose has both good and bad aspects. It's very important to always bear in mind that the ultimate goal is to improve the testability of the code. If the tools you choose will help with this, then you're already on the right path.

In this post, I'll talk a little bit about **MVVM** (Model View ViewModel) and my experience with using it to improve the testability of the OnePageCRM mobile app.

The main problem with **MVC** is that a lot of code goes into the Controller, so it becomes bigger and more difficult to test. The use of `TableView` is very common, so to start, I created a manager to incorporate both the `UITableViewDataSource` and `UITableViewDelegate` protocols.

<br/>

```swift
final class ContactTableManager: NSObject {

}

extension ContactTableManager: UITableViewDataSource, UITableViewDelegate {

	func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {}

	func numberOfSections(in tableView: UITableView) -> Int {}
}
```

<br />

This way the Controller can still have button events and other delegate protocols, but the table part (which can be huge) isn't there anymore.

Imagine now that you have to show a list of contacts on a table where the contact name could be bold or regular. Normally with **MVC** you would do something like:

<br/>

```swift
let cell = tableView.dequeueReusableCell(withIdentifier:"cell", for: indexPath) as! ContactTableViewCell
let contact = contacts[indexPath.row]

Cell.textLabel.text = contact.name
Cell.textLabel.font = contact.isBold ? boldFont : normalFont
```

<br />

It doesn’t take a huge amount of code, but can you imagine what you need to do just to test it? You'll need the Controller, table and the cell just to test the cell. And that’s where the problem may arise, as it can take a long time just to test the setup of the cell. 

Let's see with **MVVM**:

<br/>

```swift
final class ContactViewModel: NSObject
{
	let name: String
	let isBold: Bool

	init(contact: Contact) {
		self.name = contact.name
		self.isBold = contact.isBold
	}

	func configure(cell: ContactTableViewCell) {
		cell.textLabel.text = contact.name
		cell.textLabel.font = contact.isBold ? boldFont : normalFont
	}
}
```
<br />

Now to configure the cell you'll need:

<br/>

```swift
let cell = tableView.dequeueReusableCell(withIdentifier:"cell", for: indexPath) as! ContactTableViewCell
let contact = contacts[indexPath.row]
let model = ContactViewModel(contact: contact)

model.configure(cell: cell)
```
<br />

All the logic is in the `ContactViewModel`, so what do I need to test now? Just the model. Actually you might say that we should test the creation of the cell, but if we make a little change and add a protocol to the cell, I can test the logic with just a simple class - easy! :-)

<br/>

```swift
protocol SimpleCell {
    var label: UILabel { get set }
}

func configure(cell: SimpleCell) {
		cell.label.text = contact.name
		cell.label.font = contact.isBold ? boldFont : normalFont
	}
```
<br />

And there you go, check it out and see for yourself. It saved me lots of time and I hope it works for you too.

There are many other aspects to **MVVM**, but the main goal of the example is to improve the testability of the code! I'd love to hear you thoughts in the comments. What you think?

---
<a style="font-size: 0.8em" target="_blank" href="https://dev.to/onmyway133/a-taste-of-mvvm-and-reactive-paradigm-24p5">*Main image source</a>
