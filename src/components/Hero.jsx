import React, { useState, useEffect } from 'react';
import { Search, MapPin, IndianRupee, Calendar, Sparkles, Sun, Moon, LogOut, ArrowRight } from 'lucide-react';
import { stateCities } from '../data/travelData';

export default function Hero({
  originHub,
  setOriginHub,
  originCity,
  setOriginCity,
  destination,
  setDestination,
  budget,
  setBudget,
  duration,
  setDuration,
  darkMode,
  setDarkMode,
  user,
  onLogout,
  onOpenDashboard,
  onShowPlan
}) {
  const [searchVal, setSearchVal] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // States for Cascaded Origin Selector
  const [selectedState, setSelectedState] = useState('Delhi NCR');

  useEffect(() => {
    if (destination) {
      setSearchVal(destination.name);
    } else {
      setSearchVal('');
    }
  }, [destination]);

  // State-City cascading logic
  useEffect(() => {
    const cities = stateCities[selectedState] || [];
    if (cities.length > 0) {
      const defaultCity = cities[0];
      setOriginCity(defaultCity);
      mapCityToTransitHub(defaultCity);
    }
  }, [selectedState]);

  const handleCityChange = (city) => {
    setOriginCity(city);
    mapCityToTransitHub(city);
  };

  const mapCityToTransitHub = (cityName) => {
    const name = cityName.toLowerCase();
    let hub = 'delhi';
    if (name.includes('delhi')) hub = 'delhi';
    else if (name.includes('mumbai') || name.includes('pune') || name.includes('nagpur') || name.includes('thane') || name.includes('nashik') || name.includes('aurangabad') || name.includes('solapur') || name.includes('amravati') || name.includes('kolhapur') || name.includes('navi mumbai') || name.includes('sangli') || name.includes('jalgaon') || name.includes('akola') || name.includes('latur') || name.includes('dhule') || name.includes('ahmednagar') || name.includes('chandrapur') || name.includes('parbhani') || name.includes('jalna') || name.includes('bhusawal') || name.includes('panvel') || name.includes('satara')) hub = 'mumbai';
    else if (name.includes('bengaluru') || name.includes('mysore') || name.includes('coimbatore') || name.includes('chennai') || name.includes('madurai') || name.includes('salem') || name.includes('vellore') || name.includes('erode')) hub = 'bengaluru';
    else if (name.includes('kolkata') || name.includes('siliguri') || name.includes('howrah') || name.includes('darjeeling') || name.includes('durgapur')) hub = 'kolkata';
    else if (name.includes('goa') || name.includes('panaji') || name.includes('vasco')) hub = 'bengaluru';
    else if (name.includes('kochi') || name.includes('trivandrum')) hub = 'bengaluru';
    else if (name.includes('jaipur') || name.includes('udaipur') || name.includes('jodhpur') || name.includes('kota')) hub = 'delhi';
    
    setOriginHub(hub);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchVal(value);

    if (value.trim().length > 0) {
      try {
        const response = await fetch(`http://localhost:5000/api/destinations?search=${encodeURIComponent(value)}`);
        if (response.ok) {
          const list = await response.json();
          setSuggestions(list);
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (dest) => {
    setDestination(dest);
    setSearchVal(dest.name);
    setShowSuggestions(false);
  };

  return (
    <header className="glass-panel animate-fade" style={{ margin: '20px', padding: '40px 30px', position: 'relative', overflow: 'visible', zIndex: 100 }}>
      
      {/* Tuscany Sunset Background Photo */}
      <div className="hero-video-container">
        <div 
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url("https://media.istockphoto.com/id/518222278/photo/tuscany-landscape-at-sunset.jpg?s=612x612&w=0&k=20&c=QzKLYLDDc6v8tj0H-wdqS9tT5cXEEJrHCEaTvqI1H-I=")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
            filter: 'contrast(1.05) saturate(1.15)'
          }}
        />
        <div className="hero-video-overlay" />
      </div>

      {/* Interactive Contents Layer */}
      <div style={{ position: 'relative', zIndex: '10' }}>
        
        {/* Top Banner Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img 
              src="/logo.png" 
              alt="Travilio Official Logo" 
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'contain',
                borderRadius: '14px',
                border: '1px solid var(--border-glow)',
                background: 'white',
                padding: '4px',
                boxShadow: 'var(--shadow-lg)'
              }} 
            />
            <div>
              <h1 style={{ fontSize: '2.4rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--primary), var(--accent-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Travilio
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600' }}>Smart Indian Route &amp; Budget Architect</p>
            </div>
          </div>

          {/* User Profile / Theme controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={onOpenDashboard}
                  className="nav-tab"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glow)', boxShadow: 'var(--shadow-lg)' }}
                >
                  My History
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-secondary)', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-glow)' }}>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--primary)' }}>@{user.username}</strong>
                  <button 
                    onClick={onLogout}
                    className="no-print"
                    style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex', padding: '2px' }}
                    title="Logout Account"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              </div>
            )}

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="nav-tab"
              style={{ padding: '12px', border: '1px solid var(--border-glow)', borderRadius: '8px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={18} style={{ color: 'var(--accent-gold)' }} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Inputs panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', position: 'relative' }}>
          
          {/* Starting State */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} style={{ color: 'var(--primary)' }} /> Starting State
            </label>
            <select 
              value={selectedState} 
              onChange={(e) => setSelectedState(e.target.value)}
              className="form-input"
              style={{ appearance: 'auto', cursor: 'pointer', background: 'var(--bg-secondary)' }}
            >
              {Object.keys(stateCities).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Starting City */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} style={{ color: 'var(--accent-cyan)' }} /> Starting City
            </label>
            <select 
              value={originCity} 
              onChange={(e) => handleCityChange(e.target.value)}
              className="form-input"
              style={{ appearance: 'auto', cursor: 'pointer', background: 'var(--bg-secondary)' }}
            >
              {(stateCities[selectedState] || []).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Destination Search */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Search size={15} style={{ color: 'var(--accent-cyan)' }} /> Destination City
            </label>
            <input 
              type="text" 
              placeholder="Search e.g. Sikkim, Goa..." 
              value={searchVal}
              onChange={handleSearchChange}
              onFocus={() => searchVal.trim().length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="form-input"
              style={{ background: 'var(--bg-secondary)' }}
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-box">
                {suggestions.map(dest => (
                  <div 
                    key={dest.id} 
                    className="suggestion-item"
                    onMouseDown={() => selectSuggestion(dest)}
                  >
                    <div>
                      <strong style={{ display: 'block' }}>{dest.name}</strong>
                      <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{dest.state}</span>
                    </div>
                    <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>{dest.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Budget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IndianRupee size={15} style={{ color: 'var(--success)' }} /> Max Budget
              </label>
              <span style={{ color: 'var(--success)', fontWeight: '800', fontSize: '1rem' }}>
                ₹{budget.toLocaleString('en-IN')}
              </span>
            </div>
            <input 
              type="range" 
              min="3000" 
              max="100000" 
              step="1000" 
              value={budget} 
              onChange={(e) => setBudget(Number(e.target.value))}
              className="budget-slider"
            />
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[5000, 15000, 35000, 75000].map(amt => (
                <button 
                  key={amt} 
                  onClick={() => setBudget(amt)}
                  className="no-print"
                  style={{
                    background: budget === amt ? 'var(--primary)' : 'var(--bg-tertiary)',
                    color: budget === amt ? 'white' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    flexShrink: 0
                  }}
                >
                  ₹{(amt/1000)}K
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={15} style={{ color: 'var(--accent-gold)' }} /> Length of Stay
              </label>
              <span style={{ color: 'var(--accent-gold)', fontWeight: '800', fontSize: '1rem' }}>
                {duration} {duration === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="15" 
              step="1" 
              value={duration} 
              onChange={(e) => setDuration(Number(e.target.value))}
              className="budget-slider"
              style={{ accentColor: 'var(--accent-gold)' }}
            />
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              {[3, 5, 7, 10].map(d => (
                <button 
                  key={d} 
                  onClick={() => setDuration(d)}
                  className="no-print"
                  style={{
                    background: duration === d ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                    color: duration === d ? 'black' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: '700',
                    flexShrink: 0
                  }}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Premium "Show Travel Plan" Action Trigger Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
          <button 
            onClick={onShowPlan}
            className="no-print"
            style={{
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 45px',
              fontSize: '1rem',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 8px 24px var(--primary-glow)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.25s ease',
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(200, 112, 66, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px var(--primary-glow)';
            }}
          >
            <Sparkles size={18} />
            <span>Show Travel Plan</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </header>
  );
}
