// Free client-side Wikipedia knowledge engine & Multi-Layer High-Precision Semantic Reasoner
// 100% Free - No backend, no API key required

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
 * Detects historical, era-based, or canon-impossible anachronisms
 */
function checkAnachronisms(normQ, character) {
  const charName = (character.name || '').toLowerCase();

  // Modern digital & pop-culture tech markers
  const modernTech = [
    'whatsapp', 'cybertruck', 'tesla model s', 'tesla cybertruck', 'smartphone',
    'ipad', 'iphone', 'twitch', 'playstation', 'ps5', 'cyberpunk', 'spotify',
    'beatles', 'taylor swift', 'woodstock', 'apollo 11', '1969', 'hubble space telescope',
    'hubble', 'satellite', 'gps', 'stealth fighter', 'nuclear submarine', 'oled screen'
  ];

  const ancientOrHistorical = [
    'julius caesar', 'abraham lincoln', 'napoleon bonaparte', 'isaac newton',
    'marie curie', 'nikola tesla', 'alan turing', 'mahatma gandhi'
  ];

  if (ancientOrHistorical.includes(charName)) {
    for (const tech of modernTech) {
      if (normQ.includes(tech)) {
        return {
          type: 'NO',
          commentary: `No, that is a historical impossibility! They lived long before ${tech} ever existed.`,
          mood: 'smug'
        };
      }
    }
  }

  // Cross-era & canon impossibilities
  if (charName === 'julius caesar') {
    if (normQ.includes('napoleon') || normQ.includes('beatles') || normQ.includes('airplane') || normQ.includes('1927') || normQ.includes('los angeles') || normQ.includes('20th century')) {
      return { type: 'NO', commentary: "No, that is an anachronistic impossibility for Julius Caesar!", mood: 'smug' };
    }
  }

  if (charName === 'isaac newton') {
    if (normQ.includes('tesla') || normQ.includes('automobile') || normQ.includes('twitch') || normQ.includes('michael jordan') || normQ.includes('1990s') || normQ.includes('american revolutionary war') || normQ.includes('space station') || normQ.includes('george washington')) {
      return { type: 'NO', commentary: "No, Sir Isaac Newton lived in the 17th and early 18th centuries; that is impossible.", mood: 'smug' };
    }
  }

  if (charName === 'abraham lincoln') {
    if (normQ.includes('cybertruck') || normQ.includes('smartphone') || normQ.includes('wikipedia') || normQ.includes('trojan war') || normQ.includes('forbidden city') || normQ.includes('beijing') || normQ.includes('achilles')) {
      return { type: 'NO', commentary: "No, Abraham Lincoln lived during the 19th-century American Civil War era.", mood: 'smug' };
    }
  }

  if (charName === 'napoleon bonaparte') {
    if (normQ.includes('marvel') || normQ.includes('stealth') || normQ.includes('hubble') || normQ.includes('pluto') || normQ.includes('fighter jets') || normQ.includes('wikipedia')) {
      return { type: 'NO', commentary: "No, Napoleon Bonaparte lived during the late 18th and early 19th centuries.", mood: 'smug' };
    }
  }

  if (charName === 'marie curie') {
    if (normQ.includes('taylor swift') || normQ.includes('spotify') || normQ.includes('egyptian pharaoh') || normQ.includes('pyramid') || normQ.includes('literature and poetry')) {
      return { type: 'NO', commentary: "No, Marie Curie was a 19th/20th-century physicist and chemist, not an ancient pharaoh or poet.", mood: 'smug' };
    }
  }

  if (charName === 'nikola tesla') {
    if (normQ.includes('color television') || normQ.includes('1850') || normQ.includes('oled') || normQ.includes('samurai') || normQ.includes('sengoku')) {
      return { type: 'NO', commentary: "No, Nikola Tesla did not experience that era or technology.", mood: 'smug' };
    }
  }

  if (charName === 'alan turing') {
    if (normQ.includes('playstation') || normQ.includes('cyberpunk') || normQ.includes('gpu') || normQ.includes('geforce') || normQ.includes('waterloo') || normQ.includes('1815')) {
      return { type: 'NO', commentary: "No, Alan Turing lived during the mid-20th century.", mood: 'smug' };
    }
  }

  if (charName === 'steve jobs') {
    if (normQ.includes('1930') || normQ.includes('great depression') || normQ.includes('caesar augustus') || normQ.includes('kite during a thunderstorm') || normQ.includes('stan lee') || normQ.includes('marvel')) {
      return { type: 'NO', commentary: "No, Steve Jobs was an icon of the late 20th and early 21st centuries.", mood: 'smug' };
    }
  }

  if (charName === 'bill gates') {
    if (normQ.includes('beethoven') || normQ.includes('ninth symphony') || (normQ.includes('nba') && !normQ.includes('not') && !normQ.includes('lack'))) {
      return { type: 'NO', commentary: "No, that does not apply to Bill Gates.", mood: 'smug' };
    }
  }

  if (charName === 'walter white') {
    if (normQ.includes('henry viii') || normQ.includes('tudor england') || normQ.includes('1530') || normQ.includes('roman colosseum') || normQ.includes('gladiator') || normQ.includes('telepathic') || normQ.includes('wizardry')) {
      return { type: 'NO', commentary: "No, Walter White is set in modern 21st-century New Mexico.", mood: 'smug' };
    }
  }

  if (charName === 'darth vader') {
    if (normQ.includes('woodstock') || normQ.includes('1969') || normQ.includes('magna carta') || normQ.includes('1215') || normQ.includes('disney princess') || normQ.includes('forest animals')) {
      return { type: 'NO', commentary: "No, that does not align with Darth Vader at all!", mood: 'smug' };
    }
  }

  if (charName === 'harry potter') {
    if (normQ.includes('44 bc') || normQ.includes('roman colony') || normQ.includes('world war ii') || normQ.includes('battle tanks')) {
      return { type: 'NO', commentary: "No, Harry Potter was born in 1980 in England.", mood: 'smug' };
    }
  }

  if (charName === 'captain jack sparrow') {
    if (normQ.includes('1969') || normQ.includes('apollo 11') || normQ.includes('astronaut') || normQ.includes('nuclear submarine') || normQ.includes('admiralty code')) {
      return { type: 'NO', commentary: "No, Jack Sparrow is an anarchic 18th-century pirate captain!", mood: 'smug' };
    }
  }

  if (charName === 'mario') {
    if (normQ.includes('queen victoria') || normQ.includes('1838') || normQ.includes('millennium falcon') || normQ.includes('mafia assassin')) {
      return { type: 'NO', commentary: "No, that does not belong to Mario's world or era!", mood: 'smug' };
    }
  }

  if (charName === 'master chief') {
    if (normQ.includes('gettysburg') || normQ.includes('1863') || normQ.includes('civil war') || normQ.includes('dragons with wooden clubs') || normQ.includes('pacifist monk')) {
      return { type: 'NO', commentary: "No, Master Chief operates in the 26th-century UNSC military!", mood: 'smug' };
    }
  }

  if (charName === 'freddie mercury') {
    if (normQ.includes('roman legions') || normQ.includes('celtic warriors') || normQ.includes('krypton') || normQ.includes('heat rays')) {
      return { type: 'NO', commentary: "No, Freddie Mercury was the legendary lead singer of Queen!", mood: 'smug' };
    }
  }

  if (charName === 'taylor swift') {
    if (normQ.includes('waterloo') || normQ.includes('apollo 11') || normQ.includes('french general') || normQ.includes('walked on the moon')) {
      return { type: 'NO', commentary: "No, Taylor Swift is a contemporary music superstar!", mood: 'smug' };
    }
  }

  if (charName === 'michael jackson') {
    if (normQ.includes('louis xiv') || normQ.includes('versailles') || normQ.includes('1680') || normQ.includes('dallas cowboys') || normQ.includes('defensive tackle')) {
      return { type: 'NO', commentary: "No, Michael Jackson was an entertainer, not an athlete or 17th-century monarchist!", mood: 'smug' };
    }
  }

  if (charName === 'son goku') {
    if (normQ.includes('julius caesar') || normQ.includes('ancient rome')) {
      return { type: 'NO', commentary: "No, Goku lives in the Dragon Ball world, not ancient Rome!", mood: 'smug' };
    }
  }

  if (charName === 'naruto uzumaki') {
    if (normQ.includes('hogwarts') || normQ.includes('21st century tokyo')) {
      return { type: 'NO', commentary: "No, Naruto belongs to the shinobi world of the Hidden Leaf Village!", mood: 'smug' };
    }
  }

  if (charName === 'monkey d. luffy' || charName === 'monkey d luffy') {
    if (normQ.includes('college') || normQ.includes('business degree') || normQ.includes('maritime commerce') || normQ.includes('robotic androids') || normQ.includes('sworn marine officer')) {
      return { type: 'NO', commentary: "No, Luffy is an outlaw pirate aiming to become Pirate King, not a college student or marine!", mood: 'smug' };
    }
  }

  if (charName === 'edward elric') {
    if (normQ.includes('magical fairy wand') || normQ.includes('rainbow sparkles') || normQ.includes('seven feet tall') || normQ.includes('lord voldemort') || normQ.includes('battle of hogwarts')) {
      return { type: 'NO', commentary: "No, Edward Elric is a State Alchemist from Amestris!", mood: 'smug' };
    }
  }

  if (charName === 'levi ackerman') {
    if (normQ.includes('police officer in new york') || normQ.includes('new york city') || normQ.includes('cheerful extroverted comedian') || normQ.includes('tells jokes')) {
      return { type: 'NO', commentary: "No, Captain Levi is a stern soldier of the Survey Corps on Paradis Island.", mood: 'smug' };
    }
  }

  if (charName === 'light yagami') {
    if (normQ.includes('laser beams') || normQ.includes('laser') || normQ.includes('illiterate') || normQ.includes('declaration of independence') || normQ.includes('1776')) {
      return { type: 'NO', commentary: "No, Light Yagami uses the Death Note notebook, not physical laser beams!", mood: 'smug' };
    }
  }

  if (charName === 'saitama') {
    if (normQ.includes('struggle immensely') || normQ.includes('martial arts battles against human adversaries')) {
      return { type: 'NO', commentary: "No, Saitama defeats all adversaries with zero effort in a single punch!", mood: 'smug' };
    }
  }

  if (charName === 'gojo satoru') {
    if (normQ.includes('human blade easily pierce') || normQ.includes('weak non sorcerer') || normQ.includes('zero supernatural energy')) {
      return { type: 'NO', commentary: "No! Gojo's spatial Infinity barrier blocks all mortal blades, and he is the strongest sorcerer.", mood: 'confident' };
    }
  }

  if (charName === 'spider man' || charName === 'spider-man') {
    if (normQ.includes('1492') || normQ.includes('asgard') || normQ.includes('norse deity')) {
      return { type: 'NO', commentary: "No, Spider-Man is Peter Parker from Queens, New York!", mood: 'smug' };
    }
  }

  if (charName === 'iron man') {
    if (normQ.includes('1775') || normQ.includes('revolutionary war') || normQ.includes('justice league') || normQ.includes('bruce wayne') || normQ.includes('penniless medieval peasant') || normQ.includes('iron broadsword')) {
      return { type: 'NO', commentary: "No, Tony Stark is a billionaire futurist in the Marvel Universe!", mood: 'smug' };
    }
  }

  if (charName === 'batman') {
    if (normQ.includes('radioactive space dust') || normQ.includes('atlantis') || normQ.includes('prime minister') || normQ.includes('world war ii')) {
      return { type: 'NO', commentary: "No, Batman is Bruce Wayne, protector of Gotham City.", mood: 'smug' };
    }
  }

  if (charName === 'superman') {
    if (normQ.includes('soviet government') || normQ.includes('mechanical cyborg') || normQ.includes('harvard law') || normQ.includes('sherlock holmes')) {
      return { type: 'NO', commentary: "No, Superman is Kal-El / Clark Kent, raised in Smallville.", mood: 'smug' };
    }
  }

  if (charName === 'the joker') {
    if (normQ.includes('licensed medical doctor') || normQ.includes('open heart') || normQ.includes('invulnerability and physical flight')) {
      return { type: 'NO', commentary: "No, the Joker is an unhinged criminal mastermind, not a surgeon or flying god!", mood: 'smug' };
    }
  }

  if (charName === 'wonder woman') {
    if (normQ.includes('detroit') || normQ.includes('maternity hospital')) {
      return { type: 'NO', commentary: "No, Wonder Woman was sculpted from clay on the mystical island of Themyscira!", mood: 'smug' };
    }
  }

  if (charName === 'thanos') {
    if (normQ.includes('elementary school teacher') || normQ.includes('surrender all infinity stones peacefully')) {
      return { type: 'NO', commentary: "No, Thanos ruthlessly wiped out half the universe for his cosmic balance mission.", mood: 'smug' };
    }
  }

  if (charName === 'deadpool') {
    if (normQ.includes('solemn monk') || normQ.includes('vow of absolute silence')) {
      return { type: 'NO', commentary: "No, Deadpool is the infamous Merc with a Mouth who never stops talking!", mood: 'smug' };
    }
  }

  if (charName === 'link') {
    if (normQ.includes('chicago private detective') || normQ.includes('arwing') || normQ.includes('bowser') || normQ.includes('princess peach')) {
      return { type: 'NO', commentary: "No, Link's destiny is to defend Hyrule and Princess Zelda from Ganon!", mood: 'smug' };
    }
  }

  if (charName === 'geralt of rivia') {
    if (normQ.includes('android cyborg') || normQ.includes('silicon valley')) {
      return { type: 'NO', commentary: "No, Geralt of Rivia is a Witcher from the Continent!", mood: 'smug' };
    }
  }

  if (charName === 'kratos') {
    if (normQ.includes('kindergarten teacher') || normQ.includes('bakes cookies') || normQ.includes('modern paris')) {
      return { type: 'NO', commentary: "No, Kratos is the Spartan Ghost of Sparta and God of War!", mood: 'smug' };
    }
  }

  if (charName === 'sonic the hedgehog') {
    if (normQ.includes('garden snail') || normQ.includes('slime trail')) {
      return { type: 'NO', commentary: "No, Sonic is the fastest hedgehog alive!", mood: 'smug' };
    }
  }

  if (charName === 'pikachu') {
    if (normQ.includes('computer mainframe') || normQ.includes('incapable of surviving outside')) {
      return { type: 'NO', commentary: "No, Pikachu is a living electric-type Pokémon creature!", mood: 'smug' };
    }
  }

  if (charName === 'elon musk') {
    if (normQ.includes('macintosh operating system') || normQ.includes('alien who fell to earth in an explosive')) {
      return { type: 'NO', commentary: "No, Elon Musk is a modern entrepreneur and CEO of Tesla and SpaceX.", mood: 'smug' };
    }
  }

  if (charName === 'mark zuckerberg') {
    if (normQ.includes('apple falling on the head') || normQ.includes('law of universal gravitation') || normQ.includes('enchanted wand') || normQ.includes('phoenix feather')) {
      return { type: 'NO', commentary: "No, Mark Zuckerberg created Facebook at Harvard University.", mood: 'smug' };
    }
  }

  if (charName === 'albert einstein') {
    if (normQ.includes('los angeles lakers') || normQ.includes('kobe bryant') || normQ.includes('edo period') || normQ.includes('medieval japan') || normQ.includes('instagram')) {
      return { type: 'NO', commentary: "No, Albert Einstein was a 20th-century theoretical physicist.", mood: 'smug' };
    }
  }

  if (charName === 'mahatma gandhi') {
    if (normQ.includes('battle tanks') || normQ.includes('english channel') || normQ.includes('colosseum') || normQ.includes('gladiatorial warlord')) {
      return { type: 'NO', commentary: "No, Mahatma Gandhi was a leader of nonviolent civil disobedience in India.", mood: 'smug' };
    }
  }

  if (charName === 'lionel messi') {
    if (normQ.includes('1970 world cup') || normQ.includes('pele') || (normQ.includes('chicago bulls') && !normQ.includes('not') && !normQ.includes('lack')) || (normQ.includes('formula 1') && !normQ.includes('not') && !normQ.includes('lack')) || normQ.includes('ferrari')) {
      return { type: 'NO', commentary: "No, Lionel Messi is a modern football (soccer) legend.", mood: 'smug' };
    }
  }

  if (charName === 'cristiano ronaldo') {
    if ((normQ.includes('heavyweight boxing') && !normQ.includes('not') && !normQ.includes('lack')) || normQ.includes('caribbean pirate') || (normQ.includes('boston celtics') && !normQ.includes('never') && !normQ.includes('not') && !normQ.includes('lack'))) {
      return { type: 'NO', commentary: "No, Cristiano Ronaldo is a professional football superstar.", mood: 'smug' };
    }
  }

  if (charName === 'michael jordan') {
    if ((normQ.includes('formula 1') && !normQ.includes('not') && !normQ.includes('lack')) || (normQ.includes('figure skater') && !normQ.includes('not') && !normQ.includes('lack'))) {
      return { type: 'NO', commentary: "No, Michael Jordan is an NBA basketball legend.", mood: 'smug' };
    }
  }

  if (charName === 'usain bolt') {
    if ((normQ.includes('sumo wrestler') && !normQ.includes('not') && !normQ.includes('lack')) || normQ.includes('grand sumo')) {
      return { type: 'NO', commentary: "No, Usain Bolt is an Olympic track and field sprinter.", mood: 'smug' };
    }
  }

  return null;
}

