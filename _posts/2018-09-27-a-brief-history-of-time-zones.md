---
layout: post
title: "A Brief History of Time (Zones)"
slug: "a-brief-history-of-time-zones"
category: blog
post_image: "/assets/images/timezones/tesseract.jpg"
author: cillian
date: 2018-09-27 09:00:00
excerpt: "How about when you have an application, which serves users from all over the world? Where you need to display date-times which are correct for all the different users? Who may work together on the same team, but live in different parts/zones of the world? Well then buckle your seat belts and prepare for liftoff!  🚀🚀🚀"
graphic: /assets/images/timezones/tesseract.jpg
---

<style>

.github-blockquote {
  background: #f9f9f9;
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: .53m 10px;
}

.github-blockquote:before {
  color: #ccc;
  font-size: 4em;
  line-height: .1em;
  margin-right: .25em;
  vertical-align: -.43m;
}

.github-blockquote p {
  display: inline;
  padding-left: 5px;
}

.card {
  margin: 1em auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 5px solid #eee;
  box-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);  
}

.no-margins {
  margin: 0px !important;
}

li {
  color: #3a4e63;
  margin-bottom: 8px;
}

</style>

In the movie Interstellar (great watch by the way - would totally watch it again even though I've seen it at least five times), towards the final scenes (spoiler alert), Coop (Matthew McConaughey) travels through a black hole (caution: as in an otherwise scientifically accurate film, we are undeniably leaving the realms of the known here). In so doing, he gains the ability to travel through the time dimension at will - the same way we "underprivileged" folk can travel through the three physical dimensions any way we desire.

<br>

We intrinsically understand that there is a fourth dimension. Hold on I will prove it to you.

<blockquote class="github-blockquote">
  <p>"I'll meet you at the Empire State building, New York city."</p>
</blockquote>
<blockquote class="github-blockquote">
  <p>"... when?"</p>
</blockquote>

<blockquote class="github-blockquote">
  <p>"I'll meet you at 6pm, Thursday September 13, 2018."</p>
</blockquote>
<blockquote class="github-blockquote">
  <p>"... where?"</p>
</blockquote>

Yes of course there are the obvious three physical dimensions, but a time component is crucial if we are to gain anything meaningful from a physical location. A place (in three dimensional space) is meaningless without a time. Likewise a time without a space coordinate is just as useless.

<div id="4d-space-light-cone" style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:60%"
    src="/assets/images/timezones/4d-space-light-cone.jpg">
</div>

I'm here today to add another layer of complexity to the scenario which you may never have even considered (unlikely as I presume you at the very least have an interest in software development, since you're reading this). In today's world, daylight savings could very well mean "Cloudy Friday", because our "smart" devices "automagically" handle a lot of the difficult problems we face.

Problems like, for example, adding an extra hour of sunlight when the days are supposed to be longer, and taking it back again when that is supposed to happen. We don't want to know more about these theoretically interesting (but actually very complicated) problems. In the spirit of Newton we want to stand on the shoulders of giants and not "reinvent the wheel". In reality, we just don't want to have to deal with the problems because... well... they're hard!

<br>
<div id="shouldnt-be-hard" style="width:100%; margin-bottom:20px; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:100%"
    src="/assets/images/timezones/shouldnt-be-hard.png">
</div>
<br>

How about when you have an application, which serves users from all over the world? Where you need to display date-times which are correct for all the different users? Who may work together on the same team, but live in different parts/zones of the world? Well then buckle your seat belts and prepare for liftoff!  🚀🚀🚀

The additional layer I'm referring to is of course time zones. A time zone is defined as "a region of the globe which observes a uniform standard time", but some might describe it as an abstract construct used to torment the souls of software developers and/or shorten their lifespan (granted that one might be a bit of a stretch).

Okay... so I may be slightly exaggerating the complexity of time zones, considering the fact that we (as a species) have put people on the moon, and sent probes out of our own solar system which are still sending us back data. Nonetheless, I have had some bad experiences with using time zones in software which has made me somewhat biased. I will share with you my bad experience and how I fixed it, but first... let's go over some basics!

<br>

`// the basics`

<div id="world-map-timezones" style="width:100%; text-align:center">
  <img alt=""
    class="img-responsive"
    style="width:100%"
    src="/assets/images/timezones/world-map-timezones.png">
</div>

