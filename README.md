OnePageCRM.github.io
====================

OnePageCRM Developer Site

#How to create a new API section
Run the bin/jekyll-api-section file to generate the correct file:

    usage: jekyll-api-section TITLE SLUG CATEGORY \[FILENAME\] \[OPTIONS\]

    Options
        -e, --edit                       Edit the section
        -l, --link                       Relink sections
        -p, --path PATH                  Path to project root


To create a new API section for the Request Parameters section, run the following command:

    ruby bin/jekyll-api-section "Request Parameters" requestparams doc

This script will create a new file in _posts datestamped with the correct format for Jekyll
It also creates a symlink without the datestamp to this file in the _api folder.
Edit this new file to add your api section.