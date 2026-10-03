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
    date: { en: '1-11-2026', te: '1-11-2026' },
    time: { en: '', te: '' },
    venue: { en: 'Vishnu priya convention hall', te: 'విష్ణుప్రియ కన్వెన్షన్ హాల్' },
    description: { en: 'Engagement ceremony for Nikhil and Uma maheswari', te: 'నిఖిల్ మరియు ఉమ మహేశ్వరీకి ఎంగేజ్మెంట్ ' },
  },
  {
    id: 'haldi',
    enabled: true,
    icon: 'haldi',
    name: 'Haldi / Pasupu Ceremony',
    teluguName: 'పసుపు వేడుక',
    date: { en: '17-11-2026', te: '17-11-2026' },
    time: { en: '', te: '' },

    description: { en: 'Haldi', te: 'పసుపు వేడుక' },
  },
  
  {
    id: 'wedding',
    enabled: true,
    highlight: true,
    icon: 'wedding',
    name: 'Wedding',
    teluguName: 'వివాహం',
    date: { en: '18-11-2026', te: '18-11-2026' },
    time: { en: '', te: '' },
    venue: { en: 'Vishnu priya convention hall', te: 'విష్ణుప్రియ కన్వెన్షన్ హాల్' },
    description: { en: 'Wedding ceremony for Nikhil and Uma maheswari', te: 'నిఖిల్ మరియు ఉమ మహేశ్వరీకి వివాహం' },
  },
  {
    id: 'reception',
    enabled: true,
    icon: 'reception',
    name: 'Reception',
    teluguName: 'రిసెప్షన్',
    date: { en: '20-11-2026', te: '20-11-2026' },
    time: { en: '', te: '' },
    venue: { en: 'Vijayawada', te: 'విజయవాడ' },
    description: { en: 'Reception for Nikhil and Uma maheswari', te: 'నిఖిల్ మరియు ఉమ మహేశ్వరీకి రిసెప్షన్' },
  },
];
