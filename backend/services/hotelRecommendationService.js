/**
 * Service to recommend hotels based on destination data and budget tier.
 */
export const recommendHotel = (destination, budgetTier) => {
  const tier = budgetTier === 'midRange' ? 'midRange' : budgetTier === 'luxury' ? 'luxury' : 'budget';
  
  const hotel = destination.hotels?.[tier] || {
    name: `${destination.name} Comfort Lodge`,
    price: tier === 'luxury' ? 8500 : tier === 'midRange' ? 2800 : 600,
    highlights: ['Centrally located', 'Clean & well-maintained', 'Free High-speed Wi-Fi']
  };

  return {
    tier,
    ...hotel
  };
};
