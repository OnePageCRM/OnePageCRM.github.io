---
layout: api
title: "Team Stream"
slug: "team-stream"
beta: true
category: mainresources
date: 2014-03-04 10:11:27
---

This endpoint corresponds to the Team Stream view in the OnePageCRM web application. It is similar to the Action Stream but shows the whole teams stream.

A `user_id` parameter can be applied to only show that users action stream.

<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <td>Method</td>
      <td>Url</td>
      <td>Note</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="get-text">GET</span></td>
      <td><code class="bluetext">team_stream.format</code></td>
      <td> Returns all contacts, sorted the 'OnePageCRM' action stream way</td>
    </tr>
    <tr>
      <td><span class="get-text">GET</span></td>
      <td><code class="bluetext">action_stream.format?user_id={user_id}</code></td>
      <td> Returns the specified users contacts, sorted the 'OnePageCRM' action stream way. </td>
    </tr>
  </tbody>
</table>