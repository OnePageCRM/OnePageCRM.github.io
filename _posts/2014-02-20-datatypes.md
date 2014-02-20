---
layout: api
title: "Data Types"
slug: "datatypes"
category: basics
date: 2014-02-20 09:48:13
---

Our API works with following data types:

<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <td>Type</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code class="redtext">string</code></td>
      <td>Text value. Leading and trailing spaces are removed.</td>
    </tr>
    <tr>
      <td><code class="redtext">bson_id</code></td>
      <td>Text value. This is a 24 character long string hexadecimal characters.</td>
    </tr>
    <tr>
      <td class="nowrap"><code class="redtext">boolean</code></td>
      <td>In JSON, booleans are represented natively, in other formats, 0 for false and 1 for true are used.</td>
    </tr>
    <tr>
      <td><code class="redtext">integer</code></td>
      <td>In XML, integers are marked with <code class="bluetext">type=”integer”</code> attribute.</td>
    </tr>
    <tr>
      <td><code class="redtext">float</code></td>
      <td>In XML, floats are marked with <code class="bluetext">type=”float”</code> attribute.</td>
    </tr>
    <tr>
      <td><code class="redtext">date</code></td>
      <td>Dates are represented as strings in ISO 8601 format: ‘yyyy-mm-dd’.<br/>Note: in case of actions, dates can also be ‘asap’ (infinitely close date) or ‘waiting’ (infinitely far date).</td>
    </tr>
    <tr>
      <td><code class="redtext">time</code></td>
      <td>Unix time, number of seconds since January 1st, 1970 UTC or ISO8601, YYYY-MM-DDThh:mm:ss. <br/>We accept Unix timestamp but we only send out ISO8601 formatted strings.</td>
    </tr>
    <tr>
      <td><code class="redtext">array</code></td>
      <td>Ordered list of values.<br/>In XML, arrays are marked with <code class="bluetext">type=”array”</code> attribute.</td>
    </tr>
    <tr>
      <td><code class="redtext">hash</code></td>
      <td>Associative array.</td>
    </tr>
    <tr>
      <td><code class="redtext">null</code></td>
      <td>Means “no value” (as opposed to “unknown value”). Note that empty strings and empty dates are considered as values and both represented as empty strings.<br/>In XML, nulls are marked with <code class="bluetext">nil=”true”</code> attribute.
      </td>
    </tr>
  </tbody>
</table>
