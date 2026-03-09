import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LeafLetMap = ({ lat, lng, listingName, city, country }) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  const position = [lat || 3.848, lng || 11.5021];
  const hasCoords = !!(lat && lng);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    if (!containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: position,
      zoom: hasCoords ? 15 : 12,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker(position).addTo(map);
    marker.bindPopup(`
      <div style="font-size:13px; line-height:1.6">
        <strong>${listingName || 'Property'}</strong><br/>
        ${city || ''}${country ? ', ' + country : ''}
      </div>
    `);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div style={s.wrapper}>
      <h6 style={s.title}>📍 Property Location</h6>

      {!hasCoords && (
        <p style={s.warning}>
          ⚠ Exact coordinates not available — showing approximate area.
        </p>
      )}

      <div ref={containerRef} style={s.map} />
    </div>
  );
};

const s = {
  wrapper: {
    width: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    marginTop: '16px',
  },
  title: {
    padding: '12px 16px',
    margin: 0,
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px',
    fontWeight: 600,
    color: '#334155',
  },
  warning: {
    padding: '8px 16px',
    margin: 0,
    background: '#fffbeb',
    borderBottom: '1px solid #fde68a',
    fontSize: '12px',
    color: '#92400e',
  },
  map: {
    height: '380px',
    width: '100%',
  },
};

export default LeafLetMap;
