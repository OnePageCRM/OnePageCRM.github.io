---
layout: api
title: "Signing Process"
slug: "signing"
category: basics
date: 2014-02-20 11:22:22
---


<h3 id="header-parameters">Header Parameters</h3>
<p>These parameters need to be included with every request made to the API other than the initial call to <code class="bluetext">login.format</code>.</p>
<table class="table table-bordered table-striped">
  <thead>
    <td>Parameters</td>
    <td>Description</td>
  </thead>
  <tbody>
    <tr>
      <td class="strong nowrap">X-OnePageCRM-UID</td>
      <td>The user’s unique identification number(<code class="bluetext">user_id</code>), received after sending email and password to <code class="bluetext">login.format</code>.</td>
    </tr>
    <tr>
      <td class="strong nowrap">X-OnePageCRM-TS</td>
      <td>The current timestamp in unix time (in seconds)</td>
    </tr>
    <tr>
      <td class="strong nowrap">X-OnePageCRM-Auth</td>
      <td>SHA-256 of the authentication signature calculated for every request based on the data sent.</td>
    </tr>
  </tbody>
</table>

<div class="alert alert-danger">
<strong>Warning:</strong> These headers are case sensitive! If you do not send these headers exactly as they appear here you will obtain a <strong>"401 Unauthorized"</strong> error when making signed requests.
</div>

<h3 id="authentication-signature">Authentication Signature</h3>
<p>The signing process ensures that all API requests are secure, using a similar signing process to the OAuth standard. It is based on 5 separate variables:</p>
<ol>
  <li>The <code class="bluetext">user_id</code> received from <code class="bluetext">login.format</code>.</li>
  <li>The current unix timestamp in seconds. This has to be the same as the value in the header field <strong>X-OnePageCRM-TS.</strong></li>
  <li>The http request method name as an uppercase string, either “<span class="get-text">GET</span>”, “<span class="post-text">POST</span>”, “<span class="put-text">PUT</span>” or “<span class="delete-text">DELETE</span>”.</li>
  <li>The SHA-1 hash of the full request url, written as a lowercase hex string.</li>
  <li>The SHA-1 hash of the raw request body. This is left out for <span class="get-text">GET</span> or <span class="delete-text">DELETE</span> requests.</li>
</ol>

<h3 id="calculating-request-signature-value">Calculating request signature value</h3>
<p>The Request signature is a HMAC-SHA256 hash (written in hex using lowercase for a-f) of a string which consists of 4 (for <span class="get-text">GET</span> and <span class="delete-text">DELETE</span> requests) or 5 (for <span class="put-text">PUT</span> and <span class="post-text">POST</span> requests) dot-separated elements, which are (in this exact order):</p>
<ol>
  <li><strong>X-OnePageCRM-UID</strong> header value</li>
  <li><strong>X-OnePageCRM-TS</strong> header value</li>
  <li>HTTP request method name, uppercase (<span class="get-text">GET</span>, <span class="post-text">POST</span>, <span class="put-text">PUT</span> or <span class="delete-text">DELETE</span>)</li>
  <li>SHA-1 (written in hex using lowercase for a-f) hash of the full request URL</li>
  <li>(only for <span class="put-text">PUT</span> and <span class="post-text">POST</span> requests) SHA-1 hash (written in hex using lowercase for a-f) has of the raw request body.</li>
</ol>
<p>The HMAC-SHA256 signature is calculated using the API-KEY as the signing key.
The API key as received from the API is Base-64 encoded, so it has to be decoded into whatever format the HMAC-SHA256 function you are using requires. Usually this is a byte array.</p>
<p>The resulting lowercase hex is the value for the <strong>X-OnePageCRM-Auth</strong> header field.</p>

