let restaurant;
var map;

/**
* Initialize Google map, called from HTML.
*/
window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
}

/**
* Get current restaurant from page URL.
*/
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
* Create restaurant HTML and add it to the webpage
*/
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const pic = document.querySelector('.restaurant-img');
  let src = [];
  for (let i=0; i<4; i++) {
    let source = document.createElement('SOURCE');
    src.push(source);
  }
  const image = document.createElement('img');
  let smallSource = DBHelper.imageSmallUrlForRestaurant(restaurant);
  let bigSource = DBHelper.imageUrlForRestaurant(restaurant);

  src[0].setAttribute("media", "screen and (max-width: 389px)");
  src[0].setAttribute("srcset", smallSource);
  src[1].setAttribute("media", "screen and (min-width: 390px) and (max-width: 618px)");
  src[1].setAttribute("srcset", bigSource);
  src[2].setAttribute("media", "screen and (min-width: 619px) and (max-width: 749px)");
  src[2].setAttribute("srcset", smallSource);
  src[3].setAttribute("media", "screen and (min-width: 750px)");
  src[3].setAttribute("srcset", bigSource);

  image.setAttribute('id', 'restaurant-img');

  // Adding alt descriptions to the images
  image.alt = DBHelper.altDescriptionForImage(restaurant);
  image.src = bigSource;
  for (let source of src)  {
    pic.append(source);
  }
  pic.append(image);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
}

/**
* Create restaurant operating hours HTML table and add it to the webpage.
*/
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
* Create all reviews HTML and add them to the webpage.
*/
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h3');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}

/**
* Create review HTML and add it to the webpage.
*/
createReviewHTML = (review) => {
  const li = document.createElement('li');
  li.tabIndex = "0";
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
  li.appendChild(date);

  const rating = document.createElement('p');
  let stars = "";
  for (let i=0; i<review.rating; i++) {
    stars += '<i class="fa fa-star"></i>';
  }
  rating.innerHTML = "Rating: " + stars;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);
  return li;
}

/**
* Add restaurant name to the breadcrumb navigation menu
*/
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.setAttribute("aria-current", "page");
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
* Get a parameter by name from page URL.
*/
getParameterByName = (name, url) => {
  if (!url)
  url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
  results = regex.exec(url);
  if (!results)
  return null;
  if (!results[2])
  return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Add descriptive title's to all the elements that go through focus
addResponsiveAttributesToMap = () => {
  let parentOfPanElement = document.querySelector(".gm-style");
  let panElement = parentOfPanElement.firstChild;
  panElement.setAttribute("title", "A map of the restaurant's neighborhood");
  let frame = panElement.nextSibling;
  frame.setAttribute("title", "The map with the restaurant pointed");
}

// Ensure that everything loaded before: 1) Adding titles to the map's elements, 2) Registering the service worker
window.addEventListener('load', function() {
  addResponsiveAttributesToMap();
  // If browser supports service workers, register sw.js
  if (navigator.serviceWorker) {
    // navigator.serviceWorker.register('/sw.js').then(function(reg) {
    navigator.serviceWorker.register('/mws-restaurant-stage-1/sw.js').then(function(reg) {
      console.log("Service worker loaded, scope:", reg.scope);
    }).catch(function(err) {
      console.log('Could not load service worker:', err);
    });
  }
});
