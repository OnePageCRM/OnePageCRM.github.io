---
layout: post
title: "Rails to AWS lambda: JSON Web Tokens"
slug: "rails_to_aws_lambda_json_web_tokens"
category: blog
post_image: "/assets/images/articles/jwt.png"
author: liam
author_image: "/assets/images/authors/liam.jpg"
author_bio: " Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Ipsum has been the industry's standard dummy"
date: 2018-03-08 09:00:00
excerpt: "JWTs are a well defined standard for creating, signing, verifying, encrypting and decrypting web tokens"
---


<div class="text-align: center" style="display:none">
    <img src="/assets/images/jwt.png" alt="OnePageCRM" class="img-responsive"
     style="width: 100%; position: relative" /><br />
</div>

*Continuation from our last post on [communication and authorization]({% post_url 2018-03-02-rails-to-aws-lambda-communication-and-authentication %}){:target='_blank'} between Rails and Lambda (NodeJS).*

JWTs are a well defined standard for creating, signing, verifying, encrypting and decrypting web tokens. By this fact, we should be able to find popular, reliable and actively supported gems / packages for both Ruby and NodeJS which will do the hard work for us.

### Ruby

The authentication flow will be two-way, I will start by creating a signed & encrypted JWT in ruby. I'll use the [json-jwt](https://github.com/nov/json-jwt){:target='_blank'} gem as it offers all the options I need for creating the JWT, and has a [simple API](https://github.com/nov/json-jwt/wiki){:target='_blank'}. 

Let's assume we have a user model with an id, and a boolean telling us whether they are a superuser or not:
```ruby
class User
  Include Mongoid::Document

  field :id, type: BSON::ObjectId
  field :superuser, type: Boolean
end
```

To represent this user and what they are Authorized to do, we will want to send both of these fields in the JWT payload. There are another two fields which are useful to include within a JWT payload:

<br/>
### Nonce

A [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce){:target='_blank'} is a randomly generated number which can only be used once. It's primary use is to prevent replay attacks, as the same auth data can't be used twice, and to prevent breaking the encryption. If the encrypted data is always the same (eg. the above user data only) then the encrypted data may contain the same pattern of characters which can (potentially) be used to find the encryption key if the algorithm used is too weak.

<br/>
### Timestamp

The timestamp has a similar purpose to the nonce, but instead of having to save every nonce ever received to check that it hasn't been used before, there is a limited window (eg. 5 minutes) during which the auth data is valid. If a token with an outdated timestamp is received, then the request should be ignored. The one downside of this approach is that the servers will need to have accurate times (eg. synced via [NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol){:target='_blank'}), but this is a given for almost all servers connected to the internet

<br/>
### Algorithms

There are a variety of encryption algorithms supported by by the json-jwt gem. My aim is to secure the token so that 

* I can verify who created the token
* It can only be read by it's intended recipient

For this, asymmetric public-private key encryption is well suited. The [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)){:target='_blank'} public-private key cryptosystem is well suited for this. 

Using the 512 bit key variety is sufficient, as in this configuration the public key will never be publicly available. It will only be handed to the other service which we are communicating with. The specific algorithm for signing is RS256, which is a RSA Signature with SHA-256.

