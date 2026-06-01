import React, { useState, useEffect } from 'react';
import { ShieldCheck, Heart, Compass, Route, Calendar, ShieldCheck as ShieldIcon, Trash2, CalendarDays, Eye, Sparkles, X, User } from 'lucide-react';
import Hero from './components/Hero';
import RouteFinder from './components/RouteFinder';
import ItineraryPlanner from './components/ItineraryPlanner';
import ExploreGuide from './components/ExploreGuide';
import PackingList from './components/PackingList';
import Auth from './components/Auth';

export default function App() {
  const [originHub, setOriginHub] = useState('delhi');
  const [originCity, setOriginCity] = useState('Delhi (DEL)');
  const [destinations, setDestinations] = useState([]);
  const [destination, setDestination] = useState(null);
  const [budget, setBudget] = useState(15000);
  const [duration, setDuration] = useState(5);
  const [activeTab, setActiveTab] = useState('routes');
  const [darkMode, setDarkMode] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [showPlan, setShowPlan] = useState(false); // Lock plan details initially
  
  // Auth States
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('travilio_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('travilio_token') || null;
  });
  
  // Remote Saved Trips
  const [savedTrips, setSavedTrips] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Fetch all destinations
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/destinations');
        if (response.ok) {
          const list = await response.json();
          setDestinations(list);
          if (list.length > 0) {
            setDestination(list[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
      }
    };
    loadDestinations();
  }, []);

  // Fetch saved trips
  const loadSavedTrips = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/trips', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const list = await response.json();
        setSavedTrips(list);
      }
    } catch (err) {
      console.error('Error loading saved trips:', err);
    }
  };

  useEffect(() => {
    if (token) {
      loadSavedTrips();
    } else {
      setSavedTrips([]);
    }
  }, [token]);

  // Handle Dark / Light Mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleAuthSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('travilio_user', JSON.stringify(userData));
    localStorage.setItem('travilio_token', userToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('travilio_user');
    localStorage.removeItem('travilio_token');
    setShowDashboardModal(false);
    setShowPlan(false);
  };

  // Delete saved trip
  const handleDeleteTrip = async (tripId, e) => {
    if (e) e.stopPropagation();
    if (!token) return;
    try {
      const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        loadSavedTrips();
      }
    } catch (err) {
      console.error('Error deleting trip:', err);
    }
  };

  // Select a saved trip & load it dynamically
  const handleSelectSavedTrip = (trip) => {
    const matchedDest = destinations.find(d => d.id === trip.destinationId);
    if (matchedDest) {
      setDestination(matchedDest);
      setDuration(trip.duration);
      setBudget(trip.totalCost);
      setFavorites(trip.favorites || []);
      setShowDashboardModal(false);
      setShowPlan(true); // Auto show plan when loaded from profile
      
      setTimeout(() => {
        scrollToSection('itinerary');
      }, 150);
    }
  };

  // Smooth scroll helper to anchor sections down the page
  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShowPlanClick = () => {
    setShowPlan(true);
    setTimeout(() => {
      scrollToSection('routes');
    }, 100);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header controls with integrated show travel plan click callback */}
      <Hero 
        originHub={originHub}
        setOriginHub={setOriginHub}
        originCity={originCity}
        setOriginCity={setOriginCity}
        destination={destination}
        setDestination={setDestination}
        budget={budget}
        setBudget={setBudget}
        duration={duration}
        setDuration={setDuration}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        onLogout={handleLogout}
        onOpenDashboard={() => setShowDashboardModal(true)}
        onShowPlan={handleShowPlanClick}
      />

      {/* Auth Gate */}
      {!user ? (
        <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Auth onAuthSuccess={handleAuthSuccess} />
        </main>
      ) : (
        <div style={{ width: '100%', boxSizing: 'border-box' }}>
          
          {!showPlan ? (
            /* Beautiful Centered Dynamic Planner Invitation Card */
            <main style={{ maxWidth: '1000px', width: '100%', margin: '0 auto 40px auto', padding: '0 20px', boxSizing: 'border-box' }}>
              <div className="centered-section animate-slide" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '50px 30px', gap: '20px' }}>
                <div style={{ background: 'var(--primary-glow)', padding: '16px', borderRadius: '50%', color: 'var(--primary)' }}>
                  <Sparkles size={32} className="pulse-badge" />
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Your Indian Travel Architecture Awaits</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '640px', lineHeight: '1.6' }}>
                  Select your departure state, city, budget limit, and destination city in India above, then click the <strong>"Show Travel Plan"</strong> button to load your dynamic multi-modal routes, day-by-day itineraries, hotel bookings, and weather advisories.
                </p>
              </div>
            </main>
          ) : (
            /* Completely Unified Centered Column Layout (No sidebar pushing content to the side!) */
            <main style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '0 20px 40px 20px', display: 'flex', flexDirection: 'column', gap: '30px', boxSizing: 'border-box' }}>
              
              {/* Destination Banner Card */}
              {destination && (
                <div className="glass-panel animate-slide" style={{ overflow: 'hidden', borderRadius: '14px', width: '100%' }}>
                  <div 
                    style={{ 
                      height: '240px', 
                      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(15,23,42,0.9)), url(${destination.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '24px'
                    }}
                  >
                    <div>
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem', marginBottom: '6px' }}>
                        {destination.category}
                      </span>
                      <h2 style={{ fontSize: '2rem', fontWeight: '800', textShadow: '0 2px 5px rgba(0,0,0,0.7)', color: 'white', marginBottom: '4px' }}>
                        {destination.name}
                      </h2>
                      <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>
                        {destination.state}, India
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      "{destination.tagline}"
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                      {destination.description}
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', borderTop: '1px solid var(--border-glow)', paddingTop: '15px', fontSize: '0.82rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Best Time to Visit: </span>
                        <strong style={{ color: 'var(--text-secondary)' }}>{destination.bestTime}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Climate Type: </span>
                        <strong style={{ color: 'var(--text-secondary)' }}>{destination.climate}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pinned Bookmarked Sights & Dining */}
              {favorites.length > 0 && (
                <div className="glass-card animate-slide" style={{ padding: '20px', width: '100%' }}>
                  <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                    <Heart size={16} fill="var(--accent-rose)" style={{ color: 'var(--accent-rose)' }} />
                    Pinned Spots &amp; Dining ({favorites.length})
                  </h3>
                  <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                    {favorites.map(fav => (
                      <div 
                        key={fav.id}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px',
                          background: 'var(--bg-tertiary)', 
                          padding: '8px 14px', 
                          borderRadius: '8px', 
                          fontSize: '0.78rem',
                          border: '1px solid var(--border-glow)',
                          flexShrink: 0
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', display: 'block', color: 'var(--primary)', fontWeight: 'bold' }}>{fav.category}</span>
                          <strong>{fav.name}</strong>
                        </div>
                        <button 
                          onClick={() => setFavorites(favorites.filter(f => f.id !== fav.id))}
                          style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sticky Navigation Tabs (Stays beautifully centered) */}
              <div className="sticky-nav-container no-print" style={{ position: 'sticky', top: '15px', zIndex: '50', width: '100%', margin: '0' }}>
                <div className="glass-panel" style={{ padding: '8px', display: 'flex', gap: '6px', overflowX: 'auto', borderRadius: '12px' }}>
                  {[
                    { id: 'routes', name: 'Best Routes', icon: Route },
                    { id: 'itinerary', name: 'Itinerary Planner', icon: Calendar },
                    { id: 'explore', name: 'Local Guide', icon: Compass },
                    { id: 'packing', name: 'Packing Checklist', icon: ShieldIcon }
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => scrollToSection(tab.id)}
                        className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                        style={{ flexGrow: 1, justifyContent: 'center', border: 'none', borderRadius: '8px' }}
                      >
                        <Icon size={18} />
                        <span className="no-print">{tab.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Render ALL Sections sequentially in centered layout */}
              <div id="routes-section" className="centered-section animate-slide" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '24px', borderBottom: '1px solid var(--border-glow)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Route style={{ color: 'var(--primary)' }} /> 1. Best Transit Routes
                </h2>
                <RouteFinder 
                  originHub={originHub}
                  originCity={originCity}
                  destination={destination} 
                  budget={budget} 
                />
              </div>

              <div id="itinerary-section" className="centered-section animate-slide" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '24px', borderBottom: '1px solid var(--border-glow)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Calendar style={{ color: 'var(--accent-gold)' }} /> 2. Personal Day-by-Day Itinerary
                </h2>
                <ItineraryPlanner 
                  originHub={originHub}
                  originCity={originCity}
                  destination={destination} 
                  budget={budget} 
                  duration={duration} 
                  favorites={favorites}
                  token={token}
                  onTripSaved={loadSavedTrips}
                />
              </div>

              <div id="explore-section" className="centered-section animate-slide" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '24px', borderBottom: '1px solid var(--border-glow)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Compass style={{ color: 'var(--accent-cyan)' }} /> 3. Destination Local Guide
                </h2>
                <ExploreGuide 
                  destination={destination} 
                  budget={budget} 
                  duration={duration} 
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              </div>

              <div id="packing-section" className="centered-section animate-slide" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '24px', borderBottom: '1px solid var(--border-glow)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldIcon style={{ color: 'var(--success)' }} /> 4. Climate Packing Checklist
                </h2>
                <PackingList 
                  destination={destination} 
                />
              </div>

            </main>
          )}

        </div>
      )}

      {/* Traveler Dashboard History Modal Overlay */}
      {showDashboardModal && (
        <div className="modal-overlay no-print" onClick={() => setShowDashboardModal(false)}>
          <div className="modal-content animate-slide" onClick={(e) => e.stopPropagation()}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glow)', paddingBottom: '15px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={24} style={{ color: 'var(--primary)' }} />
                Traveler Profile &amp; History
              </h2>
              <button 
                onClick={() => setShowDashboardModal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '20px', background: 'var(--bg-tertiary)', borderRadius: '10px', marginBottom: '25px', border: '1px solid var(--border-glow)' }}>
              <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '50%', color: 'white' }}>
                <User size={30} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>@{user?.username}</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Member Email: {user?.email}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarDays size={18} style={{ color: 'var(--accent-gold)' }} />
              Saved Trip Itineraries ({savedTrips.length})
            </h3>

            {savedTrips.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                You haven't saved any trips yet. Generate an itinerary and click "Save Plan to Database"!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {savedTrips.map(trip => (
                  <div 
                    key={trip._id}
                    className="glass-card"
                    style={{ 
                      padding: '16px 20px', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      cursor: 'pointer',
                      background: 'var(--bg-secondary)',
                      borderColor: 'var(--border-glow)',
                      transition: 'border-color 0.2s'
                    }}
                    onClick={() => handleSelectSavedTrip(trip)}
                  >
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{trip.destinationName}</h4>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        <span>Length: {trip.duration} days</span>
                        <span>|</span>
                        <span>Transport: {trip.transportMode.toUpperCase()}</span>
                        <span>|</span>
                        <strong style={{ color: 'var(--success)' }}>Budget: ₹{trip.totalCost.toLocaleString('en-IN')}</strong>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                        Saved on: {new Date(trip.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button 
                        onClick={() => handleSelectSavedTrip(trip)}
                        className="nav-tab" 
                        style={{ padding: '6px 12px', background: 'var(--primary)', color: 'white', fontSize: '0.75rem' }}
                      >
                        <Eye size={12} /> View
                      </button>
                      <button 
                        onClick={(e) => handleDeleteTrip(trip._id, e)}
                        className="nav-tab" 
                        style={{ padding: '6px 10px', border: '1px solid var(--border-glow)', color: 'var(--danger)', fontSize: '0.75rem' }}
                        title="Delete itinerary"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="no-print" style={{ marginTop: 'auto', padding: '30px', borderTop: '1px solid var(--border-glow)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)' }}>
        <p>© 2026 Travilio Trip Planner. Crafted with premium Blocksy Travel styling &amp; custom variables.</p>
      </footer>

    </div>
  );
}