<h3 id="example-signature">Example Signature</h3>
<p>We want to edit a contact with an id of <code class="inline">‘4d91d3ea6381904e44000026’</code> and partially update his first and last name.</p>
<ul>
  <li>The full url for this request is: <code class="inline">‘https://app.onepagecrm.com/api/v3/contacts/4d91d3ea6381904e44000026.json?partial=1’</code></li>
  <li>The raw request body to partially update the contact’s name is: <code class="inline">‘{"firstname":"John", "lastname":"Doe"}’</code></li>
  <li>The request type in uppercase is: <span class="label label-default">PUT</span></li>
  <li>The unix timestamp used for this request is: <code class="inline">1401366488</code></li>
  <li>The user id as received from the login function is: <code class="inline">4e0046526381906f7e000002</code></li>
  <li>The api key as received from the login function is: <code class="inline">AJfSRLr7uhsa9lOIgKQ4Vu72zzg3QTE7pJL2iSeA6Mo=</code></li>
</ul>
<p>Now we have to build the string which we can then encode using the API_key. When converting strings to a SHA-1 hash they should be saved as strings of hex values with lowercase letters for ‘a’ to ‘f’.</p>
<ul>
  <li>The url has to be SHA-1 encoded resulting in: <code class="inline">813617379a1e9903964546d9668042cb39c5d73f</code></li>
  <li>The request body has to be SHA-1 encoded resulting in: <code class="inline">9970204aa4ec9813b84652747b33142ac6dc2821</code></li>
  <li>The format of the string to be encoded is formed by string together the user_id, timestamp, request type, SHA-1 hash of the url and SHA-1 hash of the post body. They have to be in this order and separated by dots. The sample string is: <code class="inline">‘4e0046526381906f7e000002.1401366488.PUT.813617379a1e9903964546d9668042cb39c5d73f.9970204aa4ec9813b84652747b33142ac6dc2821’</code></li>
</ul>
<p>Finally the signature string has to be HMAC-SHA256 encoded using the API key as signing key. The API key is received from the login call as a base-64 encoded byte array, and most HMAC signing functions require the key to be in plain bytes. Some languages and libraries have methods for this conversion, others require the API key to first be converted to a hex string which can then be converted to a byte array. See the sample code below for details.</p>
<p>Here is the resulting signature for the sample values: <code class="inline">‘85b1bbf78139c7e98e79d6d1faf40eaad9332cf53f8dedc8c755deeab3d39211’</code></p>

<h3 id="sample-code">Sample Code</h3>
<p>To help with the signing process we have written the functions for signing API calls in various languages.</p>


<!-- Nav tabs -->
<ul class="nav nav-tabs">
  <li class="active"><a href="#ruby" data-toggle="tab">Ruby</a></li>
  <li><a href="#objectivec" data-toggle="tab">Objective-C</a></li>
  <li><a href="#javascript" data-toggle="tab">Javascript</a></li>
  <li><a href="#csharp" data-toggle="tab">C#</a></li>
  <li><a href="#java" data-toggle="tab">Java</a></li>
  <li><a href="#python" data-toggle="tab">Python</a></li>
  <li><a href="#PHP" data-toggle="tab">PHP</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
<div class="tab-pane fade in active" id="ruby">
    <script src="https://gist.github.com/OnePageCTO/5910804.js"></script>
  </div>
  <div class="tab-pane fade" id="objectivec">
    <script src="https://gist.github.com/OnePageCTO/6012092.js"></script>
  </div>
  <div class="tab-pane fade" id="javascript">
    <script src="https://gist.github.com/OnePageCTO/5998588.js"></script>
  </div>
  <div class="tab-pane fade" id="csharp">
    <script src="https://gist.github.com/OnePageCTO/5955980.js"></script>
  </div>
  <div class="tab-pane fade" id="java">
    <script src="https://gist.github.com/OnePageCTO/5950270.js"></script>
  </div>
  <div class="tab-pane fade" id="ruby">
    <script src="https://gist.github.com/OnePageCTO/5910804.js"></script>
  </div>
  <div class="tab-pane fade" id="python">
    <script src="https://gist.github.com/OnePageCTO/5910790.js"></script>
  </div>
  <div class="tab-pane fade" id="PHP">
    <script src="https://gist.github.com/peterOnePageCRM/93c7af55e5063fbf2097.js"></script>
  </div>
</div>
