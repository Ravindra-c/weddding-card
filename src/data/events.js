/* =====================================================================
   EVENTS  —  set `enabled: false` to hide an event, or delete the block.
   `icon` can be: ring | haldi | mehendi | wedding | reception | heart
   ===================================================================== */

export const events = [
  {
    id: 'engagement',
    enabled: true,
    icon: 'ring',
    name: 'Engagement',
    teluguName: 'నిశ్చితార్థం',
    date: { en: '[DATE]', te: '[తేదీ]' },
    time: { en: '[TIME]', te: '[సమయం]' },
    venue: { en: '[VENUE]', te: '[వేదిక]' },
    description: { en: '[DESCRIPTION]', te: '[వివరణ]' },
  },
  {
    id: 'haldi',
    enabled: true,
    icon: 'haldi',
    name: 'Haldi / Pasupu Ceremony',
    teluguName: 'పసుపు వేడుక',
    date: { en: '[DATE]', te: '[తేదీ]' },
    time: { en: '[TIME]', te: '[సమయం]' },
    venue: { en: '[VENUE]', te: '[వేదిక]' },
    description: { en: '[DESCRIPTION]', te: '[వివరణ]' },
  },
  {
    id: 'mehendi',
    enabled: true,
    icon: 'mehendi',
    name: 'Mehendi',
    teluguName: 'గోరింటాకు',
    date: { en: '[DATE]', te: '[తేదీ]' },
    time: { en: '[TIME]', te: '[సమయం]' },
    venue: { en: '[VENUE]', te: '[వేదిక]' },
    description: { en: '[DESCRIPTION]', te: '[వివరణ]' },
  },
  {
    id: 'wedding',
    enabled: true,
    highlight: true,
    icon: 'wedding',
    name: 'Wedding',
    teluguName: 'వివాహం',
    date: { en: '[DATE]', te: '[తేదీ]' },
    time: { en: '[TIME]', te: '[సమయం]' },
    venue: { en: '[VENUE]', te: '[వేదిక]' },
    description: { en: '[DESCRIPTION]', te: '[వివరణ]' },
  },
  {
    id: 'reception',
    enabled: true,
    icon: 'reception',
    name: 'Reception',
    teluguName: 'రిసెప్షన్',
    date: { en: '[DATE]', te: '[తేదీ]' },
    time: { en: '[TIME]', te: '[సమయం]' },
    venue: { en: '[VENUE]', te: '[వేదిక]' },
    description: { en: '[DESCRIPTION]', te: '[వివరణ]' },
  },
];
