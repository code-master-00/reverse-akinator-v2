// Level 2: Grandmaster Adversarial & Multi-Hop Reasoning Benchmark
// Ultra-complex questions: multi-hop causal reasoning, anachronism traps, metaphorical phrasing, double negations
import fs from 'fs';
import { CHARACTERS } from './src/characterBank.js';
import { evaluateQuestion } from './src/searchEngine.js';

const getChar = (name) => CHARACTERS.find(c => c.name.toLowerCase() === name.toLowerCase());
const level2Batteries = {};

function addLevel2(cat, list) {
  if (!level2Batteries[cat]) level2Batteries[cat] = [];
  level2Batteries[cat].push(...list);
}

// ==================== 1. ANIME & MANGA (LEVEL 2) ====================
addLevel2('Anime & Manga', [
  // Multi-hop causality
  { char: 'Edward Elric', q: 'Did their attempt to resurrect a deceased parent result in physical mutilation?', exp: 'YES', type: 'Causal' },
  { char: 'Light Yagami', q: 'Did their pursuit of crime eradication cause them to become a ruthless mass murderer?', exp: 'YES', type: 'Philosophical' },
  { char: 'Naruto Uzumaki', q: 'Were they ostracized in childhood because an ancient disaster was sealed in their abdomen?', exp: 'YES', type: 'Causal' },
  { char: 'Levi Ackerman', q: 'Did they witness their closest comrades get devoured in battle while fighting titans?', exp: 'YES', type: 'Lore' },
  { char: 'Son Goku', q: 'Did suffering severe head trauma as an infant alter their innate destructive programming?', exp: 'YES', type: 'Causal' },
  { char: 'Monkey D. Luffy', q: 'Did consuming a mystical fruit bestow stretching powers at the cost of ocean buoyancy?', exp: 'YES', type: 'Tradeoff' },
  { char: 'Saitama', q: 'Did eliminating all physical limitations result in total emotional numbness and hair loss?', exp: 'YES', type: 'Philosophical' },
  { char: 'Gojo Satoru', q: 'Does their ocular sensory overload require covering their eyes with a dark blindfold?', exp: 'YES', type: 'Sensory' },
  { char: 'Sailor Moon', q: 'Are they the reincarnated princess of an ancient fallen lunar kingdom?', exp: 'YES', type: 'Lore' },
  
  // Metaphorical & Indirect
  { char: 'Edward Elric', q: 'Do they possess a metal limb forged by a female childhood mechanic?', exp: 'YES', type: 'Indirect' },
  { char: 'Light Yagami', q: 'Is their weapon literally a paper notebook inscribed with human names?', exp: 'YES', type: 'LiteralItem' },
  { char: 'Naruto Uzumaki', q: 'Did their signature orange clothing stand out among stealthy shinobi assassins?', exp: 'YES', type: 'Attire' },
  { char: 'Levi Ackerman', q: 'Do they hold teacups exclusively by the porcelain rim rather than the handle?', exp: 'YES', type: 'Quirk' },
  { char: 'Son Goku', q: 'Do they have an insatiable monstrous appetite capable of bankrupting buffets?', exp: 'YES', type: 'Humor' },
  { char: 'Monkey D. Luffy', q: 'Do they value a piece of headwear woven from dried grass more than vast pirate gold?', exp: 'YES', type: 'Metaphor' },

  // Adversarial Traps & Double Negations
  { char: 'Edward Elric', q: 'Is it untrue that they possess two natural biological flesh arms?', exp: 'YES', type: 'DoubleNeg' },
  { char: 'Light Yagami', q: 'Do they lack any sense of moral remorse when eliminating police investigators?', exp: 'YES', type: 'MoralNeg' },
  { char: 'Naruto Uzumaki', q: 'Were they never adopted by their biological parents during infancy?', exp: 'YES', type: 'DoubleNeg' },
  { char: 'Levi Ackerman', q: 'Are they not a giant supernatural monster themselves?', exp: 'YES', type: 'DoubleNeg' },
  { char: 'Son Goku', q: 'Could they have lived in ancient Rome during the reign of Julius Caesar in canon?', exp: 'NO', type: 'Anachronism' },
  { char: 'Saitama', q: 'Do they struggle immensely in martial arts battles against human adversaries?', exp: 'NO', type: 'Adversarial' },
  { char: 'Gojo Satoru', q: 'Can an ordinary human blade easily pierce their infinite spatial barrier?', exp: 'NO', type: 'PowerBoundary' },
  { char: 'Monkey D. Luffy', q: 'Did they attend college to earn a business degree in maritime commerce?', exp: 'NO', type: 'Absurd' }
]);

