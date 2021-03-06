[![Build Status](https://travis-ci.org/octopusinvitro/ep-plots.svg?branch=gh-pages)](https://travis-ci.org/octopusinvitro/ep-plots)
[![build status](https://gitlab.com/octopusinvitro/ep-plots/badges/gh-pages/build.svg)](https://gitlab.com/octopusinvitro/ep-plots/commits/gh-pages)


# Readme

This is something I started to teach myself how to use web technologies to plot things.

I am using the EveryPolitician dataset to make these plots.


## About

This project uses the [HTML5 Boilerplate](https://html5boilerplate.com/), [Gulp](http://gulpjs.com/) for tasks automation and [Jasmine](http://jasmine.github.io/) for JavaScript tests. You can run the site locally at localhost:4000 using [Browsersync](https://www.browsersync.io/). Check [their guide](https://www.browsersync.io/docs/gulp/) out or keep reading.

Also, CI files have been added to be used with Travis and GitLab. To run tests in their servers, [Test'em](https://github.com/testem/testem) and [PhantomJS](http://phantomjs.org/) are configured in these files. It is recommended that you also run them in your local terminal to ensure that both you and the server are on the same page. Please find instructions below.

## Installing

This is a Jekyll site

### Requirements

You need to have npm installed. You also need Ruby at the version specified by the Gemfile. It's better if you use a Ruby version manager, for example, [rbenv](https://cbednarski.com/articles/installing-ruby/)

### Download

Clone this repository and install dependencies:

```bash
$ git clone <URL>
$ cd repo
$ npm install
```

If you use rbenv:

```bash
$ rbenv local RUBY_VERSION
$ bundle install
```

## Running

### Run all tasks

```bash
$ gulp
```

This will run all the tasks:
* `scss`: compile sass files, then concatenate and minify them,
* `js`: concatenate all javascript files and minify them,
* `img`: perform image optimizations
* `dist`: regenerate the site,
* `vendor`: copy the vendor folder to the output site
* `watch`: everytime there is a change in `scss`, `js` or `dist` files, those tasks will be run and the browser will be refreshed.
* `server`: launch the server. You can then go to [http://localhost:4000](http://localhost:4000) in a browser.

### Run single tasks

You can also run each task separately, for example, to run only the `watch` task:

```bash
$ gulp watch
```


### Running the site

```bash
$ bundle exec jekyll serve --watch
```


## Testing in the browser

Open [http://localhost:4000/test/specrunner.html](http://localhost:4000/test/specrunner.html) file in a browser.


## Testing in the terminal

To run the tests in the terminal, you have to install PhantomJS and Test'em:

* Install PhantomJS.
For example, for version 2.1.1 on a Linux 64bit machine:

```bash
$ PHANTOM_JS=phantomjs-2.1.1-linux-x86_64
$ mkdir ~/tmp
$ pushd ~/tmp
$ wget https://bitbucket.org/ariya/phantomjs/downloads/$PHANTOM_JS.tar.bz2
$ tar xvf $PHANTOM_JS.tar.bz2
$ mv $PHANTOM_JS phantomjs
$ ln -s ~/tmp/phantomjs/bin/phantomjs /usr/bin/phantomjs
$ rm -r $PHANTOM_JS.tar.bz2
$ phantomjs --version
$ popd
```

Test the installation:

```bash
$ phantomjs
phantomjs>
```

Type `phantom.exit();` to leave the PhantomJS prompt.

* Install Testem:

```bash
$ npm install testem -g
```

A basic `testem.json` file is provided with this repo:

```json
{
  "framework": "jasmine2",
  "src_files": [
    "https://code.jquery.com/jquery-2.1.4.js",
    "https://cdn.jsdelivr.net/jasmine.jquery/2.0.3/jasmine-jquery.js",
  ]
}
```

List your JS source files followed by your JS test files inside `"src_files"`. Then, test the installation:

```bash
$ testem ci
```


## License

[![License](https://img.shields.io/badge/gnu-license-green.svg?style=flat)](https://opensource.org/licenses/GPL-2.0)
GNU License
