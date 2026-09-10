"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * useNearbyLocation
 *
 * Requests the browser's Geolocation API, then reverse-geocodes the coordinates
 * to a human-readable city + state using the free BigDataCloud API (no key needed).
 *
 * Returns:
 *   { status, city, state, country, error, requestLocation }
 *
 * status values:
 *   "idle"       – not yet requested
 *   "requesting" – waiting for browser permission
 *   "geocoding"  – coords obtained, reverse-geocoding in progress
 *   "resolved"   – city/state available
 *   "denied"     – user or browser denied permission
 *   "error"      – some other error
 */
export function useNearbyLocation() {
  const [status, setStatus] = useState("idle");
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  const reverseGeocode = useCallback(async (lat, lng) => {
    setStatus("geocoding");
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      if (!res.ok) throw new Error("Reverse geocoding failed");
      const data = await res.json();

      // BigDataCloud returns city, principalSubdivision (state), countryName
      const resolvedCity =
        data.city || data.locality || data.localityInfo?.informative?.[0]?.name || null;
      const resolvedState = data.principalSubdivision || null;
      const resolvedCountry = data.countryName || null;

      setCity(resolvedCity);
      setState(resolvedState);
      setCountry(resolvedCountry);
      setStatus("resolved");
    } catch (err) {
      setError(err.message || "Could not determine your location");
      setStatus("error");
    }
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator?.geolocation) {
      setError("Geolocation is not supported by your browser");
      setStatus("error");
      return;
    }

    setStatus("requesting");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude, longitude);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus("denied");
          setError("Location access was denied");
        } else {
          setStatus("error");
          setError(err.message || "Could not get your location");
        }
      },
      { timeout: 10000, maximumAge: 300000 } // cache for 5 minutes
    );
  }, [reverseGeocode]);

  return { status, city, state, country, error, requestLocation };
}