// ==================== 2. MARVEL & DC (LEVEL 2) ====================
addLevel2('Marvel & DC Superheroes', [
  // Multi-hop causality & Moral dilemmas
  { char: 'Spider-Man', q: 'Did their failure to stop a fleeing thief directly lead to their uncle’s assassination?', exp: 'YES', type: 'Causal' },
  { char: 'Batman', q: 'Did witnessing a mugger shoot their wealthy parents in an alley birth their vigilante persona?', exp: 'YES', type: 'Causal' },
  { char: 'Iron Man', q: 'Did weapons manufactured by their own corporate empire nearly kill them in a foreign desert?', exp: 'YES', type: 'Causal' },
  { char: 'Superman', q: 'Did their biological parents rocket them into interstellar space before their homeworld exploded?', exp: 'YES', type: 'Causal' },
  { char: 'The Joker', q: 'Is their chemical immersion in a vat of industrial toxic waste linked to their bleached visage?', exp: 'YES', type: 'Origin' },
  { char: 'Thanos', q: 'Did watching their native civilization collapse into extinction ignite their cosmic culling philosophy?', exp: 'YES', type: 'Motive' },
  { char: 'Deadpool', q: 'Did an experimental weaponized cancer cure give them monstrous regenerative immortality?', exp: 'YES', type: 'Origin' },

  // Compound Equipment & Counterfactuals
  { char: 'Batman', q: 'If stripped of all their armor, billions, and gadgets, are they an ordinary mortal human?', exp: 'YES', type: 'Conditional' },
  { char: 'Iron Man', q: 'Without their powered exoskeleton suit, do they lack the biological ability to fly or lift tanks?', exp: 'YES', type: 'Conditional' },
  { char: 'Superman', q: 'Under a red dwarf sun devoid of yellow solar rays, do their godlike powers vanish?', exp: 'YES', type: 'Lore' },
  { char: 'Wonder Woman', q: 'Does their enchanted lasso compel even gods and immortals to speak absolute truth?', exp: 'YES', type: 'Weapon' },

  // Adversarial Negations & Impossible Combinations
  { char: 'Batman', q: 'Is it false that they possess innate biological flight like a bird or alien?', exp: 'YES', type: 'DoubleNeg' },
  { char: 'The Joker', q: 'Do they lack any lawful police or judicial authorization to punish citizens?', exp: 'YES', type: 'Negation' },
  { char: 'Spider-Man', q: 'Are they not a billionaire playboy who owns a multinational corporation?', exp: 'YES', type: 'Negation' },
  { char: 'Superman', q: 'Could an ordinary lead-lined container shield them from X-ray vision penetration?', exp: 'YES', type: 'Lore' },
  { char: 'Iron Man', q: 'Did they co-found the DC Justice League alongside Bruce Wayne?', exp: 'NO', type: 'CrossUniverse' },
  { char: 'Wonder Woman', q: 'Were they born in an urban maternity hospital in Detroit, Michigan?', exp: 'NO', type: 'Origin' },
  { char: 'Thanos', q: 'Did they surrender all Infinity Stones peacefully to retire as an elementary school teacher?', exp: 'NO', type: 'Absurd' }
]);

