---
layout: post
title: "The Beauty of Ultrahook"
slug: "the-beauty-of-ultrahook"
category: blog
author: john
date: 2014-06-03 15:11:22
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

<img src='http://i60.tinypic.com/344z15j.png'>


Go ahead and fill it out, making sure to take note of the namespace you choose, I will be using this ultrahook to send information from my OnePage CRM account to my web application, so I will call the namespace 'onepage', just to keep things clear and simple.

Hit the Sign me up! button and you will now be presented with an API key, make note of this too, although ultrahook even send you a friendly email with your API key just so you wont forget, what a great bunch of lads!

Next open up your terminal and enter the following command, replacing YourAPIKeyHere with the API key you got from the previous step

    echo "api_key: YOURapiKEYhere" > ~/.ultrahook

The API key is now saved in your system and you wont have to worry about it again while still enjoying all the security it offers. In the terminal navigate to the directory of your rails application and install the ultrahook gem

     gem install ultrahook

Now Ultrahook is set up and ready to go, all thats left to do is to tell Ultrahook where to look for the data being sent (the public webhook) and where to send it (the localhost webhook). The public webhook is the namespace you created earlier on e.g. http://onepage.onepage.ultrahook.com this is where we will tell OnePage CRM to send the webhook data. In the 'Add Apps' page of your OnePage CRM account enable the webhooks app and click configure

<img src="http://i62.tinypic.com/2rwxr8n.png"  height="72" width="612">


In this configure page, you simple need to tell OnePageCRM where to send information too. Input the ultrahook namesapce from earlier. For example you can see that I am using the namespace onepage.

<img src="http://i62.tinypic.com/2i91kyu.png"  height="231" width="612">

Hit save and as simple as that OnePageCRM is now ready to start sending data using the webhook address. All thats left to do is run Ultrahook, open a new terminal and run the command 

    ultrahook UltraHookNamesapce  LocalHostWebhook

replacing UltraHookNamespace with the namespace you set up and LocalHostWebhook with the webhook located on the localhost. For example my namespace is called onepage and my local webhook is for my motivational web app, therefore to start my ultrahook I must run 

    ultrahook onepage http://localhost:3000/motivation/webhook/2

You should now have two terminal windows open with your rails server running in one and the Ultrahook running in the other. Now all you have to do is simply sit back and enjoy the beauty of Ultrahooks.

My motivational web application simply keeps track of each time I win a deal in OnePageCRM and gives me a little motivational message based on how many deals I've won, because we all need a little pick me up now and again.

When a deal is won in OnePageCRM, the webhook sends information about what just happened to my application, If its a deal that has been won it will increment my won deals in the database and update the motivational message accordingly. The end result giving the following page:

<img src="http://i61.tinypic.com/25hpzr9.png">

To learn more about what events trigger a Webhook and what information is sent with the webhook have a look at our [WebHooks and More][2] page for more information on integrating your application with OnePageCRM using webhooks.

Once your application is tested and  working you can make that all important push to the development server with confidence, saving you time and hopefully a few gray hairs.
      


  [1]: http://www.ultrahook.com/
  [2]: http://developer.onepagecrm.com/webhooksmore/