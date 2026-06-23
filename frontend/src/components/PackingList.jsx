import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, CloudSun, RotateCcw, Info, CheckCircle2 } from 'lucide-react';

export default function PackingList({ destination }) {
  const [checklist, setChecklist] = useState([]);

  // Base list + climate-specific items
  useEffect(() => {
    if (!destination) return;

    const baseItems = [
      { id: 1, text: 'Aadhaar Card / Govt ID', category: 'documents', checked: false },
      { id: 2, text: 'Train/Flight Tickets downloaded offline', category: 'documents', checked: false },
      { id: 3, text: 'Cash (for local Indian street food/cabs)', category: 'documents', checked: false },
      { id: 4, text: 'UPI Apps setup on Phone (PhonePe/GPay)', category: 'documents', checked: false },
      { id: 5, text: 'Mobile Charger & Power Bank', category: 'electronics', checked: false },
      { id: 6, text: 'Hand Sanitizer & Wet Wipes', category: 'toiletries', checked: false },
      { id: 7, text: 'First-aid kit (ORS, Paracetamol, Band-aids)', category: 'toiletries', checked: false },
    ];

    let climateItems = [];
    const cat = destination.category.toLowerCase();

    if (cat.includes('beach') || cat.includes('nature') || cat.includes('backwaters')) {
      climateItems = [
        { id: 10, text: 'Sunscreen (SPF 50+ highly recommended)', category: 'clothing', checked: false },
        { id: 11, text: 'Sunglasses & Sun Hat', category: 'clothing', checked: false },
        { id: 12, text: 'Lightweight cotton shirts / t-shirts', category: 'clothing', checked: false },
        { id: 13, text: 'Swimwear & Beach Slippers', category: 'clothing', checked: false },
        { id: 14, text: 'Mosquito Repellent Cream (Odomos)', category: 'toiletries', checked: false },
        { id: 15, text: 'Quick-dry microfiber towel', category: 'clothing', checked: false }
      ];
    } else if (cat.includes('hill') || cat.includes('snow') || cat.includes('altitude')) {
      climateItems = [
        { id: 20, text: 'Thermal Innerwear (2-3 pairs)', category: 'clothing', checked: false },
        { id: 21, text: 'Heavy woollen jacket or Down coat', category: 'clothing', checked: false },
        { id: 22, text: 'Woollen socks, gloves & beanie (monkey cap)', category: 'clothing', checked: false },
        { id: 23, text: 'Lip balm & heavy skin moisturizer', category: 'toiletries', checked: false },
        { id: 24, text: 'High-ankle trekking shoes', category: 'clothing', checked: false },
        { id: 25, text: 'Diamox tablets (For altitude sickness - Leh)', category: 'toiletries', checked: false }
      ];
    } else {
      // Heritage / Cultural / Spiritual (Jaipur, Agra, Varanasi)
      climateItems = [
        { id: 30, text: 'Conservative outfits (covering shoulders & knees for temple visits)', category: 'clothing', checked: false },
        { id: 31, text: 'Comfortable walking shoes / sneakers', category: 'clothing', checked: false },
        { id: 32, text: 'Umbrella or light raincoat (seasonal protection)', category: 'clothing', checked: false },
        { id: 33, text: 'Handkerchief / Wet wipes for dusty roads', category: 'toiletries', checked: false },
        { id: 34, text: 'Cloth bag/slip-ons (Easy to remove outside monuments)', category: 'clothing', checked: false }
      ];
    }

    setChecklist([...baseItems, ...climateItems]);
  }, [destination]);

  if (!destination) {
    return (
      <div className="glass-card animate-slide" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Choose a destination to view customized packing guidelines.</p>
      </div>
    );
  }

  const toggleCheck = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const resetList = () => {
    setChecklist(checklist.map(item => ({ ...item, checked: false })));
  };

  const getPercentage = () => {
    if (checklist.length === 0) return 0;
    const checkedCount = checklist.filter(item => item.checked).length;
    return Math.round((checkedCount / checklist.length) * 100);
  };

  const categories = {
    documents: 'Required Documents & Apps',
    clothing: 'Climate Clothing & Gear',
    electronics: 'Tech & Electronics',
    toiletries: 'Health & Personal Care'
  };

  return (
    <div className="animate-slide" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
      
      {/* Weather Forecast Info Card */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CloudSun size={22} style={{ color: 'var(--accent-gold)' }} />
          Weather & Packing Advisory
        </h3>

        <div style={{ background: 'var(--bg-tertiary)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-gold)' }}>
            {destination.climate.split(' ')[0]}
          </span>
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Climatic Conditions</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{destination.climate}</span>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          <p style={{ marginBottom: '10px' }}>
            The best time to visit <strong>{destination.name}</strong> is during <strong>{destination.bestTime}</strong>. 
          </p>
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(59, 130, 246, 0.08)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.15)', marginTop: '5px' }}>
            <Info size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
            <span>
              {destination.category.toLowerCase().includes('altitude') ? 
                'Important: When visiting Leh Ladakh, take complete rest for the first 24-36 hours to allow acclimatization and avoid high-altitude sickness (AMS).' :
                'Pro-tip: Always keep standard cash on hand. Small vendors, street food stores and heritage guides in rural locations might not accept cards or digital wallets.'
              }
            </span>
          </div>
        </div>
      </div>

      {/* Checklist Card */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} style={{ color: 'var(--success)' }} />
            Packing Checklist ({getPercentage()}%)
          </h3>
          <button 
            onClick={resetList} 
            className="no-print"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${getPercentage()}%`, height: '100%', background: 'var(--success)', transition: 'width 0.3s ease' }} />
        </div>

        {/* Checkbox Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '400px', overflowY: 'auto', paddingRight: '5px' }}>
          {Object.entries(categories).map(([key, label]) => {
            const groupItems = checklist.filter(item => item.category === key);
            if (groupItems.length === 0) return null;

            return (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--primary-hover)', letterSpacing: '0.05em' }}>{label}</span>
                {groupItems.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleCheck(item.id)}
                    className={`checklist-item ${item.checked ? 'checked' : ''}`}
                    style={{ fontSize: '0.85rem' }}
                  >
                    {item.checked ? 
                      <CheckSquare size={16} style={{ color: 'var(--success)' }} /> : 
                      <Square size={16} style={{ color: 'var(--text-muted)' }} />
                    }
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}
