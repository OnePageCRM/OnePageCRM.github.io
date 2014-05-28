---
layout: post
title: "The Beauty of Ultrahook"
slug: "the-beauty-of-ultrahook"
category: blog
author: john
date: 2014-05-28 15:11:22
---



While webhooks are providing new and exciting ways for us to develop web applications and have them integrate with eachother it can often be quite tiresome to push your entire project to a development server just to test every little fix you make. 
"But why push to the development server each time" I hear you cry out! 
"why not just test on the localhost where its quick and easy to test new code." Well I can't argue with you there, but unfortunatley webhooks can't send data to your localhost, if only there was a way of connecting public webhooks with those located on your localhost.

*Enter stage left: Ultrahook*

Ultrahook is a brilliant tool that can connect public webhooks with development webhooks located on the localhost. Amazing! but a tool that useful must be pretty expensive and it probably takes a few days to sign up, set up and integrate it into my application, right?
Wrong! Ultrahook is completley free and takes a grand total of 5 minutes configuration, 3 if your a fast typer.
 "Well It all sounds fantastic, if only there was somehwere I could go to read more about this" I hear you sigh, well you're in luck! It just so happens that the rest of this blog post does just that!

**Getting started with Ultrahook**

Firstly pop over to the [Ultrahook website][1] and hit the, intuitively named, Get started now button, you will be presented with the following form to obtain your  ultrahook API key and namespace:

<img src='https://xapdocs.atlassian.net/wiki/download/thumbnails/2621456/image2014-5-21%2014%3A32%3A3.png?version=1&modificationDate=1400679125157&api=v2'>


Go ahead and fill it out, making sure to take note of the namespace you choose, I will be using this ultrahook to send information from a [Wufoo][2] form, one of the many integrations One Page CRM offers, to our One page CRM account that is running on the localhost so I will cleverly call my namespace wufoo, but choose anything you like just make sure to make note of it for later.

Hit the Sign me up! button and you will now be presented with an API key, make note of this too, although ultrahook even send you a friendly email with your API key just so you wont forget, what a great bunch of lads!

Next open up your terminal and enter the following command, replacing YourAPIKeyHere with the API key you got from the previous step

    echo "api_key: YOURapiKEYhere" > ~/.ultrahook

The API key is now saved in your system and you wont have to worry about it again while still enjoying all the security it offers. In the terminal navigate to the directory of your rails application and install the ultrahook gem

     gem install ultrahook

Now Ultrahook is set up and ready to go, all thats left to do is to tell Ultrahook where to look for the data being sent (the public webhook) and where to send it (the localhost webhook). The public webhook is the namespace you created earlier on e.g. http://wufoo.wufoo.ultrahook.com this is where we will tell our wufoo form to send the webhook data. On the wufoo form input this namespace in the URL part if the webhook form

<img src='https://d1cre6klihqrbh.cloudfront.net/assets/integrations/wufoo_screen-1e14a6933d1e42b17999cb5fa37e0ec8.png'>

The key is taken from the wufoo app page from OnePage CRM


<img src='http://oi59.tinypic.com/24gog0x.jpg'>

The other Webhook URL shown above, from the OnePage CRM account is our webhook on the localhost where we want Ultrahook to send the data to. All thats left to do is run Ultrahook, open a new terminal and run the command 

    ultrahook UltraHookNamesapce  LocalHostWebhook

replacing UltraHookNamespace with the namespace you set up and LocalHostWebhook with the webhook located on the localhost. For example my namespace is called wufoo and my local webhook is shown above on the OnePageCRM Wufoo app page, therefore to start my ultrahook I must run 

    ultrahook wufoo http://localhost:3000/webhooks/wufoo_form/537c8f0ec00f260ccd000001

You should now have two terminal windows open with your rails server running in one and the Ultrahook running in the other. Now all you have to do is simply sit back and enjoy the beauty of Ultrahooks.

Any data sent from the Wufoo form will be sent to the ultrahook namespace where ultrahook will pass it into our localhost. All the magic of webhooks running on your right there on your own machine! 

Once your application is tested and  working you can make that all important push to the development server with confidence, saving you time and hopefully a few grey hairs.
      


  [1]: http://www.ultrahook.com/
  [2]: http://www.wufoo.com/