// Layout copy is distinct for each reader task; slugs remain the existing routes.
export const sectionDescriptions: Record<string, string> = {
  'plan-your-trip': 'Choose your route, timing, and travel pace.',
  'entry-essentials': 'Prepare for arrival and know what to verify before departure.',
  'getting-around': 'Connect your journey by train, road, air, and ferry.',
  'destinations-local-context': 'Compare places and explore the context behind your route.',
};
export const categoryDescriptions: Record<string, string> = {
  'first-trip-decisions': 'Start with the choices that shape the rest of your trip: when to go, what to spend, and how much to plan.',
  'route-lengths': 'Turn the time you have into a route with room to arrive, explore, and move on.',
  'route-combinations': 'Compare ways to combine the capital, the north, and the coast without spending the whole trip in transit.',
  'travel-style-constraints': 'Adapt the route to your budget, your company, and the pace that suits you.',
  'entry-documents': 'Work through documents and arrival preparations, with official sources for the rules that can change.',
  'arrival-protection': 'Prepare for the practical uncertainties around arrival, cover, and onward plans.',
  'bangkok-local-transport': 'Find a workable way across Bangkok, from the airport transfer to everyday rail journeys.',
  'rail-air-long-distance': 'Weigh the journey as well as the destination when choosing between trains, flights, and road travel.',
  'ferries-island-logistics': 'Think beyond the boat ticket: piers, transfers, luggage, and weather all shape an island journey.',
  'bangkok-central-thailand': 'Explore Bangkok and central Thailand through neighborhoods, river journeys, and historical day trips.',
  'northern-thailand': 'Make room for northern cities, mountain journeys, and a different rhythm of travel.',
  'southern-thailand': 'Compare coastal bases and islands before deciding where to slow down.',
  'food-cultural-etiquette': 'Get more comfortable with everyday food choices and the small courtesies that matter.',
};
// Only use newly verified documentary photographs where the subject matches.
export function articleMedia(slug: string): string | undefined {
  if (['bangkok-first-timer-guide', 'bangkok-chiang-mai-itinerary', 'bangkok-krabi-itinerary'].includes(slug)) return 'bangkok';
  if (slug === 'chiang-mai-first-timer-guide') return 'chiang-mai';
  if (['krabi-travel-guide', 'krabi-vs-phuket', 'railay-beach-guide'].includes(slug)) return 'krabi';
  return undefined;
}