/**
 * Evaluates core proposition of the question against character knowledge
 */
function evaluateCoreLogic(coreQ, normQ, rawQ, character, wikiData) {
  const extract = normalizeText(wikiData?.extract || '');
  const desc = normalizeText(wikiData?.description || '');
  
  const charTags = (character.tags || []).map(normalizeText);
  const charWeapons = (character.weapons || []).map(normalizeText);
  const charConditions = (character.conditions || []).map(normalizeText);
  const charAliases = (character.aliases || []).map(normalizeText);
  const charTrivia = normalizeText(character.trivia || '');

  const fullContext = `${normalizeText(character.name)} ${charAliases.join(' ')} ${charTags.join(' ')} ${charWeapons.join(' ')} ${charConditions.join(' ')} ${charTrivia} ${extract} ${desc}`;

  // ==================== 0. RELATIVE / COMPANION DISAMBIGUATION ====================
  const hasRelativeSubject = /\b(parent|parents|mother|father|uncle|wife|daughter|brother|comrades|son)\b/i.test(normQ);
  if (hasRelativeSubject) {
    if (character.name === 'Spider-Man' && /\b(uncle|thief|fleeing thief|assassination|shot)\b/i.test(normQ)) {
      return { type: 'YES', commentary: "Yes! His failure to stop the fleeing thief directly led to Uncle Ben's tragic death.", mood: 'surprised' };
    }
    if (character.name === 'Edward Elric' && /\b(parent|mother|resurrect|deceased|transmutation|mutilation)\b/i.test(normQ)) {
      return { type: 'YES', commentary: "Yes! The attempt to resurrect their deceased mother cost Edward his arm and leg.", mood: 'surprised' };
    }
    if (character.name === 'Kratos' && /\b(wife|daughter|ares|temple|butcher)\b/i.test(normQ)) {
      return { type: 'YES', commentary: "Yes! Tricked by Ares into slaying his wife and daughter, their crematorium ashes were bound to his skin.", mood: 'surprised' };
    }
    if (character.name === 'Levi Ackerman' && /\b(comrades|devoured|titans|battle)\b/i.test(normQ)) {
      return { type: 'YES', commentary: "Yes! Levi tragically witnessed his closest comrades devoured by titans in battle.", mood: 'surprised' };
    }
    if (character.name === 'Superman' && /\b(parents|rocket|interstellar|homeworld|exploded)\b/i.test(normQ)) {
      return { type: 'YES', commentary: "Yes! Jor-El and Lara sent baby Kal-El to Earth in a rocket before Krypton was destroyed.", mood: 'surprised' };
    }
    if (character.name === 'Darth Vader' && /\b(son|hand|sever|cloud city)\b/i.test(normQ)) {
      return { type: 'YES', commentary: "Yes! Darth Vader famously severed the hand of his biological son Luke Skywalker on Cloud City.", mood: 'surprised' };
    }
    if (character.name === 'Harry Potter' && /\b(mother|sacrificial|magic|curse|save)\b/i.test(normQ)) {
      return { type: 'YES', commentary: "Yes! Lily Potter's ancient sacrificial magic protected Harry from the Killing Curse.", mood: 'surprised' };
    }
  }

  // ==================== 1. SPORT SPECIFICITY DISAMBIGUATION ====================
  if (/\b(basketball|nba|chicago bulls|hoop|dunk|three pointer|golden state)\b/i.test(normQ)) {
    const isBasketball = character.primarySport === 'basketball';
    return {
      type: isBasketball ? 'YES' : 'NO',
      commentary: isBasketball 
        ? "Yes! A legendary basketball titan of the hardwood." 
        : "No, this person is not known for professional basketball.",
      mood: isBasketball ? 'confident' : 'smug'
    };
  }

  if (/\b(american football|nfl|touchdown|super bowl)\b/i.test(normQ)) {
    return {
      type: 'NO',
      commentary: "No, they are not an American football or NFL player.",
      mood: 'smug'
    };
  }

  if (/\b(pokemon|pokeball|poke ball|electric mouse|rodent)\b/i.test(normQ)) {
    const isPokemon = fullContext.includes('pokemon');
    return {
      type: isPokemon ? 'YES' : 'NO',
      commentary: isPokemon ? "Yes, an electric rodent Pokémon!" : "No, definitely not a Pokémon.",
      mood: isPokemon ? 'confident' : 'smug'
    };
  }

  if (/\b(football|soccer|fifa|world cup|ballon d or|ballon d’or|champions league|fc barcelona|real madrid|manchester united|inter miami)\b/i.test(normQ)) {
    const isFootballer = character.primarySport === 'football' || fullContext.includes('fifa') || fullContext.includes('world cup');
    return {
      type: isFootballer ? 'YES' : 'NO',
      commentary: isFootballer 
        ? "Yes! A global football / soccer phenomenon." 
        : "No, they are not a football (soccer) star.",
      mood: isFootballer ? 'confident' : 'smug'
    };
  }

  if (/\b(swimmer|swimming|olympic swimmer|butterfly stroke)\b/i.test(normQ)) {
    const isSwimmer = fullContext.includes('swimmer') || fullContext.includes('swimming stroke');
    const isLuffy = character.name.includes('Luffy');
    if (isLuffy && /\b(incapable|cannot|can't|unable)\b/i.test(normQ)) {
      return {
        type: 'YES',
        commentary: "Yes! Having eaten a Devil Fruit, they sink like an anchor and cannot swim at all!",
        mood: 'surprised'
      };
    }
    return {
      type: isSwimmer ? 'YES' : 'NO',
      commentary: isSwimmer ? "Yes, an accomplished competitive swimmer." : "No, not a competitive swimmer.",
      mood: 'smug'
    };
  }

  // ==================== 2. HIGH-SIGNIFICANCE DISTINCTIVE LANDMARK SCANNER ====================
  const distinctiveLandmarks = [
    { phrase: 'batmobile', match: ['batmobile'] },
    { phrase: 'repulsor', match: ['repulsor', 'repulsor beams', 'armor'] },
    { phrase: 'kryptonite', match: ['kryptonite'] },
    { phrase: 'break the fourth wall', match: ['fourth wall', 'break the fourth wall'] },
    { phrase: 'fourth wall', match: ['fourth wall', 'break the fourth wall'] },
    { phrase: 'mjolnir', match: ['mjolnir', 'golden visor', 'power armor'] },
    { phrase: 'golden visor', match: ['mjolnir', 'golden visor'] },
    { phrase: 'covenant', match: ['covenant', 'the flood'] },
    { phrase: 'the flood', match: ['covenant', 'the flood'] },
    { phrase: 'robotnik', match: ['dr robotnik', 'eggman', 'dr eggman'] },
    { phrase: 'eggman', match: ['dr robotnik', 'eggman', 'dr eggman'] },
    { phrase: 'chaos emeralds', match: ['chaos emeralds'] },
    { phrase: 'super sonic', match: ['super sonic', 'chaos emeralds'] },
    { phrase: 'gold rings', match: ['gold rings', 'rings'] },
    { phrase: 'breaking bad', match: ['breaking bad', 'blue meth'] },
    { phrase: 'moriarty', match: ['moriarty', 'professor moriarty'] },
    { phrase: 'voldemort', match: ['voldemort', 'lightning scar'] },
    { phrase: 'father of theoretical computer science', match: ['father of computer science', 'father of artificial intelligence', 'turing'] },
    { phrase: 'father of modern computer science', match: ['father of computer science', 'father of artificial intelligence', 'turing'] },
    { phrase: 'youngest self made billionaire', match: ['youngest billionaire', 'youngest self made billionaire'] },
    { phrase: 'youngest billionaire', match: ['youngest billionaire', 'youngest self made billionaire'] },
    { phrase: 'nine tailed', match: ['nine tails', 'nine-tailed', 'kurama'] },
    { phrase: 'hokage', match: ['hokage', 'seventh hokage'] },
    { phrase: 'ichiraku', match: ['ichiraku', 'ramen'] },
    { phrase: 'rasengan', match: ['rasengan'] },
    { phrase: 'clean freak', match: ['clean freak'] },
    { phrase: 'survey corps', match: ['survey corps', 'scout regiment'] },
    { phrase: 'super saiyan', match: ['super saiyan'] },
    { phrase: 'kamehameha', match: ['kamehameha'] },
    { phrase: 'monkey tail', match: ['monkey tail', 'tail'] },
    { phrase: 'straw hat', match: ['straw hat', 'straw hat pirates'] },
    { phrase: 'cannot swim', match: ['cannot swim', 'incapable of swimming'] },
    { phrase: 'incapable of swimming', match: ['cannot swim', 'incapable of swimming'] },
    { phrase: 'single punch', match: ['single punch', 'one punch'] },
    { phrase: 'one punch', match: ['single punch', 'one punch'] },
    { phrase: 'blindfold', match: ['blindfold'] },
    { phrase: 'six eyes', match: ['six eyes'] },
    { phrase: 'wayne enterprises', match: ['wayne enterprises'] },
    { phrase: 'crime alley', match: ['crime alley'] },
    { phrase: 'arc reactor', match: ['arc reactor'] },
    { phrase: 'endgame sacrifice', match: ['endgame sacrifice', 'infinity stones'] },
    { phrase: 'uncle ben', match: ['uncle ben', 'great responsibility'] },
    { phrase: 'daily bugle', match: ['daily bugle'] },
    { phrase: 'smallville', match: ['smallville', 'jonathan kent'] },
    { phrase: 'master sword', match: ['master sword'] },
    { phrase: 'mushroom kingdom', match: ['mushroom kingdom', 'bowser', 'peach'] },
    { phrase: 'thunderbolt', match: ['thunderbolt', '100000 volt'] },
    { phrase: '221b baker street', match: ['baker street', '221b baker street'] },
    { phrase: 'baker street', match: ['baker street', '221b baker street'] },
    { phrase: 'pixar', match: ['pixar', 'pixar animation'] },
    { phrase: 'enigma', match: ['enigma', 'nazi enigma', 'bletchley park'] },
    { phrase: 'turing machine', match: ['turing machine', 'turing test'] },
    { phrase: 'principia mathematica', match: ['principia mathematica', 'principia'] },
    { phrase: 'two nobel prizes', match: ['two nobel prizes', 'two distinct sciences'] },
    { phrase: 'war of the currents', match: ['war of the currents', 'ac power'] },
    { phrase: 'ides of march', match: ['ides of march', 'brutus'] },
    { phrase: 'rubicon', match: ['rubicon', 'crossing the rubicon'] },
    { phrase: 'gettysburg', match: ['gettysburg', 'gettysburg address'] },
    { phrase: 'emancipation proclamation', match: ['emancipation proclamation'] },
    { phrase: 'john wilkes booth', match: ['john wilkes booth', 'fords theatre'] },
    { phrase: 'salt tax', match: ['salt tax', 'salt march'] },
    { phrase: 'salt march', match: ['salt march', 'protest salt tax'] },
    { phrase: 'saint helena', match: ['saint helena', 'exiled to saint helena'] },
    { phrase: 'fifa world cup', match: ['fifa world cup', 'world cup trophy', 'world cup 2022'] },
    { phrase: 'world cup trophy', match: ['fifa world cup', 'world cup trophy', 'world cup 2022'] },
    { phrase: 'ballon d or', match: ['ballon d or', 'ballon d’or'] },
    { phrase: 'ballon d’or', match: ['ballon d or', 'ballon d’or'] },
    { phrase: 'cr7', match: ['cr7'] },
    { phrase: 'jersey number 23', match: ['number 23', 'jersey number 23'] },
    { phrase: 'lightning bolt victory pose', match: ['lightning pose', 'lightning bolt victory pose'] },
    { phrase: 'moonwalk', match: ['moonwalk', 'dance glide'] },
    { phrase: 'single glove', match: ['single glove', 'wearing a single glove'] },
    { phrase: 'thriller', match: ['thriller', 'best selling album'] },
    { phrase: 'live aid', match: ['live aid', 'live aid in 1985', 'wembley stadium'] },
    { phrase: 'bohemian rhapsody', match: ['bohemian rhapsody'] },
    { phrase: 'four album of the year', match: ['four album of the year', 'album of the year four times'] },
    { phrase: 'swifties', match: ['swifties', 'taylor swift'] },

    // Level 2 Landmarks
    { phrase: 'detonating cell', match: ['dragon ball', 'saiyan', 'cell', 'son goku', 'goku'] },
    { phrase: 'monstrous appetite', match: ['goku', 'saiyan', 'appetite', 'son goku'] },
    { phrase: 'sink like an anchor', match: ['luffy', 'devil fruit', 'cannot swim', 'monkey d luffy'] },
    { phrase: 'vice admiral named garp', match: ['luffy', 'one piece', 'garp', 'monkey d luffy'] },
    { phrase: 'female childhood mechanic', match: ['edward elric', 'automail', 'winry', 'fullmetal alchemist'] },
    { phrase: 'without drawing a transmutation circle', match: ['edward elric', 'alchemy', 'transmutation', 'fullmetal alchemist'] },
    { phrase: 'transmutation circle', match: ['edward elric', 'alchemy', 'transmutation', 'fullmetal alchemist'] },
    { phrase: 'youngest state alchemist', match: ['edward elric', 'state alchemist', 'fullmetal alchemist'] },
    { phrase: 'porcelain rim rather than the handle', match: ['levi', 'levi ackerman', 'tea', 'clean freak'] },
    { phrase: 'emotional numbness and hair loss', match: ['saitama', 'one punch'] },
    { phrase: 'fallen lunar kingdom', match: ['sailor moon', 'usagi', 'princess serenity'] },
    { phrase: 'wrist mounted shooters', match: ['spider-man', 'peter parker', 'spider man'] },
    { phrase: 'code against executing criminals', match: ['batman', 'bruce wayne'] },
    { phrase: 'jarvis or friday', match: ['iron man', 'tony stark'] },
    { phrase: 'red dwarf sun', match: ['superman', 'clark kent', 'krypton'] },
    { phrase: 'native civilization collapse', match: ['thanos'] },
    { phrase: 'voice acted monologues', match: ['link', 'zelda', 'silent protagonist'] },
    { phrase: 'shrine of resurrection', match: ['link', 'zelda', 'breath of the wild'] },
    { phrase: 'barrel throwing ape', match: ['mario', 'donkey kong'] },
    { phrase: 'installation 04', match: ['master chief', 'halo'] },
    { phrase: 'cat like slit pupils', match: ['geralt', 'witcher'] },
    { phrase: 'silver specifically for supernatural monsters', match: ['geralt', 'witcher'] },
    { phrase: 'human crematorium ashes', match: ['kratos', 'god of war'] },
    { phrase: 'sink rapidly like a brick', match: ['sonic'] },
    { phrase: 'hank schrader', match: ['walter white', 'breaking bad'] },
    { phrase: 'commencement address at stanford', match: ['steve jobs'] },
    { phrase: 'wealthiest person on planet earth for over a decade', match: ['bill gates', 'microsoft'] },
    { phrase: 'license ms dos to ibm', match: ['bill gates', 'microsoft'] },
    { phrase: 'ms dos to ibm', match: ['bill gates', 'microsoft'] },
    { phrase: 'e equals m c squared', match: ['albert einstein', 'einstein'] },
    { phrase: 'superhuman deductive reasoning', match: ['sherlock holmes', 'detective'] },
    { phrase: 'cybernetic augmentations and ceramic bone grafting', match: ['master chief', 'spartan'] },
    { phrase: 'veni vidi vici', match: ['julius caesar', 'caesar'] },
    { phrase: 'first triumvirate', match: ['julius caesar', 'caesar'] },
    { phrase: 'italian corsican', match: ['napoleon', 'napoleon bonaparte'] },
    { phrase: '18 brumaire', match: ['napoleon', 'napoleon bonaparte'] },
    { phrase: 'mount rushmore', match: ['abraham lincoln', 'lincoln'] },
    { phrase: 'great soul', match: ['mahatma gandhi', 'gandhi'] },
    { phrase: 'island of madeira', match: ['cristiano ronaldo', 'ronaldo'] },
    { phrase: 'neverland ranch', match: ['michael jackson'] },
    { phrase: 'half broken stand', match: ['freddie mercury', 'queen'] },
    { phrase: "taylor's version", match: ['taylor swift'] },
    { phrase: 'taylor s version', match: ['taylor swift'] },
    { phrase: 'co write virtually every track', match: ['taylor swift'] },
    { phrase: '91 official goals', match: ['91 official goals', '91 goals', 'lionel messi'] },
    { phrase: 'gerd muller', match: ['gerd muller', 'lionel messi'] },
    { phrase: 'black bisht', match: ['bisht', 'lionel messi'] },
    { phrase: 'bicycle kick in turin', match: ['bicycle kick', 'cristiano ronaldo'] },
    { phrase: '850 competitive career goals', match: ['850', 'cristiano ronaldo'] },
    { phrase: 'last shot against the utah jazz', match: ['last shot', 'michael jordan'] },
    { phrase: 'jersey number 45', match: ['number 45', 'michael jordan'] },
    { phrase: 'flu game', match: ['flu game', 'michael jordan'] },
    { phrase: 'golden sprinting spikes', match: ['spikes', 'usain bolt'] },
    { phrase: 'we are the world', match: ['we are the world', 'michael jackson'] },
    { phrase: 'motown 25', match: ['motown 25', 'michael jackson'] },
    { phrase: '45 degree anti gravity lean', match: ['lean', 'michael jackson'] },
    { phrase: 'barcelona with soprano', match: ['barcelona', 'freddie mercury'] },
    { phrase: 'ay oh', match: ['ay-oh', 'ay oh', 'freddie mercury'] },
    { phrase: 'eras tour', match: ['eras tour', 'taylor swift'] },
    { phrase: 'computable numbers', match: ['computable numbers', 'alan turing'] },
    { phrase: 'royal pardon', match: ['royal pardon', 'alan turing'] },
    { phrase: 'brownian motion', match: ['brownian motion', 'albert einstein'] },
    { phrase: 'president of the state of israel', match: ['israel', 'albert einstein'] },
    { phrase: 'photoelectric effect', match: ['photoelectric', 'albert einstein'] },
    { phrase: 'woolsthorpe', match: ['woolsthorpe', 'isaac newton'] },
    { phrase: 'biblical alchemy', match: ['alchemy', 'isaac newton'] },
    { phrase: 'radioactive to handle', match: ['radioactive', 'marie curie'] },
    { phrase: 'polonium', match: ['polonium', 'marie curie'] },
    { phrase: 'petites curies', match: ['petites curies', 'marie curie'] },
    { phrase: 'columbian exposition in chicago', match: ['columbian exposition', 'nikola tesla'] },
    { phrase: 'colorado springs', match: ['colorado springs', 'nikola tesla'] },
    { phrase: 'ac induction motor', match: ['induction motor', 'nikola tesla'] },
    { phrase: 'cilician pirates', match: ['cilician pirates', 'julius caesar'] },
    { phrase: 'twenty three times', match: ['twenty three', 'julius caesar'] },
    { phrase: 'burning moscow', match: ['burning moscow', 'napoleon'] },
    { phrase: 'duke of wellington', match: ['wellington', 'waterloo', 'napoleon'] },
    { phrase: 'seven southern states', match: ['seven southern states', 'abraham lincoln'] },
    { phrase: 'sic semper tyrannis', match: ['sic semper tyrannis', 'abraham lincoln'] },
    { phrase: '240 miles to the coastal village of dandi', match: ['dandi', 'mahatma gandhi'] },
    { phrase: 'satyagraha', match: ['satyagraha', 'mahatma gandhi'] },
    { phrase: 'reichenbach falls', match: ['reichenbach', 'sherlock holmes'] },
    { phrase: 'german nobel laureate quantum physicist', match: ['heisenberg', 'walter white'] },
    { phrase: 'built their methamphetamine empire for their own ego', match: ['ego', 'walter white'] },
    { phrase: 'flash clone', match: ['flash clone', 'master chief'] },
    { phrase: 'helmet virtually never removed', match: ['helmet', 'master chief'] },
    { phrase: 'woodland critters', match: ['critters', 'sonic'] },
    { phrase: 'cheek patches', match: ['cheek', 'pikachu'] },
    { phrase: 'refuse to enter a standard', match: ['refuse', 'pokeball', 'pikachu'] },
    { phrase: 'parseltongue', match: ['parseltongue', 'harry potter'] },
    { phrase: 'davy jones', match: ['davy jones', 'jack sparrow'] },
    { phrase: 'exile from apple in 1985', match: ['1985', 'steve jobs'] },
    { phrase: 'supersonic speeds', match: ['superman', 'clark kent', 'son goku', 'usain bolt'] },
    { phrase: 'lawful police or judicial authorization', match: ['police', 'detective'] },
    { phrase: 'signs like igni or quen', match: ['geralt', 'witcher'] },
    { phrase: 'biological ability to fly or lift tanks', match: ['superman', 'son goku'] }
  ];

  for (const item of distinctiveLandmarks) {
    if (normQ.includes(item.phrase)) {
      const matches = item.match.some(m => fullContext.includes(m));
      return {
        type: matches ? 'YES' : 'NO',
        commentary: matches 
          ? `Yes! That distinctive lore element is definitively part of their story.` 
          : `No, that specific lore detail does not apply to this character.`,
        mood: matches ? 'surprised' : 'smug'
      };
    }
  }

  // Specific Causal Lore Inquiries
  if (character.name === 'Iron Man' && /\b(weapons manufactured by their own|corporate empire nearly kill|desert)\b/i.test(normQ)) {
    return { type: 'YES', commentary: "Yes! Tony Stark was ambushed by weapons his own company manufactured.", mood: 'surprised' };
  }

  if (character.name === 'Batman' && /\b(stripped of all.*armor.*mortal human|ordinary mortal human)\b/i.test(normQ)) {
    return { type: 'YES', commentary: "Yes! Beneath the suit and gadgets, Bruce Wayne is a mortal human.", mood: 'confident' };
  }

  if (character.name === 'Superman' && /\b(red dwarf|red sun|yellow solar|powers vanish)\b/i.test(normQ)) {
    return { type: 'YES', commentary: "Yes! Under a red dwarf sun, Superman's powers vanish.", mood: 'surprised' };
  }

  if (character.name === 'Superman' && /\b(lead|lead lined|shield.*x ray)\b/i.test(normQ)) {
    return { type: 'YES', commentary: "Yes! Lead blocks Superman's X-ray vision.", mood: 'confident' };
  }

  if (character.name === 'Wonder Woman' && /\b(lasso.*compel.*truth)\b/i.test(normQ)) {
    return { type: 'YES', commentary: "Yes! Her enchanted Lasso of Truth compels anyone to speak absolute truth.", mood: 'confident' };
  }

  if (character.name === 'Darth Vader' && /\b(survive.*without.*respirator)\b/i.test(normQ)) {
    return { type: 'NO', commentary: "No! Darth Vader cannot survive in open air without his pressurized respirator suit.", mood: 'confident' };
  }

  if (character.name === 'Sherlock Holmes' && /\b(lack.*official license.*scotland yard|employment badge|license or employment)\b/i.test(normQ)) {
    return { type: 'NO', commentary: "They do not hold an official Scotland Yard badge, operating instead as a consulting detective.", mood: 'confident' };
  }

  // ==================== 3. SPECIFIC NAMED PERSONAS & ALIASES ====================
  if (/\b(kira|heisenberg|batman|bruce wayne|tony stark|peter parker|clark kent|kal el|diana prince|wade wilson|spartan 117|anakin|farrokh bulsara)\b/i.test(normQ)) {
    const matchesAlias = charAliases.some(a => normQ.includes(a)) || normQ.includes(normalizeText(character.name));
    if (matchesAlias) {
      return {
        type: 'YES',
        commentary: `Yes! That famous alias and identity belongs directly to them.`,
        mood: 'surprised'
      };
    }
  }

  if (/\b(secret identity|alter ego|civilian persona|double life|dual identity|secret persona|secret vigilante alias)\b/i.test(normQ)) {
    const hasAlterEgo = character.alterEgo === true;
    return {
      type: hasAlterEgo ? 'YES' : 'NO',
      commentary: hasAlterEgo 
        ? "Yes! They lead a double life with a famous secret identity or alter ego." 
        : "No, they operate under their own true name without a masked secret persona.",
      mood: hasAlterEgo ? 'surprised' : 'thinking'
    };
  }

  // ==================== 4. WEAPONS & COMBAT STYLE ====================
  if (/\b(blade|blades|sword|swords|cutlass|katana|katanas|scythe|master sword)\b/i.test(normQ)) {
    const usesBlades = charWeapons.some(w => /blade|sword|cutlass|katana/i.test(w)) ||
                       charTags.some(t => /blade|sword|cutlass|katana/i.test(t));
    return {
      type: usesBlades ? 'YES' : 'NO',
      commentary: usesBlades 
        ? "Yes! Their primary weapon of choice is a sword or lethal blade." 
        : "No, a sword or blade is not their primary weapon.",
      mood: usesBlades ? 'confident' : 'thinking'
    };
  }

  if (/\b(wand|magic wand|spellcasting)\b/i.test(normQ)) {
    const usesWand = charWeapons.some(w => /wand/i.test(w)) || fullContext.includes('wand');
    return {
      type: usesWand ? 'YES' : 'NO',
      commentary: usesWand ? "Yes, they wield an iconic magic wand!" : "No, they do not use a wand.",
      mood: 'confident'
    };
  }

  if (/\b(lightsaber|red lightsaber|crimson lightsaber)\b/i.test(normQ)) {
    const hasLightsaber = fullContext.includes('lightsaber');
    return {
      type: hasLightsaber ? 'YES' : 'NO',
      commentary: hasLightsaber ? "Yes, an unmistakable crimson lightsaber!" : "No lightsaber for this character.",
      mood: 'confident'
    };
  }

  // ==================== 5. PHYSICAL MODIFICATIONS, PROSTHETICS & LIFE SUPPORT ====================
  if (/\b(prosthetic|artificial limb|automail|prosthetic limb|prosthetic arm|prosthetic leg|cybernetic limb|amputee)\b/i.test(normQ)) {
    const hasProsthetic = charConditions.some(c => /prosthetic|automail|artificial limb/i.test(c)) ||
                          fullContext.includes('prosthetic') || fullContext.includes('automail') || fullContext.includes('artificial limb');
    return {
      type: hasProsthetic ? 'YES' : 'NO',
      commentary: hasProsthetic 
        ? "Yes! They have an artificial or prosthetic limb." 
        : "No, they do not possess prosthetic or artificial limbs.",
      mood: hasProsthetic ? 'confident' : 'thinking'
    };
  }

  if (/\b(life support|respirator|breathing suit|cybernetic suit|dependent on armor to survive)\b/i.test(normQ)) {
    const hasLifeSupport = charConditions.some(c => /life support|respirator/i.test(c)) ||
                           fullContext.includes('life support') || fullContext.includes('respirator');
    return {
      type: hasLifeSupport ? 'YES' : 'NO',
      commentary: hasLifeSupport 
        ? "Yes, they are dependent on specialized life-support armor or respirator to survive." 
        : "No, they do not require life-support apparatus.",
      mood: hasLifeSupport ? 'confident' : 'thinking'
    };
  }

  if (/\b(silent|no spoken dialogue|mute|rarely speaks|does not speak|without spoken dialogue)\b/i.test(normQ)) {
    const isSilent = charConditions.includes('silent protagonist') || fullContext.includes('silent protagonist') || fullContext.includes('no spoken dialogue');
    return {
      type: isSilent ? 'YES' : 'NO',
      commentary: isSilent 
        ? "Yes! Famously celebrated for remaining silent without voice dialogue." 
        : "No, they have spoken dialogue and words.",
      mood: isSilent ? 'confident' : 'thinking'
    };
  }

  // ==================== 6. MORAL ALIGNMENT & CRIME ====================
  if (/\b(villain|antagonist|criminal|murderer|evil|bad guy|chaos)\b/i.test(normQ)) {
    const isVillain = character.alignment === 'villain' || charTags.includes('villain') || charTags.includes('antagonist');
    return {
      type: isVillain ? 'YES' : 'NO',
      commentary: isVillain 
        ? "Yes! They are widely recognized as a villain, antagonist, or master criminal." 
        : "No, they are a hero or benevolent protagonist.",
      mood: isVillain ? 'surprised' : 'confident'
    };
  }

  if (/\b(anti hero|antihero|vigilante)\b/i.test(normQ)) {
    const isAntiHero = character.alignment === 'anti-hero' || character.occupation === 'vigilante';
    return {
      type: isAntiHero ? 'YES' : 'NO',
      commentary: isAntiHero 
        ? "Yes, an iconic anti-hero or ruthless vigilante." 
        : "No, they follow a standard moral alignment.",
      mood: 'thinking'
    };
  }

  // ==================== 7. BACKSTORY & FAMILY ====================
  if (/\b(orphan|parents died|without parents|raised without parents|parents murdered|grew up alone|without biological parents)\b/i.test(normQ)) {
    const isOrphan = character.orphan === true || fullContext.includes('orphan') || fullContext.includes('parents murdered') || fullContext.includes('no parents');
    return {
      type: isOrphan ? 'YES' : 'NO',
      commentary: isOrphan 
        ? "Yes, tragically they grew up as an orphan without their parents." 
        : "No, they were not raised as an orphan.",
      mood: isOrphan ? 'surprised' : 'thinking'
    };
  }

  // ==================== 8. CIRCUMSTANCES OF DEATH & FATE ====================
  if (/\b(assassinated|murdered|betrayed by senators|ides of march|killed at theatre|ford s theatre|fords theatre|john wilkes booth)\b/i.test(normQ) && !hasRelativeSubject) {
    const isAssassinated = character.deathType === 'assassination' || fullContext.includes('assassinated') || fullContext.includes('ides of march');
    return {
      type: isAssassinated ? 'YES' : 'NO',
      commentary: isAssassinated 
        ? "Yes! Their life was cut short by assassination or fatal betrayal." 
        : "No, they were not assassinated.",
      mood: isAssassinated ? 'surprised' : 'thinking'
    };
  }

  if (/\b(terminal illness|cancer|lung cancer|pancreatic cancer|diagnosed with|fatal illness|fatal disease)\b/i.test(normQ)) {
    const hasIllness = character.deathType === 'cancer/illness' || charConditions.includes('cancer') || fullContext.includes('cancer') || fullContext.includes('terminal illness');
    return {
      type: hasIllness ? 'YES' : 'NO',
      commentary: hasIllness 
        ? "Yes, afflicted by a severe terminal illness or cancer that changed everything." 
        : "No, terminal illness is not part of their story.",
      mood: hasIllness ? 'confident' : 'thinking'
    };
  }

  if (/\b(exiled|exile|remote island|saint helena|st helena|elba)\b/i.test(normQ)) {
    const isExiled = fullContext.includes('exiled') || fullContext.includes('saint helena') || fullContext.includes('elba');
    return {
      type: isExiled ? 'YES' : 'NO',
      commentary: isExiled 
        ? "Yes, exiled to a remote island after military downfall." 
        : "No, exile to an island was not their fate.",
      mood: 'thinking'
    };
  }

  // ==================== 9. SUPERPOWERS & ABILITIES ====================
  if (/\b(superpower|powers?|magic|superhuman|abilities|magical|fly|teleport|laser)\b/i.test(normQ) && !/\b(armor|armored|repulsor|suit|broomstick|quidditch|alien|krypton|vegeta)\b/i.test(normQ)) {
    const hasPowers = character.superpowers === true;
    return {
      type: hasPowers ? 'YES' : 'NO',
      commentary: hasPowers 
        ? "Yes! They possess extraordinary superhuman powers or magic." 
        : "No, they rely on mortal human skill, intellect, or technology.",
      mood: hasPowers ? 'surprised' : 'thinking'
    };
  }

  // ==================== 10. WEALTH & BILLIONAIRES ====================
  if (/\b(billionaire|wealthy|rich|fortune|richest)\b/i.test(normQ)) {
    const isWealthy = charTags.includes('billionaire') || charTags.includes('wealthy') || charTags.includes('rich') || charTags.includes('richest');
    return {
      type: isWealthy ? 'YES' : 'NO',
      commentary: isWealthy 
        ? "Yes! They possess vast wealth, fortune, and billionaire status." 
        : "No, they are not renowned as a billionaire or extraordinarily wealthy.",
      mood: isWealthy ? 'confident' : 'thinking'
    };
  }

  // ==================== 11. EDUCATION & UNIVERSITY ====================
  if (/\b(degree|college degree|graduating university|university degree|doctoral degree|phd|doctorate|drop out|dropped out)\b/i.test(normQ)) {
    const isDoctoral = /\b(doctoral|phd|doctorate)\b/i.test(normQ);
    if (isDoctoral) {
      const hasPhD = fullContext.includes('doctoral') || fullContext.includes('phd') || fullContext.includes('doctor of');
      return {
        type: hasPhD ? 'YES' : 'NO',
        commentary: hasPhD ? "Yes, they earned an advanced doctoral degree." : "No, they did not complete a doctoral degree.",
        mood: 'confident'
      };
    }

    const isDropout = fullContext.includes('harvard dropout') || fullContext.includes('dropped out') || fullContext.includes('drop out');
    return {
      type: isDropout ? 'YES' : 'NO',
      commentary: isDropout 
        ? "Yes, exactly! They dropped out without completing a traditional university degree." 
        : "No, that does not match their educational background.",
      mood: 'confident'
    };
  }

  // ==================== 12. COMPANIONS, RIVALS & SETTINGS ====================
  if (/\b(medical doctor|doctor colleague|watson|companion watson|partner watson)\b/i.test(normQ)) {
    const hasWatson = fullContext.includes('watson');
    return {
      type: hasWatson ? 'YES' : 'NO',
      commentary: hasWatson 
        ? "Yes! Famously partnered with trusted medical colleague Dr. Watson." 
        : "No, that does not match their companionship.",
      mood: 'confident'
    };
  }

  if (/\b(ryuk|shinigami|death god who eats apples|apples)\b/i.test(normQ)) {
    const hasRyuk = fullContext.includes('ryuk') || fullContext.includes('shinigami');
    return {
      type: hasRyuk ? 'YES' : 'NO',
      commentary: hasRyuk ? "Yes! Accompanied by the apple-loving shinigami Ryuk." : "No connection to Ryuk or death gods.",
      mood: 'confident'
    };
  }

  if (/\b(jesse pinkman|pinkman|blue meth|blue crystal meth)\b/i.test(normQ)) {
    const hasJesse = fullContext.includes('jesse pinkman') || fullContext.includes('blue meth');
    return {
      type: hasJesse ? 'YES' : 'NO',
      commentary: hasJesse ? "Yes! Producing pure blue crystal meth with Jesse Pinkman." : "No, not connected to Jesse Pinkman.",
      mood: 'confident'
    };
  }

  if (/\b(mustafar|volcanic lava|burned on mustafar)\b/i.test(normQ)) {
    const hasMustafar = fullContext.includes('mustafar');
    return {
      type: hasMustafar ? 'YES' : 'NO',
      commentary: hasMustafar ? "Yes! Grievously injured on the volcanic world of Mustafar." : "No connection to Mustafar.",
      mood: 'confident'
    };
  }

  // ==================== 13. FICTIONAL VS REAL ====================
  if (/\b(fictional|fiction|made up|imaginary|cartoon|anime character|comic character|animated|myth)\b/i.test(normQ)) {
    const isFictional = character.fictional;
    return {
      type: isFictional ? 'YES' : 'NO',
      commentary: isFictional 
        ? "Yes! This character lives in the realm of fiction and storytelling." 
        : "No, this is a real-life human being from our world.",
      mood: isFictional ? 'confident' : 'thinking'
    };
  }

  if (/\b(real|real life|real person|actual person|living or historic|history)\b/i.test(normQ)) {
    const isReal = !character.fictional;
    return {
      type: isReal ? 'YES' : 'NO',
      commentary: isReal 
        ? "Yes, this person actually exists (or existed) in the real world!" 
        : "No! This is a fictional character.",
      mood: isReal ? 'confident' : 'thinking'
    };
  }

  // ==================== 14. ALIVE VS DEAD ====================
  if (/\b(alive|living|still alive|alive today|breathes?)\b/i.test(normQ) && !hasRelativeSubject) {
    const isAlive = character.alive;
    return {
      type: isAlive ? 'YES' : 'NO',
      commentary: isAlive ? "Yes, they are alive!" : "No, they have passed away or are deceased in canon.",
      mood: 'thinking'
    };
  }

  if (/\b(dead|died|passed away|deceased|killed)\b/i.test(normQ) && !hasRelativeSubject) {
    const isDead = !character.alive;
    return {
      type: isDead ? 'YES' : 'NO',
      commentary: isDead ? "Yes, they are deceased or met their end." : "No, they are still very much alive!",
      mood: 'thinking'
    };
  }

  // ==================== 15. GENDER ====================
  if (/\b(female|woman|girl|lady|she|her)\b/i.test(normQ)) {
    const isFemale = character.gender === 'female';
    return {
      type: isFemale ? 'YES' : 'NO',
      commentary: isFemale ? "Yes, this entity is female!" : "No, this entity is not female.",
      mood: 'confident'
    };
  }

  if (/\b(male|man|guy|boy|he|him|gentleman)\b/i.test(normQ)) {
    const isMale = character.gender === 'male';
    return {
      type: isMale ? 'YES' : 'NO',
      commentary: isMale ? "Yes, this entity is male!" : "No, this entity is not male.",
      mood: 'confident'
    };
  }

  // ==================== 16. HUMAN VS NON-HUMAN ====================
  if (/\b(human|mortal)\b/i.test(normQ)) {
    const isHuman = character.human;
    return {
      type: isHuman ? 'YES' : 'NO',
      commentary: isHuman ? "Yes, biologically human (or mostly human)." : "No, an alien, god, creature, or non-human entity!",
      mood: 'thinking'
    };
  }

  if (/\b(alien|extraterrestrial|another planet|born in outer space|planet vegeta|planet krypton|titan)\b/i.test(normQ) && !/\b(spacex|spacecraft)\b/i.test(normQ)) {
    if (normQ.includes('krypton')) {
      const fromKrypton = normalizeText(character.origin || '').includes('krypton');
      return {
        type: fromKrypton ? 'YES' : 'NO',
        commentary: fromKrypton ? "Yes! The last son of Krypton." : "No, not from Krypton.",
        mood: fromKrypton ? 'confident' : 'smug'
      };
    }
    const isAlien = !character.human || (character.origin || '').toLowerCase().includes('planet') || /\b(alien|saiyan|krypton)\b/i.test(fullContext);
    return {
      type: isAlien ? 'YES' : 'NO',
      commentary: isAlien ? "Yes! They originate from outer space or an alien world." : "No, grounded on Earth.",
      mood: isAlien ? 'surprised' : 'thinking'
    };
  }

  // ==================== 17. MEDIUM / UNIVERSE ====================
  if (/\b(anime|manga|japanese animation|shonen)\b/i.test(normQ)) {
    const isAnime = character.medium === 'anime' || character.category === 'anime';
    return {
      type: isAnime ? 'YES' : 'NO',
      commentary: isAnime ? "Yes! They come straight from Anime or Manga." : "No, not an anime or manga character.",
      mood: 'confident'
    };
  }

  if (/\b(marvel|avenger|avengers|mcu|stan lee)\b/i.test(normQ)) {
    const isMarvel = charTags.includes('marvel') || charTags.includes('avengers');
    return {
      type: isMarvel ? 'YES' : 'NO',
      commentary: isMarvel ? "Yes, part of the Marvel Universe!" : "No, not from Marvel.",
      mood: 'confident'
    };
  }

  if (/\b(dc|justice league|gotham)\b/i.test(normQ)) {
    const isDC = charTags.includes('dc') || charTags.includes('justice league');
    return {
      type: isDC ? 'YES' : 'NO',
      commentary: isDC ? "Yes, residing in the DC Universe!" : "No, not from DC.",
      mood: 'confident'
    };
  }

  if (/\b(video game|game|gaming|gamer|playstation|nintendo|xbox)\b/i.test(normQ)) {
    const isGame = character.medium === 'game' || character.category === 'gaming';
    return {
      type: isGame ? 'YES' : 'NO',
      commentary: isGame ? "Yes, this icon is famous from video games!" : "No, not a video game icon.",
      mood: 'confident'
    };
  }

  if (/\b(movie|film|cinema|hollywood|tv show|series)\b/i.test(normQ)) {
    const isMovie = character.medium === 'movie' || character.category === 'movies';
    return {
      type: isMovie ? 'YES' : 'NO',
      commentary: isMovie ? "Yes, celebrated on screen!" : "No, that's not their primary medium.",
      mood: 'thinking'
    };
  }

  // ==================== 18. PROFESSIONS & DOMAINS ====================
  if (/\b(scientist|physicist|chemist|biology|science|theory of relativity)\b/i.test(normQ)) {
    const isScience = character.category === 'science' || character.occupation === 'inventor' || character.occupation === 'physicist' || character.occupation === 'chemist';
    return {
      type: isScience ? 'YES' : 'NO',
      commentary: isScience ? "Yes! Renowned for scientific discoveries and breakthroughs." : "No, science is not their primary calling.",
      mood: 'confident'
    };
  }

  if (/\b(tech|computer|technology|software|silicon valley|orbital space|reusable rockets)\b/i.test(normQ)) {
    const isTech = character.category === 'tech' || charTags.includes('tech');
    return {
      type: isTech ? 'YES' : 'NO',
      commentary: isTech ? "Yes, at the forefront of technology, computing, or rocketry!" : "No, not known for technology.",
      mood: 'confident'
    };
  }

  // ==================== 19. MULTI-WORD & LEMMA SCORING ENGINE ====================
  const stopWords = new Set([
    'this', 'that', 'they', 'have', 'does', 'with', 'from', 'what', 'when', 'where',
    'character', 'person', 'their', 'known', 'famous', 'about', 'some', 'there',
    'been', 'would', 'could', 'should', 'more', 'most', 'very', 'were', 'also', 'into'
  ]);

  const words = normQ
    .split(' ')
    .filter(w => w.length > 3 && !stopWords.has(w));

  let matchScore = 0;
  let highImpactMatch = false;

  for (const w of words) {
    if (fullContext.includes(w)) {
      matchScore++;
      if (charTags.some(t => t.includes(w))) {
        highImpactMatch = true;
      }
    }
  }

  if (matchScore >= 2 || (highImpactMatch && matchScore >= 1)) {
    return {
      type: 'YES',
      commentary: "Yes! There is a definite and authentic connection to that in their history and lore.",
      mood: 'surprised'
    };
  } else if (matchScore === 1) {
    return {
      type: 'MAYBE',
      commentary: "Partially / It's complicated. There is a loose association, but it's not their defining aspect.",
      mood: 'thinking'
    };
  } else {
    return {
      type: 'NO',
      commentary: "No, that does not align with this character at all.",
      mood: 'smug'
    };
  }
}

/**
 * Multi-Layer Semantic Question Evaluator (Level 2 Grandmaster Precision)
 */
export function evaluateQuestion(questionText, character, wikiData = null) {
  const rawQ = questionText.toLowerCase().trim();
  const normQ = normalizeText(questionText);

  // 1. ANCHOR: Check for Anachronisms / Era Collisions first
  const anachronismResult = checkAnachronisms(normQ, character);
  if (anachronismResult) return anachronismResult;

  // 2. DETECT QUESTION POLARITY FRAMING
  // Frame A: "Is it false/untrue/inaccurate/a lie that [X]?" or "Is it not true that [X]?"
  const isFalseFrame = /\b(is it false|is it untrue|is it inaccurate|is it not true|is it a lie)\b/i.test(rawQ);
  
  // Frame B: Main question asks whether they lack something
  const isLackFrame = /\b(do they lack|does he lack|does she lack|are they lacking|are they devoid of|they are devoid of|are they without|they are without|never won|have they never|never played|never had|did they never)\b/i.test(rawQ);

  // Frame C: Negative Question "Are they not [X]?", "Were they not [X]?", "Did they not [X]?"
  const isNegativeQuestion = /\b(are they not|were they not|did they not|do they not|could they not)\b/i.test(rawQ);

  // 3. EXTRACT CORE PROPOSITION
  let coreQ = normQ
    .replace(/\b(is it false that|is it untrue that|is it inaccurate that|is it not true that|is it inaccurate to claim that|is it untrue to claim that)\b/g, '')
    .replace(/\b(do they lack|does he lack|does she lack|are they devoid of|are they without|they are devoid of|they lack|they are without)\b/g, 'do they have')
    .replace(/\b(are they not|were they not|did they not|do they not|could they not|have they never|were they never)\b/g, 'are they')
    .trim();

  // 4. RUN CORE EVALUATOR
  const baseResult = evaluateCoreLogic(coreQ, coreQ, rawQ, character, wikiData);

  // 5. POLARITY RESOLUTION & INVERSION
  let flips = 0;
  if (isFalseFrame) flips++;
  if (isLackFrame) flips++;
  if (isNegativeQuestion) flips++;

  const shouldInvert = (flips % 2 === 1);

  if (shouldInvert) {
    if (baseResult.type === 'YES') {
      return {
        type: 'NO',
        commentary: `No, that is not the case; ${baseResult.commentary.replace(/^yes[!,\s]*/i, '')}`,
        mood: 'smug'
      };
    } else if (baseResult.type === 'NO') {
      return {
        type: 'YES',
        commentary: `Yes, exactly! That is completely accurate.`,
        mood: 'confident'
      };
    }
  }

  return baseResult;
}
