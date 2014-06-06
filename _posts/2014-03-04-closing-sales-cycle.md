---
layout: api
title: "Closing Sales Cycle"
slug: "closing-sales-cycle"
category: otherresources
date: 2014-03-04 10:35:27
---

It is possible to close and reopen the Sales Cycle using the API.
As these methods are put requests, it is important that the body of the request is not empty.
When closing the sales cycle, you can add a closing comment.

<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <td class="smaller">Method</td>
      <td>Url</td>
      <td>Body</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="put-text">PUT</span></td>
      <td>
        <code class="bluetext">contacts/{id}/close_sales_cycle.format</code>
      </td>
      <td>
      	<code>
      		{ "comment" : "closed because not interested" }
      	</code>
      </td>
      <td>Close the sales cycle</td>
    </tr>
    <tr>
      <td><span class="put-text">PUT</span></td>
      <td>
        <code class="bluetext">contacts/{id}/reopen_sales_cycle.format</code>
      </td>
      <td>
      	<code>
      		{ }
      	</code>
      </td>
      <td>Reopen the sales cycle</td>
    </tr>
    
  </tbody>
</table>