For the encryption algorithm we will need to specify a slightly different algorithm with [padding](https://en.wikipedia.org/wiki/Padding_(cryptography)#Public_key_cryptography){:target='_blank'}, in this case RSA with [OAEP](https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding){:target='_blank'}( Optimal Asymmetric Encryption Padding):

```ruby
JWT_SIGNATURE_ALGORITHM = :RS256
JWT_ENCRYPTION_ALGORITHM = :'RSA-OAEP'
```

Next we will need two sets of keys to use with our jwt. For this I'm using the openssl package available on most linux systems:

```bash
# generate a 512 bit private key
openssl genpkey -algorithm RSA -our private_key1.pem -pkeyopt rsa_keygen_bits:512
# extract the public key from the private key
openssl rsa -pubout -in private_key1.pem -out public_key1.pem
```

And again for the second pair:

```bash
# generate a 512 bit private key
openssl genpkey -algorithm RSA -our private_key2.pem -pkeyopt rsa_keygen_bits:512
# extract the public key from the private key
openssl rsa -pubout -in private_key2.pem -out public_key2.pem
```

<br/>
### Implementation in ruby

<br/>
#### Sign and Encrypt JWT

Now to writing the code for our rails server to generate JWTs:

```ruby
JWT_SIGNATURE_ALGORITHM = :RS256
JWT_ENCRYPTION_ALGORITHM = :'RSA-OAEP'

PRIVATE_KEY_1 = ::OpenSSL::PKey::RSA.new(File.read(::Rails.root.join('private_key1.pem')))
PUBLIC_KEY_2 = ::OpenSSL::PKey::RSA.new(File.read(::Rails.root.join('public_key2.pem')))

def create_jwt(payload_data)
  payload = {
    timestamp: Time.now.to_i,
    nonce: ::SecureRandom.uuid,
    data: payload_data
  }

  jwt = ::JSON::JWT.new(payload)
  signed = jwt.sign(PRIVATE_KEY_1, JWT_SIGNATURE_ALGORITHM)
  encrypted = signed.encrypt(PUBLIC_KEY_2, JWT_ENCRYPTION_PADDING)

  return encrypted.to_s
 end
```

Here the create_jwt function is defined to take a payload_data hash. This is set in the JWT payload along with a nonce and timestamp. The data is used to initialize a JWT object. This is then signed with the rails app's private key. Then the signed JWT is encrypted with the lambda functions public key.

There are some defaults employed by the JSON JWT gem which you need to be aware of. It follows the default specification of a JWT (see the [official spec](https://tools.ietf.org/html/rfc7519#section-1){:target='_blank'}) and uses the compact notation of JWS (JSON Web Serialization) and JWE (JSON Web Encryption). In this case we are using the later as the JWT is encrypted.

#### Decrypt and verify JWT

The counterpart of the signing and encrypting is the same but in reverse. If a JWT was encrypted with PUBLIC_KEY_1, then we decrypt with PRIVATE_KEY_1. If it was signed with PRIVATE_KEY_2, then it will be verified with PUBLIC_KEY_2:
```ruby
JWT_SIGNATURE_ALGORITHM = :RS256
JWT_ENCRYPTION_ALGORITHM = :'RSA-OAEP'

PRIVATE_KEY_1 = ::OpenSSL::PKey::RSA.new(File.read(::Rails.root.join('private_key1.pem')))
PUBLIC_KEY_2 = ::OpenSSL::PKey::RSA.new(File.read(::Rails.root.join('public_key2.pem')))

def decrypt_and_verify(jwe)
  jwt = JSON::JWT.decode(jwe, PRIVATE_KEY_1)
  jwt_payload = JSON::JWT.decode(jwt.plain_text, PUBLIC_KEY_2)
  return jwt_payload
end
```

### Implementation in NodeJS

In nodeJS, there exists the excellent [NODE-JOSE](https://www.npmjs.com/package/node-jose){:target='_blank'} (JSON Object Signing and Encryption) package. This is a lot more verbose and customizable than it's ruby counterpart. 

There is also a lack of examples available for this library, which is why I hope my code below will be useful to others. One of the few samples I came across was a [blog post by codeburst.io](https://codeburst.io/securing-tokens-with-help-from-jose-33d8c31835a1){:target='_blank'}. I highly recommend checking it out to better understand the options available.

### Here are examples on how to sign, verify, encrypt and decrypt JWT via  the NODE-JOSE library:

#### Sign and Encrypt JWT

```javascript
var jose = require('node-jose')

// need to hardcode the contents of the keys or include the as ENV vars
//  as it's not worth configuring lambda for a filesystem just to retrieve keys
var PRIVATE_KEY_2 = "…."
var PUBLIC_KEY_1 = "..."

var keystore = jose.JWK.createKeyStore()
var private_key_2 = null
var public_key_1 = null

encrypt = function(payload_data){
  var jwtData = {
    timestamp: Math.floor(Date.now() / 1000),
    nonce: uuidv1(),
    data: payload_data
  }

  return keystore.add(PRIVATE_KEY_2, 'pem')
  .then(function(result){
    private_key_2 = result

    return keystore.add(PUBLIC_KEY_1, 'pem')
  }).then(function(result){
    public_key_1 = result

    return jose.JWS.createSign({
        alg: 'RS256',
        format: 'compact'
      }, private_key_2)
    .update(new Buffer(JSON.stringify(jwtData))
    .final()
  }).then(function(jwt){

    return jose.JWE.createEncrypt({
        alg: 'RSA-OAEP',
        format: 'compact'
      }, public_key_1)
    .update(jwt)
    .final()
  }).then(function(jwe){
    return jwe
  });
}
```

This a promise based implementation which matches the ruby version but using the opposite keys. 

One problem is that a lambda function doesn't have access to the file system by default. It is easier to hardcode the plain text content of the keys, or alternatively supply them as environment variables to the lambda function.

As the NODE-JOSE library offers more configuration and customization,  we need to explicitly configure the signature and encryption to use the compact format. 

The JWT payload needs to be supplied to it as a string buffer of the json-encoded object.

#### Decrypt and Verify JWT

The decrypt and verify implementation follows a similar suit:
```javascript
var jose = require('node-jose')

// need to hardcode the contents of the keys or include the as ENV vars
//  as it's not worth configuring lambda for a filesystem just to retrieve keys
var PRIVATE_KEY_2 = "…."
var PUBLIC_KEY_1 = "..."

var keystore = jose.JWK.createKeyStore()
var private_key_2 = null
var public_key_1 = null

function decrypt(token){
  return keystore.add(PRIVATE_KEY_2, 'pem')
  .then(function(result){
    var private_key_2 = result

    return keystore.add(PUBLIC_KEY_1, 'pem')
  }).then(function(result){
    var public_key_1 = result

    return jose.JWE.createDecrypt(formPrivateKey)
    .decrypt(token)
  }).then(function(result){

    return jose.JWS.createVerify(webPublicKey)
    .verify(result.plaintext.toString('utf8')
  }).then(function(result){
    return JSON.parse(result.payload.toString('utf8'))
  })
}
```

The decryption and verify algorithms don't need to be explicitly specified as they are specified within the JWT. But unlike the ruby gem, the payload needs to be parsed from its JSON string into an object. You need to be careful to convert the payload returned from the NODE-JSON library to a string while specifying the encoding as UTF-8 to avoid malformed data.

<br/>

There is a good variety of communication and authorization methods available for communicating between web services. Using JWT auth token headers to authorize HTTP requests was surprisingly convoluted to setup. But once I understood all of the libraries and configurations available, this method works reliably and is very secure thanks to asymmetric key encryption with added randomization in the payloads thanks to nonces and timestamps.

If you need to securely communicate between web services, I fully recommend encrypted JSON Web Tokens. Hopefully this post will help you get started with them in NodeJS or Ruby environments.
