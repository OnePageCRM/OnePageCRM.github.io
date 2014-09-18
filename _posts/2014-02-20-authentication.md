---
layout: api
title: "Authentication"
slug: "auth"
category: basics
date: 2014-02-20 11:22:06
---


<p>These methods allow you to gain access to to your account by providing you with an auth key in exchange for valid login credentials. There are also methods for logging out, changing your password and changing your auth key.</p>

<h3 id="login">Login</h3>
<h4 id="login-urls">URLs</h4>
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
      <td class="post-text strong">POST</td>
      <td><code>login.format</code></td>
      <td>Log in to your OnePageCRM account</td>
    </tr>
    <tr>
      <td class="get-text strong">GET</td>
      <td><code>bootstrap.format</code></td>
      <td>Get all the data that is returned with a login request</td>
    </tr>
  </tbody>
</table>

<h4 id="login-request-fields">Request Fields</h4>
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
      <td><code>string</code></td>
      <td><code>login</code></td>
      <td>Email address of user logging in</td>
    </tr>
    <tr>
      <td><code>string</code></td>
      <td><code>password</code></td>
      <td>Password of the user logging in</td>
    </tr>
  </tbody>
</table>

<h4 id="login-resource-fields">Resource Fields</h4>
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
    <td><code>string</code></td>
  <td><code>auth_key</code></td>
  <td>This is a base64 encoded string that you must use to sign
    further api requests.</td>
  </tr>
  <tr>
    <td><code>string</code></td>
    <td><code>user_id</code></td>
    <td>ID of the user</td>
  </tr>
  <tr>
    <td><code>string</code></td>
    <td><code>account_type</code></td>
    <td>Which type of account the user has. This will be one of:
      <strong>free</strong>, <strong>pro</strong> or <strong>trial</strong>.</td>
  </tr>
  <tr>
    <td><code>array</code></td>
    <td><code>custom_fields</code></td>
    <td>A list of custom field objects that the user has.
      For more information visit the custom fields documentation page.</td>
    </tr>
    <tr>
      <td><code>array</code></td>
      <td><code>filters</code></td>
      <td>User’s list of custom filters</td>
    </tr>
    <tr>
      <td><code>object</code></td>
      <td><code>user</code></td>
      <td>User’s first name, last name, email, bcc email, company name and account rights. For more information visit the user documentation page.</td>
    </tr>
    <tr>
      <td><code>array</code></td>
      <td><code>team</code></td>
      <td>A list of other users on the above user’s team. Each item is a user resource. For more information visit the user documentation page.</td>
    </tr>
    <tr>
      <td><code>object</code></td>
      <td><code>settings</code></td>
      <td>User's date format, reminders, currency, timezone, default contact type, popular countries and contacts listing size.</td>
    </tr>
  </tbody>
</table>
      