Coordinated Universal Time (or `UTC` for short - guess that's what happens when English and French speakers have to work together to find a suitable abbreviation) is the absolute uniform standard time, by which all other times are measured. These other times (or zones) are measured by how much they are offset from `UTC` (also often referred to `GMT` - Greenwich Mean Time). For example New York city uses the EST (Eastern Standard Time) time zone which can also be written as `GMT-5` or `UTC-5`, which means it's exactly 5 hours behind `GMT` or `UTC`.

<br>

`// a sensible solution exists`

So let's start making some sense of all of this. We have specific points in time to be stored. We have many people viewing and editing these date-times, who live in different zones, but should see the same time for them (relative to “true time”). The most obvious and sane solution is store all these times in a uniform standard format, and let each client (who should know their own zone) do the necessary conversion and/or adjustments when displaying or parsing date-times themselves. Piece of cake right?

<br>

`// define the problem`

The only problem with that is Java, more specifically the `java.util.Date` and `Calendar` APIs. Java `Date`s themselves do not have any time zones (as they shouldn't), but their `#toString` methods, or any usage of something like `SimpleDateFormat` to parse or serialize them, will in fact use the `JVM`'s default time zone to do so.

Granted these APIs have been a part of Java since the earliest versions, but I can't adequately explain how big of an issue this is. It may not sound like the biggest deal in the world, but I can assure you it has some pretty serious implications.

Firstly let's imagine all the times we parse and serialize date-times in, for example, the OnePageCRM Android application. The mobile app interacts with OnePage data by means of the API. So for our example, that means sending info about date-times as well as receiving info about date-times (among other things).

<br>

<div style="width:100%; height: 100%; text-align:center;">
  <div class="card">
    <img alt=""
      class="no-margins img-responsive"
      style="width:100%; height:100%;"
      src="/assets/images/timezones/data-flow.jpg">
  </div>
  <div style="margin-top:-15px; padding-bottom:15px;">
    <small><code>Data flow</code></small>
  </div>
</div>

Process of displaying a date to a user in the Android app:
* -> The API response containing date-times is parsed
* -> JSON is **_converted_** into POJOs (Plain Old Java Objects)
* -> Data is then stored in a local database using ORM (Object Relational Mapping)
* -> This refers to POJOs being **_converted_** into database entries
* -> To show the date-times to the user, we query them from the database
* -> The date-times are again **_converted_**, this time from db entries back to POJOs
* -> The UI needs a `String` to bind to the UI, not a POJO or `Date`
* -> Finally the POJOs are again **_converted_** using formatters (fancier version of `#toString`)

<br>

Every time a **_conversion_** happens in the above process, we have to make sure that we are using the correct time zone to parse or serialize the date-time. You can imagine this is, even just logistically speaking, quite an involved process. If for any reason we use a different time zone, or more likely let the system apply its own (i.e. `JVM`'s default) time zone, we are going to make a mess for ourselves, and by extension our customers.

<br>

`// changes to fix the problems`

Since I know you're dying to hear how we solved this existential crisis, I'll begin to introduce the solution - the Java 8 Time APIs, authored by Stephen Colebourne. To be more specific, a <a target="_blank" href="http://www.threeten.org/threetenbp">backport</a> of the Java 8 Time APIs called `ThreeTenBP`, which are based on <a target="_blank" href="http://www.joda.org/joda-time">Joda-Time</a> defined by <a target="_blank" href="https://jcp.org/en/jsr/detail?id=310">JSR 310</a>. Even though Android now supports Java 8, it was better to use the backport since the Java 8 support in Android is missing some key classes for the Time APIs, as well as only being available on the newer versions of Android.

To get into some of the "nitty gritty" of the changes:
* -> Moved from old `Date` and `Calendar` APIs to new Java 8 Time APIs
* -> Change from `java.util.Date` to `java.time.LocalDate` and `java.time.Instant`
* -> Remove all `Dates` and related serializers and/or helpers
* -> Using <code><a target="_blank" href="https://github.com/JakeWharton/ThreeTenABP">ThreeTenABP</a></code> for the Android app, and <code><a target="_blank" href="http://www.threeten.org/threetenbp">ThreeTenBP</a></code> for the OnePage <code><a target="_blank" href="https://github.com/OnePageCRM/java-wrapper">Java API Wrapper</a></code> project

<br>

`// benefits of the switch`

Does no longer wanting to quit your job count as a benefit of fixing time zone issues? Just kidding... But in all seriousness, the Java 8 Time APIs are so much better to work with it makes me quiver even typing the word "Date", when it's not stuck to the end of another word like "Local".

Since making the switch, we have seen numerous benefits:
* -> Dates are completely independent of time zones (which they absolutely should be)
* -> Only things which need to have a time zone do: date-times
* -> Logical separation of types: dates, times & date-times (which were all previously `Date` objects)
* -> Ability to inject mocked clock objects for testing
* -> Improved maintainability by using better, more modern APIs (immutability, conversions etc.)

<br>

As the issue was somewhat of a large refactor to the codebase, I feel it's necessary to formally thank some folks for really great work which directly helped us solve these problems.

Huge thanks to:
* -> <a target="_blank" href="https://github.com/jodastephen">Stephen Colebourne</a> for authoring, curating and backporting a truly fantastic set of APIs
* -> <a target="_blank" href="https://github.com/JakeWharton">Jake Wharton</a> for porting the <a target="_blank" href="https://github.com/JakeWharton/ThreeTenABP">backport</a> over to Android (providing a sensible and efficient alternative to loading the time zone information from a JAR file)
* -> <a target="_blank" href="https://stackoverflow.com/users/642706/basil-bourque">Basil Bourque</a> for giving one of those <a target="_blank" href="https://stackoverflow.com/a/22126586/5096103">answers</a> on stackoverflow which deserves bounty, but sadly has not even received the most upvotes

<br>

`// witty outro`

<blockquote class="github-blockquote">
  <p>"What time is it?" -- Richard Deacon as The King</p>
</blockquote>

<blockquote class="github-blockquote">
  <p>"Any time you want it to be." -- Frank Baxter as the Scientist (from the film "About Time")</p>
</blockquote>

As engineers, we sometimes complain about limiting factors "outside of our control". Think: legacy code, poor hardware, sub-standard design or process. I'm sure you've heard them all. When the truth of the matter is, we are completely in control of everything we do. Every piece of code we write is an extension of ourselves, acting as a looking glass into a snapshot of our self at that point in time. We are the masters of our fates. We are the captains of our souls. We are the Joseph Coopers travelling through time and space as we desire, but `1`'s and `0`'s are our tesseract.
