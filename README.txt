Concept for video driven tourism utilizing wikipedia, flickr, twitter, and maps

DONE: mapped opencolorado data to drive discovery, concept mockup
TODO: missing database of video transcriptions to drive dynamic content

Data used:

data.opencolorado.org/group/denver
http://data.opencolorado.org/dataset/city-and-county-of-denver-b-cycle-stations
http://data.opencolorado.org/dataset/city-and-county-of-denver-public-art
http://data.opencolorado.org/dataset/city-and-county-of-denver-bike-racks
http://data.opencolorado.org/dataset/city-and-county-of-denver-points-of-interest

Data considered:

http://data.opencolorado.org/dataset/city-and-county-of-denver-parks
http://data.opencolorado.org/dataset/city-and-county-of-denver-park-trails-and-sidewalks

Libaries used:

http://popcornjs.org/
https://github.com/tmcw/togeojson
http://leafletjs.com/

Example Video Timeline Transcription:

{
  "Attraction:State Capitol" :
  {
    "video" : "http://www.youtube.com/watch?v=XXXXXXXX",
    "timelines" :
    [
      {
        startTime: 0,
        endTime: 19,
        description: "Colorado State Capitol",
        wiki: "http://en.wikipedia.org/wiki/Colorado_State_Capitol",
        twitter: "@coloradogov",
        keywords: "colorado capitol",

      },
      {
        startTime: 20,
        endTime: 38,
        description: "Colfax Avenue",
        wiki: "http://en.wikipedia.org/wiki/Colfax_Avenue",
        twitter: "#colfaxmarathon",
        keywords: "colfax marathon",

      }
    ]
  }
}
