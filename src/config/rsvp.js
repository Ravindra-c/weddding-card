/* =====================================================================
   RSVP SUBMISSION  —  connect your own service here. No backend needed.
   NEVER put secret keys in frontend code. Use public/anon keys only.

   mode: 'demo'      → UI works, nothing is sent (default for first version)
         'formspree' → set endpoint to https://formspree.io/f/XXXXXXXX
         'webhook'   → any URL that accepts a JSON POST (Google Apps Script
                       web app, Make/Zapier, your own API, Supabase Edge Function…)
   ===================================================================== */

export const rsvpConfig = {
  mode: 'demo',
  endpoint: '',
};

/**
 * Called with: { name, guests, attendance, message }
 * Must resolve on success and throw on failure.
 * Replace the body to use Google Forms, Supabase, Firebase, etc.
 */
export async function submitRSVP(payload) {
  const { mode, endpoint } = rsvpConfig;

  if (mode === 'formspree' || mode === 'webhook') {
    if (!endpoint) throw new Error('RSVP endpoint is not configured');
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`RSVP failed (${res.status})`);
    return;
  }

  // ---- Example: Supabase (public anon key + a table with insert-only RLS policy)
  // import { createClient } from '@supabase/supabase-js'
  // const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
  // const { error } = await supabase.from('rsvps').insert(payload); if (error) throw error

  // ---- Example: Firebase Firestore
  // await addDoc(collection(db, 'rsvps'), { ...payload, createdAt: serverTimestamp() })

  // ---- Example: Google Form (no-cors POST to the form's /formResponse URL with entry.XXXX fields)

  // ---- Demo mode: pretend to send.
  await new Promise((r) => setTimeout(r, 700));
}
