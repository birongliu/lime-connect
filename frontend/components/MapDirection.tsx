"use client";
import React, { useEffect, useState } from "react";
import {
  DirectionsService,
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const searchBoxStyle = {
  position: "absolute" as const,
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "400px",
  zIndex: 10,
};

interface DirectionsResponse {
  lat: number;
  lng: number;
}

const GoogleMapRouteComponent = () => {
  const [currentPosition, setCurrentPosition] =
    useState<DirectionsResponse | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [restaurants, setRestaurants] = useState<
    google.maps.places.PlaceResult[]
  >([]);
  const [filters, setFilters] = useState({
    restaurants: true,
    bikes: false,
    groupRides: false,
  });

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [directionsResult, setDirectionsResult] =
    useState<google.maps.DirectionsResult | null>(null);
    const [bikes, setBikes] = useState<google.maps.places.PlaceResult[]>([]);


  const searchRestaurants = (route: google.maps.DirectionsRoute) => {
    if (!map) return;

    const bounds = new google.maps.LatLngBounds();
    route.overview_path.forEach((point) => bounds.extend(point));

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      { bounds, type: "bike stations" },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const filtered = results.filter((place) => {
            const location = place.geometry?.location;
            if (!location) return false;

            return isPointNearRoute(
              {
                lat: location.lat(),
                lng: location.lng(),
              },
              route.overview_path,
              200 // meters — adjust as needed
            );
          });
          setBikes(filtered);
        } else {
          console.error("Bike search failed with status:", status);
        }
      }
    );
    service.nearbySearch(
      {
        bounds: bounds,
        type: "restaurant",
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const filtered = results.filter((place) => {
              const location = place.geometry?.location;
              if (!location) return false;

              return isPointNearRoute(
                {
                  lat: location.lat(),
                  lng: location.lng(),
                },
                route.overview_path,
                200 // meters — adjust as needed
              );
            });
          setRestaurants(filtered);
        } else {
          console.error("Restaurant search failed with status:", status);
        }
      }
    );
  };

  const directionsCallback = (
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === "OK" && response) {
      setDirectionsResult(response);
      const route = response.routes[0];
      searchRestaurants(route);
    } else {
      console.error("Directions request failed due to", status);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };
        setCurrentPosition(userLocation);
        setOrigin(userLocation);
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      options
    );
  }, []);

  const onLoadSearchBox = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

    const [search, setSearch] = useState("");

  const onPlacesChanged = () => {
    if(!search) {
      setDestination(null);
      setRestaurants([]);
      setDirectionsResult(null);
      return;
    };

    if (searchBox) {
      const places = searchBox.getPlaces();
      const newMarkers: google.maps.LatLngLiteral[] = [];

      places?.forEach((place) => {
        if (place.geometry && place.geometry.location) {
          const latLng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setDirectionsResult(null); // <-- Reset to allow re-fetch
          newMarkers.push(latLng);
          setDestination(latLng);
          setSelectedRestaurant(null); // optional: close old info window
        }
      });

      if (newMarkers.length > 0) {
        setCurrentPosition(newMarkers[0]);
      }
    }
  };

  function isPointNearRoute(
    point: google.maps.LatLngLiteral,
    routePath: google.maps.LatLng[],
    toleranceInMeters: number
  ) {
    const toRad = (x: number) => (x * Math.PI) / 180;

    const R = 6371000; // Earth radius in meters

    const distance = (
      p1: google.maps.LatLngLiteral,
      p2: google.maps.LatLng
    ) => {
      const dLat = toRad(p2.lat() - p1.lat);
      const dLng = toRad(p2.lng() - p1.lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(p1.lat)) *
          Math.cos(toRad(p2.lat())) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    for (const pathPoint of routePath) {
      if (distance(point, pathPoint) <= toleranceInMeters) {
        return true;
      }
    }

    return false;
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      libraries={["places"]}
    >
      <div style={{ position: "relative" }}>
        <div style={searchBoxStyle}>
          <StandaloneSearchBox
            onLoad={onLoadSearchBox}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Search destination"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                color: "black",
                padding: "0 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </StandaloneSearchBox>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            padding: "12px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
            width: "300px",
          }}
        >
          <strong
            style={{ color: "black", display: "block", marginBottom: "10px" }}
          >
            Filter results
          </strong>
          {["restaurants", "bikes", "groupRides"].map((type) => (
            <label
              key={type}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
                color: "black",
              }}
            >
              {type === "restaurants"
                ? "Nearby Businesses"
                : type === "bikes"
                ? "Available Bikes"
                : "Group Rides"}
              <input
                type="checkbox"
                checked={filters[type as keyof typeof filters]}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    [type]: !prev[type as keyof typeof filters],
                  }))
                }
              />
            </label>
          ))}
        </div>

        {currentPosition && (
          <GoogleMap
            onLoad={(map) => setMap(map)}
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={14}
          >
            {/* Origin Marker */}
            {origin && (
              <Marker
                position={origin}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}

            {/* Destination Marker */}
            {destination && (
              <Marker
                position={destination}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
              />
            )}

            {/* Request Directions */}
            {origin && destination && !directionsResult && (
              <DirectionsService
                options={{
                  origin: origin,
                  destination: destination,
                  travelMode: google.maps.TravelMode.DRIVING,
                }}
                callback={directionsCallback}
              />
            )}

            {/* Render Directions in Blue */}
            {directionsResult && (
              <DirectionsRenderer
                options={{
                  directions: directionsResult,
                  polylineOptions: {
                    strokeColor: "#4285F4", // Google Blue
                    strokeWeight: 5,
                  },
                }}
              />
            )}

            {/* Restaurant Markers */}
            {filters.restaurants &&
              restaurants.map((restaurant, index) =>
                restaurant.geometry ? (
                  <Marker
                    key={`restaurant-${index}`}
                    onClick={() => setSelectedRestaurant(restaurant)}
                    title={restaurant.name}
                    position={{
                      lat: restaurant.geometry.location?.lat() || 0,
                      lng: restaurant.geometry.location?.lng() || 0,
                    }}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                    }}
                  />
                ) : null
              )}
            {filters.bikes &&
              bikes.map((bike, index) =>
                bike.geometry ? (
                  <Marker
                    key={`bike-${index}`}
                    onClick={() => setSelectedRestaurant(bike)}
                    title={bike.name}
                    position={{
                      lat: bike.geometry.location?.lat() || 0,
                      lng: bike.geometry.location?.lng() || 0,
                    }}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png", // Optional: different color for bikes
                    }}
                  />
                ) : null
              )}

            {selectedRestaurant && selectedRestaurant.geometry?.location && (
              <InfoWindow
                position={{
                  lat: selectedRestaurant.geometry.location.lat(),
                  lng: selectedRestaurant.geometry.location.lng(),
                }}
                onCloseClick={() => setSelectedRestaurant(null)}
              >
                <div style={{ maxWidth: 200 }}>
                  <h4 style={{ color: "black" }} className="font-black">
                    {selectedRestaurant.name}
                  </h4>
                  {selectedRestaurant.rating && (
                    <p
                      className="font-black"
                      style={{ color: "black", margin: "4px 0" }}
                    >
                      ⭐ {selectedRestaurant.rating} / 5
                    </p>
                  )}
                  {selectedRestaurant.vicinity && (
                    <p style={{ color: "black", margin: 0 }}>
                      {selectedRestaurant.vicinity}
                    </p>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </LoadScript>
  );
};

export default GoogleMapRouteComponent;
