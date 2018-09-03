---
layout: post
title: "OnePageCRM API Challenge"
slug: "api-challenge"
category: blog
post_image: "/assets/images/articles/wordcloud.png"
author: kevin
date: 2018-07-12 09:00:00
excerpt: "Everything has an API. So can we connect everything? I love writing and designing code. But writing about writing code, well not so much. So to motivate myself to write this post I decided to set myself a coding challenge."
graphic: /assets/images/api-tutorial/wordcloud.png
---

I’m a typical developer (I think)... I love writing and designing code. But writing about writing code, well not so much. So to motivate myself to write this post I decided to set myself a coding challenge. More on that later. First let me write a quick intro.

I started in OnePageCRM about four months ago. In that time I have mostly being working on our API, adding cool new features and getting a shiny new version of our documentation ready for release. I’ve come to realize that APIs are entire products in themselves. Recently I’ve been updating our API documentation to the OpenAPI 3.0 spec. This specification defines a language agnostic interface description for REST APIs and has a whole host of benefits both internally and externally. Internally, it will allow us to generate entire server stubs and client libraries in basically every programming language with a few keystrokes and makes it easier to maintain our documentation going forward. And externally, developers who chose to work with our API will reap the benefits from using an API that works seamlessly with the most popular API tools, interactive documentation along with client libraries in many languages. Stay tuned for it’s release!

So back to my mini coding challenge; I’m going to explain how I used the OnePageCRM API to do something cool via the command line. Developers are supposed to be a creative bunch, right? So I started thinking what is the craziest, most "<i>off the wall</i>" thing I could do with the OnePageCRM API? 

My initial, far too crazy idea is a <b>space age</b> headset for hands free CRM on the go! We can use our CRM while sitting at our computers or tapping at our phones but what about all those valuable face to face meetings? I know this is a crazy idea but lets run with it for the purposes of my mini coding challenge.

My crazy hypothetical system is complete with cameras that use facial recognition services to determine who we are talking to and microphones using speech to text services to record our interactions. Perhaps fancy semantic analysis services are used to summarize and extract concise meaningful information from our conversations. All of this data would be fed into OnepageCRM using, you guessed it, our API. If you’re talking with your mother and she reminds you that “Dads birthday is next Friday” then an intelligent system could theoretical add a "Next Action" in OnePageCRM to call Dad on Friday. 

Back to reality for a second. All of the above is actually starting to become possible for a number of reasons.

1) Literally everything has an API. If a web company is building an application but not building an API then they are falling behind. Not having an API severely limits how people (and machines!) can interact with your service. To go back to my space age CRM example for a second. If someone really wanted to create a contact in OnePageCRM to be triggered by a camera’s facial recognition software then they can. Why limit people to clicking buttons?

2) When I say that everything will have an API, I am not exaggerating that much. The Amazons and Googles of the world are building machine learning, big data and artificial intelligence systems that developers can programmatically interface with. We don't need to spend months of time and millions of dollars (or an afternoon on reddit) collecting cats pictures in order to train a computer to recognize a cat. Nor do we need to spend months building deep neural networks in order to do fancy speech recognition. In fact we don't even need to know how any of that works. Google has done the heavy lifting for us!
    
Let me set the scene for my mini code challenge. I will give myself one evening to build as much of my crazy space age CRM system as I can with the constraint that I must write as little code as possible and rely almost totally on web services. Because I have such a short time-frame, I am not going to worry about making GUIs or writing ‘correct’ code. Once I get some proof of concept feature working via the command line and can get a result back into my OnePageCRM account, I will be very happy.

Ok. Enough talk. See you in few hours...

### Mini Hackathon - the results!

So the bad news is I only managed to write six lines of code in the last 5 ish hours. However, the good news is that it accounts for two proof of concept features in my space age CRM headset.

<b>Feature 1:</b> Adding a note in OnePageCRM via Speech Recognition

After trying out a few Speech Recognition tools I signed up to <a href="https://cloud.google.com/" target="_blank">Google Cloud Platform</a> which gives me €300 free credit. Perfect! Google’s Cloud platform is a suite of AI, big data, analytics and infrastructure tools for basically everything. For my sample data I grabbed one of OnePageCRM’s YouTube videos and extracted out a .flac file from it. After following <a href="https://cloud.google.com/speech-to-text/docs/quickstart-gcloud" target="_blank">this</a> quickstart guide.
I could then convert an audio file to text using just one line of code (a single request to Google)! <a href="https://www.youtube.com/watch?v=VIQAHfY4VwY" target="_blank">Here</a> is the video I sampled from (it’s our GDPR webinar, you should watch it!) and this was the output