<h4 id="login-additional-data">Additional data</h4>
<p>When logging in you will also receive additional data which provides information about a user’s account. This information includes statuses, lead sources, tags, sales data, team stream. This information is returned outside of the data object.</p>
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
      <td><code>array</code></td>
      <td><code>statuses</code></td>
      <td>List of status resources for the user’s account</td>
    </tr>
    <tr>
      <td><code>array</code></td>
      <td><code>tags</code></td>
      <td>List of tag resources for the user’s account</td>
    </tr>
    <tr>
      <td><code>array</code></td>
      <td><code>lead_sources</code></td>
      <td>List of lead sources for the user’s account</td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td><code>team_stream</code></td>
      <td>
        Every item is a <span>hash</span> with 2 elements:
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
              <td><code>array</code></td>
              <td><code>users</code></td>
              <td>
                Every item is a <span>hash</span> with 2 elements:
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
                      <td><code>bson_id</code></td>
                      <td><code>user_id</code></td>
                      <td>id for user on this team</td>
                    </tr>
                    <tr>
                      <td><code>int</code></td>
                      <td><code>counts</code></td>
                      <td>total number of contacts the above user owns or has actions for.</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td><code>int</code></td>
              <td><code>all</code></td>
              <td>total number of contacts this team has</td>
            </tr>
          </tbody>
        </table>
        This is used to convert the ‘<strong>stage</strong>’ field of deals into a string.
      </td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td><code>contacts_count</code></td>
      <td>
        This returns the number of total number of contacts, for each user and for the whole team, arranged by how many contacts have a last name beginning with each letter of the alphabet. Every item is a <span>hash</span> with 2 elements:
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
              <td><code>array</code></td>
              <td><code>users</code></td>
              <td>
                Every item is a <span>hash</span> with 28 elements:
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
                      <td><code>bson_id</code></td>
                      <td><code>user_id</code></td>
                      <td>id for user on this team</td>
                    </tr>
                    <tr>
                      <td><code>int</code></td>
                      <td><code>total_count</code></td>
                      <td>total number of contacts the above user owns.</td>
                    </tr>
                    <tr>
                      <td><code>int</code></td>
                      <td><code>1</code></td>
                      <td>number of contacts with last name beginning with a number or special character</td>
                    </tr>
                    <tr>
                      <td><code>int</code></td>
                      <td><code>a</code></td>
                      <td>number of contacts with last name beginning with ‘a‘</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td><code>...</code></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><code>int</code></td>
                      <td><code>z</code></td>
                      <td>number of contacts with last name beginning with ‘z’</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td><code>hash</code></td>
              <td><code>all</code></td>
              <td>
                Every item is a <span>hash</span> with 27 elements:
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
                      <td><code>bson_id</code></td>
                      <td><code>user_id</code></td>
                      <td>id for user on this team</td>
                    </tr>
                    <tr>
                      <td><code>int</code></td>
                      <td><code>total_count</code></td>
                      <td>total number of contacts the team has</td>
                    </tr>
                    <tr>
                      <td><code>int</code></td>
                      <td><code>1</code></td>
                      <td>number of contacts with last name beginning with a number or special character</td>
                    </tr>
                    <tr>
                      <td><code>int</code></td>
                      <td><code>a</code></td>
                      <td>number of contacts with last name beginning with ‘a’</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td><code>...</code></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><code>int</code></td>
                      <td><code>z</code></td>
                      <td>number of contacts with last name beginning with ‘z’</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td><code>sales</code></td>
      <td>
        Every item is a <span>hash</span> with 4 elements:
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
              <td><code>float</code></td>
              <td><code>target</code></td>
              <td>total sum of money targeted until the expiry date</td>
            </tr>
            <tr>
              <td><code>float</code></td>
              <td><code>won</code></td>
              <td>total sum of money won since the start this periods</td>
            </tr>
            <tr>
              <td><code>float</code></td>
              <td><code>pending</code></td>
              <td>total sum of money in pending deals</td>
            </tr>
            <tr>
              <td><code>date</code></td>
              <td><code>expires</code></td>
              <td>date when the target expires</td>
            </tr>
          </tbody>
        </table>
        This is used to convert the ‘<strong>stage</strong>’ field of deals into a string.
      </td>
    </tr>
  </tbody>
</table>
      
<h3 id="logout">Logout</h3>
<h4 id="logout-urls">URLs</h4>
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
      <td class="get-text">GET</td>
      <td><code>logout.format</code></td>
      <td>Invalidate auth key</td>
    </tr>
  </tbody>
</table>
<div class="alert alert-danger">
  <strong>Warning:</strong> This will log the user out of all applications the user has logged into using this auth key. If you wish to log a user out just forget their auth key.<br/><span class="italic">Note: this includes the mobile application.</span>
</div>

<h3 id="change-auth-key">Change Auth Key</h3>
<h4 id="auth-key-urls">URLs</h4>
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
      <td class="get-text">GET</td>
      <td><code>change_auth_key.format</code></td>
      <td>Invalidate auth key and return a new auth key</td>
    </tr>
  </tbody>
</table>
<div class="alert alert-danger">
  <strong>Warning:</strong> This will log the user out of all applications the user has logged into using this auth key. If you wish to log a user out just forget their auth key.<br/><span class="italic">Note: this includes the mobile application.</span>
</div>

<h4 id="auth-key-resource-fields">Resource Fields</h4>
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
      <td><code>string</code></td>
      <td><code>auth_key</code></td>
      <td>
        This is a base64 encoded string that you must use to sign further api requests.
      </td>
    </tr>
  </tbody>
</table>

