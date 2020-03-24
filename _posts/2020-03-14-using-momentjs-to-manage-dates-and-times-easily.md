---
layout: post
title: "Using MomentJS to manage dates and times easily"
slug: "using-momentjs-to-manage-dates-and-times-easily"
category: blog
post_image: /assets/images/managejs/header_image.png
author: victor
date: 2020-03-09 09:00:00
excerpt: "Getting a new project is always an exciting part of being a Software Engineer in OnePageCRM, and on this occasion, when I heard the brief on our latest feature: Next Action Quick Date Select and Next Action Quick Edit, I was excited, as it meant I was going to check out a new library.  "
graphic: /assets/images/managejs/header_image.png
---

Getting a new project is always an exciting part of being a Software Engineer in OnePageCRM, and on this occasion, when I heard the brief on our latest feature: Next Action Quick Date Select and Next Action Quick Edit, I was excited, as it meant I was going to check out a new library. With this update, users can easily update the date of a Next Action right from the Action Stream from a predefined list of options for example: today, tomorrow, etc. It’s also possible to edit the Next Action text right from the Contact view. This saves the user time and allows them to organize their day better.

<div style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:80%;"
    src="/assets/images/managejs/NA_Quick_select.jpg">
</div>

After doing some initial research, I realized that the best way to implement this feature was to use a lightweight and powerful library called [`MomentJS`](https://momentjs.com/){:target="_blank"}. In this post, I want to highlight some of the great features of `MomentJS` and my experience working with it.

First, you need to install the library using a package management tool. I used [npm](https://www.npmjs.com/package/moment){:target="_blank"}:

```coffeescript
npm install moment
```
<br/>
Don't forget to include it:

```coffeescript
var moment = require('moment')
```
<br/>
Simply call `moment` in your code:

```coffeescript
moment() # -> Moment {...}
```
<br/>
It returns a `MomentJS` object that points to the current date and time.
This call is equal to:

```coffeescript
moment(new Date()) # -> Moment {...}
```
<br/>
Now, you can consume it as per your needs.
For example, you want to display date and time in some user preferred format, then call the `format` method:

```coffeescript
moment().format("MM/DD/YYYY") # -> "02/06/2020"
moment().format("HH:mm") # -> "16:26"
```
<br/>
The method `format` is widely used to display dates for users in an appropriate way. It can be used for debugging purposes as well.
For example, when you need to quickly convert a `MomentJS` object to string and check the date or time value, just call `format` without any parameter:

```coffeescript
moment().format() # -> "2020-02-12T18:09:06+03:00"
```
<br/>
Local formats are also useful, and quite easy to output (but remember that the date and time will be shown in local time!):

```coffeescript
moment().format('L')  # -> "02/07/2020" month/day/year
moment().format('LL') # -> "February 7, 2020"
moment().format('LT') # -> "7:37 PM"
```
<br/>
Also the `calendar` method can be helpful for a quick check or manipulation:

```coffeescript
moment().calendar() # -> "Today at 5:21 PM"
moment().add(1, 'days').calendar() # -> "Tomorrow at 5:22 PM"
moment('25-01-1990', 'DD-MM-YYYY').calendar() # -> "01/25/1990" month/day/year
```
<br/>
To quickly get [Unix time](https://en.wikipedia.org/wiki/Unix_time){:target="_blank"}, pass 'X' as the format parameter, or use the `unix` method:

```coffeescript
var a = moment()
a.format('X') # -> "1581094632" # string
a.unix()      # -> 1581094632   # same but returned as a number
a.format('x') # -> "1581094632798" # with milliseconds
```
<br/>
To understand what is going on with offset, the `utcOffset` method is helpful. Use it to set the value as well:

```coffeescript
moment().utcOffset() # -> 180 # which means +3 hours
moment("2020-02-07T19:49:37+03:00").format('LT') # -> "7:49 PM"
moment("2020-02-07T19:49:37+03:00").utcOffset(0).format('LT') # -> "4:49 PM"
```
<br/>
If you already have a date as a string, from an API for example, it's easy to convert it to a `MomentJS` object:

```coffeescript
moment("01/31/2020", "MM/DD/YYYY") # -> Moment {...}
```
<br/>
The second parameter is the date format.
Interestingly, when you are not sure about the exact format, you can provide multiple formats.
`MomentJS` will determine which format to use by itself:

```coffeescript
moment("06-02-2020", ["MM-DD-YYYY", "YYYY-MM-DD"]) # -> "MM-DD-YYYY" will be chosen
```
<br/>
When parsing date-times, we are not always sure about the format of information.
I found that we can easily address these concerns by checking with the `isValid` method.
For example:

```coffeescript
moment("01/31/2020", "MM/DD/YYYY").isValid() # -> true
moment("", "MM/DD/YYYY").isValid() # -> false
moment("hello", "MM/DD/YYYY").isValid() # -> false
```
<br/>
When you want to change a date, the methods `add` and `subtract` are helpful
(but remember that it changes the original date). For example:

```coffeescript
today = moment()
today.add(1, 'days').format('LL') # -> "February 13, 2020"
today.format('LL') # ->  "February 13, 2020" # same date now!!!
```
<br/>
If you want to keep the original date unedited, use the `clone` method.
Here is an example how to calculate Tomorrow and upcoming Friday dates:

```coffeescript
today = moment()
day = today.isoWeekday() # -> 3 # Wednesday
tomorrow = today.clone().add(1, 'days')
friday = today.clone().add(5 - day, 'days')
```
<br/>
Frequently, it's more convenient to show relative time on the user's side, instead of the full date-time format.
We can use the `fromNow` method for this:

```coffeescript
a = moment()
a.fromNow() # -> "a few seconds ago"
moment("10/02/2020", "DD/MM/YYYY").fromNow() # -> "4 days ago"
```
<br/>
If you want, you can implement your  own logic using the `diff` method. For example:

```coffeescript
date = moment("13/02/2020", "DD/MM/YYYY")
minutesAgo = moment().diff(date,'minutes')
hoursAgo = moment().diff(date,'hours')
if minutesAgo <= 60
  "#{minutesAgo} minutes ago" #-> 2 minutes ago
else
  "#{hoursAgo} hours ago"     #-> 5 hours ago
```
<br/>
Methods like `isBefore` and `isSame` can help here also:

```coffeescript
moment('2020-01-01').isBefore('2020-01-02') # -> true
moment('2020-01-01').isBefore('2020-01-02', 'year') # -> false #check only year
```

```coffeescript
moment('2020-01-01').isSame('2020-01-01') # -> true
moment('2020-01-01').isSame('2020-08-01', 'year') # -> true #check only year
```
(Note: instead of year, you can pass other units of time such as month, day, hour, minute or second).

<br/><br/>
### Conclusion

`MomentJS` is an awesome `JS` library that allows you to manipulate, parse and validate dates and times easily.
It simplifies the development process significantly, which means it’s a great addition to your arsenal.
I’d strongly recommend you visit the official [docs page](https://momentjs.com/docs/){:target="_blank"},
as it contains exhaustive information about the library and many usage examples.

<br/><br/>
### Links

1. Quick start with MomentJS [https://momentjs.com/](https://momentjs.com/){:target="_blank"}
2. MomentJS exhaustive documentation [https://momentjs.com/docs/](https://momentjs.com/docs/){:target="_blank"}
3. When you're dealing with timezones [https://momentjs.com/timezone/](https://momentjs.com/timezone/){:target="_blank"}

<br/>

-----
Image references:
[OnePageCRM](https://www.onepagecrm.com/){:target="_blank"} and [Pexels](https://www.pexels.com/photo/analog-clock-sketch-in-black-surface-745365/){:target="_blank"}

