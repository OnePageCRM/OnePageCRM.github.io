---
layout: api
title: "Utilities"
slug: "help-information"
category: otherresources
date: 2014-03-04 10:36:19
---

### Settings
This returns general user settings. These settings are also included in a call to the `bootstrap.format` endpoint.

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
      <td><span class="get-text">GET</span></td>
      <td><code class="bluetext">settings.format</code></td>
      <td>Gets user settings</td>
    </tr>
  </tbody>
</table>


  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse"  href="#settingsjson">
          Sample response from <code>settings.json</code>
        </a>
      </h4>
    </div>
    <div id="settingsjson" class="panel-collapse collapse">
      <div class="panel-body">
{% highlight json %}
  {
    "status": 0,
    "message": "OK",
    "timestamp": 1406882735,
    "data": {
      "reminder": {
        "type": "new_task",
        "hour": 6
      },
      "time_zone": "london",
      "date_format": "%d/%m/%Y",
      "listing_size": 25,
      "currency": "EUR",
      "popular_countries": [
        "US"
      ],
      "deal_stages": [
        {
          "stage": 10,
          "label": "Qualification"
        },
        {
          "stage": 25,
          "label": null
        },
        {
          "stage": 50,
          "label": "Decision"
        },
        {
          "stage": 75,
          "label": null
        },
        {
          "stage": 90,
          "label": "Negotiation"
        }
      ],
      "default_contact_type": "company"
    }
  }

{% endhighlight %}
      </div>
    </div>
  </div>









<h3 id="currencies">Currencies</h3>
<p>This returns a list of currencies accepted and used by OnePageCRM. When updating a currency you must use one of these.</p>
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
      <td><span class="get-text">GET</span></td>
      <td><code class="bluetext">currencies.format</code></td>
      <td>Get a list of currencies</td>
    </tr>
  </tbody>
</table>

<h3 id="currencies">Countries</h3>
<p>This returns a list of countries used for addresses in OnePageCRM.</p>
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
      <td><span class="get-text">GET</span></td>
      <td><code class="bluetext">countries.format</code></td>
      <td>Get a list of countries</td>
    </tr>
  </tbody>
</table>

<h3 id="time-zones">Time Zones</h3>
<p>This returns a list of currencies accepted and used by OnePageCRM. When updating a currency you must use one of these.</p>
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
      <td><span class="get-text">GET</span></td>
      <td><code class="bluetext">time_zones.format</code></td>
      <td>Get a list of time zones</td>
    </tr>
  </tbody>
</table>

<h3 id="resource-fields">Resource Fields</h3>
<p>You can use this to get a list of fields that can be returned for each resource type. This should be used in conjunction with the rest of the documentation but you could also use it to dynamically build object to store responses from the server.</p>
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
      <td><span class="get-text">GET</span></td>
      <td><code class="bluetext">resource_fields.format</code></td>
      <td>Get a list of fields returned for each type of resource</td>
    </tr>
    <tr>
      <td><span class="get-text">GET</span></td>
      <td><code class="bluetext">resource_fields/{resource_name}.format</code></td>
      <td>Return fields for a single resource type</td>
    </tr>
  </tbody>
</table>
<div class="overview">
  <p class="overview-title">NOTES:</p>
  <p class="overview-content">The supported resource names are: <strong>actions,  activities, contacts, companies, currencies, custom_fields, deals, filters, lead_sources, notes, settings, statuses, predefined_actions, tags, time_zones, users</strong>.</p>
</div>

<h4>Resource Fields</h4>
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
      <td><code class="redtext">array</code></td>
      <td><code class="bluetext">{resource_name}</code></td>
      <td>List of fields returned when getting this resource</td>
    </tr>
  </tbody>
</table>
