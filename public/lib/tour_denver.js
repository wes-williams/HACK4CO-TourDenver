function tourDenver(videoTimelines) {

var that = this;
var videos = videoTimelines
var map;

var loadMap = function() {
  map = L.map('map');

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var showLocation = function(latlng) {
    map.setView(latlng,16);
    L.circleMarker(latlng,{
      radius: 5,
      fillColor: 'black',
      color: 'black',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(map);
  };

  map.on('locationerror', function(e) {
      var latlng = [39.739094,-104.984898]; // state capitol
      showLocation(latlng);

  });
  map.locate({setView:true}).whenReady(function() {
    var latlng = map.getCenter();
    if(latlng && latlng!=undefined) { 
      latlng = [latlng.lat,latlng.lng];
    }
    else {
      latlng = [0,0];
    }

    if(latlng[0]>20) { // otherwise it failed 
      showLocation(latlng);
    }
  });
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
   	      var video = videoTimelines[options.type+':'+featureName];

	      if(video) {
                layer.bindPopup('<div class="popup-div">' + 
	                      options.type +': ' + featureName + 
	                      '<br /><div id="video-div"></div>' +
	                      '</div>'); 
	      }
	      else {
                layer.bindPopup(options.type +': ' + featureName); 
	      }

	      var onLayerClick = function() {
	        document.getElementById('footnote-div').innerHTML = "";
	        document.getElementById('twitter-div').innerHTML = "";
	        document.getElementById('flickr-div').innerHTML = "";
	        document.getElementById('wiki-div').innerHTML = "";

		if(video) {
		  that.playVideo(video);
		}
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

var playVideo = function(videoData) {

  if(!videoData || !videoData.video) {
    return;
  }

  var pop = Popcorn.youtube( "#video-div", videoData.video);

  for(var i=0;i<videoData.timelines.length;i++) {
    var timeline = videoData.timelines[i];
    

    if(timeline.description) {
      pop.footnote({
                start: timeline.startTime,
                end: timeline.endTime,
                text: timeline.description,
                target: "footnote-div"
               });
    }

    if(timeline.twitter) { 
      pop.twitter({
               start: timeline.startTime,
               end: timeline.endTime,
               title: "Twitter",
               src: timeline.twitter,
               target: "twitter-div",
              });
    }

    if(timeline.keywords) {
      pop.flickr({
              start: timeline.startTime,
              end: timeline.endTime,
	      numberofimages:4,
	      username: "cityandcountydenver", // using this?
	      tags: timeline.keywords,
              target: "flickr-div"
            });
    }


    if(timeline.wiki) { 
      pop.wikipedia({
                 start: timeline.startTime,
                 end: timeline.endTime,
                 src: timeline.wiki,
                 title: "Wikipedia.com says:",
                 target: "wiki-div",
		 numberofwords: 100
             });
     }
  }
  
  pop.play();
};
that.playVideo = playVideo;

return that;

}
