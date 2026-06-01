import React, { useState } from 'react';
import { Plane, Train, Bus, Car, AlertTriangle, ShieldCheck, IndianRupee, ArrowUpRight, MapPin } from 'lucide-react';

export default function RouteFinder({ originHub, originCity, destination, budget }) {
  const [selectedMode, setSelectedMode] = useState('train');

  if (!destination) {
    return (
      <div className="glass-card animate-slide" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Select a destination to discover travel routes.</p>
      </div>
    );
  }

  const routeData = destination.routes[originHub];
  if (!routeData) {
    return (
      <div className="glass-card animate-slide" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--danger)' }}>No direct routes found from selected origin to {destination.name}.</p>
      </div>
    );
  }

  // Check if chosen city is a major hub itself
  const isMajorHub = originCity.toLowerCase().includes('delhi') ||
                     originCity.toLowerCase().includes('mumbai') ||
                     originCity.toLowerCase().includes('bengaluru') ||
                     originCity.toLowerCase().includes('kolkata');

  // Dynamic Connection Fee and Duration Calculator for 60+ Indian Cities
  const calculateDynamicRoute = (modeId, baseRoute) => {
    if (!baseRoute) return null;
    if (isMajorHub) return { ...baseRoute, isDirect: true, hubName: '' };

    // Define connection costs and times based on starting point relative to hub
    let extraCost = 0;
    let extraDurationMinutes = 0;
    let connectionDetails = '';

    const hubName = originHub.charAt(0).toUpperCase() + originHub.slice(1);

    switch (modeId) {
      case 'flight':
        extraCost = 2500; // Average domestic flight layover / connecting ticket fee
        extraDurationMinutes = 120; // 2 hours layover
        connectionDetails = `Connecting flight via ${hubName} Hub`;
        break;
      case 'train':
        extraCost = 350; // Local intercity express train ticket
        extraDurationMinutes = 240; // 4 hours local train ride
        connectionDetails = `Local Express connection to ${hubName} Junction`;
        break;
      case 'bus':
        extraCost = 250; // Volvo intercity bus ticket
        extraDurationMinutes = 300; // 5 hours bus connection
        connectionDetails = `Intercity Volvo to ${hubName} Bus Terminal`;
        break;
      case 'cab':
      default:
        extraCost = 4500; // Local cab pickup and highway connection
        extraDurationMinutes = 180; // 3 hours drive to hub
        connectionDetails = `Private cab pickup via ${hubName}`;
        break;
    }

    // Parse base duration string (e.g. "2h 35m")
    const durationParts = baseRoute.duration.match(/\d+/g);
    let totalMinutes = 0;
    if (durationParts) {
      if (durationParts.length === 2) {
        totalMinutes = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
      } else if (durationParts.length === 1) {
        totalMinutes = parseInt(durationParts[0]) * 60;
      }
    }
    
    const grandMinutes = totalMinutes + extraDurationMinutes;
    const finalHours = Math.floor(grandMinutes / 60);
    const finalMins = grandMinutes % 60;
    const computedDuration = `${finalHours}h ${finalMins}m`;

    return {
      price: baseRoute.price + extraCost,
      duration: computedDuration,
      details: `${connectionDetails}. ${baseRoute.details}`,
      isDirect: false,
      hubName
    };
  };

  const getBookingUrl = (modeId) => {
    const originName = originCity.split(' ')[0];
    const destName = destination.name;
    
    switch(modeId) {
      case 'flight':
        return `https://www.makemytrip.com/flight/search?tripType=O&itinerary=${originName}-${destName}-01/07/2026&paxType=A-1_C-0_I-0&intl=false&cabinClass=E`;
      case 'train':
        return `https://www.confirmtkt.com/rly-search?from=${originName}&to=${destName}`;
      case 'bus':
        return `https://www.redbus.in/bus-tickets/${originName.toLowerCase()}-to-${destName.toLowerCase()}`;
      case 'cab':
      default:
        return `https://www.makemytrip.com/cabs/`;
    }
  };

  // Compile Modes using our Dynamic Travel Calculator
  const modes = [
    { id: 'flight', name: 'Flight Ticket', icon: Plane, data: calculateDynamicRoute('flight', routeData.flight), color: 'var(--primary)' },
    { id: 'train', name: 'Train Ticket', icon: Train, data: calculateDynamicRoute('train', routeData.train), color: 'var(--accent-cyan)' },
    { id: 'bus', name: 'Bus Ticket', icon: Bus, data: calculateDynamicRoute('bus', routeData.bus), color: 'var(--accent-gold)' },
    { id: 'cab', name: 'Cab / Private Drive', icon: Car, data: calculateDynamicRoute('cab', routeData.cab), color: 'var(--accent-rose)' }
  ];

  const findCheapestMode = () => {
    let cheapest = modes[0];
    modes.forEach(m => {
      if (m.data && m.data.price < cheapest.data.price) cheapest = m;
    });
    return cheapest.id;
  };

  const cheapestModeId = findCheapestMode();

  return (
    <div className="animate-slide" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Route Animation Card */}
      <div className="glass-card" style={{ padding: '24px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--accent-cyan)' }} /> 
            Transit Visualization
          </h3>
          {!isDirectModeSelected(modes, selectedMode) && (
            <span className="badge badge-gold" style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} /> Custom Route Active from {originCity}
            </span>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', background: 'var(--bg-tertiary)', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
          
          <div style={{ textAlign: 'center', zIndex: '2' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', fontWeight: 'bold', fontSize: '0.8rem' }}>
              {originCity.substring(0, 3).toUpperCase()}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{originCity.split(' ')[0]}</span>
          </div>

          <div style={{ flexGrow: '1', margin: '0 20px', position: 'relative', height: '40px', display: 'flex', alignItems: 'center' }}>
            <svg width="100%" height="40" style={{ overflow: 'visible' }}>
              <line x1="0" y1="20" x2="100%" y2="20" stroke="var(--border-glow)" strokeWidth="2" />
              <line 
                x1="0" 
                y1="20" 
                x2="100%" 
                y2="20" 
                stroke={modes.find(m => m.id === selectedMode)?.color || 'var(--primary)'}
                strokeWidth="3" 
                className="route-svg-path"
              />
            </svg>
            <div 
              className="animate-float" 
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-glow)',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '0.7rem',
                fontWeight: '700',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {modes.find(m => m.id === selectedMode)?.data?.duration}
            </div>
          </div>

          <div style={{ textAlign: 'center', zIndex: '2' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto', fontWeight: 'bold', fontSize: '0.8rem' }}>
              {destination.name.substring(0, 3).toUpperCase()}
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{destination.name}</span>
          </div>

        </div>
      </div>

      {/* Transit Modes Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {modes.map(mode => {
          if (!mode.data) return null;
          const isSelected = selectedMode === mode.id;
          const Icon = mode.icon;
          const budgetLimitExceeded = mode.data.price > budget;
          const isCheapest = cheapestModeId === mode.id;

          return (
            <div 
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className="glass-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? mode.color : budgetLimitExceeded ? 'rgba(239, 68, 68, 0.2)' : 'var(--border-glow)',
                background: isSelected ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                opacity: budgetLimitExceeded ? 0.75 : 1,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Corner Badges */}
                {isCheapest && (
                  <span className="badge badge-blue" style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '0.6rem' }}>
                    Best Value
                  </span>
                )}
                {budgetLimitExceeded && (
                  <span className="badge badge-rose" style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <AlertTriangle size={10} /> Over Budget
                  </span>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  <div style={{
                    background: isSelected ? mode.color : 'var(--bg-tertiary)',
                    color: isSelected ? 'black' : 'var(--text-primary)',
                    padding: '8px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{mode.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mode.data.duration}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Est. Cost:</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: budgetLimitExceeded ? 'var(--danger)' : 'var(--success)', display: 'flex', alignItems: 'center' }}>
                    <IndianRupee size={15} />{mode.data.price.toLocaleString('en-IN')}
                  </span>
                </div>

                {!mode.data.isDirect && (
                  <div style={{ marginTop: '8px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '0.55rem', padding: '2px 6px' }}>
                      Connection Active
                    </span>
                  </div>
                )}

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '12px', borderTop: '1px solid var(--border-glow)', paddingTop: '8px', marginBottom: '15px' }}>
                  {mode.data.details}
                </div>
              </div>

              {/* Redirect Action Button */}
              {isSelected && (
                <a 
                  href={getBookingUrl(mode.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-tab no-print animate-slide"
                  style={{
                    background: mode.color,
                    color: 'black',
                    justifyContent: 'center',
                    padding: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    marginTop: '5px'
                  }}
                >
                  Book on External site
                  <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                </a>
              )}

            </div>
          );
        })}
      </div>
      
    </div>
  );
}

// Helper checker function
function isDirectModeSelected(modes, selectedMode) {
  const matched = modes.find(m => m.id === selectedMode);
  return matched ? matched.data?.isDirect : true;
}