// ==================== 3. GAMING ICONS (LEVEL 2) ====================
addLevel2('Gaming Icons', [
  // Deep Lore & Causal
  { char: 'Link', q: 'Does their blade seal the darkness and banish the demonic incarnation Ganon?', exp: 'YES', type: 'Lore' },
  { char: 'Mario', q: 'Did they rescue Pauline from a giant barrel-throwing ape in their arcade debut?', exp: 'YES', type: 'History' },
  { char: 'Geralt of Rivia', q: 'Did consuming toxic alchemical mutagenic decoctions grant them cat-like slit pupils?', exp: 'YES', type: 'Biology' },
  { char: 'Kratos', q: 'Were they tricked by Ares into butchering their own wife and daughter in a temple?', exp: 'YES', type: 'Tragedy' },
  { char: 'Master Chief', q: 'Were they abducted as a six-year-old child and replaced with a short-lived flash clone?', exp: 'YES', type: 'DarkLore' },
  { char: 'Sonic the Hedgehog', q: 'Do they rescue innocent woodland critters trapped inside mechanized robotic badniks?', exp: 'YES', type: 'Gameplay' },
  { char: 'Pikachu', q: 'Do they store high-voltage bio-electrical currents inside expandable red cheek patches?', exp: 'YES', type: 'Anatomy' },

  // Conditionals & Negations
  { char: 'Link', q: 'Is it true they do not speak conversational voice-acted monologues in classic games?', exp: 'YES', type: 'DoubleNeg' },
  { char: 'Mario', q: 'Do they lack high-caliber military firearms, relying on jumping and fireballs?', exp: 'YES', type: 'Negation' },
  { char: 'Geralt of Rivia', q: 'Do they carry silver specifically for supernatural monsters and steel for mortal bandits?', exp: 'YES', type: 'Detail' },
  { char: 'Kratos', q: 'Is their pale skin tone caused by literal human crematorium ashes rather than genetic makeup?', exp: 'YES', type: 'Curse' },
  { char: 'Master Chief', q: 'Is their helmet virtually never removed on screen during mainline gameplay campaign missions?', exp: 'YES', type: 'Canon' },
  { char: 'Pikachu', q: 'Are they incapable of surviving outside an electronic computer mainframe?', exp: 'NO', type: 'False' },
  { char: 'Sonic the Hedgehog', q: 'Do they sink rapidly like a brick if they plunge into deep aquatic waters?', exp: 'YES', type: 'Mechanic' }
]);

// ==================== 4. MOVIES & TV ICONS (LEVEL 2) ====================
addLevel2('Movies & TV Icons', [
  // Complex Narrative & Causal
  { char: 'Walter White', q: 'Did an impending death sentence from malignant lung cancer motivate their empire building?', exp: 'YES', type: 'Motive' },
  { char: 'Walter White', q: 'Did they adopt the alias of a German Nobel laureate quantum physicist?', exp: 'YES', type: 'Trivia' },
  { char: 'Darth Vader', q: 'Did manipulation by a galactic chancellor convince them to betray the Jedi Order?', exp: 'YES', type: 'Causal' },
  { char: 'Darth Vader', q: 'Did they personally sever the hand of their biological son on Cloud City?', exp: 'YES', type: 'Lore' },
  { char: 'Sherlock Holmes', q: 'Did they fake their own death at the plunging precipice of Reichenbach Falls?', exp: 'YES', type: 'Milestone' },
  { char: 'Harry Potter', q: 'Did their mother’s sacrificial protective ancient magic save them from an unforgivable curse?', exp: 'YES', type: 'Lore' },
  { char: 'Captain Jack Sparrow', q: 'Did they barter their immortal soul to Davy Jones in exchange for the Black Pearl?', exp: 'YES', type: 'Bargain' },

  // Adversarial & Negative
  { char: 'Walter White', q: 'Did they confess that they built their methamphetamine empire for their own ego rather than family?', exp: 'YES', type: 'Psychology' },
  { char: 'Darth Vader', q: 'Could they survive in an open oxygen atmosphere without their pressurized respirator suit?', exp: 'NO', type: 'Physiology' },
  { char: 'Sherlock Holmes', q: 'Do they lack an official license or employment badge from Scotland Yard?', exp: 'YES', type: 'Legal' },
  { char: 'Harry Potter', q: 'Were they born in an ancient Roman colony in the year 44 BC?', exp: 'NO', type: 'Anachronism' },
  { char: 'Captain Jack Sparrow', q: 'Are they a disciplined naval commodore who obeys the British admiralty code?', exp: 'NO', type: 'Alignment' }
]);

