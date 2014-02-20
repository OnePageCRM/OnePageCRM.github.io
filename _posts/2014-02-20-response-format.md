---
layout: api
title: "Response Format"
slug: "responseformat"
category: basics
date: 2014-02-20 11:20:17
---


<p>Response can be sent in one of the following formats: JSON, XML, YAML.</p>
<p>You must specify the format to be used for each request in a form of file extension:</p>
<p>
  <code class="bluetext">
    /contacts.json<br/>
    /contacts.xml<br/>
    /contacts.yaml
  </code>
</p>
<p>Each response is a hash. Only response time and status fields are always present.</p>

<h3 id="status-codes">Status Codes</h3>
<p>Responses return with one of the following standard HTTP status codes:</p>
<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <td>Code</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="greentext strong">200</td>
      <td>OK - Operation successful.</td>
    </tr>
    <tr>
      <td class="redtext strong">400</td>
      <td>Bad Request. The request is not properly formatted, doesn’t properly specify response format or contains improper parameters or data.</td>
    </tr>
    <tr>
      <td class="redtext strong">401</td>
      <td>Unauthorised. Authorization data is absent, invalid or expired. Generally this means that a login form should be displayed to a user.</td>
    </tr>
    <tr>
      <td class="redtext strong">403</td>
      <td>Forbidden. Issued when user is logged in, but does not have permission for requested operation. This includes cases when user has reached limits like allowed number of contacts.</td>
    </tr>
    <tr>
      <td class="redtext strong">404</td>
      <td>Resource Not Found. When an id was provided for a request but no resource exists for that object.</td>
    </tr>
    <tr>
    <td class="redtext strong">409</td>
    <td>Precondition Failed. Server state does not allow requested operation to be carried on. Issued in cases such as when trying to add an assigned next action to a contact which already has one
      assigned for a user.</td>
    </tr>
    <tr>
      <td class="redtext strong">500</td>
      <td>Internal Server Error.</td>
    </tr>
  </tbody>
</table>
<p>The five error codes represent five main types of failures:</p>
<ul>
  <li>Code <span class="redtext strong">400</span> means a problem is in your implementation. Fault is on you.</li>
  <li>Code <span class="redtext strong">401</span> means user just needs to login. Generally, fault is on no one.</li>
  <li>Code <span class="redtext strong">403</span> means operation is forbidden for a user. Fault is on user. Although in some cases, you could have prevented this by not sending the request in the first place.</li>
  <li>Code <span class="redtext strong">409</span> means the stars were not aligned for this to happen. Sometimes you could have foreseen it, sometimes not.</li>
  <li>Code <span class="redtext strong">500</span> means server messed up. Fault is on us.</li>
</ul>

<h3 id="base-fields">Base Fields</h3>
<p>Following fields are present in every response.</p>
<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <td>Type</td>
      <td>Name</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="nowrap"><code class="redtext">integer</code></td>
      <td><code class="bluetext">status</code></td>
      <td>Duplication of HTTP response status for convenience</td>
    </tr>
    <tr>
      <td><code class="redtext">time</code></td>
      <td class="nowrap"><code class="bluetext">timestamp</code></td>
      <td>Time of response</td>
    </tr>
  </tbody>
</table>

<h3 id="failed-requests">Failed Requests</h3>
<p>These fields are present if a request has failed with a Client Error status (4xx).</p>
<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <td>Type</td>
      <td>Name</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="nowrap"><code class="redtext">string</code></td>
      <td><code class="bluetext">error_name</code></td>
      <td>Short description of a failure to be used in your failure handling codes.
        You can see full lists of possible errors in every resource’s section.</td>
      </tr>
      <tr>
        <td><code class="redtext">string</code></td>
        <td class="nowrap"><code class="bluetext">error_message</code></td>
        <td>Human-readable description of a failure (meant for developers)</td>
      </tr>
      <tr>
        <td><code class="redtext">string</code></td>
        <td><code class="bluetext">more_info</code></td>
        <td>URL to documentation page describing the failure</td>
      </tr>
    </tbody>
  </table>