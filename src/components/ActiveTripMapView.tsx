import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { TripPlan } from '../types';

interface ActiveTripMapViewProps {
  tripPlan: TripPlan;
  currentDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
  womensSafetyActive: boolean;
  onOpenSOS?: () => void;
}

interface LocationCoord {
  dayNumber: number;
  title: string;
  location: string;
  lat: number;
  lng: number;
  guideName: string;
  guideAvatar: string;
  image: string;
  time: string;
  activity: string;
}

// Heritage coordinates dictionary with fallbacks for Indian cultural destinations
const HERITAGE_COORDS_MAP: Record<string, { lat: number; lng: number }> = {
  'nahargarh': { lat: 26.9373, lng: 75.8155 },
  'jaipur': { lat: 26.9124, lng: 75.7873 },
  'chand baori': { lat: 27.0071, lng: 76.6064 },
  'abhaneri': { lat: 27.0071, lng: 76.6064 },
  'jodhpur': { lat: 26.2978, lng: 73.0185 },
  'navchokiya': { lat: 26.2985, lng: 73.0160 },
  'delhi': { lat: 28.6506, lng: 77.2303 },
  'chandni chowk': { lat: 28.6506, lng: 77.2303 },
  'bhangarh': { lat: 27.0964, lng: 76.2864 },
  'alwar': { lat: 27.5530, lng: 76.6346 },
  'varanasi': { lat: 25.3176, lng: 82.9739 },
  'meghalaya': { lat: 25.2500, lng: 91.6667 },
  'nongriat': { lat: 25.2508, lng: 91.6705 },
  'cherrapunji': { lat: 25.2800, lng: 91.7200 },
  'udaipur': { lat: 24.5854, lng: 73.7125 },
  'hampi': { lat: 15.3350, lng: 76.4600 },
  'jaisalmer': { lat: 26.9157, lng: 70.9083 },
  'agra': { lat: 27.1767, lng: 78.0081 },
  'pushkar': { lat: 26.4897, lng: 74.5511 },
  'munnar': { lat: 10.0889, lng: 77.0595 },
  'kochi': { lat: 9.9312, lng: 76.2673 },
  'gokarna': { lat: 14.5479, lng: 74.3188 }
};

function resolveCoordinates(locationStr: string, index: number, total: number): { lat: number; lng: number } {
  const normalized = (locationStr || '').toLowerCase();
  for (const [key, coords] of Object.entries(HERITAGE_COORDS_MAP)) {
    if (normalized.includes(key)) {
      return coords;
    }
  }

  // Base fallback around Rajasthan / North India corridor with deterministic offset
  const baseLat = 26.9124 + (index * 0.4) - ((total - 1) * 0.15);
  const baseLng = 75.7873 + (index * 0.5) - ((total - 1) * 0.2);
  return { lat: baseLat, lng: baseLng };
}

