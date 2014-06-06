---
layout: api
title: "Contact Photo - Beta"
slug: "contactphoto"
category: otherresources
date: 2014-03-04 10:35:28
---

Contact photos can be uploaded using the API.
It takes a parameter 'image', which must be a Base64 encoded string.

The Base64 encoded string must be a Base64 encoded image file.

Images will be cropped to a square and resized to 73px.

<h3 id="urls">URL</h3>
<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <td>Method</td>
      <td>Url</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="get-text">PUT</span></td>
      <td><code class="bluetext">contacts/#{id}/contact_photo.json</code></td>
      <td>Update contact with this photo</td>
    </tr>
  </tbody>
</table>

<h3 id="resource-fields">Resource Fields</h3>
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
      <td><code class="redtext">Base64 Encoded jpg/png</code></td>
      <td class="nowrap"><code class="bluetext">image</code></td>
      <td>A base64 encoded jpg or png image file</td>
    </tr>
  </tbody>
</table>