<h3 id="sample-code">Sample code</h3>
<div class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title">
      <a data-toggle="collapse"  href="#bootstrapjson">
        Sample <code> GET </code> response from <code>bootstrap.json</code>
      </a>
    </h4>
  </div>
  <div id="bootstrapjson" class="panel-collapse collapse">
    <div class="panel-body">
{% highlight json %}
{
  "status": 0,
  "message": "OK",
  "timestamp": 1411038598,
  "data": {
    "user_id": "540586ae12321312300391",
    "auth_key": "asdfasdfasfwer/rwerwrwfad=",
    "account_type": "trial",
    "custom_fields": [
      {
        "custom_field": {
          "id": "541067771da41730b50007d3",
          "name": "Select Box CF",
          "type": "select_box",
          "choices": [
            "A",
            "B",
            "C",
            "D"
          ],
          "position": 0,
          "reminder_days": null
        }
      }
    ],
    "team": [],
    "settings": {
      "reminder": {
        "type": "new_task",
        "hour": 6
      },
      "time_zone": "london",
      "date_format": "%m/%d/%Y",
      "listing_size": 25,
      "currency": "USD",
      "popular_countries": [
        "US",
        "IE",
        "AE",
        "AO",
        "AF"
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
    },
    "user": {
      "user": {
        "id": "540586ae1da41731e2000391",
        "first_name": "Johnny",
        "last_name": "Bravo",
        "email": "jb@cartoonnetwork.com",
        "company_name": "Cartoon Network",
        "photo_url": "",
        "bcc_email": "540586b41da41731e2000394@users.onepagecrm.com",
        "account_rights": []
      }
    }
  },
  "tags": {
    "tags": [
      {
        "name": "VIP",
        "counts": 2,
        "total_count": 2,
        "action_stream_count": 2
      }
    ],
    "system_tags": [
      {
        "name": "pendings",
        "counts": 0,
        "total_count": 0
      },
      {
        "name": "starred",
        "counts": 0,
        "total_count": 0
      },
      {
        "name": "waiting",
        "counts": 0,
        "total_count": 0
      }
    ]
  },
  "statuses": [
    {
      "status": {
        "counts": 28,
        "total_count": 28,
        "team_counts": [
          {
            "user_id": "540586ae1da41731e2000391",
            "counts": 28
          }
        ],
        "id": "540586b41da41731e2000395",
        "status": "lead",
        "text": "Lead",
        "description": "",
        "color": "f96600",
        "action_stream_count": 28
      }
    }
  ],
  "sales": {
    "target": 5000,
    "won": 0,
    "pending": 0,
    "expires": "2014-09-30"
  },
  "team_stream": {
    "users": [
      {
        "user_id": "540586ae1da41731e2000391",
        "counts": 28
      }
    ],
    "all": 28
  },
  "lead_sources": [
    {
      "counts": 0,
      "total_count": 0,
      "team_counts": [
        {
          "user_id": "540586ae1da41731e2000391",
          "counts": 0
        }
      ],
      "id": "advertisement",
      "text": "Advertisement"
    }
  ],
  "contacts_count": {
    "all": {
      "1": 0,
      "a": 1,
      "b": 1,
      "c": 1,
      "d": 4,
      "e": 3,
      "f": 1,
      "g": 0,
      "h": 2,
      "i": 0,
      "j": 1,
      "k": 2,
      "l": 2,
      "m": 2,
      "n": 1,
      "o": 1,
      "p": 2,
      "q": 0,
      "r": 0,
      "s": 2,
      "t": 0,
      "u": 2,
      "v": 0,
      "w": 0,
      "x": 0,
      "y": 0,
      "z": 0,
      "total_count": 28
    },
    "users": [
      {
        "1": 0,
        "user_id": "540586ae1da41731e2000391",
        "a": 1,
        "b": 1,
        "c": 1,
        "d": 4,
        "e": 3,
        "f": 1,
        "g": 0,
        "h": 2,
        "i": 0,
        "j": 1,
        "k": 2,
        "l": 2,
        "m": 2,
        "n": 1,
        "o": 1,
        "p": 2,
        "q": 0,
        "r": 0,
        "s": 2,
        "t": 0,
        "u": 2,
        "v": 0,
        "w": 0,
        "x": 0,
        "y": 0,
        "z": 0,
        "total_count": 28
      }
    ]
  }
}
{% endhighlight %}
        </div>
      </div>
    </div>