// ==================== 5. TECH TITANS (LEVEL 2) ====================
addLevel2('Tech Titans & Inventors', [
  // Industry & Historical
  { char: 'Steve Jobs', q: 'Did their exile from Apple in 1985 lead them to create NeXT computer and fund Pixar?', exp: 'YES', type: 'History' },
  { char: 'Alan Turing', q: 'Did their theoretical paper on computable numbers precede real physical programmable computers?', exp: 'YES', type: 'Theoretical' },
  { char: 'Elon Musk', q: 'Did they invest their early millions from PayPal into private spaceflight and electric transport?', exp: 'YES', type: 'Capital' },
  { char: 'Bill Gates', q: 'Did their company license MS-DOS to IBM without transferring copyright ownership in 1981?', exp: 'YES', type: 'Business' },
  { char: 'Mark Zuckerberg', q: 'Did their social network begin strictly limited to elite Ivy League university email addresses?', exp: 'YES', type: 'Origin' },

  // Counterfactual & Adversarial
  { char: 'Steve Jobs', q: 'Could they have sent an email from an iPad during the Great Depression in 1930?', exp: 'NO', type: 'Anachronism' },
  { char: 'Alan Turing', q: 'Were they officially awarded a royal pardon decades after their posthumous suicide?', exp: 'YES', type: 'Pardon' },
  { char: 'Bill Gates', q: 'Do they lack ownership of the world’s largest search engine Google?', exp: 'YES', type: 'Negation' },
  { char: 'Elon Musk', q: 'Did they write the complete programming code for the original Macintosh operating system?', exp: 'NO', type: 'FalseAttribution' },
  { char: 'Mark Zuckerberg', q: 'Are they a biological alien who fell to Earth in an explosive spaceship?', exp: 'NO', type: 'Absurd' }
]);

// ==================== 6. SCIENTISTS & GREAT MINDS (LEVEL 2) ====================
addLevel2('Scientists & Great Minds', [
  // Scientific Landmarks & Deep Facts
  { char: 'Albert Einstein', q: 'Did their paper on Brownian motion provide decisive empirical proof for atomic theory?', exp: 'YES', type: 'Science' },
  { char: 'Albert Einstein', q: 'Did they refuse the official offer to become the second President of the State of Israel?', exp: 'YES', type: 'History' },
  { char: 'Isaac Newton', q: 'Did an apple falling in an orchard at Woolsthorpe Manor inspire their gravitational query?', exp: 'YES', type: 'Folklore' },
  { char: 'Isaac Newton', q: 'Did they spend substantial secret years writing treatise papers on biblical alchemy and chronology?', exp: 'YES', type: 'Esoteric' },
  { char: 'Marie Curie', q: 'Are their original research notebooks and lab papers still radioactive to handle over a century later?', exp: 'YES', type: 'Radiation' },
  { char: 'Marie Curie', q: 'Did they name the newly discovered element polonium after their native occupied homeland Poland?', exp: 'YES', type: 'Patriotism' },
  { char: 'Nikola Tesla', q: 'Did they illuminate the 1893 World’s Columbian Exposition in Chicago using alternating current?', exp: 'YES', type: 'Historic' },
  { char: 'Nikola Tesla', q: 'Did they build a gigantic wooden laboratory in Colorado Springs to transmit wireless power?', exp: 'YES', type: 'Wireless' },

  // Anachronisms & Negations
  { char: 'Isaac Newton', q: 'Could they have ridden in an electric Tesla Model S automobile during their life?', exp: 'NO', type: 'Anachronism' },
  { char: 'Marie Curie', q: 'Did they win three Nobel Prizes in literature and poetry?', exp: 'NO', type: 'False' },
  { char: 'Albert Einstein', q: 'Do they lack an Olympic gold medal in the hundred-meter sprint?', exp: 'YES', type: 'Negation' }
]);

// ==================== 7. HISTORICAL LEADERS (LEVEL 2) ====================
addLevel2('Historical Leaders', [
  // Political & Causal
  { char: 'Julius Caesar', q: 'Did their refusal to disband their 13th Legion before crossing the river Rubicon trigger war?', exp: 'YES', type: 'Rubicon' },
  { char: 'Julius Caesar', q: 'Did Roman senators conspire to stab them twenty-three times under the statue of Pompey?', exp: 'YES', type: 'Assassination' },
  { char: 'Abraham Lincoln', q: 'Did their election victory in November 1860 prompt seven Southern states to secede from the Union?', exp: 'YES', type: 'Secession' },
  { char: 'Abraham Lincoln', q: 'Did their assassin John Wilkes Booth shout "Sic semper tyrannis" after firing the pistol?', exp: 'YES', type: 'Booth' },
  { char: 'Mahatma Gandhi', q: 'Did they walk 240 miles to the coastal village of Dandi to produce tax-free ocean salt?', exp: 'YES', type: 'Dandi' },
  { char: 'Napoleon Bonaparte', q: 'Did their retreat from a burning Moscow in winter decimate their Grande Armée?', exp: 'YES', type: 'Russia' },
  { char: 'Napoleon Bonaparte', q: 'Did the Duke of Wellington command the allied coalition that ended their rule at Waterloo?', exp: 'YES', type: 'Waterloo' },

  // Negations & Anachronisms
  { char: 'Julius Caesar', q: 'Did they listen to the Beatles play rock music in ancient Rome?', exp: 'NO', type: 'Anachronism' },
  { char: 'Abraham Lincoln', q: 'Did they possess a personal smartphone with access to Wikipedia?', exp: 'NO', type: 'Anachronism' },
  { char: 'Mahatma Gandhi', q: 'Did they lead an army of mechanized battle tanks across the English Channel?', exp: 'NO', type: 'Absurd' },
  { char: 'Napoleon Bonaparte', q: 'Are they a fictional comic character owned by Marvel Comics?', exp: 'NO', type: 'False' }
]);