<div class="text-align: center">
    <img src="/assets/images/api-tutorial/speech_result.png" alt="" class="img-responsive"
     style="width: 75%; position: relative" /><br />
</div>


That was surprisingly good, although it was pretty awful at recognizing people's names and inserting full stops. Good enough for a proof of concept. Now to get this output into OnePageCRM.
In OnePageCRM, we make use of HTTP basic auth for request authentication. To get your username and password for basic auth, log into your OnePageCRM account, navigate to the Apps page, select API and navigate to the configuration tab. See <a href="https://developer.onepagecrm.com/" target="_blank">here</a> for more information as well as full documentation on our API. 

So let's presume we want to create a note for Jane Doe with the contents of our audio file. 
We can do this by interacting with the notes sub-endpoint. 
<a href="https://app.onepagecrm.com/api/v3/contacts/5b322ca19007ba2289b3c931/notes.json" target="_blank">https://app.onepagecrm.com/api/v3/contacts/5b322ca19007ba2289b3c931/notes.json</a>. 
In typical RESTful fashion, a `GET` request will display all our notes for this contact while a `POST` request will create a new note. Notice that in this request I have hard coded in the contact id. You can find Jane Doe’s id by making a `GET` request to the contacts endpoint.

Here is the contents of a shell file that automates this entire process from audio file to Note in OnePageCRM which I have saved as `speech_to_onepagecrm.sh`. Note that I am using CURL here but you could use your preferred way of interacting with web services or even one of our client libraries.

<div class="text-align: center">
    <img src="/assets/images/api-tutorial/speech_sh.png" alt="" class="img-responsive"
     style="width: 100%; position: relative" /><br />
</div>

Then we just run the following: `speech_to_onpagecrm.sh sample_gdpr_talk.flac 5b322ca19007ba2289b3c931`.
Lets ignore the fact that I need to specify the name of the audio file and the id of the contact in OnePageCRM. We have wrote 3 lines of pretty damned powerful code. From a local audio file to Google's servers for text extraction, and then to our CRM for storage in just 3 lines of code! 

Let’s have a brief look at the output returned from OnePageCRM/

<div class="text-align: center">
    <img src="/assets/images/api-tutorial/note_sample.png" alt="" class="img-responsive"
     style="width: 75%; position: relative" /><br />
</div>

As you can see OnePageCRM adds some useful information to your note including author information and timestamps. You can also add attachments to notes or link notes to deals. Take a look at our documentation for information on how to do this if you are interested. 

While our Speech Recognition isn’t perfect, it is enough as our proof of concept.


<b>Feature 2:</b> Adding a note in OnePageCRM from a picture of handwritten notes.

Let's say we were in a meeting with a potential customer in which we took some hand written notes. Lets try to extract text from those notes and get the result to OnePageCRM.

I didn’t want to use Google Cloud Platform again so I found a different <a href="https://ocr.space/ocrapi" target="_blank">web service</a> that performs Optical Character Recognition on images. 
After playing with a number of pictures of handwriting, I found that this was a harder task than I had thought. Perhaps using a different web service or a higher quality image would provide better results. However, I am just going to use a particularly easy image as my proof of concept. I created a screenshot of some text and I’m using that image.

I now have another one liner which will perform optical character recognition on a image.
Here is the result from the OCR server (parsed and cropped for ease of reading)

<div class="text-align: center">
    <img src="/assets/images/api-tutorial/ocr_result.png" alt="" class="img-responsive"
     style="width: 75%; position: relative" /><br />
</div>

Similar commands to Feature 1 are used to parse the output and post the result as a note to OnePageCRM. Wrapping the above in a shell script called “ocr.sh” gives the following: 

<div class="text-align: center">
    <img src="/assets/images/api-tutorial/ocr_sh.png" alt="" class="img-responsive"
     style="width: 100%; position: relative" /><br />
</div>    

Then we simply need to run `ocr.sh sample_image.png 5b322ca19007ba2289b3c931`. Again not the best bit of code in the world but certainly proves that it’s possible to weave a number of different applications together to process images and get results to OnePageCRM. 

So that is the end of my mini hackathon. I got to play with speech recognition and optical character recognition and of course the OnePageCRM API. I know next to nothing about image or speech processing only that it is really complicated. But by leveraging web services, I didn’t actually need to know how it works. How great is that?

### What will you use OnePageCRM for?

I remember not long after I started here, someone posted in our dev chat asking if anyone is working on anything cool, and if so, would we do a short interview about it. Someone replied saying that “<i>we are developers working with OnePageCRM, so working on cool stuff by definition!</i>”. We really do love hearing what people are using our API for so please drop by our developer forum and tell us about the cool things you are building with OnePageCRM!
   