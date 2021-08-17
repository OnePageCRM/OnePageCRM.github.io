---
layout: post
title: "Multi Factor Authentication: A Developer’s Perspective on Working with Twilio Verify API"
slug: "multi-factor-authentication-dev-perspective-on-working-with-twilio-verify-api"
category: blog
post_image: /assets/images/multi-factor-authentication/header_image.png
author: seosamh
date: 2021-08-13 09:30:00
excerpt: "Multi Factor Authentication is a method of authentication that adds extra steps of verification for gaining access to resources such as an online account, internal system, application or network. Authentication has been traditionally completed by validating a username and password."
graphic: /assets/images/multi-factor-authentication/header_image.png
---

### What is Multi Factor Authentication (MFA)?

Multi Factor Authentication is a method of authentication that adds extra steps of verification for gaining access to resources such as an online account, internal system, application or network. Authentication has been traditionally completed by validating a username and password. However, there is now a need for higher security as cybercrime increases and evolves. Techniques such as brute force attacks, and social engineering have weakened conventional security measures for restriction of access, meaning conventional authentication no longer provides sufficient protection against attackers. 

There are also regulations such as PSD2 in the European Union that place an onus on certain industries to ensure enforcement of strong customer authentication.

Multi Factor Authentication is achieved by any combination of "what the user knows" such as their date of birth, "what the user has" such as a hardware token that generates a Time Based One Time Password and "something the user is" so perhaps their fingerprint or other biometric information. 

As a Software Engineer at OnePageCRM, I have recently worked on the implementation of Two Step Authentication (2SA). The first step in completing this project was to consider which factors provide the greatest security for our users during the login process while ensuring ease of use.

The options considered included:

**SMS Token Authentication / Phone Authentication:** The use of a third-party API which sends users an SMS message or automated phone call during the authentication process. The user is then required to enter a pin or carry out an alternative action such as pressing a key.  API options include GatewayAPI, Twilio API, Messagebird API, etc.

**Hardware Token Authentication:** This involves using a separate purpose-built device to generate “One Time Passwords”. This is considered one of the most secure ways of providing an extra step but may prove impractical and unnecessary in most settings.

**Software Token Authentication:** Authentication applications such as Google Authenticator and Authy on mobile devices provide similar security to a hardware token whereby a “Time Based One Time Password” is provided.

**Biometric Verification:** Provide authentication through the users’ face or fingerprint. However, it’s important to note that not all users have access to devices capable of providing this functionality.

**Email Token Verification:** Use email address to verify attempts to gain access.

Let’s examine a sample use case of the Twilio Verify API to provide an additional knowledge factor to a user verification process. 
<br><br>

### Setup of 2SA for user

1. Request the user’s phone number when setting up the extra factor for authentication.
2. Verify the user’s phone number to ensure it is valid, and prevent the user from locking themselves out of their account due to an error in the phone number.
3. Upon successful verification of the phone number ensure an extra factor is required for authentication in the existing authentication system. This verification can be completed either through SMS or phone call from Twilio API.
<br><br>

### Authentication for user when 2SA is enabled

1. Intervene when the user attempts to login by requesting a valid code. This is sent via SMS or through an automated phone call.
2. Use Twilio Verify API to check the validity of the extra factor being provided i.e. that the code entered by the user during the login process is the one provided by the API.
3. If the Verify API does not deem the code entered to be valid, do not allow the user to proceed with the login process.
4. Give the option to verify their login attempt again.
5. Unless the user can verify their login attempt via the second step, do not allow access to the account.
<br><br>

### Example of a simple Twilio integration for sending and verifying SMS verification code

Upon creating an account with Twilio, obtain the account ID as well as the authentication token from the Twilio Console. Navigate to Twilio Verify in the console, and create a verify service. There is a graphical user interface here that makes the creation of the verify service quick and easy. Upon completing this step, you will be provided with an identification code for the service.

These credentials should be stored in the secrets file as they are sensitive information that may be exploited. Install the ‘twilio-ruby’ gem in order to ensure access to the Twilio specific methods.

Create and send a verification through SMS or phone call to the phone number being verified. You can change the verification method in the channel parameter.

```ruby
require 'rubygems'
require 'twilio-ruby'
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
service_id = ENV['TWILIO_SERVICE']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client.verify
               .services(service_id)
               .verifications
               .create(to: params[:phone_number_to_verify], channel: 'sms')
```
<br><br>
Then use the same Twilio client and service to create a verification check with the code that the user has entered.

```ruby
verification_check = @client.verify
                     .services(service_id)
                     .verification_checks
                     .create(to: params[:phone_number_to_verify], code: params[:code_entered])
```
<br><br>
The verification check created has a status which will either equal ‘approved’ when the correct code is entered, or ‘pending’ when the incorrect code is entered or if it has not been provided by the user yet.

This very simple integration can be used to support the high-level steps that allow the use of SMS as an additional factor for the authentication process, thus allowing users access to greater levels of security for their accounts.

All in all, it was a great experience to be able to focus on the complexities of handling the process of 2SA. The Twilio Verify API lightened our workload as it’s much simpler in comparison to other providers of automated SMS messages and phone calls for the set up of MFA.

Multi step authentiation is a simple way to vastly increase the security of your online accounts. Being proactive in securing your data through enabling multi step authentication is one way of decreasing your likelihood of being a victim of cybercrime. In the coming weeks, we will be releasing this for all OnePageCRM users. 



