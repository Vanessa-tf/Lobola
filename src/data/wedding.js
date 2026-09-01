// Single source of truth. Change the wedding here, not in the components.

export const couple = {
  bride: 'Lydia R. Fambarega',
  groom: 'Rueben Chaibva',
  initials: 'L&R',
  shortNames: 'Lydia & Rueben',
  families: 'The Chaibva and Fambarega families',
  occasion: 'roora'
}

// ISO 8601 with the offset. +02:00 is Zimbabwe / South Africa.
export const ceremony = {
  startsAt: '2026-12-27T12:30:00+02:00',
  dayLabel: 'Sunday, 27 December 2026',
  timeLabel: '12:30 Midday',
  dressCode: 'Traditional Attire'
}

export const venue = {
  name: 'Waterford',
  street: '11 Jessica Mary',
  city: 'Bulawayo, Zimbabwe',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Waterford, 11 Jessica Mary, Bulawayo, Zimbabwe')
}

// The calendar strip. Monday-start so the whole week stays inside December.
export const calendar = {
  month: 'December',
  weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  dates: [21, 22, 23, 24, 25, 26, 27],
  highlighted: 27
}

export const rsvp = {
  deadline: '31 October 2026',
  contactName: 'Vanessa',
  contactPhone: '+27 73 038 9502',
  dietOptions: ['None', 'Vegetarian', 'Halaal', 'No pork', 'Other (noted below)'],
  attendance: [
    { value: 'Joyfully accepts', label: 'Joyfully accepts' },
    { value: 'Regretfully declines', label: 'Regretfully declines', declines: true }
  ]
}

// Files you drop into public/images. Leave a src empty to hide that bloom.
export const blooms = {
  topLeft: '/images/rose-white-cluster.png',
  bottomRight: '/images/rose-crimson-cluster.png'
}
