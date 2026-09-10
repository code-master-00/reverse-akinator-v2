// Free client-side Wikipedia knowledge engine & Gemini Serverless Reasoner
// Hosted on Vercel

/**
 * Fetch character summary and image from free Wikipedia REST API
 */
export async function fetchWikiSummary(wikiTitle) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: data.title,
      extract: data.extract || '',
      description: data.description || '',
      thumbnail: data.thumbnail?.source || null,
      pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${wikiTitle}`
    };
  } catch (err) {
    console.warn('Wikipedia fetch failed:', err);
    return null;
  }
}

/**
 * Free Wikipedia search query for custom topics
 */
export async function searchWikipedia(query) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.query?.search || [];
  } catch (err) {
    console.warn('Wikipedia search failed:', err);
    return [];
  }
}

/**
 * Normalizes and extracts word lemmas / variants (e.g. swimming -> swim)
 */
function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[-_]/g, ' ')
    .replace(/[^\w\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Dynamic AI Question Evaluator using Gemini 2.5 Flash Lite via Vercel Serverless Function
 */
export async function evaluateQuestion(questionText, character, wikiData = null) {
  const extract = normalizeText(wikiData?.extract || '');
  const desc = normalizeText(wikiData?.description || '');
  
  const charTags = (character.tags || []).map(normalizeText);
  const charWeapons = (character.weapons || []).map(normalizeText);
  const charConditions = (character.conditions || []).map(normalizeText);
  const charAliases = (character.aliases || []).map(normalizeText);
  const charTrivia = normalizeText(character.trivia || '');

  const fullContext = `Name: ${character.name}\nAliases: ${charAliases.join(', ')}\nTags: ${charTags.join(', ')}\nWeapons: ${charWeapons.join(', ')}\nConditions: ${charConditions.join(', ')}\nTrivia: ${charTrivia}\nWikipedia Extract: ${extract}\nWikipedia Description: ${desc}`;

  try {
    const apiUrl = typeof window !== 'undefined' ? '/api/gemini' : 'http://localhost:5173/api/gemini';
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        characterContext: fullContext,
        question: questionText
      })
    });

    if (!res.ok) {
      console.error('Gemini API Error:', res.status);
      return {
        type: 'NO',
        commentary: "I seem to have lost my connection to the cosmos. Could you try asking again?",
        mood: 'thinking'
      };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to connect to Gemini endpoint:', err);
    return {
      type: 'NO',
      commentary: "My psychic link was interrupted. Please ask that again.",
      mood: 'thinking'
    };
  }
}
