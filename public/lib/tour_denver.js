function tourDenver() {

var that = this;

var map;

var loadMap = function() {
  map = L.map('map');

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  //map.locate({setView:true});
  var latlng = [39.739094,-104.984898];
  map.setView(latlng,16);
  L.circleMarker(latlng,{
    radius: 5,
    fillColor: 'black',
    color: 'black',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(map);

  /*
  map.on('click', function(e) {
      alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      });
  */
};
that.loadMap = loadMap;

var addDataToMap = function(data,options) {  
  var geojsonMarkerOptions = {
    radius: 5,
    fillColor: options.color,
    color: 'black',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  L.geoJson(data, {  
            style: function (feature) {
              return {color: options.color};
            },
            onEachFeature: function (feature, layer) {
              var featureName = feature.properties.name;
              layer.bindPopup('<div class="popup-div">' + 
	                      options.type +': ' + featureName + 
	                      '<br /><div id="video-div"></div>' +
	                      '</div>'); 

	      var onLayerClick = function() {
	        document.getElementById('footnote-div').innerHTML = "";
	        document.getElementById('twitter-div').innerHTML = "";
	        document.getElementById('flickr-div').innerHTML = "";
	        document.getElementById('wiki-div').innerHTML = "";
		that.playVideo();
	      };
	      layer.on('click', onLayerClick); 
            },
	    filter: function(feature, layer) {
              var featureName = feature.properties.name;
	      return featureName != '';
	    },
	    pointToLayer: function (feature, latlng) {
	      return L.circleMarker(latlng, geojsonMarkerOptions);
	    }
      }).addTo(map);
};
that.addDataToMap = addDataToMap;

var playVideo = function(video) {
  var pop = Popcorn.youtube( "#video-div", "http://www.youtube.com/watch?v=P258mrXtGEM");
  pop.footnote({
                start: 1,
                //end: 20,
                text: "Welcome To Denver!",
                target: "footnote-div"
               });

  pop.twitter({
               start: 2,
               //end: 20,
               title: "Hack4CO",
               src: "@visitdenver",
               target: "twitter-div",
              });

  pop.flickr({
              start: 2,
	      numberofimages:4,
	      username: "cityandcountydenver",
	      tags: " capitol",
              target: "flickr-div"
            });

  pop.wikipedia({
                 start: 2,
                 //end: 20,
                 src: "http://en.wikipedia.org/wiki/Denver",
                 title: "Wikipedia.com says:",
                 target: "wiki-div",
		 numberofwords: 100
     });
/*
  pop.image({
             start: 5,
             href: "some.url",
             src: "image.jpg",
             text: "Denver, CO",
             target: "image-div"
            });

  pop.googlemap({
     		 start: 5,
		 end: 20,
		 target: "googlemap-div",
		 location: "Denver, CO",
		 zoom: 10
	        });

  pop.openmap({
               start: 10,
               end: 13,
               type: "ROADMAP",
               target: "openmap-div",
               lat: 39.73925,
               lng: -104.98619,
               zoom: "10"
             });

  pop.subtitle({
                start: 3,
                end: 7,
                text: "this is the first subtitle",
               });
*/

  
  pop.play();
};
that.playVideo = playVideo;

return that;

}