// ==================== 8. SPORTS LEGENDS (LEVEL 2) ====================
addLevel2('Sports Legends', [
  // Deep Career Trivia & Nuance
  { char: 'Lionel Messi', q: 'Did they score 91 official goals in a single calendar year in 2012 breaking Gerd Müller’s record?', exp: 'YES', type: 'Record' },
  { char: 'Lionel Messi', q: 'Did they lift the World Cup trophy in Qatar wearing a ceremonial black bisht cloak?', exp: 'YES', type: 'Iconic' },
  { char: 'Cristiano Ronaldo', q: 'Did they score a bicycle kick in Turin against Juventus that earned a standing ovation from home fans?', exp: 'YES', type: 'Bicycle' },
  { char: 'Cristiano Ronaldo', q: 'Have they scored over 850 competitive career goals across sporting continents?', exp: 'YES', type: 'Stats' },
  { char: 'Michael Jordan', q: 'Did they switch to jersey number 45 upon returning from professional baseball in 1995?', exp: 'YES', type: 'Number45' },
  { char: 'Michael Jordan', q: 'Did their "Flu Game" in the 1997 NBA Finals cement their legendary competitive resolve?', exp: 'YES', type: 'FluGame' },
  { char: 'Usain Bolt', q: 'Did they celebrate by uncoupling their golden sprinting spikes at the Beijing and London Olympics?', exp: 'YES', type: 'Spikes' },

  // Negations
  { char: 'Lionel Messi', q: 'Do they lack an Olympic gold medal in sprinting track and field?', exp: 'YES', type: 'CrossNeg' },
  { char: 'Cristiano Ronaldo', q: 'Have they never played competitive basketball for the Boston Celtics?', exp: 'YES', type: 'CrossNeg' },
  { char: 'Michael Jordan', q: 'Did they spend their athletic career as a Formula 1 racecar driver for McLaren?', exp: 'NO', type: 'False' }
]);

// ==================== 9. MUSIC LEGENDS (LEVEL 2) ====================
addLevel2('Music Legends', [
  // Historic Milestones & Artistry
  { char: 'Michael Jackson', q: 'Did their Motown 25 television performance of Billie Jean debut the Moonwalk to 47 million viewers?', exp: 'YES', type: 'Moonwalk' },
  { char: 'Michael Jackson', q: 'Did they co-write the global charity anthem We Are the World with Lionel Richie?', exp: 'YES', type: 'Charity' },
  { char: 'Freddie Mercury', q: 'Did their performance at Live Aid feature the immortal crowd singalong "Ay-Oh"?', exp: 'YES', type: 'LiveAid' },
  { char: 'Freddie Mercury', q: 'Did they record an opera duet album Barcelona with soprano Montserrat Caballé?', exp: 'YES', type: 'Opera' },
  { char: 'Taylor Swift', q: 'Did they re-record their early studio albums with the subtitle "Taylor’s Version" to own master rights?', exp: 'YES', type: 'TaylorsVersion' },
  { char: 'Taylor Swift', q: 'Did their 2023–2024 Eras Tour become the first concert tour in history to gross over one billion dollars?', exp: 'YES', type: 'BillionTour' },

  // Negations & Traps
  { char: 'Michael Jackson', q: 'Did they play defensive tackle for the Dallas Cowboys in the Super Bowl?', exp: 'NO', type: 'False' },
  { char: 'Freddie Mercury', q: 'Are they an alien warrior from Krypton who shoots heat rays from their eyes?', exp: 'NO', type: 'False' },
  { char: 'Taylor Swift', q: 'Were they a 19th-century French general defeated at the Battle of Waterloo?', exp: 'NO', type: 'False' }
]);