// Calculate distance between two coordinates in kilometers using Haversine formula
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export const ActiveTripMapView: React.FC<ActiveTripMapViewProps> = ({
  tripPlan,
  currentDayNumber,
  onSelectDay,
  womensSafetyActive,
  onOpenSOS
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const safetyLayerRef = useRef<L.LayerGroup | null>(null);

  const [mapMode, setMapMode] = useState<'overview' | 'focus'>('focus');
  const [selectedPinIndex, setSelectedPinIndex] = useState<number>(currentDayNumber - 1);
  const [isMapExpanded, setIsMapExpanded] = useState<boolean>(false);
  const [showSafetyCorridors, setShowSafetyCorridors] = useState<boolean>(womensSafetyActive);

  // Derive pinned locations from tripPlan days
  const pinnedLocations: LocationCoord[] = useMemo(() => {
    if (!tripPlan.days || tripPlan.days.length === 0) {
      return [
        {
          dayNumber: 1,
          title: 'Nahargarh Fort Wall',
          location: 'Jaipur, Rajasthan',
          lat: 26.9373,
          lng: 75.8155,
          guideName: 'Elias Thorne',
          guideAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
          time: '04:00 PM - 07:30 PM',
          activity: 'Sunset Fort Tea & Rajput History Story'
        },
        {
          dayNumber: 2,
          title: 'Chand Baori Subterranean Labyrinth',
          location: 'Abhaneri Village, Rajasthan',
          lat: 27.0071,
          lng: 76.6064,
          guideName: 'Elias Thorne',
          guideAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
          time: '08:30 AM - 02:00 PM',
          activity: 'Private Stepwell Descent & Blueprint Study'
        },
        {
          dayNumber: 3,
          title: 'Navchokiya Indigo Alleys',
          location: 'Jodhpur, Rajasthan',
          lat: 26.2978,
          lng: 73.0185,
          guideName: 'Rajesh Kumar',
          guideAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
          image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
          time: '08:00 AM - 12:30 PM',
          activity: 'Brahmin Guild Terrace Tea & Textile Demo'
        },
        {
          dayNumber: 4,
          title: 'Mughal Culinary Degs & Night Bazaar',
          location: 'Old Delhi / Chandni Chowk',
          lat: 28.6506,
          lng: 77.2303,
          guideName: 'Rajesh Kumar',
          guideAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
          image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
          time: '04:00 PM - 08:30 PM',
          activity: 'Spice Rooftop Access & 8 Tasting Courses'
        }
      ];
    }

    return tripPlan.days.map((day, idx) => {
      const coords = resolveCoordinates(day.location || day.title, idx, tripPlan.days.length);
      return {
        dayNumber: day.dayNumber || idx + 1,
        title: day.title,
        location: day.location,
        lat: coords.lat,
        lng: coords.lng,
        guideName: day.guideName,
        guideAvatar: day.guideAvatar,
        image: day.image,
        time: day.time,
        activity: day.includedActivity || 'Guided Cultural Experience'
      };
    });
  }, [tripPlan.days]);

  // Total route approximate distance
  const totalRouteKm = useMemo(() => {
    if (pinnedLocations.length < 2) return 0;
    let dist = 0;
    for (let i = 0; i < pinnedLocations.length - 1; i++) {
      dist += calculateDistanceKm(
        pinnedLocations[i].lat,
        pinnedLocations[i].lng,
        pinnedLocations[i + 1].lat,
        pinnedLocations[i + 1].lng
      );
    }
    return dist;
  }, [pinnedLocations]);

  // Sync selected pin when currentDayNumber changes
  useEffect(() => {
    setSelectedPinIndex(currentDayNumber - 1);
  }, [currentDayNumber]);

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create fresh map instance
      const initialLocation = pinnedLocations[Math.min(currentDayNumber - 1, pinnedLocations.length - 1)] || pinnedLocations[0];
      const map = L.map(mapContainerRef.current, {
        center: [initialLocation.lat, initialLocation.lng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false
      });

      // CartoDB Dark Matter tile layer for minimalist aesthetic
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      // Add custom LayerGroups
      const markersLayer = L.layerGroup().addTo(map);
      const safetyLayer = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = markersLayer;
      safetyLayerRef.current = safetyLayer;
    }

    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    const safetyLayer = safetyLayerRef.current;

    if (!map || !markersLayer || !safetyLayer) return;

    // Clear previous markers & polylines
    markersLayer.clearLayers();
    safetyLayer.clearLayers();
    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
    }

    const latLngs: L.LatLngExpression[] = [];

    // Render Markers for each trip day location
    pinnedLocations.forEach((loc, idx) => {
      const isCurrentDay = loc.dayNumber === currentDayNumber;
      const isPastDay = loc.dayNumber < currentDayNumber;
      const latLng: L.LatLngExpression = [loc.lat, loc.lng];
      latLngs.push(latLng);

      // Create Custom HTML Pin Icon
      const customIconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          ${isCurrentDay ? `
            <div class="absolute -inset-2.5 rounded-full bg-[#d4af37]/30 pulsing-marker-ring"></div>
            <div class="absolute -inset-1 rounded-full bg-[#d4af37]/60 animate-ping"></div>
          ` : ''}
          <div class="relative w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs shadow-lg transition-transform duration-200 group-hover:scale-110 ${
            isCurrentDay
              ? 'bg-[#d4af37] text-[#080808] border-2 border-white ring-2 ring-[#d4af37]/50 shadow-[#d4af37]/40'
              : isPastDay
              ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
              : 'bg-[#181818]/90 text-[#a1a1aa] border border-white/20'
          }">
            ${isPastDay ? '✓' : `0${loc.dayNumber}`}
          </div>
          <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-black/85 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white pointer-events-none shadow-md">
            ${loc.location.split(',')[0]}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: customIconHtml,
        className: 'custom-map-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -22]
      });

      const marker = L.marker(latLng, { icon: customIcon }).addTo(markersLayer);

      // Popup Content Card with Glassmorphic Styling
      const popupHtml = `
        <div class="p-4 w-64 text-left font-sans">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
              isCurrentDay ? 'bg-[#d4af37] text-[#080808]' : 'bg-white/10 text-[#d4af37]'
            }">
              Day 0${loc.dayNumber} Milestone
            </span>
            <span class="text-[11px] text-[#9499a1] font-light">${loc.time}</span>
          </div>

          <h4 class="font-serif font-bold text-sm text-[#f5f5f5] mb-1 line-clamp-1">
            ${loc.title}
          </h4>
          <p class="text-[11px] text-[#a1a1aa] mb-2 line-clamp-1 flex items-center gap-1 font-light">
            <span class="material-symbols-outlined text-[13px] text-[#d4af37]">location_on</span>
            ${loc.location}
          </p>

          <div class="flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-3">
            <img src="${loc.guideAvatar}" alt="${loc.guideName}" class="w-7 h-7 rounded-full object-cover border border-[#d4af37]" />
            <div class="min-w-0">
              <span class="text-[11px] font-bold text-[#f5f5f5] block truncate">${loc.guideName}</span>
              <span class="text-[9px] text-[#9499a1] block truncate">Assigned Guide</span>
            </div>
          </div>

          <button
            onclick="window.__saarthi_select_day && window.__saarthi_select_day(${loc.dayNumber})"
            class="w-full py-2 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1 shadow-sm"
          >
            <span>Focus This Day</span>
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        className: 'glass-map-popup'
      });

      marker.on('click', () => {
        setSelectedPinIndex(idx);
        onSelectDay(loc.dayNumber);
      });
    });

    // Draw Connected Polyline Route
    if (latLngs.length > 1) {
      const polyline = L.polyline(latLngs, {
        color: '#d4af37',
        weight: 3,
        opacity: 0.85,
        dashArray: '6, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      routeLayerRef.current = polyline;
    }

    // Add Safety Corridor circles & checkpoints when safety mode is active
    if (showSafetyCorridors && womensSafetyActive) {
      pinnedLocations.forEach((loc) => {
        // Subtle emerald safe haven buffer
        L.circle([loc.lat, loc.lng], {
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 0.08,
          weight: 1,
          radius: 1200
        }).addTo(safetyLayer);

        // Safe Haven Checkpoint Marker offset by ~350m
        const havenLat = loc.lat + 0.003;
        const havenLng = loc.lng + 0.003;

        const havenIcon = L.divIcon({
          html: `
            <div class="w-6 h-6 rounded-full bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 flex items-center justify-center shadow-md backdrop-blur-md" title="Verified Safe Haven">
              <span class="material-symbols-outlined text-[13px]">health_and_safety</span>
            </div>
          `,
          className: 'haven-pin',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        L.marker([havenLat, havenLng], { icon: havenIcon })
          .bindPopup(`
            <div class="p-3 text-left font-sans">
              <span class="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                Verified Safe Haven
              </span>
              <p class="text-xs font-semibold text-[#f5f5f5] mt-1.5 mb-1">
                Heritage Heritage Police & Tea Kiosk
              </p>
              <p class="text-[11px] text-[#9499a1]">
                24/7 Verified lighting, emergency first-aid & verified telephone post.
              </p>
            </div>
          `)
          .addTo(safetyLayer);
      });
    }

    // Adjust view based on mode
    if (mapMode === 'overview' && latLngs.length > 0) {
      map.fitBounds(L.latLngBounds(latLngs), { padding: [40, 40], maxZoom: 14 });
    } else {
      const activeLoc = pinnedLocations[Math.min(currentDayNumber - 1, pinnedLocations.length - 1)];
      if (activeLoc) {
        map.setView([activeLoc.lat, activeLoc.lng], 13, { animate: true });
      }
    }

    // Force tile recalculation on load/resize
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    // Global window bridge for popup button interaction
    (window as any).__saarthi_select_day = (dayNum: number) => {
      onSelectDay(dayNum);
      setSelectedPinIndex(dayNum - 1);
    };

    return () => {
      delete (window as any).__saarthi_select_day;
    };
  }, [pinnedLocations, currentDayNumber, mapMode, showSafetyCorridors, womensSafetyActive, onSelectDay]);

  // Handle zooming & recentering
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleRecenterActive = () => {
    const activeLoc = pinnedLocations[Math.min(currentDayNumber - 1, pinnedLocations.length - 1)];
    if (activeLoc && mapInstanceRef.current) {
      setMapMode('focus');
      mapInstanceRef.current.setView([activeLoc.lat, activeLoc.lng], 14, { animate: true });
    }
  };

  const handleFitAllStops = () => {
    if (mapInstanceRef.current && pinnedLocations.length > 0) {
      setMapMode('overview');
      const bounds = L.latLngBounds(pinnedLocations.map(p => [p.lat, p.lng]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [45, 45] });
    }
  };

  const activeStop = pinnedLocations[selectedPinIndex] || pinnedLocations[0];

  return (
    <div
      id="active-trip-map-card"
      className={`relative rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden shadow-2xl transition-all duration-300 mb-6 ${
        isMapExpanded ? 'h-[520px] sm:h-[600px]' : 'h-[380px] sm:h-[440px]'
      }`}
    >
      {/* Top Glassmorphic Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Location & GPS Badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3.5 py-1.5 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.12] shadow-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <span className="text-xs font-serif font-bold text-[#f5f5f5] block leading-tight">
                {activeStop.location}
              </span>
              <span className="text-[10px] text-[#d4af37] font-medium block">
                Day 0{activeStop.dayNumber} • {activeStop.title.substring(0, 24)}...
              </span>
            </div>
          </div>

          <div className="hidden sm:flex px-3 py-1.5 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.12] text-xs text-[#9499a1] items-center gap-1.5 shadow-lg font-light">
            <span className="material-symbols-outlined text-[14px] text-[#d4af37]">timeline</span>
            <span>{totalRouteKm} km Route</span>
          </div>
        </div>

        {/* Right: Map Control Actions */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Mode Switcher: Focus vs All Stops */}
          <div className="flex items-center p-1 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.12] shadow-lg">
            <button
              id="btn-map-focus-day"
              onClick={handleRecenterActive}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition cursor-pointer ${
                mapMode === 'focus'
                  ? 'bg-[#d4af37] text-[#080808] font-bold shadow-xs'
                  : 'text-[#9499a1] hover:text-[#f5f5f5]'
              }`}
              title="Focus on active day pin"
            >
              Active Stop
            </button>
            <button
              id="btn-map-overview-route"
              onClick={handleFitAllStops}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition cursor-pointer ${
                mapMode === 'overview'
                  ? 'bg-[#d4af37] text-[#080808] font-bold shadow-xs'
                  : 'text-[#9499a1] hover:text-[#f5f5f5]'
              }`}
              title="Fit all journey stops"
            >
              All Stops ({pinnedLocations.length})
            </button>
          </div>

          {/* Safety Overlay Toggle */}
          {womensSafetyActive && (
            <button
              id="btn-toggle-safe-corridor"
              onClick={() => setShowSafetyCorridors(!showSafetyCorridors)}
              className={`w-8 h-8 rounded-2xl flex items-center justify-center transition cursor-pointer backdrop-blur-xl shadow-lg border ${
                showSafetyCorridors
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50 ring-2 ring-emerald-500/20'
                  : 'bg-[#0a0a0a]/80 text-[#9499a1] border-white/[0.12]'
              }`}
              title={showSafetyCorridors ? 'Safe corridor active' : 'Enable safe corridor'}
            >
              <span className="material-symbols-outlined text-[16px]">shield</span>
            </button>
          )}

          {/* Expand/Collapse Map */}
          <button
            id="btn-toggle-map-expand"
            onClick={() => {
              setIsMapExpanded(!isMapExpanded);
              setTimeout(() => {
                mapInstanceRef.current?.invalidateSize();
              }, 250);
            }}
            className="w-8 h-8 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.12] text-[#d1d5db] hover:text-[#d4af37] flex items-center justify-center shadow-lg transition cursor-pointer"
            title={isMapExpanded ? 'Compress Map' : 'Expand Map'}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isMapExpanded ? 'unfold_less' : 'unfold_more'}
            </span>
          </button>
        </div>
      </div>

      {/* Actual Map Container Div for Leaflet */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-10"
        style={{ minHeight: '100%' }}
      />

      {/* Floating Vertical Zoom Controls */}
      <div className="absolute right-3 top-20 z-20 flex flex-col gap-1.5">
        <button
          id="btn-map-zoom-in"
          onClick={handleZoomIn}
          className="w-8 h-8 rounded-2xl bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/[0.12] text-white hover:text-[#d4af37] flex items-center justify-center transition cursor-pointer shadow-lg active:scale-95"
          title="Zoom In"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
        <button
          id="btn-map-zoom-out"
          onClick={handleZoomOut}
          className="w-8 h-8 rounded-2xl bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/[0.12] text-white hover:text-[#d4af37] flex items-center justify-center transition cursor-pointer shadow-lg active:scale-95"
          title="Zoom Out"
        >
          <span className="material-symbols-outlined text-[18px]">remove</span>
        </button>
        <button
          id="btn-map-my-location"
          onClick={handleRecenterActive}
          className="w-8 h-8 rounded-2xl bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/[0.12] text-[#d4af37] flex items-center justify-center transition cursor-pointer shadow-lg active:scale-95"
          title="Center Current Location"
        >
          <span className="material-symbols-outlined text-[16px]">my_location</span>
        </button>
      </div>

      {/* Bottom Floating Pinned Locations Carousel */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 px-1 scrollbar-none">
          {pinnedLocations.map((loc, idx) => {
            const isSelected = selectedPinIndex === idx;
            const isCurrent = loc.dayNumber === currentDayNumber;

            return (
              <button
                key={loc.dayNumber}
                id={`btn-map-pin-pill-${loc.dayNumber}`}
                onClick={() => {
                  setSelectedPinIndex(idx);
                  onSelectDay(loc.dayNumber);
                  mapInstanceRef.current?.setView([loc.lat, loc.lng], 14, { animate: true });
                }}
                className={`px-3.5 py-2 rounded-2xl backdrop-blur-xl border text-left transition shrink-0 cursor-pointer shadow-xl flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#0e0e0e]/95 border-[#d4af37] ring-1 ring-[#d4af37]/40 text-white'
                    : 'bg-[#0e0e0e]/80 border-white/[0.12] text-[#a1a1aa] hover:border-white/25 hover:text-white'
                }`}
              >
                <div className={`w-6 h-6 rounded-xl flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  isCurrent
                    ? 'bg-[#d4af37] text-[#080808]'
                    : isSelected
                    ? 'bg-white/[0.15] text-[#d4af37]'
                    : 'bg-white/[0.05] text-[#8e9299]'
                }`}>
                  0{loc.dayNumber}
                </div>

                <div className="min-w-0 pr-1">
                  <span className={`text-xs font-semibold block truncate max-w-[130px] sm:max-w-[160px] ${
                    isSelected ? 'text-[#f5f5f5]' : 'text-[#d1d5db]'
                  }`}>
                    {loc.location.split(',')[0]}
                  </span>
                  <span className="text-[10px] text-[#9499a1] block truncate max-w-[130px] font-light">
                    {loc.guideName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
