import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/7937225/pexels-photo-7937225.jpeg?auto=compress&cs=tinysrgb&w=400';
const FALLBACK_CENTER = [3.848, 11.5021];

const formatPrice = (price) => {
  if (!price) return 'N/A';
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `${(price / 1_000).toFixed(0)}k`;
  return price;
};

const LeafLetPropertiesMap = ({ houses }) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const markersRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!containerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const located = (houses || []).filter((h) => h.lat && h.lng);

    const center =
      located.length > 0 ? [located[0].lat, located[0].lng] : FALLBACK_CENTER;

    const map = L.map(containerRef.current, {
      center,
      zoom: 13,
      scrollWheelZoom: true,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    markersRef.current = [];

    located.forEach((house) => {
      const image = house.images?.[0] || FALLBACK_IMAGE;
      const price = formatPrice(house.price);

      const icon = L.divIcon({
        className: '',
        html: `
          <div class="pm-marker" data-id="${house.id}">
            <img src="${image}" alt="${house.listingName || ''}" />
            <span class="pm-price">FCFA ${price}</span>
          </div>
        `,
        iconSize: [64, 64],
        iconAnchor: [32, 64],
        popupAnchor: [0, -68],
      });

      const marker = L.marker([house.lat, house.lng], { icon });

      const popupContent = `
        <div class="pm-popup">
          <img src="${image}" alt="${house.listingName}" class="pm-popup-img" />
          <div class="pm-popup-body">
            <p class="pm-popup-name">${house.listingName || 'Property'}</p>
            <p class="pm-popup-location">📍 ${house.city || ''}${house.country ? ', ' + house.country : ''}</p>
            <p class="pm-popup-price">FCFA ${price}</p>
            <a href="/houses/${house.id}" class="pm-popup-link">View Property →</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 220,
        className: 'pm-popup-wrapper',
        closeButton: false,
      });

      marker.on('mouseover', function () {
        this.openPopup();
      });

      marker.on('click', function () {
        navigate(`/houses/${house.id}`);
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });

    if (located.length > 1) {
      const group = L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.15));
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [houses]);

  return (
    <>
      <style>{mapStyles}</style>
      <div style={s.wrapper}>
        {(!houses || houses.filter((h) => h.lat && h.lng).length === 0) && (
          <div style={s.overlay}>
            <span style={s.overlayText}>
              📍 No located properties to display
            </span>
          </div>
        )}
        <div ref={containerRef} style={s.map} />
      </div>
    </>
  );
};

const mapStyles = `
  /* Thumbnail marker */
  .pm-marker {
    width: 64px;
    height: 64px;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
    cursor: pointer;
    position: relative;
    top: 100px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .pm-marker:hover {
    transform: scale(1.1) translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    border-color: #2563eb;
    z-index: 9999 !important;
  }
  .pm-marker img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .pm-price {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.65);
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    text-align: center;
    padding: 2px 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.02em;
  }

  /* Popup wrapper — remove leaflet defaults */
  .pm-popup-wrapper .leaflet-popup-content-wrapper {
    padding: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    border: none;
  }
  .pm-popup-wrapper .leaflet-popup-content {
    margin: 0;
    width: 220px !important;
  }
  .pm-popup-wrapper .leaflet-popup-tip-container {
    display: none;
  }

  /* Popup card */
  .pm-popup {
    width: 220px;
    font-family: Georgia, serif;
  }
  .pm-popup-img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    display: block;
  }
  .pm-popup-body {
    padding: 10px 12px 12px;
    background: #fff;
  }
  .pm-popup-name {
    font-size: 13px;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pm-popup-location {
    font-size: 11px;
    color: #64748b;
    margin: 0 0 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pm-popup-price {
    font-size: 13px;
    font-weight: 700;
    color: #2563eb;
    margin: 0 0 8px;
  }
  .pm-popup-link {
    display: block;
    background: #2563eb;
    color: #fff !important;
    text-align: center;
    padding: 7px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s;
  }
  .pm-popup-link:hover {
    background: #1d4ed8;
    color: #fff !important;
  }
`;

const s = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
    minHeight: '500px',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(248,250,252,0.85)',
    zIndex: 999,
    pointerEvents: 'none',
  },
  overlayText: {
    fontSize: '14px',
    color: '#94a3b8',
    background: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
};

export default LeafLetPropertiesMap;
