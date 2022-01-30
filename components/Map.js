import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({ searchResults }) {
 
  const [selectedLocation, setSelectedLocation] = useState({});

  // Transform the search results object into 
  // { latitude: 52.516272, longitude: 13.377722 } object
  const coordinates = searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat,
  }))
  
  // The latitude and longitude of the center of locations coordinates
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/pisalita/ckz18tv0v005d14ntdfcchgu6'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map(result => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetRight={-10}
          >
            <p
              role='img'
              className='cursor-pointer text-2xl animate-bounce'
              onClick={() => setSelectedLocation(result)}
              aria-label='push-pin'
            >
              📌
            </p>
          </Marker>

          {/* The popup that shows when you click on a marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClikc={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <div>
                {result.title}
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default Map;
