import React, { useState, useEffect } from 'react';
import { Printer, Copy, CheckCircle, Clock, AlertCircle, Sparkles, Plus, Trash2, IndianRupee, Save } from 'lucide-react';
import { API_URL } from '../config';

export default function ItineraryPlanner({ originHub, originCity, destination, budget, duration, favorites, token, onTripSaved }) {
  const [customActivities, setCustomActivities] = useState({});
  const [newActivityText, setNewActivityText] = useState('');
  const [selectedDayForAdd, setSelectedDayForAdd] = useState(1);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setCustomActivities({});
    setSaveMessage('');
  }, [destination]);

  if (!destination) {
    return (
      <div className="glass-card animate-slide" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Choose a destination to generate your personalized itinerary.</p>
      </div>
    );
  }

  const routeData = destination.routes[originHub] || {};

  const getBudgetTier = () => {
    const averageDailyBudget = budget / duration;

    if (averageDailyBudget < 2500) {
      return {
        id: 'backpacker',
        name: 'Backpacker / Budget',
        transport: 'train',
        hotelTier: 'budget',
        diningType: 'Street Food',
        badgeClass: 'badge-gold'
      };
    } else if (averageDailyBudget < 7500) {
      return {
        id: 'explorer',
        name: 'Explorer / Mid-Range',
        transport: (routeData.flight && routeData.flight.price < budget * 0.3) ? 'flight' : 'train',
        hotelTier: 'midRange',
        diningType: 'Mid-Range',
        badgeClass: 'badge-blue'
      };
    } else {
      return {
        id: 'elite',
        name: 'Elite / Luxury',
        transport: routeData.flight ? 'flight' : 'cab',
        hotelTier: 'luxury',
        diningType: 'Fine Dining',
        badgeClass: 'badge-rose'
      };
    }
  };

  const tier = getBudgetTier();
  
  const baseTransportPrice = routeData[tier.transport]?.price || 0;
  const isMajorHub = originCity.toLowerCase().includes('delhi') ||
                     originCity.toLowerCase().includes('mumbai') ||
                     originCity.toLowerCase().includes('bengaluru') ||
                     originCity.toLowerCase().includes('kolkata');
  let connectionFee = 0;
  if (!isMajorHub && baseTransportPrice > 0) {
    if (tier.transport === 'flight') connectionFee = 2500;
    else if (tier.transport === 'train') connectionFee = 350;
    else if (tier.transport === 'bus') connectionFee = 250;
    else if (tier.transport === 'cab') connectionFee = 4500;
  }
  const transportCost = baseTransportPrice + connectionFee;
  const hotelPricePerNight = destination.hotels[tier.hotelTier]?.price || 0;
  const totalHotelCost = hotelPricePerNight * duration;

  const matchingDining = destination.dining.find(d => d.type === tier.diningType) || destination.dining[0];
  const diningCostPerDay = matchingDining.cost / 2;
  const totalDiningCost = diningCostPerDay * duration * 2;

  const totalAttractionsCost = destination.attractions.reduce((sum, spot) => sum + spot.entryFee, 0);

  const selectedAdventure = destination.adventures[tier.id === 'backpacker' ? 0 : tier.id === 'explorer' ? 1 : 2] || destination.adventures[0];
  const totalAdventuresCost = selectedAdventure ? selectedAdventure.cost : 0;

  const totalFavoritesCost = favorites.reduce((sum, f) => sum + f.cost, 0);

  const grandTotal = transportCost + totalHotelCost + totalDiningCost + totalAttractionsCost + totalAdventuresCost + totalFavoritesCost;
  const budgetShortfall = grandTotal - budget;
  const isOverBudget = budgetShortfall > 0;

  const handleSaveTrip = async () => {
    if (!token) return;
    setSaving(true);
    setSaveMessage('');

    // Format custom activities for server schema
    const formattedCustomActivities = [];
    Object.entries(customActivities).forEach(([day, list]) => {
      list.forEach(act => {
        formattedCustomActivities.push({ id: Number(day), text: act.text });
      });
    });

    const body = {
      destinationId: destination.id,
      destinationName: destination.name,
      duration,
      budgetTier: tier.name,
      transportMode: tier.transport,
      totalCost: grandTotal,
      customActivities: formattedCustomActivities,
      favorites
    };

    try {
      const response = await fetch(`${API_URL}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to save itinerary.');
      }

      setSaveMessage('✅ Itinerary successfully synced to your profile!');
      if (onTripSaved) onTripSaved();
    } catch (err) {
      setSaveMessage(`❌ Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const generateItineraryDays = () => {
    const daysList = [];
    const attractions = destination.attractions;
    const dining = destination.dining;
    const adventures = destination.adventures;

    for (let day = 1; day <= duration; day++) {
      const dayActivities = [];

      if (day === 1) {
        let arrivalDesc = `Check-in at ${destination.hotels[tier.hotelTier].name}. Freshen up and unpack.`;
        if (!isMajorHub && baseTransportPrice > 0) {
          const hubName = originHub.charAt(0).toUpperCase() + originHub.slice(1);
          let connectionDetails = '';
          if (tier.transport === 'flight') connectionDetails = `Connecting flight via ${hubName} Hub`;
          else if (tier.transport === 'train') connectionDetails = `Local Express connection to ${hubName} Junction`;
          else if (tier.transport === 'bus') connectionDetails = `Intercity Volvo to ${hubName} Bus Terminal`;
          else if (tier.transport === 'cab') connectionDetails = `Private cab pickup via ${hubName}`;
          arrivalDesc = `${connectionDetails}. ${arrivalDesc}`;
        }

        dayActivities.push({
          time: 'Morning / Afternoon',
          title: `Arrive via ${tier.transport.toUpperCase()} & Check-in`,
          desc: arrivalDesc,
          cost: 0
        });

        const spot = attractions[0];
        if (spot) {
          dayActivities.push({
            time: 'Late Afternoon',
            title: `Visit ${spot.name}`,
            desc: spot.description,
            cost: spot.entryFee
          });
        }

        const food = dining.find(d => d.type === tier.diningType) || dining[0];
        dayActivities.push({
          time: 'Evening',
          title: `Dinner at ${food.name}`,
          desc: `Enjoy local specialty: ${food.specialty}.`,
          cost: food.cost / 2
        });
      }
      else if (day === 2) {
        if (selectedAdventure) {
          dayActivities.push({
            time: 'Morning',
            title: `${selectedAdventure.name} (${selectedAdventure.type})`,
            desc: `High excitement! Thrill level: ${selectedAdventure.thrillLevel}.`,
            cost: selectedAdventure.cost
          });
        }

        const spot = attractions[1];
        if (spot) {
          dayActivities.push({
            time: 'Afternoon',
            title: `Explore ${spot.name}`,
            desc: spot.description,
            cost: spot.entryFee
          });
        }

        const streetFood = dining.find(d => d.type === 'Street Food') || dining[0];
        dayActivities.push({
          time: 'Evening',
          title: `Street Food crawl at local market`,
          desc: `Try out popular local bites like: ${streetFood.specialty} at ${streetFood.name}.`,
          cost: streetFood.cost
        });
      }
      else if (day === 3) {
        const spot = attractions[2] || attractions[0];
        if (spot) {
          dayActivities.push({
            time: 'Morning',
            title: `Discover ${spot.name}`,
            desc: spot.description,
            cost: spot.entryFee
          });
        }

        dayActivities.push({
          time: 'Afternoon',
          title: `Local Heritage Walk & Souvenir Shopping`,
          desc: `Stroll through the scenic markets. Purchase traditional local handicrafts.`,
          cost: 0
        });

        const food = dining.find(d => d.type === 'Fine Dining') || dining[0];
        dayActivities.push({
          time: 'Evening',
          title: `Special Dinner at ${food.name}`,
          desc: `Delight in premium local flavors: ${food.specialty}.`,
          cost: food.cost / 2
        });
      }
      else {
        const spotIdx = (day - 1) % attractions.length;
        const spot = attractions[spotIdx];
        
        dayActivities.push({
          time: 'Morning',
          title: `Leisurely Visit to ${spot.name}`,
          desc: `Relaxed exploration. ${spot.description}`,
          cost: spot.entryFee
        });

        const advIdx = (day - 1) % adventures.length;
        const adv = adventures[advIdx];
        if (adv && adv.name !== selectedAdventure.name) {
          dayActivities.push({
            time: 'Afternoon',
            title: `Optional: ${adv.name}`,
            desc: `Thrill level: ${adv.thrillLevel}. Cost: ₹${adv.cost}.`,
            cost: adv.cost
          });
        } else {
          dayActivities.push({
            time: 'Afternoon',
            title: `Relax at local nature spot / tea shop`,
            desc: `Breathe in the local atmosphere, sip tea and write travel journals.`,
            cost: 100
          });
        }

        dayActivities.push({
          time: 'Evening',
          title: 'Sunset View & Local Diner',
          desc: 'Find a cozy local spot with panoramic views for dinner.',
          cost: 300
        });
      }

      if (customActivities[day]) {
        customActivities[day].forEach(act => {
          dayActivities.push({
            time: 'Custom Time',
            title: act.text,
            desc: 'Self-planned activity.',
            cost: 0,
            isCustom: true,
            id: act.id
          });
        });
      }

      daysList.push({ day, activities: dayActivities });
    }

    return daysList;
  };

  const itineraryDays = generateItineraryDays();

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let text = `TRAVILIO PLANNER: ${destination.name.toUpperCase()} ITINERARY (${duration} Days)\n`;
    text += `Origin: ${originCity.toUpperCase()} (via ${originHub.toUpperCase()} Hub) | Budget Tier: ${tier.name}\n`;
    text += `Budget allocated: ₹${budget.toLocaleString('en-IN')} | Total Cost: ₹${grandTotal.toLocaleString('en-IN')}\n\n`;

    itineraryDays.forEach(d => {
      text += `--- DAY ${d.day} ---\n`;
      d.activities.forEach(act => {
        text += `[${act.time}] ${act.title}\n - ${act.desc}\n`;
      });
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addCustomActivity = (e) => {
    e.preventDefault();
    if (!newActivityText.trim()) return;

    const day = selectedDayForAdd;
    const actId = Date.now();
    const newActList = customActivities[day] ? [...customActivities[day]] : [];
    newActList.push({ id: actId, text: newActivityText });

    setCustomActivities({
      ...customActivities,
      [day]: newActList
    });
    setNewActivityText('');
  };

  const removeCustomActivity = (day, id) => {
    const newActList = customActivities[day].filter(act => act.id !== id);
    setCustomActivities({
      ...customActivities,
      [day]: newActList
    });
  };

  return (
    <div className="animate-slide" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Budget Breakdown Indicator */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Selected Plan Profile</span>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {destination.name} <span className={`badge ${tier.badgeClass}`} style={{ fontSize: '0.65rem' }}>{tier.name}</span>
            </h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Total</span>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: isOverBudget ? 'var(--danger)' : 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <IndianRupee size={18} />{grandTotal.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div style={{ width: '100%', height: '12px', background: 'var(--bg-tertiary)', borderRadius: '6px', overflow: 'hidden', display: 'flex', marginBottom: '15px' }}>
          <div style={{ width: `${(transportCost/grandTotal)*100}%`, background: 'var(--primary)' }} />
          <div style={{ width: `${(totalHotelCost/grandTotal)*100}%`, background: 'var(--accent-cyan)' }} />
          <div style={{ width: `${(totalDiningCost/grandTotal)*100}%`, background: 'var(--accent-gold)' }} />
          <div style={{ width: `${((totalAttractionsCost + totalAdventuresCost + totalFavoritesCost)/grandTotal)*100}%`, background: 'var(--accent-rose)' }} />
        </div>

        {/* Budget Health Messages */}
        {isOverBudget ? (
          <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '8px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--danger)', fontSize: '0.85rem' }}>
            <AlertCircle size={18} style={{ flexShrink: '0' }} />
            <div>
              <strong>Over Budget by ₹{budgetShortfall.toLocaleString('en-IN')}!</strong> Try moving the budget slider higher or lowering the duration length to balance the plan.
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '8px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--success)', fontSize: '0.85rem' }}>
            <CheckCircle size={18} style={{ flexShrink: '0' }} />
            <div>
              <strong>Within Budget!</strong> You have ₹{(budget - grandTotal).toLocaleString('en-IN')} left over for emergency shopping and extra tips!
            </div>
          </div>
        )}

        {/* Sync Saved status alerts */}
        {saveMessage && (
          <div style={{
            marginTop: '15px',
            padding: '10px 12px',
            borderRadius: '8px',
            background: saveMessage.includes('❌') ? 'rgba(244,63,94,0.12)' : 'rgba(16,185,129,0.12)',
            border: saveMessage.includes('❌') ? '1px solid rgba(244,63,94,0.25)' : '1px solid rgba(16,185,129,0.25)',
            fontSize: '0.82rem',
            color: saveMessage.includes('❌') ? 'var(--danger)' : 'var(--success)'
          }}>
            {saveMessage}
          </div>
        )}
      </div>

      {/* Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }} className="no-print">
        
        {/* Sync save button */}
        {token ? (
          <button 
            onClick={handleSaveTrip} 
            disabled={saving}
            className="nav-tab" 
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-glow-active)',
              boxShadow: '0 0 10px var(--primary-glow)',
              opacity: saving ? 0.7 : 1
            }}
          >
            <Save size={16} style={{ color: 'var(--primary-hover)' }} />
            <span>{saving ? 'Syncing...' : 'Save Plan to Database'}</span>
          </button>
        ) : (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ⚠️ Log in to save this trip to your profile database.
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleCopyText} className="nav-tab" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glow)' }}>
            <Copy size={16} />
            <span>{copied ? 'Copied!' : 'Copy Plan'}</span>
          </button>
          <button onClick={handlePrint} className="nav-tab" style={{ background: 'var(--primary)', color: 'white' }}>
            <Printer size={16} />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Daily Timeline */}
      <div id="itinerary-print-area" className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} style={{ color: 'var(--accent-gold)' }} />
          Day-by-Day Route Planner
        </h3>

        <div className="timeline">
          {itineraryDays.map(dayInfo => (
            <div key={dayInfo.day} className="timeline-item">
              <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', marginBottom: '12px' }}>
                Day {dayInfo.day} - Exploration Schedule
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dayInfo.activities.map((act, index) => (
                  <div 
                    key={index}
                    style={{
                      background: act.isCustom ? 'rgba(168, 85, 247, 0.08)' : 'var(--bg-secondary)',
                      border: act.isCustom ? '1px dashed rgba(168, 85, 247, 0.4)' : '1px solid var(--border-glow)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '15px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--accent-cyan)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Clock size={12} /> {act.time}
                      </div>
                      <div>
                        <strong style={{ fontSize: '0.9rem', display: 'block', color: 'var(--text-primary)' }}>{act.title}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{act.desc}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {act.cost > 0 && (
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--success)', whiteSpace: 'nowrap' }}>
                          ₹{act.cost}
                        </span>
                      )}
                      {act.isCustom && (
                        <button 
                          onClick={() => removeCustomActivity(dayInfo.day, act.id)}
                          className="no-print"
                          style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={addCustomActivity} className="no-print" style={{ display: 'flex', gap: '10px', marginTop: '30px', borderTop: '1px solid var(--border-glow)', paddingTop: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Add to Day</span>
            <select 
              value={selectedDayForAdd} 
              onChange={(e) => setSelectedDayForAdd(Number(e.target.value))}
              className="form-input" 
              style={{ width: '80px', padding: '8px' }}
            >
              {Array.from({ length: duration }).map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
          </div>
          <input 
            type="text" 
            placeholder="Add custom task (e.g. Visit local museum, Meet friends)..." 
            value={newActivityText}
            onChange={(e) => setNewActivityText(e.target.value)}
            className="form-input"
            style={{ flexGrow: 1, minWidth: '200px' }}
          />
          <button type="submit" className="nav-tab" style={{ background: 'var(--primary)', color: 'white', padding: '8px 16px' }}>
            <Plus size={16} /> Add Task
          </button>
        </form>
      </div>
      
    </div>
  );
}
