# Restaurant Reviews App-Stage 1

The stage 1 of the restaurant reviews app, is about handling the responsiveness, accessibility and caching of an app. I was given an app
that was barely functionable on a desktop device, and my job was to:
<ol>
<li>Make it look good on all devices using pure CSS</li>
<li>Make it accessible usnig ARIA techniques and semantic elements</li>
<li>Create a service worker for it, that ensures the app caches pages accessed online and can even show them offline after that</li>
</ol>

The starting app was forked from <a href="https://github.com/udacity/mws-restaurant-stage-1">this repository</a>.

## Code dependencies

<ul>
<li><a href="https://code.google.com/archive/p/normalize-css/">Google's "normalize-css" stylesheet</a></li>
<li><a href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">Font-awesomne</a></li>
</ul>

## How to run

You can find the webpage <a href="https://v-for-vaggelis.github.io/mws-restaurant-stage-1/">here</a>. Alternatively you can clone the repository in your local machine, create a local server, and replace the port in the "dbhelper.js" file appropriately.

## Browser compatibility

The site was only tested on Google chrome, but it should work on any browser, please report any issues.
