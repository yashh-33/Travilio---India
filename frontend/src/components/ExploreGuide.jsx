import React, { useState } from 'react';
import { Hotel, Compass, Utensils, Activity, Star, IndianRupee, Heart, Flame, ArrowUpRight } from 'lucide-react';
import ImageLoader from './ImageLoader.jsx';

export default function ExploreGuide({ destination, budget, duration, favorites, setFavorites }) {
  const [subTab, setSubTab] = useState('hotels');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!destination) {
    return (
      <div className="glass-card animate-slide" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Choose a destination to explore hotels, food, and sightseeing.</p>
      </div>
    );
  }

  // Determine staying recommended tier based on average daily allowance
  const estTransportCost = destination.routes.delhi?.train?.price || 1000;
  const remainingBudget = Math.max(0, budget - estTransportCost);
  const dailyAllowance = remainingBudget / Math.max(1, duration);

  const getRecommendedStayTier = () => {
    if (dailyAllowance < 2000) return 'budget';
    if (dailyAllowance < 8000) return 'midRange';
    return 'luxury';
  };

  const recommendedTier = getRecommendedStayTier();

  const toggleFavorite = (item, category) => {
    const itemId = `${category}-${item.name.replace(/\s+/g, '-').toLowerCase()}`;
    const isFav = favorites.some(f => f.id === itemId);
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== itemId));
    } else {
      setFavorites([...favorites, { id: itemId, name: item.name, category, cost: item.price || item.cost || item.entryFee || 0 }]);
    }
  };

  const isFavorite = (name, category) => {
    const itemId = `${category}-${name.replace(/\s+/g, '-').toLowerCase()}`;
    return favorites.some(f => f.id === itemId);
  };

  const getHotelBookingUrl = (hotelName) => {
    return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotelName)}`;
  };

  const getRestaurantBookingUrl = (restaurantName) => {
    return `https://www.tripadvisor.in/Search?q=${encodeURIComponent(restaurantName)}`;
  };

  const galleryImages = destination.images && destination.images.length > 0
    ? destination.images
    : [{ url: destination.image, title: destination.name, source: "Unsplash", photographer: "Contributor" }];

  return (
    <div className="animate-slide" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. Stunning Destination Real Image Carousel */}
      <div 
        className="destination-gallery-carousel" 
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '340px', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          border: '1px solid var(--border-glow)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)'
        }}
      >
        <ImageLoader 
          src={galleryImages[activeImageIdx]?.url} 
          alt={galleryImages[activeImageIdx]?.title} 
          photographer={galleryImages[activeImageIdx]?.photographer}
          source={galleryImages[activeImageIdx]?.source}
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Dark Overlay Text details */}
        <div 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            padding: '24px 20px 15px 20px', 
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 70%, transparent 100%)',
            zIndex: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Real Photo Gallery
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'white', marginTop: '4px' }}>
              {galleryImages[activeImageIdx]?.title || `${destination.name} - ${destination.state}`}
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                style={{
                  width: activeImageIdx === idx ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeImageIdx === idx ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease-in-out'
                }}
                title={`View image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sub tabs navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-glow)', paddingBottom: '8px', overflowX: 'auto' }} className="no-print">
        {[
          { id: 'hotels', name: 'Nearby Stays', icon: Hotel },
          { id: 'spots', name: 'Famous Spots', icon: Compass },
          { id: 'dining', name: 'Local Eats', icon: Utensils },
          { id: 'adventures', name: 'Adventures', icon: Activity }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`nav-tab ${subTab === tab.id ? 'active' : ''}`}
              style={{ fontSize: '0.85rem', flexShrink: 0 }}
            >
              <Icon size={16} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      <div className="animate-fade">
        
        {/* HOTELS */}
        {subTab === 'hotels' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Recommended fit highlighted based on your <strong>₹{budget.toLocaleString('en-IN')}</strong> budget and <strong>{duration} days</strong> length of stay.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {Object.entries(destination.hotels).map(([tier, hotel]) => {
                const isRec = recommendedTier === tier;
                const totalStayCost = hotel.price * duration;
                
                return (
                  <div 
                    key={tier} 
                    className="glass-card" 
                    style={{ 
                      position: 'relative', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between',
                      borderColor: isRec ? 'var(--primary)' : 'var(--border-glow)',
                      boxShadow: isRec ? '0 4px 20px var(--primary-glow)' : 'none'
                    }}
                  >
                    {isRec && (
                      <span className="badge badge-gold" style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '0.65rem' }}>
                        Best Budget Fit
                      </span>
                    )}
                    <div>
                      <span className="badge badge-blue" style={{ fontSize: '0.65rem', marginBottom: '8px' }}>
                        {tier === 'budget' ? 'Backpacker / Hostel' : tier === 'midRange' ? 'Boutique / Mid-Range' : 'Premium / Luxury'}
                      </span>
                      <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{hotel.name}</h4>
                      <div style={{ display: 'flex', gap: '2px', color: 'var(--accent-gold)', marginBottom: '12px' }}>
                        {Array.from({ length: tier === 'budget' ? 2 : tier === 'midRange' ? 3 : 5 }).map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <ul style={{ paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                        {hotel.highlights.map((h, i) => (
                          <li key={i} style={{ marginBottom: '6px' }}>{h}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border-glow)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--success)', display: 'flex', alignItems: 'center' }}>
                            <IndianRupee size={15} />{hotel.price.toLocaleString('en-IN')}<span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/night</span>
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                            Total Stay: ₹{totalStayCost.toLocaleString('en-IN')} ({duration} nights)
                          </span>
                        </div>
                      </div>
                      
                      <a 
                        href={getHotelBookingUrl(hotel.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-tab no-print"
                        style={{
                          background: 'var(--primary)',
                          color: 'white',
                          justifyContent: 'center',
                          padding: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          borderRadius: '6px',
                          textDecoration: 'none'
                        }}
                      >
                        Book Room
                        <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SPOTS */}
        {subTab === 'spots' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {destination.attractions.map((spot, i) => {
              const isFav = isFavorite(spot.name, 'spot');
              return (
                <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{spot.name}</h4>
                      <button 
                        onClick={() => toggleFavorite(spot, 'spot')}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isFav ? 'var(--accent-rose)' : 'var(--text-muted)' }}
                      >
                        <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>{spot.category || 'Sightseeing'}</span>
                      <span className="badge badge-blue" style={{ fontSize: '0.62rem' }}>{spot.duration || '2'}h Visit</span>
                      <span className="badge badge-gold" style={{ fontSize: '0.62rem' }}>
                        {spot.entryFee === 0 ? 'Free Entry' : `Entry: ₹${spot.entryFee}`}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '14px' }}>{spot.description}</p>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                      <span>⏰ Timings: {spot.timings || '9:00 AM - 6:00 PM'}</span>
                      <span>📅 Best Time: {spot.bestTime || 'October to March'}</span>
                    </div>
                  </div>
                  {spot.googleMapsUrl && (
                    <a
                      href={spot.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-tab no-print"
                      style={{
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-glow)',
                        justifyContent: 'center',
                        padding: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        borderRadius: '6px',
                        textDecoration: 'none'
                      }}
                    >
                      View on Google Maps
                      <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* DINING */}
        {subTab === 'dining' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {destination.dining.map((food, i) => {
              const isFav = isFavorite(food.name, 'dining');
              return (
                <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{food.name}</h4>
                      <button 
                        onClick={() => toggleFavorite(food, 'dining')}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isFav ? 'var(--accent-rose)' : 'var(--text-muted)' }}
                      >
                        <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <span className={`badge ${food.type === 'Fine Dining' ? 'badge-rose' : food.type === 'Mid-Range' ? 'badge-blue' : 'badge-gold'}`} style={{ fontSize: '0.62rem', marginBottom: '10px', display: 'inline-block' }}>
                      {food.type}
                    </span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      <strong>Specialty:</strong> {food.specialty}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '16px' }}>{food.description}</p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-glow)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Avg Cost (for 2):</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--success)', display: 'flex', alignItems: 'center' }}>
                        <IndianRupee size={14} />{food.cost}
                      </span>
                    </div>
                    <a 
                      href={getRestaurantBookingUrl(food.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-tab no-print"
                      style={{
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-glow)',
                        justifyContent: 'center',
                        padding: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        borderRadius: '6px',
                        textDecoration: 'none'
                      }}
                    >
                      Reserve Table
                      <ArrowUpRight size={14} style={{ marginLeft: '4px' }} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ADVENTURES */}
        {subTab === 'adventures' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {destination.adventures.map((adv, i) => {
              const isFav = isFavorite(adv.name, 'adventure');
              return (
                <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{adv.name}</h4>
                      <button 
                        onClick={() => toggleFavorite(adv, 'adventure')}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isFav ? 'var(--accent-rose)' : 'var(--text-muted)' }}
                      >
                        <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{adv.type}</span>
                      <span className="badge badge-rose" style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Flame size={10} fill="currentColor" /> {adv.thrillLevel} Thrill
                      </span>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-glow)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Cost:</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--success)', display: 'flex', alignItems: 'center' }}>
                      <IndianRupee size={15} />{adv.cost.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
