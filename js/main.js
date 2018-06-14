let restaurants,
neighborhoods,
cuisines
var map
var markers = []

/**
* Fetch neighborhoods and cuisines as soon as the page is loaded.
*/
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
});

/**
* Fetch all neighborhoods and set their HTML.
*/
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
* Set neighborhoods HTML.
*/
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
* Fetch all cuisines and set their HTML.
*/
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
* Set cuisines HTML.
*/
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
* Initialize Google map, called from HTML.
*/
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  updateRestaurants();
}

/**
* Update page and map for current restaurants.
*/
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
* Clear current restaurants, their HTML and remove their map markers.
*/
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
* Create all restaurants HTML and add them to the webpage.
*/
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
* Create restaurant HTML.
*/
createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');
  // Let's create a picture element to load lighter images whne possible, like shown in : https://alligator.io/html/picture-element/
  const pic = document.createElement('PICTURE');
  let src = [];
  for (let i=0; i<4; i++) {
    let source = document.createElement('SOURCE');
    src.push(source);
  }
  const image = document.createElement('img');
  let smallSource = DBHelper.imageSmallUrlForRestaurant(restaurant);
  let bigSource = DBHelper.imageUrlForRestaurant(restaurant);

  src[0].setAttribute("media", "screen and (max-width: 419px)");
  src[0].setAttribute("srcset", smallSource);
  src[1].setAttribute("media", "screen and (min-width: 420px) and (max-width: 649px)");
  src[1].setAttribute("srcset", bigSource);
  src[2].setAttribute("media", "screen and (min-width: 650px) and (max-width: 1119px)");
  src[2].setAttribute("srcset", smallSource);
  src[3].setAttribute("media", "screen and (min-width: 1220px)");
  src[3].setAttribute("srcset", bigSource);

  image.className = 'restaurant-img';

  // Adding alt descriptions to the images
  image.alt = DBHelper.altDescriptionForImage(restaurant);
  image.src = bigSource;
  for (let source of src)  {
    pic.append(source);
  }
  pic.append(image);
  li.append(pic);

  const name = document.createElement('h2');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  // It will look like a button, so let's add that role to it
  more.setAttribute("role", "button");
  // Let's add a unique label to each of these buttons
  more.setAttribute("aria-label", `More about ${restaurant.name}`);
  li.append(more)

  return li
}

/**
* Add markers for current restaurants to the map.
*/
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}

// Let's add descriptive title's to all the elements that go through focus
addResponsiveAttributesToMap = () => {
  let parentOfPanElement = document.querySelector(".gm-style");
  let panElement = parentOfPanElement.firstChild;
  panElement.setAttribute("title", "A map of New York's center");
  let frame = panElement.nextSibling;
  frame.setAttribute("title", "The map with all the selected restaurants");
}

/*
// Ensure that everything loaded before: 1) Adding titles to the map's elements, 2) Registering the service worker
window.addEventListener('load', function() {
addResponsiveAttributesToMap();
// If browser supports service workers, register sw.js
if (navigator.serviceWorker) {
navigator.serviceWorker.register('/sw.js').then(function(reg) {
console.log("Service worker loaded, scope:", reg.scope);
}).catch(function(err) {
console.log('Could not load service worker:', err);
});
}
});
*/