// ==================== 10. ADVERSARIAL MULTI-HOP (LEVEL 2) ====================
addLevel2('Adversarial & Multi-Hop Traps', [
  // Double & Triple Negation Logic
  { char: 'Batman', q: 'Is it inaccurate to claim that they are devoid of an immense fortune?', exp: 'YES', type: 'TripleNeg' },
  { char: 'Steve Jobs', q: 'Is it false that they completed a four-year doctoral degree at Stanford?', exp: 'YES', type: 'DoubleNeg' },
  { char: 'Albert Einstein', q: 'Is it untrue that they were awarded a Nobel Prize for scientific discovery?', exp: 'YES', type: 'DoubleNeg' },
  { char: 'Superman', q: 'Is it false that their biological home planet Krypton was completely destroyed?', exp: 'YES', type: 'DoubleNeg' },
  { char: 'Naruto Uzumaki', q: 'Is it untrue that they grew up with a nine-tailed beast inside their body?', exp: 'YES', type: 'DoubleNeg' },
  
  // Cross-Era Anachronism
  { char: 'Julius Caesar', q: 'Could they have chatted on WhatsApp with Napoleon Bonaparte?', exp: 'NO', type: 'Anachronism' },
  { char: 'Abraham Lincoln', q: 'Could they have driven a Tesla Cybertruck through Washington D.C.?', exp: 'NO', type: 'Anachronism' },
  { char: 'Isaac Newton', q: 'Could they have watched Michael Jordan play basketball in the 1990s?', exp: 'NO', type: 'Anachronism' },
  { char: 'Marie Curie', q: 'Could they have streamed Taylor Swift songs on Spotify in the laboratory?', exp: 'NO', type: 'Anachronism' },
  { char: 'Freddie Mercury', q: 'Could they have commanded Roman legions against Celtic warriors?', exp: 'NO', type: 'Anachronism' }
]);

// Run Grandmaster Evaluation
console.log('================================================================================');
console.log('    REVERSE AKINATOR - GRANDMASTER LEVEL 2 BENCHMARK EVALUATION                ');
console.log('    (Multi-Hop Causal, Anachronisms, Metaphors, Double Negations)               ');
console.log('================================================================================\n');

let totalL2 = 0;
let passL2 = 0;
let failL2 = 0;
const l2Summaries = [];
const l2Failures = [];

for (const [catName, tests] of Object.entries(level2Batteries)) {
  let catPass = 0;
  let catFail = 0;

  for (const t of tests) {
    totalL2++;
    const character = getChar(t.char);
    if (!character) {
      console.error(`Character not found: ${t.char}`);
      continue;
    }

    const res = evaluateQuestion(t.q, character, null);
    const success = res.type === t.exp;

    if (success) {
      catPass++;
      passL2++;
    } else {
      catFail++;
      failL2++;
      const item = {
        category: catName,
        character: t.char,
        question: t.q,
        expected: t.exp,
        got: res.type,
        commentary: res.commentary,
        type: t.type
      };
      l2Failures.push(item);
    }
  }

  const rate = Math.round((catPass / tests.length) * 100);
  const icon = rate >= 90 ? '✅' : (rate >= 75 ? '⚠️' : '❌');
  console.log(`${icon} ${catName.padEnd(32)} | Tests: ${String(tests.length).padStart(2)} | Passed: ${String(catPass).padStart(2)} | Failed: ${String(catFail).padStart(2)} | Accuracy: ${rate}%`);
}

console.log('\n================================================================================');
console.log(`GRANDMASTER LEVEL 2 TOTAL: Passed ${passL2} / ${totalL2} (${Math.round((passL2 / totalL2) * 100)}%) | Failed: ${failL2}`);
console.log('================================================================================\n');

fs.writeFileSync('benchmark_level2_results.json', JSON.stringify({
  totalL2,
  passL2,
  failL2,
  accuracy: `${Math.round((passL2 / totalL2) * 100)}%`,
  l2Failures
}, null, 2));

if (l2Failures.length > 0) {
  console.log(`--- FAILURES BREAKDOWN (${l2Failures.length} total) ---`);
  l2Failures.forEach((f, i) => {
    console.log(`${i + 1}. [${f.category}] ${f.character} (${f.type}):`);
    console.log(`   Q: "${f.question}"`);
    console.log(`   Expected: ${f.expected}, Got: ${f.got}`);
    console.log(`   Response: "${f.commentary}"\n`);
  });
}
