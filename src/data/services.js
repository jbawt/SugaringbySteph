/**
 * Shared service catalog for the Services page UI and structured data.
 * Prices are CAD. Brazilian uses first-visit / maintenance range.
 */
export const serviceCategories = {
  intimate: {
    title: 'Intimate',
    description: 'Gentle and thorough hair removal for your most sensitive areas',
    items: [
      {
        name: 'Brazilian',
        price: '$65 / $55',
        description: 'First Visit / Maintenance',
        featured: true,
        schema: { lowPrice: 55, highPrice: 65, priceType: 'AggregateOffer' },
      },
      {
        name: 'Bikini',
        price: '$50',
        description: 'Bikini line cleanup',
        schema: { price: 50 },
      },
      {
        name: 'Vagacial',
        price: '+$20',
        description: 'Add-on treatment for ingrown prevention',
        schema: { price: 20, isAddOn: true },
      },
    ],
  },
  body: {
    title: 'Body',
    description: 'Smooth, hair-free skin from head to toe',
    items: [
      { name: 'Underarms', price: '$25', description: 'Quick and effective', schema: { price: 25 } },
      { name: 'Full Legs', price: '$60', description: 'Toes to upper thigh', schema: { price: 60 } },
      { name: 'Half Legs', price: '$30', description: 'Upper or lower leg', schema: { price: 30 } },
      { name: 'Full Arms', price: '$45', description: 'Fingers to shoulder', schema: { price: 45 } },
      { name: 'Half Arms', price: '$30', description: 'Upper or lower arm', schema: { price: 30 } },
      { name: 'Back', price: '$45', description: 'Full back coverage', schema: { price: 45 } },
      { name: 'Stomach', price: '$35', description: 'Stomach and naval area', schema: { price: 35 } },
    ],
  },
  face: {
    title: 'Face',
    description: 'Precise facial hair removal for a flawless complexion',
    items: [
      { name: 'Upper Lip', price: '$15', description: 'Quick and precise', schema: { price: 15 } },
      { name: 'Chin', price: '$15', description: 'Smooth, hair-free chin', schema: { price: 15 } },
    ],
  },
}

export function getAllServiceItems() {
  return Object.values(serviceCategories).flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.title,
    }))
  )
}
