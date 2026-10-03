/** Replace {tokens} in a string: fmt('Hi {name}', { name: 'Ravi' }) */
export function fmt(str, vars = {}) {
  return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
}

export function isValidUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Extracts the 11-char video id from watch / youtu.be / embed / shorts / music.youtube links. */
export function getYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

/** Reads ?guest=Ravi. Only letters/spaces/dots/hyphens up to 40 chars are accepted. */
export function getGuestName() {
  try {
    const raw = new URLSearchParams(window.location.search).get('guest');
    if (!raw) return null;
    const name = raw.trim().replace(/\s+/g, ' ');
    if (!name || name.length > 40) return null;
    if (!/^[\p{L}\p{M}\s.'-]+$/u.test(name)) return null;
    return name;
  } catch {
    return null;
  }
}

/** The URL to share: current page without the personalised ?guest= part. */
export function getShareUrl() {
  const u = new URL(window.location.href);
  u.searchParams.delete('guest');
  u.hash = '';
  return u.toString();
}

export function mapsSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
export function mapsDirectionsUrl(query) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
