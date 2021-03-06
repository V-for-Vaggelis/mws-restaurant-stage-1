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

You can find the webpage <a href="https://v-for-vaggelis.github.io/mws-restaurant-stage-1/">here</a>. Alternatively you can clone the repository in your local machine and run the project in your local server. To do that, uncomment the code in lines: 11, 154, 159 of "dbhelper.js" file, in line 2 of "sw.js" file, line 224 of "main.js" file and line 209 of "restaurant_info.js" file and comment out the equivalent code below of each piece. Then all you have to do is run a local server. If you have the latest python version installed, just type: ```python -m http.server 8888``` on the app's repository. Then all you have to do is open your browser on ```localhost:8888```.


## Browser compatibility

The site was only tested on Google chrome, but it should work on any browser, please report any issues.
