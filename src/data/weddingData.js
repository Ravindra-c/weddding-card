/* =====================================================================
   WEDDING DATA  —  EDIT THIS FILE to personalise the invitation.
   Everything with [SQUARE BRACKETS] is a placeholder.
   Each language has its own block, so you can type Telugu names
   in the `te` block and English names in the `en` block.
   ===================================================================== */

export const weddingData = {
  // ---- Used by the live countdown. Keep ISO format:  YYYY-MM-DDTHH:mm:ss+05:30
  //      (+05:30 = Indian Standard Time).  Example: "2027-02-14T10:30:00+05:30"
  weddingDateTime: '2026-11-18T10:30:00+05:30',

  // ---- Google Maps. Paste the "Share → Copy link" URL from Google Maps.
  mapsUrl: '[GOOGLE MAPS LINK]',
  // Optional: paste the "Embed a map" src URL (https://www.google.com/maps/embed?pb=...) to show a live map.
  mapEmbedUrl: '',
  // Optional: leave empty to auto-build a directions link from venue + address.
  directionsUrl: '',

  // ---- Browser tab title
  siteTitle: {
    en: '[Nikhil] & [Uma maheswari] — Wedding Invitation',
    te: '[నిఖిల్] & [ఉమ మహేశ్వరీ] — వివాహ ఆహ్వానం',
  },

  en: {
    groomName: 'Nikhil',
    brideName: 'Uma maheswari',
    groomFather: '[GROOM FATHER NAME]',
    groomMother: '[GROOM MOTHER NAME]',
    brideFather: '[BRIDE FATHER NAME]',
    brideMother: '[BRIDE MOTHER NAME]',
    groomTown: '[TOWN / VILLAGE]',
    brideTown: '[TOWN / VILLAGE]',
    weddingDate: '[18-11-2026]',
    weddingTime: '[WEDDING TIME]',
    venue: '[Ongole]',
    address: '[FULL ADDRESS], [Ongole], [Ongole], Andhra Pradesh, India',
    town: '[Ongole]',
    district: '[Ongole]',
    state: 'Andhra Pradesh, India',
  },

  te: {
    groomName: 'నిఖిల్',
    brideName: 'ఉమ మహేశ్వరీ',
    groomFather: '[వరుడి తండ్రి పేరు]',
    groomMother: '[వరుడి తల్లి పేరు]',
    brideFather: '[వధువు తండ్రి పేరు]',
    brideMother: '[వధువు తల్లి పేరు]',
    groomTown: '[Vijayawada]',
    brideTown: '[Ongole]',
    weddingDate: '[వివాహ తేదీ]',
    weddingTime: '[వివాహ సమయం]',
    venue: '[వివాహ వేదిక]',
    address: '[పూర్తి చిరునామా], [ఊరు / గ్రామం], [జిల్లా], ఆంధ్రప్రదేశ్, భారతదేశం',
    town: '[ఊరు / గ్రామం]',
    district: '[జిల్లా]',
    state: 'ఆంధ్రప్రదేశ్, భారతదేశం',
  },
};
