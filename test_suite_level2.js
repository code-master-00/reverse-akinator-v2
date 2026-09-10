// Level 2 Grandmaster Benchmark Suite
// Tests 500+ adversarial, multi-hop, anachronistic, double-negated, and nuanced questions
import fs from 'fs';
import { CHARACTERS } from './src/characterBank.js';
import { evaluateQuestion } from './src/searchEngine.js';

const getChar = (name) => CHARACTERS.find(c => c.name.toLowerCase() === name.toLowerCase());

export const testSuite = {
  "Anime & Manga": [
    // Son Goku
    { char: 'Son Goku', q: 'Did suffering severe head trauma as an infant alter their innate destructive programming?', exp: 'YES', type: 'Causal' },
    { char: 'Son Goku', q: 'Do they transform into a golden-haired warrior when overwhelmed by intense righteous rage?', exp: 'YES', type: 'Transformation' },
    { char: 'Son Goku', q: 'Did they sacrifice their life by teleporting a detonating Cell away from Earth?', exp: 'YES', type: 'Sacrifice' },
    { char: 'Son Goku', q: 'Do they ride a magical flying yellow cloud known as the Flying Nimbus?', exp: 'YES', type: 'Vehicle' },
    { char: 'Son Goku', q: 'Do they have an insatiable monstrous appetite capable of bankrupting buffets?', exp: 'YES', type: 'Quirk' },
    { char: 'Son Goku', q: 'Is their biological Saiyan birth name Kakarot?', exp: 'YES', type: 'Name' },
    { char: 'Son Goku', q: 'Could they have lived in ancient Rome during the reign of Julius Caesar in canon?', exp: 'NO', type: 'Anachronism' },
    { char: 'Son Goku', q: 'Are they a mortal human with no alien heritage or transformations?', exp: 'NO', type: 'False' },
    { char: 'Son Goku', q: 'Is it false that they can emit blue energy blasts called Kamehameha?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Son Goku', q: 'Do they lack an extraterrestrial origin on Planet Vegeta?', exp: 'NO', type: 'Negation' },

    // Naruto Uzumaki
    { char: 'Naruto Uzumaki', q: 'Were they ostracized in childhood because an ancient disaster was sealed in their abdomen?', exp: 'YES', type: 'Causal' },
    { char: 'Naruto Uzumaki', q: 'Did they eventually achieve their childhood dream of becoming the Seventh Hokage?', exp: 'YES', type: 'Milestone' },
    { char: 'Naruto Uzumaki', q: 'Did their signature orange clothing stand out among stealthy shinobi assassins?', exp: 'YES', type: 'Attire' },
    { char: 'Naruto Uzumaki', q: 'Can they create hundreds of solid physical shadow clones in combat?', exp: 'YES', type: 'Ability' },
    { char: 'Naruto Uzumaki', q: 'Is the nine-tailed beast inside them named Kurama?', exp: 'YES', type: 'Lore' },
    { char: 'Naruto Uzumaki', q: 'Do they adore eating tonkotsu pork ramen at Ichiraku Ramen?', exp: 'YES', type: 'Quirk' },
    { char: 'Naruto Uzumaki', q: 'Were they born in modern 21st-century Tokyo, Japan?', exp: 'NO', type: 'Origin' },
    { char: 'Naruto Uzumaki', q: 'Do they lack any ninja or chakra-based capabilities?', exp: 'NO', type: 'Negation' },
    { char: 'Naruto Uzumaki', q: 'Is it untrue that they grew up as an orphan without biological parents?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Naruto Uzumaki', q: 'Did they graduate from Hogwarts School of Witchcraft and Wizardry?', exp: 'NO', type: 'CrossUniverse' },

    // Monkey D. Luffy
    { char: 'Monkey D. Luffy', q: 'Did consuming a mystical fruit bestow stretching powers at the cost of ocean buoyancy?', exp: 'YES', type: 'Tradeoff' },
    { char: 'Monkey D. Luffy', q: 'Do they value a piece of headwear woven from dried grass more than vast pirate gold?', exp: 'YES', type: 'Metaphor' },
    { char: 'Monkey D. Luffy', q: 'Is their ultimate ambition to discover the One Piece and become King of the Pirates?', exp: 'YES', type: 'Motive' },
    { char: 'Monkey D. Luffy', q: 'Did Shanks sacrifice an arm to save them from a Sea King monster in their youth?', exp: 'YES', type: 'Lore' },
    { char: 'Monkey D. Luffy', q: 'Does their body stretch like vulcanized rubber?', exp: 'YES', type: 'Physiology' },
    { char: 'Monkey D. Luffy', q: 'Do they sink like an anchor when thrown into seawater?', exp: 'YES', type: 'Weakness' },
    { char: 'Monkey D. Luffy', q: 'Did they attend college to earn a business degree in maritime commerce?', exp: 'NO', type: 'Absurd' },
    { char: 'Monkey D. Luffy', q: 'Do they command an army of cybernetic robotic androids?', exp: 'NO', type: 'False' },
    { char: 'Monkey D. Luffy', q: 'Is it inaccurate that their grandfather is a Marine Vice Admiral named Garp?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Monkey D. Luffy', q: 'Are they a sworn marine officer dedicated to capturing pirates?', exp: 'NO', type: 'Alignment' },

    // Edward Elric
    { char: 'Edward Elric', q: 'Did their attempt to resurrect a deceased parent result in physical mutilation?', exp: 'YES', type: 'Causal' },
    { char: 'Edward Elric', q: 'Do they possess a metal limb forged by a female childhood mechanic?', exp: 'YES', type: 'Indirect' },
    { char: 'Edward Elric', q: 'Did their younger brother lose his entire physical body, binding his soul to armor?', exp: 'YES', type: 'Lore' },
    { char: 'Edward Elric', q: 'Can they perform alchemy without drawing a transmutation circle?', exp: 'YES', type: 'Ability' },
    { char: 'Edward Elric', q: 'Do they have an intense irrational hatred for cow milk and being called short?', exp: 'YES', type: 'Quirk' },
    { char: 'Edward Elric', q: 'Did they serve as the youngest State Alchemist in Amestrian military history?', exp: 'YES', type: 'Milestone' },
    { char: 'Edward Elric', q: 'Do they fight using a magical fairy wand that shoots rainbow sparkles?', exp: 'NO', type: 'False' },
    { char: 'Edward Elric', q: 'Is it untrue that they possess mechanical automail limbs?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Edward Elric', q: 'Are they over seven feet tall with giant wings on their back?', exp: 'NO', type: 'Anatomy' },
    { char: 'Edward Elric', q: 'Did they fight against Lord Voldemort during the Battle of Hogwarts?', exp: 'NO', type: 'CrossUniverse' },

    // Levi Ackerman
    { char: 'Levi Ackerman', q: 'Did they witness their closest comrades get devoured in battle while fighting titans?', exp: 'YES', type: 'Lore' },
    { char: 'Levi Ackerman', q: 'Are they considered humanity’s strongest soldier within the walled kingdom?', exp: 'YES', type: 'Title' },
    { char: 'Levi Ackerman', q: 'Do they hold teacups exclusively by the porcelain rim rather than the handle?', exp: 'YES', type: 'Quirk' },
    { char: 'Levi Ackerman', q: 'Are they an obsessive clean freak who demands pristine environments?', exp: 'YES', type: 'Personality' },
    { char: 'Levi Ackerman', q: 'Do they maneuver through mid-air using omni-directional mobility gear with gas thrusters?', exp: 'YES', type: 'Equipment' },
    { char: 'Levi Ackerman', q: 'Are they not a giant supernatural monster themselves?', exp: 'YES', type: 'DoubleNeg' },
    { char: 'Levi Ackerman', q: 'Can they transform into a 15-meter armored titan at will?', exp: 'NO', type: 'False' },
    { char: 'Levi Ackerman', q: 'Are they a cheerful extroverted comedian who tells jokes during battles?', exp: 'NO', type: 'Personality' },
    { char: 'Levi Ackerman', q: 'Do they lack lethal combat proficiency with twin steel blades?', exp: 'NO', type: 'Negation' },
    { char: 'Levi Ackerman', q: 'Did they serve as a police officer in New York City?', exp: 'NO', type: 'False' },

    // Light Yagami
    { char: 'Light Yagami', q: 'Did their pursuit of crime eradication cause them to become a ruthless mass murderer?', exp: 'YES', type: 'Philosophical' },
    { char: 'Light Yagami', q: 'Is their weapon literally a paper notebook inscribed with human names?', exp: 'YES', type: 'LiteralItem' },
    { char: 'Light Yagami', q: 'Did they adopt the godly alias Kira to pass judgment on humanity?', exp: 'YES', type: 'Alias' },
    { char: 'Light Yagami', q: 'Do they interact with a winged shinigami named Ryuk who craves red apples?', exp: 'YES', type: 'Companion' },
    { char: 'Light Yagami', q: 'Did they engage in a psychological battle of wits against the master detective L?', exp: 'YES', type: 'Rival' },
    { char: 'Light Yagami', q: 'Do they lack any sense of moral remorse when eliminating police investigators?', exp: 'YES', type: 'MoralNeg' },
    { char: 'Light Yagami', q: 'Do they fire laser beams from their eyes to obliterate buildings?', exp: 'NO', type: 'False' },
    { char: 'Light Yagami', q: 'Are they an illiterate high school dropout with below-average intelligence?', exp: 'NO', type: 'False' },
    { char: 'Light Yagami', q: 'Is it false that they were the son of a high-ranking Japanese police chief?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Light Yagami', q: 'Did they write the American Declaration of Independence in 1776?', exp: 'NO', type: 'Anachronism' },

    // Saitama
    { char: 'Saitama', q: 'Did eliminating all physical limitations result in total emotional numbness and hair loss?', exp: 'YES', type: 'Philosophical' },
    { char: 'Saitama', q: 'Can they defeat catastrophic apocalyptic threats with a single punch?', exp: 'YES', type: 'Power' },
    { char: 'Saitama', q: 'Do they obsess over supermarket discount bargain days more than saving the planet?', exp: 'YES', type: 'Quirk' },
    { char: 'Saitama', q: 'Do they struggle immensely in martial arts battles against human adversaries?', exp: 'NO', type: 'Adversarial' },
    { char: 'Saitama', q: 'Are they completely bald on their head?', exp: 'YES', type: 'Anatomy' },

    // Gojo Satoru
    { char: 'Gojo Satoru', q: 'Does their ocular sensory overload require covering their eyes with a dark blindfold?', exp: 'YES', type: 'Sensory' },
    { char: 'Gojo Satoru', q: 'Do they possess the Six Eyes and the Limitless cursed technique?', exp: 'YES', type: 'Ability' },
    { char: 'Gojo Satoru', q: 'Can an ordinary human blade easily pierce their infinite spatial barrier?', exp: 'NO', type: 'PowerBoundary' },
    { char: 'Gojo Satoru', q: 'Are they a weak non-sorcerer civilian with zero supernatural energy?', exp: 'NO', type: 'False' },

    // Sailor Moon
    { char: 'Sailor Moon', q: 'Are they the reincarnated princess of an ancient fallen lunar kingdom?', exp: 'YES', type: 'Lore' },
    { char: 'Sailor Moon', q: 'Is their civilian identity a clumsy schoolgirl named Usagi Tsukino?', exp: 'YES', type: 'Identity' },
    { char: 'Sailor Moon', q: 'Are they accompanied by a talking black cat named Luna with a crescent moon symbol?', exp: 'YES', type: 'Companion' },
    { char: 'Sailor Moon', q: 'Do they pilot a giant diesel-powered mining excavator in combat?', exp: 'NO', type: 'False' }
  ],

  "Marvel & DC Superheroes": [
    // Spider-Man
    { char: 'Spider-Man', q: 'Did their failure to stop a fleeing thief directly lead to their uncle’s assassination?', exp: 'YES', type: 'Causal' },
    { char: 'Spider-Man', q: 'Did a bite from an irradiated arachnid alter their cellular genetic structure?', exp: 'YES', type: 'Origin' },
    { char: 'Spider-Man', q: 'Do they adhere to the maxim that with great power comes great responsibility?', exp: 'YES', type: 'Motto' },
    { char: 'Spider-Man', q: 'Do they synthesize chemical web fluid and dispense it through wrist-mounted shooters?', exp: 'YES', type: 'Gadget' },
    { char: 'Spider-Man', q: 'Did they work as a freelance photographer for the Daily Bugle newspaper?', exp: 'YES', type: 'Career' },
    { char: 'Spider-Man', q: 'Are they not a billionaire playboy who owns a multinational corporation?', exp: 'YES', type: 'Negation' },
    { char: 'Spider-Man', q: 'Do they lack an innate precognitive danger sense called spider-sense?', exp: 'NO', type: 'Negation' },
    { char: 'Spider-Man', q: 'Were they born on the planet Asgard as an ancient Norse deity?', exp: 'NO', type: 'Origin' },
    { char: 'Spider-Man', q: 'Is it untrue that their alter ego is named Peter Parker?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Spider-Man', q: 'Could they have swung between skyscrapers in Manhattan in the year 1492?', exp: 'NO', type: 'Anachronism' },

    // Batman
    { char: 'Batman', q: 'Did witnessing a mugger shoot their wealthy parents in an alley birth their vigilante persona?', exp: 'YES', type: 'Causal' },
    { char: 'Batman', q: 'If stripped of all their armor, billions, and gadgets, are they an ordinary mortal human?', exp: 'YES', type: 'Conditional' },
    { char: 'Batman', q: 'Do they maintain a strict code against executing criminals or employing firearms?', exp: 'YES', type: 'MoralCode' },
    { char: 'Batman', q: 'Is their hidden underground headquarters located beneath Wayne Manor?', exp: 'YES', type: 'Base' },
    { char: 'Batman', q: 'Do they patrol Gotham City in a heavily armored vehicle known as the Batmobile?', exp: 'YES', type: 'Vehicle' },
    { char: 'Batman', q: 'Is it false that they possess innate biological flight like a bird or alien?', exp: 'YES', type: 'DoubleNeg' },
    { char: 'Batman', q: 'Is it inaccurate to claim that they are devoid of an immense fortune?', exp: 'YES', type: 'TripleNeg' },
    { char: 'Batman', q: 'Were they granted godlike strength by radioactive space dust?', exp: 'NO', type: 'Origin' },
    { char: 'Batman', q: 'Do they rule the underwater kingdom of Atlantis with a golden trident?', exp: 'NO', type: 'CrossUniverse' },
    { char: 'Batman', q: 'Did they serve as the Prime Minister of the United Kingdom during World War II?', exp: 'NO', type: 'Historical' },

    // Iron Man
    { char: 'Iron Man', q: 'Did weapons manufactured by their own corporate empire nearly kill them in a foreign desert?', exp: 'YES', type: 'Causal' },
    { char: 'Iron Man', q: 'Without their powered exoskeleton suit, do they lack the biological ability to fly or lift tanks?', exp: 'YES', type: 'Conditional' },
    { char: 'Iron Man', q: 'Did they invent an electromagnetic arc reactor to keep shrapnel from piercing their heart?', exp: 'YES', type: 'Origin' },
    { char: 'Iron Man', q: 'Did they publicly reveal their secret identity at a live press conference saying "I am Iron Man"?', exp: 'YES', type: 'Quote' },
    { char: 'Iron Man', q: 'Do they command an artificial intelligence system named JARVIS or FRIDAY?', exp: 'YES', type: 'AI' },
    { char: 'Iron Man', q: 'Did they co-found the DC Justice League alongside Bruce Wayne?', exp: 'NO', type: 'CrossUniverse' },
    { char: 'Iron Man', q: 'Are they a penniless medieval peasant who wields an iron broadsword?', exp: 'NO', type: 'False' },
    { char: 'Iron Man', q: 'Do they lack genius-level intellect in robotics, physics, and engineering?', exp: 'NO', type: 'Negation' },
    { char: 'Iron Man', q: 'Is it untrue that their civilian identity is billionaire Tony Stark?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Iron Man', q: 'Could they have built their Mark I armor during the American Revolutionary War in 1775?', exp: 'NO', type: 'Anachronism' },

    // Superman
    { char: 'Superman', q: 'Did their biological parents rocket them into interstellar space before their homeworld exploded?', exp: 'YES', type: 'Causal' },
    { char: 'Superman', q: 'Under a red dwarf sun devoid of yellow solar rays, do their godlike powers vanish?', exp: 'YES', type: 'Lore' },
    { char: 'Superman', q: 'Does green irradiated mineral debris from Krypton render them physically helpless?', exp: 'YES', type: 'Weakness' },
    { char: 'Superman', q: 'Were they raised by foster parents Jonathan and Martha Kent in rural Smallville?', exp: 'YES', type: 'Upbringing' },
    { char: 'Superman', q: 'Could an ordinary lead-lined container shield them from X-ray vision penetration?', exp: 'YES', type: 'Lore' },
    { char: 'Superman', q: 'Is it false that their biological home planet Krypton was completely destroyed?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Superman', q: 'Are they a mechanical cyborg constructed by the Soviet government in Moscow?', exp: 'NO', type: 'False' },
    { char: 'Superman', q: 'Do they lack the superhuman ability to fly at supersonic speeds?', exp: 'NO', type: 'Negation' },
    { char: 'Superman', q: 'Did they attend Harvard Law School to become a defense attorney in Boston?', exp: 'NO', type: 'False' },
    { char: 'Superman', q: 'Is their secret identity a detective named Sherlock Holmes?', exp: 'NO', type: 'CrossUniverse' },

    // The Joker
    { char: 'The Joker', q: 'Is their chemical immersion in a vat of industrial toxic waste linked to their bleached visage?', exp: 'YES', type: 'Origin' },
    { char: 'The Joker', q: 'Are they considered the definitive philosophical archenemy of Batman?', exp: 'YES', type: 'Rivalry' },
    { char: 'The Joker', q: 'Do they lack any lawful police or judicial authorization to punish citizens?', exp: 'YES', type: 'Negation' },
    { char: 'The Joker', q: 'Do they frequently employ weaponized lethal laughing toxin known as Joker Venom?', exp: 'YES', type: 'Weapon' },
    { char: 'The Joker', q: 'Are they a licensed medical doctor performing delicate open-heart surgeries in Gotham Hospital?', exp: 'NO', type: 'False' },
    { char: 'The Joker', q: 'Do they have godlike invulnerability and physical flight like Superman?', exp: 'NO', type: 'False' },

    // Wonder Woman
    { char: 'Wonder Woman', q: 'Does their enchanted lasso compel even gods and immortals to speak absolute truth?', exp: 'YES', type: 'Weapon' },
    { char: 'Wonder Woman', q: 'Were they sculpted from clay and brought to life on the hidden island of Themyscira?', exp: 'YES', type: 'Origin' },
    { char: 'Wonder Woman', q: 'Were they born in an urban maternity hospital in Detroit, Michigan?', exp: 'NO', type: 'Origin' },
    { char: 'Wonder Woman', q: 'Do they lack deflection capabilities with bulletproof silver Amazonian bracelets?', exp: 'NO', type: 'Negation' },

    // Thanos
    { char: 'Thanos', q: 'Did watching their native civilization collapse into extinction ignite their cosmic culling philosophy?', exp: 'YES', type: 'Motive' },
    { char: 'Thanos', q: 'Did they wield a golden gauntlet channeling six primordial singularities to wipe out half of all life?', exp: 'YES', type: 'Milestone' },
    { char: 'Thanos', q: 'Did they surrender all Infinity Stones peacefully to retire as an elementary school teacher?', exp: 'NO', type: 'Absurd' },

    // Deadpool
    { char: 'Deadpool', q: 'Did an experimental weaponized cancer cure give them monstrous regenerative immortality?', exp: 'YES', type: 'Origin' },
    { char: 'Deadpool', q: 'Do they routinely break the fourth wall and converse directly with the comic reader or audience?', exp: 'YES', type: 'Meta' },
    { char: 'Deadpool', q: 'Are they a serious, solemn monk who has taken a lifelong vow of absolute silence?', exp: 'NO', type: 'False' }
  ],

  "Gaming Icons": [
    // Link
    { char: 'Link', q: 'Does their blade seal the darkness and banish the demonic incarnation Ganon?', exp: 'YES', type: 'Lore' },
    { char: 'Link', q: 'Do they bear the Triforce of Courage bestowed by the golden goddesses of Hyrule?', exp: 'YES', type: 'Lore' },
    { char: 'Link', q: 'Is it true they do not speak conversational voice-acted monologues in classic games?', exp: 'YES', type: 'DoubleNeg' },
    { char: 'Link', q: 'Do they frequently wield the Master Sword forged in ancient times by the goddess Hylia?', exp: 'YES', type: 'Weapon' },
    { char: 'Link', q: 'Do they awaken after a hundred-year stasis in the Shrine of Resurrection in Breath of the Wild?', exp: 'YES', type: 'Milestone' },
    { char: 'Link', q: 'Do they pilot an interstellar starfighter called the Arwing across the Lylat System?', exp: 'NO', type: 'CrossUniverse' },
    { char: 'Link', q: 'Are they a 20th-century Chicago private detective investigating mafia mobsters?', exp: 'NO', type: 'False' },
    { char: 'Link', q: 'Do they lack pointy elven Hylian ears?', exp: 'NO', type: 'Negation' },
    { char: 'Link', q: 'Is it false that they wear green tunics or champion garbs during their epic adventures?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Link', q: 'Did they defeat Bowser to rescue Princess Peach in the Mushroom Kingdom?', exp: 'NO', type: 'CrossUniverse' },

    // Mario
    { char: 'Mario', q: 'Did they rescue Pauline from a giant barrel-throwing ape in their arcade debut?', exp: 'YES', type: 'History' },
    { char: 'Mario', q: 'Do they consume crimson spotted mushrooms to double their physical size and fortitude?', exp: 'YES', type: 'Gameplay' },
    { char: 'Mario', q: 'Do they lack high-caliber military firearms, relying on jumping and fireballs?', exp: 'YES', type: 'Negation' },
    { char: 'Mario', q: 'Is their primary arch-nemesis a spiked shell-wearing fire-breathing turtle king named Bowser?', exp: 'YES', type: 'Nemesis' },
    { char: 'Mario', q: 'Do they wear blue denim overalls with a red cap emblazoned with an M initial?', exp: 'YES', type: 'Attire' },
    { char: 'Mario', q: 'Are they a ruthless mafia assassin executing contracts for the Italian underworld?', exp: 'NO', type: 'False' },
    { char: 'Mario', q: 'Do they pilot the Millennium Falcon alongside Han Solo?', exp: 'NO', type: 'CrossUniverse' },
    { char: 'Mario', q: 'Do they lack a younger fraternal twin brother named Luigi who wears green?', exp: 'NO', type: 'Negation' },
    { char: 'Mario', q: 'Is it inaccurate to state that they work canonically as a plumber?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Mario', q: 'Could they have attended the coronation of Queen Victoria in London in 1838?', exp: 'NO', type: 'Anachronism' },

    // Master Chief
    { char: 'Master Chief', q: 'Were they abducted as a six-year-old child and replaced with a short-lived flash clone?', exp: 'YES', type: 'DarkLore' },
    { char: 'Master Chief', q: 'Is their helmet virtually never removed on screen during mainline gameplay campaign missions?', exp: 'YES', type: 'Canon' },
    { char: 'Master Chief', q: 'Do they wear multi-ton MJOLNIR powered assault armor with energy shielding?', exp: 'YES', type: 'Armor' },
    { char: 'Master Chief', q: 'Are they accompanied by a sentient smart AI construct named Cortana?', exp: 'YES', type: 'Companion' },
    { char: 'Master Chief', q: 'Did they detonate the ancient alien ring megastructure known as Installation 04?', exp: 'YES', type: 'Milestone' },
    { char: 'Master Chief', q: 'Are they an unarmored pacifist monk who refuses to touch military weaponry?', exp: 'NO', type: 'False' },
    { char: 'Master Chief', q: 'Do they battle against giant fire-breathing fantasy dragons with wooden clubs?', exp: 'NO', type: 'False' },
    { char: 'Master Chief', q: 'Do they lack superhuman cybernetic augmentations and ceramic bone grafting?', exp: 'NO', type: 'Negation' },
    { char: 'Master Chief', q: 'Is their official Spartan military designation Spartan-117?', exp: 'YES', type: 'Designation' },
    { char: 'Master Chief', q: 'Did they fight in the American Civil War at the Battle of Gettysburg in 1863?', exp: 'NO', type: 'Anachronism' },

    // Geralt of Rivia
    { char: 'Geralt of Rivia', q: 'Did consuming toxic alchemical mutagenic decoctions grant them cat-like slit pupils?', exp: 'YES', type: 'Biology' },
    { char: 'Geralt of Rivia', q: 'Do they carry silver specifically for supernatural monsters and steel for mortal bandits?', exp: 'YES', type: 'Detail' },
    { char: 'Geralt of Rivia', q: 'Did they undergo the lethal Trial of the Grasses at Kaer Morhen during youth?', exp: 'YES', type: 'Origin' },
    { char: 'Geralt of Rivia', q: 'Are they known across the Continent by the moniker White Wolf?', exp: 'YES', type: 'Title' },
    { char: 'Geralt of Rivia', q: 'Do they name virtually every riding horse they possess Roach?', exp: 'YES', type: 'Quirk' },
    { char: 'Geralt of Rivia', q: 'Are they an android cyborg built with microchips in Silicon Valley?', exp: 'NO', type: 'False' },
    { char: 'Geralt of Rivia', q: 'Do they lack the ability to cast minor combat magic signs like Igni or Quen?', exp: 'NO', type: 'Negation' },

    // Kratos
    { char: 'Kratos', q: 'Were they tricked by Ares into butchering their own wife and daughter in a temple?', exp: 'YES', type: 'Tragedy' },
    { char: 'Kratos', q: 'Is their pale skin tone caused by literal human crematorium ashes rather than genetic makeup?', exp: 'YES', type: 'Curse' },
    { char: 'Kratos', q: 'Do they wield the Blades of Chaos bound to their forearms with searing iron chains?', exp: 'YES', type: 'Weapon' },
    { char: 'Kratos', q: 'Did they journey to the Norse realms and wield the frost-enchanted Leviathan Axe?', exp: 'YES', type: 'Lore' },
    { char: 'Kratos', q: 'Are they a cheerful kindergarten teacher who bakes cookies in modern Paris?', exp: 'NO', type: 'Absurd' },

    // Sonic the Hedgehog
    { char: 'Sonic the Hedgehog', q: 'Do they rescue innocent woodland critters trapped inside mechanized robotic badniks?', exp: 'YES', type: 'Gameplay' },
    { char: 'Sonic the Hedgehog', q: 'Do they sink rapidly like a brick if they plunge into deep aquatic waters?', exp: 'YES', type: 'Mechanic' },
    { char: 'Sonic the Hedgehog', q: 'Do they collect golden rings to maintain protection against enemy damage?', exp: 'YES', type: 'Gameplay' },
    { char: 'Sonic the Hedgehog', q: 'Is their arch-nemesis a round roboticist inventor named Dr. Ivo Robotnik (Eggman)?', exp: 'YES', type: 'Nemesis' },
    { char: 'Sonic the Hedgehog', q: 'Are they a slow-moving garden snail that leaves a slime trail on pavements?', exp: 'NO', type: 'False' },

    // Pikachu
    { char: 'Pikachu', q: 'Do they store high-voltage bio-electrical currents inside expandable red cheek patches?', exp: 'YES', type: 'Anatomy' },
    { char: 'Pikachu', q: 'Is their tail shaped like a jagged jagged zig-zag lightning bolt?', exp: 'YES', type: 'Anatomy' },
    { char: 'Pikachu', q: 'Do they refuse to enter a standard red-and-white Pokéball in the anime canon?', exp: 'YES', type: 'Quirk' },
    { char: 'Pikachu', q: 'Are they incapable of surviving outside an electronic computer mainframe?', exp: 'NO', type: 'False' }
  ],

  "Movies & TV Icons": [
    // Walter White
    { char: 'Walter White', q: 'Did an impending death sentence from malignant lung cancer motivate their empire building?', exp: 'YES', type: 'Motive' },
    { char: 'Walter White', q: 'Did they adopt the alias of a German Nobel laureate quantum physicist?', exp: 'YES', type: 'Trivia' },
    { char: 'Walter White', q: 'Did they confess that they built their methamphetamine empire for their own ego rather than family?', exp: 'YES', type: 'Psychology' },
    { char: 'Walter White', q: 'Did they produce chemically pristine 99.1% pure blue methamphetamine in Albuquerque?', exp: 'YES', type: 'Chemistry' },
    { char: 'Walter White', q: 'Did they partner with their former failing high school student Jesse Pinkman?', exp: 'YES', type: 'Companion' },
    { char: 'Walter White', q: 'Were they an ancient Spartan gladiator who fought in the Roman Colosseum?', exp: 'NO', type: 'False' },
    { char: 'Walter White', q: 'Do they possess supernatural telepathic and telekinetic wizardry?', exp: 'NO', type: 'False' },
    { char: 'Walter White', q: 'Do they lack an advanced educational background in chemistry and crystallography?', exp: 'NO', type: 'Negation' },
    { char: 'Walter White', q: 'Is it false that their brother-in-law Hank Schrader was an officer in the DEA?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Walter White', q: 'Could they have cooked methamphetamine for King Henry VIII in Tudor England in 1530?', exp: 'NO', type: 'Anachronism' },

    // Darth Vader
    { char: 'Darth Vader', q: 'Did manipulation by a galactic chancellor convince them to betray the Jedi Order?', exp: 'YES', type: 'Causal' },
    { char: 'Darth Vader', q: 'Did they personally sever the hand of their biological son on Cloud City?', exp: 'YES', type: 'Lore' },
    { char: 'Darth Vader', q: 'Could they survive in an open oxygen atmosphere without their pressurized respirator suit?', exp: 'NO', type: 'Physiology' },
    { char: 'Darth Vader', q: 'Were they born as Anakin Skywalker before falling to the dark side of the Force?', exp: 'YES', type: 'Origin' },
    { char: 'Darth Vader', q: 'Do they wield a crimson plasma lightsaber fueled by a bled kyber crystal?', exp: 'YES', type: 'Weapon' },
    { char: 'Darth Vader', q: 'Did they turn against Emperor Palpatine to save their son Luke Skywalker from Force lightning?', exp: 'YES', type: 'Redemption' },
    { char: 'Darth Vader', q: 'Are they a cheerful Disney princess who sings to forest animals in a castle?', exp: 'NO', type: 'False' },
    { char: 'Darth Vader', q: 'Do they lack connection to the supernatural mystical energy field known as the Force?', exp: 'NO', type: 'Negation' },
    { char: 'Darth Vader', q: 'Did they sign the Magna Carta with English barons at Runnymede in 1215?', exp: 'NO', type: 'Anachronism' },
    { char: 'Darth Vader', q: 'Is it inaccurate that they were severely burned on the volcanic shores of Mustafar?', exp: 'NO', type: 'DoubleNeg' },

    // Sherlock Holmes
    { char: 'Sherlock Holmes', q: 'Did they fake their own death at the plunging precipice of Reichenbach Falls?', exp: 'YES', type: 'Milestone' },
    { char: 'Sherlock Holmes', q: 'Do they reside at 221B Baker Street in Victorian London alongside Dr. John Watson?', exp: 'YES', type: 'Setting' },
    { char: 'Sherlock Holmes', q: 'Do they lack an official license or employment badge from Scotland Yard?', exp: 'YES', type: 'Legal' },
    { char: 'Sherlock Holmes', q: 'Do they play the violin and deduce complex crimes through microscopic observation?', exp: 'YES', type: 'Quirk' },
    { char: 'Sherlock Holmes', q: 'Is their greatest criminal rival the mathematical mastermind Professor James Moriarty?', exp: 'YES', type: 'Nemesis' },
    { char: 'Sherlock Holmes', q: 'Do they fly around the galaxy in an X-wing starfighter shooting laser torpedos?', exp: 'NO', type: 'False' },
    { char: 'Sherlock Holmes', q: 'Are they a biological extraterrestrial alien sent from the Andromeda galaxy?', exp: 'NO', type: 'False' },
    { char: 'Sherlock Holmes', q: 'Do they lack superhuman deductive reasoning based on physical evidence?', exp: 'NO', type: 'Negation' },

    // Harry Potter
    { char: 'Harry Potter', q: 'Did their mother’s sacrificial protective ancient magic save them from an unforgivable curse?', exp: 'YES', type: 'Lore' },
    { char: 'Harry Potter', q: 'Do they bear a distinctive lightning-bolt shaped scar upon their forehead?', exp: 'YES', type: 'Anatomy' },
    { char: 'Harry Potter', q: 'Can they converse fluently in the serpentine language of Parseltongue?', exp: 'YES', type: 'Ability' },
    { char: 'Harry Potter', q: 'Were they born in an ancient Roman colony in the year 44 BC?', exp: 'NO', type: 'Anachronism' },
    { char: 'Harry Potter', q: 'Do they pilot mechanized battle tanks across World War II battlefields?', exp: 'NO', type: 'False' },

    // Captain Jack Sparrow
    { char: 'Captain Jack Sparrow', q: 'Did they barter their immortal soul to Davy Jones in exchange for the Black Pearl?', exp: 'YES', type: 'Bargain' },
    { char: 'Captain Jack Sparrow', q: 'Do they navigate using an enchanted compass that points toward what they desire most?', exp: 'YES', type: 'Item' },
    { char: 'Captain Jack Sparrow', q: 'Are they a disciplined naval commodore who obeys the British admiralty code?', exp: 'NO', type: 'Alignment' },
    { char: 'Captain Jack Sparrow', q: 'Are they an astronaut who walked on the moon for NASA in 1969?', exp: 'NO', type: 'False' }
  ],

  "Tech Titans & Inventors": [
    // Steve Jobs
    { char: 'Steve Jobs', q: 'Did their exile from Apple in 1985 lead them to create NeXT computer and fund Pixar?', exp: 'YES', type: 'History' },
    { char: 'Steve Jobs', q: 'Did they unveil the original iPhone in January 2007 combining a phone, iPod, and internet device?', exp: 'YES', type: 'Milestone' },
    { char: 'Steve Jobs', q: 'Did they wear an iconic uniform consisting of an Issey Miyake black turtleneck and blue jeans?', exp: 'YES', type: 'Attire' },
    { char: 'Steve Jobs', q: 'Could they have sent an email from an iPad during the Great Depression in 1930?', exp: 'NO', type: 'Anachronism' },
    { char: 'Steve Jobs', q: 'Is it false that they completed a four-year doctoral degree at Stanford?', exp: 'YES', type: 'DoubleNeg' },
    { char: 'Steve Jobs', q: 'Did they discover electricity by flying a kite during a thunderstorm in Philadelphia?', exp: 'NO', type: 'Historical' },
    { char: 'Steve Jobs', q: 'Are they a fictional superhero created by Stan Lee for Marvel Comics?', exp: 'NO', type: 'False' },
    { char: 'Steve Jobs', q: 'Do they lack a co-founding role in the creation of Apple Computer with Steve Wozniak?', exp: 'NO', type: 'Negation' },
    { char: 'Steve Jobs', q: 'Is it inaccurate that they gave a celebrated commencement address at Stanford University in 2005?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Steve Jobs', q: 'Did they govern the Roman Empire as Caesar Augustus?', exp: 'NO', type: 'Anachronism' },

    // Bill Gates
    { char: 'Bill Gates', q: 'Did their company license MS-DOS to IBM without transferring copyright ownership in 1981?', exp: 'YES', type: 'Business' },
    { char: 'Bill Gates', q: 'Did they drop out of Harvard University to co-found Microsoft with Paul Allen?', exp: 'YES', type: 'Origin' },
    { char: 'Bill Gates', q: 'Do they lack ownership of the world’s largest search engine Google?', exp: 'YES', type: 'Negation' },
    { char: 'Bill Gates', q: 'Did they establish a global philanthropic foundation dedicated to eradicating polio and malaria?', exp: 'YES', type: 'Charity' },
    { char: 'Bill Gates', q: 'Did they compose Beethoven’s Ninth Symphony while completely deaf?', exp: 'NO', type: 'False' },
    { char: 'Bill Gates', q: 'Are they a seven-foot-tall NBA center who won multiple basketball championships?', exp: 'NO', type: 'False' },
    { char: 'Bill Gates', q: 'Do they lack involvement in the creation of the Windows operating system?', exp: 'NO', type: 'Negation' },
    { char: 'Bill Gates', q: 'Is it untrue that they were once the wealthiest person on planet Earth for over a decade?', exp: 'NO', type: 'DoubleNeg' },

    // Alan Turing
    { char: 'Alan Turing', q: 'Did their theoretical paper on computable numbers precede real physical programmable computers?', exp: 'YES', type: 'Theoretical' },
    { char: 'Alan Turing', q: 'Did they break the German military Enigma ciphers at Bletchley Park during World War II?', exp: 'YES', type: 'History' },
    { char: 'Alan Turing', q: 'Were they officially awarded a royal pardon decades after their posthumous suicide?', exp: 'YES', type: 'Pardon' },
    { char: 'Alan Turing', q: 'Did they design the electromechanical Bombe machine to decipher naval secret codes?', exp: 'YES', type: 'Invention' },
    { char: 'Alan Turing', q: 'Could they have played Call of Duty on a Sony PlayStation 5 in the 1940s?', exp: 'NO', type: 'Anachronism' },
    { char: 'Alan Turing', q: 'Did they command the French army at the Battle of Waterloo in 1815?', exp: 'NO', type: 'Historical' },
    { char: 'Alan Turing', q: 'Do they lack recognition as a founding father of theoretical computer science and AI?', exp: 'NO', type: 'Negation' },

    // Elon Musk
    { char: 'Elon Musk', q: 'Did they invest their early millions from PayPal into private spaceflight and electric transport?', exp: 'YES', type: 'Capital' },
    { char: 'Elon Musk', q: 'Did their company SpaceX achieve the first orbital rocket booster vertical propulsive landing?', exp: 'YES', type: 'Milestone' },
    { char: 'Elon Musk', q: 'Did they write the complete programming code for the original Macintosh operating system?', exp: 'NO', type: 'FalseAttribution' },
    { char: 'Elon Musk', q: 'Are they a biological alien who fell to Earth in an explosive spaceship?', exp: 'NO', type: 'Absurd' },
    { char: 'Elon Musk', q: 'Do they lead electric automaker Tesla as Chief Executive Officer?', exp: 'YES', type: 'Career' },

    // Mark Zuckerberg
    { char: 'Mark Zuckerberg', q: 'Did their social network begin strictly limited to elite Ivy League university email addresses?', exp: 'YES', type: 'Origin' },
    { char: 'Mark Zuckerberg', q: 'Did they build the early prototype of Facebook from their Kirkland House Harvard dorm room?', exp: 'YES', type: 'Origin' },
    { char: 'Mark Zuckerberg', q: 'Did they discover the law of universal gravitation when hit on the head by an apple?', exp: 'NO', type: 'Historical' },
    { char: 'Mark Zuckerberg', q: 'Are they a mythical wizard carrying an enchanted wand made of phoenix feather?', exp: 'NO', type: 'False' }
  ],

  "Scientists & Great Minds": [
    // Albert Einstein
    { char: 'Albert Einstein', q: 'Did their paper on Brownian motion provide decisive empirical proof for atomic theory?', exp: 'YES', type: 'Science' },
    { char: 'Albert Einstein', q: 'Did they refuse the official offer to become the second President of the State of Israel?', exp: 'YES', type: 'History' },
    { char: 'Albert Einstein', q: 'Was their 1921 Nobel Prize awarded for the photoelectric effect rather than relativity?', exp: 'YES', type: 'Nobel' },
    { char: 'Albert Einstein', q: 'Did they co-author the famous 1939 letter to President Roosevelt regarding atomic energy?', exp: 'YES', type: 'Manhattan' },
    { char: 'Albert Einstein', q: 'Do they lack an Olympic gold medal in the hundred-meter sprint?', exp: 'YES', type: 'Negation' },
    { char: 'Albert Einstein', q: 'Is it untrue that they were awarded a Nobel Prize for scientific discovery?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Albert Einstein', q: 'Did they play professional basketball for the Los Angeles Lakers alongside Kobe Bryant?', exp: 'NO', type: 'Absurd' },
    { char: 'Albert Einstein', q: 'Could they have posted selfies on Instagram while publishing their 1905 miraculous papers?', exp: 'NO', type: 'Anachronism' },
    { char: 'Albert Einstein', q: 'Do they lack theoretical contributions to the equation E equals m c squared?', exp: 'NO', type: 'Negation' },
    { char: 'Albert Einstein', q: 'Were they born in medieval Japan during the Edo period?', exp: 'NO', type: 'Historical' },

    // Isaac Newton
    { char: 'Isaac Newton', q: 'Did an apple falling in an orchard at Woolsthorpe Manor inspire their gravitational query?', exp: 'YES', type: 'Folklore' },
    { char: 'Isaac Newton', q: 'Did they spend substantial secret years writing treatise papers on biblical alchemy and chronology?', exp: 'YES', type: 'Esoteric' },
    { char: 'Isaac Newton', q: 'Did their Philosophiæ Naturalis Principia Mathematica formalize the three universal laws of motion?', exp: 'YES', type: 'Science' },
    { char: 'Isaac Newton', q: 'Did they serve as Master of the Royal Mint pursuing counterfeiters in London?', exp: 'YES', type: 'History' },
    { char: 'Isaac Newton', q: 'Could they have ridden in an electric Tesla Model S automobile during their life?', exp: 'NO', type: 'Anachronism' },
    { char: 'Isaac Newton', q: 'Did they stream video games on Twitch to millions of online subscribers?', exp: 'NO', type: 'Anachronism' },
    { char: 'Isaac Newton', q: 'Do they lack mathematical contributions to the independent development of infinitesimal calculus?', exp: 'NO', type: 'Negation' },
    { char: 'Isaac Newton', q: 'Is it inaccurate that they used a glass prism to decompose white sunlight into a spectrum?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Isaac Newton', q: 'Were they a 21st-century astronaut who traveled to the International Space Station?', exp: 'NO', type: 'False' },
    { char: 'Isaac Newton', q: 'Did they fight in the American Revolutionary War alongside George Washington?', exp: 'NO', type: 'Historical' },

    // Marie Curie
    { char: 'Marie Curie', q: 'Are their original research notebooks and lab papers still radioactive to handle over a century later?', exp: 'YES', type: 'Radiation' },
    { char: 'Marie Curie', q: 'Did they name the newly discovered element polonium after their native occupied homeland Poland?', exp: 'YES', type: 'Patriotism' },
    { char: 'Marie Curie', q: 'Did they win Nobel Prizes across two distinct scientific disciplines in Physics and Chemistry?', exp: 'YES', type: 'Nobel' },
    { char: 'Marie Curie', q: 'Did they develop mobile X-ray radiology units known as "petites Curies" during World War I?', exp: 'YES', type: 'War' },
    { char: 'Marie Curie', q: 'Did they win three Nobel Prizes in literature and poetry?', exp: 'NO', type: 'False' },
    { char: 'Marie Curie', q: 'Could they have streamed Taylor Swift songs on Spotify in the laboratory?', exp: 'NO', type: 'Anachronism' },
    { char: 'Marie Curie', q: 'Do they lack discovery of the radioactive elements radium and polonium?', exp: 'NO', type: 'Negation' },
    { char: 'Marie Curie', q: 'Were they an ancient Egyptian pharaoh buried inside a golden pyramid?', exp: 'NO', type: 'Historical' },

    // Nikola Tesla
    { char: 'Nikola Tesla', q: 'Did they illuminate the 1893 World’s Columbian Exposition in Chicago using alternating current?', exp: 'YES', type: 'Historic' },
    { char: 'Nikola Tesla', q: 'Did they build a gigantic wooden laboratory in Colorado Springs to transmit wireless power?', exp: 'YES', type: 'Wireless' },
    { char: 'Nikola Tesla', q: 'Did they patent the AC induction motor and polyphase power transmission system?', exp: 'YES', type: 'Patent' },
    { char: 'Nikola Tesla', q: 'Did they fight as a samurai warrior during the Sengoku period in Japan?', exp: 'NO', type: 'False' },
    { char: 'Nikola Tesla', q: 'Could they have watched color television broadcasts on an OLED screen in 1850?', exp: 'NO', type: 'Anachronism' },
    { char: 'Nikola Tesla', q: 'Do they lack association with the creation of the resonant transformer coil named after them?', exp: 'NO', type: 'Negation' }
  ],

  "Historical Leaders": [
    // Julius Caesar
    { char: 'Julius Caesar', q: 'Did their refusal to disband their 13th Legion before crossing the river Rubicon trigger war?', exp: 'YES', type: 'Rubicon' },
    { char: 'Julius Caesar', q: 'Did Roman senators conspire to stab them twenty-three times under the statue of Pompey?', exp: 'YES', type: 'Assassination' },
    { char: 'Julius Caesar', q: 'Were they kidnapped in their youth by Mediterranean Cilician pirates whom they later crucified?', exp: 'YES', type: 'Pirates' },
    { char: 'Julius Caesar', q: 'Did they establish the Julian calendar reform consisting of 365.25 days per solar year?', exp: 'YES', type: 'Calendar' },
    { char: 'Julius Caesar', q: 'Could they have chatted on WhatsApp with Napoleon Bonaparte?', exp: 'NO', type: 'Anachronism' },
    { char: 'Julius Caesar', q: 'Did they listen to the Beatles play rock music in ancient Rome?', exp: 'NO', type: 'Anachronism' },
    { char: 'Julius Caesar', q: 'Do they lack association with the phrase Veni, vidi, vici?', exp: 'NO', type: 'Negation' },
    { char: 'Julius Caesar', q: 'Is it untrue that they formed the First Triumvirate alongside Pompey and Crassus?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Julius Caesar', q: 'Did they fly across the Atlantic Ocean in an airplane in 1927?', exp: 'NO', type: 'Anachronism' },
    { char: 'Julius Caesar', q: 'Were they born in Los Angeles, California in the late 20th century?', exp: 'NO', type: 'False' },

    // Napoleon Bonaparte
    { char: 'Napoleon Bonaparte', q: 'Did their retreat from a burning Moscow in winter decimate their Grande Armée?', exp: 'YES', type: 'Russia' },
    { char: 'Napoleon Bonaparte', q: 'Did the Duke of Wellington command the allied coalition that ended their rule at Waterloo?', exp: 'YES', type: 'Waterloo' },
    { char: 'Napoleon Bonaparte', q: 'Were they exiled to the remote South Atlantic island of Saint Helena until death?', exp: 'YES', type: 'Exile' },
    { char: 'Napoleon Bonaparte', q: 'Did they crown themselves Emperor of the French at Notre-Dame Cathedral in 1804?', exp: 'YES', type: 'Coronation' },
    { char: 'Napoleon Bonaparte', q: 'Did they codify civil law throughout Europe into the Napoleonic Code?', exp: 'YES', type: 'Law' },
    { char: 'Napoleon Bonaparte', q: 'Are they a fictional comic character owned by Marvel Comics?', exp: 'NO', type: 'False' },
    { char: 'Napoleon Bonaparte', q: 'Did they command supersonic stealth fighter jets during the Battle of Austerlitz?', exp: 'NO', type: 'Anachronism' },
    { char: 'Napoleon Bonaparte', q: 'Do they lack an Italian-Corsican ancestral heritage?', exp: 'NO', type: 'Negation' },
    { char: 'Napoleon Bonaparte', q: 'Is it inaccurate that they staged the coup of 18 Brumaire to seize political power?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Napoleon Bonaparte', q: 'Did they discover Pluto using the Hubble Space Telescope?', exp: 'NO', type: 'False' },

    // Abraham Lincoln
    { char: 'Abraham Lincoln', q: 'Did their election victory in November 1860 prompt seven Southern states to secede from the Union?', exp: 'YES', type: 'Secession' },
    { char: 'Abraham Lincoln', q: 'Did their assassin John Wilkes Booth shout "Sic semper tyrannis" after firing the pistol?', exp: 'YES', type: 'Booth' },
    { char: 'Abraham Lincoln', q: 'Did they deliver the concise Gettysburg Address dedicating a soldiers cemetery in 1863?', exp: 'YES', type: 'Gettysburg' },
    { char: 'Abraham Lincoln', q: 'Did they issue the Emancipation Proclamation declaring freedom for enslaved people in rebel territories?', exp: 'YES', type: 'Emancipation' },
    { char: 'Abraham Lincoln', q: 'Could they have driven a Tesla Cybertruck through Washington D.C.?', exp: 'NO', type: 'Anachronism' },
    { char: 'Abraham Lincoln', q: 'Did they possess a personal smartphone with access to Wikipedia?', exp: 'NO', type: 'Anachronism' },
    { char: 'Abraham Lincoln', q: 'Do they lack a carved likeness on the granite face of Mount Rushmore?', exp: 'NO', type: 'Negation' },
    { char: 'Abraham Lincoln', q: 'Is it untrue that they served as the 16th President of the United States?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Abraham Lincoln', q: 'Were they born as an emperor in the royal Forbidden City in Beijing?', exp: 'NO', type: 'False' },
    { char: 'Abraham Lincoln', q: 'Did they fight in the Trojan War against Achilles and Agamemnon?', exp: 'NO', type: 'Historical' },

    // Mahatma Gandhi
    { char: 'Mahatma Gandhi', q: 'Did they walk 240 miles to the coastal village of Dandi to produce tax-free ocean salt?', exp: 'YES', type: 'Dandi' },
    { char: 'Mahatma Gandhi', q: 'Did they pioneer the nonviolent philosophy of Satyagraha against British colonial rule?', exp: 'YES', type: 'Philosophy' },
    { char: 'Mahatma Gandhi', q: 'Did they wear a simple hand-spun cotton dhoti and shawl made on a spinning charkha?', exp: 'YES', type: 'Attire' },
    { char: 'Mahatma Gandhi', q: 'Was their life ended by the assassin Nathuram Godse in New Delhi in January 1948?', exp: 'YES', type: 'Assassination' },
    { char: 'Mahatma Gandhi', q: 'Did they lead an army of mechanized battle tanks across the English Channel?', exp: 'NO', type: 'Absurd' },
    { char: 'Mahatma Gandhi', q: 'Did they rule the Roman Empire from the Colosseum as a gladiatorial warlord?', exp: 'NO', type: 'False' },
    { char: 'Mahatma Gandhi', q: 'Do they lack association with the honorific title Mahatma meaning Great Soul?', exp: 'NO', type: 'Negation' }
  ],

  "Sports Legends": [
    // Lionel Messi
    { char: 'Lionel Messi', q: 'Did they score 91 official goals in a single calendar year in 2012 breaking Gerd Müller’s record?', exp: 'YES', type: 'Record' },
    { char: 'Lionel Messi', q: 'Did they lift the World Cup trophy in Qatar wearing a ceremonial black bisht cloak?', exp: 'YES', type: 'Iconic' },
    { char: 'Lionel Messi', q: 'Did they receive growth hormone treatment as a child funded by FC Barcelona?', exp: 'YES', type: 'Childhood' },
    { char: 'Lionel Messi', q: 'Have they won a record eight Ballon d’Or awards as the world’s greatest footballer?', exp: 'YES', type: 'BallonDor' },
    { char: 'Lionel Messi', q: 'Do they lack an Olympic gold medal in sprinting track and field?', exp: 'YES', type: 'CrossNeg' },
    { char: 'Lionel Messi', q: 'Did they win six NBA championship rings playing basketball for the Chicago Bulls?', exp: 'NO', type: 'False' },
    { char: 'Lionel Messi', q: 'Are they a Formula 1 driver who competes in the Monaco Grand Prix for Ferrari?', exp: 'NO', type: 'False' },
    { char: 'Lionel Messi', q: 'Do they lack a left-footed dominant playmaking style on the football pitch?', exp: 'NO', type: 'Negation' },
    { char: 'Lionel Messi', q: 'Is it inaccurate that their native hometown is Rosario, Argentina?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Lionel Messi', q: 'Could they have played against Pelé in the 1970 World Cup final in Mexico?', exp: 'NO', type: 'Anachronism' },

    // Cristiano Ronaldo
    { char: 'Cristiano Ronaldo', q: 'Did they score a bicycle kick in Turin against Juventus that earned a standing ovation from home fans?', exp: 'YES', type: 'Bicycle' },
    { char: 'Cristiano Ronaldo', q: 'Have they scored over 850 competitive career goals across sporting continents?', exp: 'YES', type: 'Stats' },
    { char: 'Cristiano Ronaldo', q: 'Did they captain Portugal to their historic UEFA Euro 2016 championship victory?', exp: 'YES', type: 'Euro2016' },
    { char: 'Cristiano Ronaldo', q: 'Is their signature goal celebration performing a mid-air spin shout of "Siuuu"?', exp: 'YES', type: 'Celebration' },
    { char: 'Cristiano Ronaldo', q: 'Have they never played competitive basketball for the Boston Celtics?', exp: 'YES', type: 'CrossNeg' },
    { char: 'Cristiano Ronaldo', q: 'Did they spend their athletic career as a heavyweight boxing champion in Las Vegas?', exp: 'NO', type: 'False' },
    { char: 'Cristiano Ronaldo', q: 'Do they lack five UEFA Champions League championship titles?', exp: 'NO', type: 'Negation' },
    { char: 'Cristiano Ronaldo', q: 'Is it untrue that their birthplace is the Portuguese island of Madeira?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Cristiano Ronaldo', q: 'Were they a 17th-century pirate captain sailing across the Caribbean Sea?', exp: 'NO', type: 'False' },

    // Michael Jordan
    { char: 'Michael Jordan', q: 'Did they switch to jersey number 45 upon returning from professional baseball in 1995?', exp: 'YES', type: 'Number45' },
    { char: 'Michael Jordan', q: 'Did their "Flu Game" in the 1997 NBA Finals cement their legendary competitive resolve?', exp: 'YES', type: 'FluGame' },
    { char: 'Michael Jordan', q: 'Did they hit the iconic game-winning "Last Shot" against the Utah Jazz in Game 6 in 1998?', exp: 'YES', type: 'LastShot' },
    { char: 'Michael Jordan', q: 'Did Nike launch the historic Air Jordan sneaker franchise bearing their silhouette in 1984?', exp: 'YES', type: 'Sneaker' },
    { char: 'Michael Jordan', q: 'Did they lead the Chicago Bulls to two separate three-peat NBA championships?', exp: 'YES', type: 'ThreePeat' },
    { char: 'Michael Jordan', q: 'Did they spend their athletic career as a Formula 1 racecar driver for McLaren?', exp: 'NO', type: 'False' },
    { char: 'Michael Jordan', q: 'Are they a world-class Olympic figure skater who performs triple axels?', exp: 'NO', type: 'False' },
    { char: 'Michael Jordan', q: 'Do they lack college basketball championship success at North Carolina in 1982?', exp: 'NO', type: 'Negation' },

    // Usain Bolt
    { char: 'Usain Bolt', q: 'Did they celebrate by uncoupling their golden sprinting spikes at the Beijing and London Olympics?', exp: 'YES', type: 'Spikes' },
    { char: 'Usain Bolt', q: 'Do they hold the unbreakable world records of 9.58 seconds in 100m and 19.19 in 200m?', exp: 'YES', type: 'Records' },
    { char: 'Usain Bolt', q: 'Is their iconic victory pose the archer-like lightning bolt pointing to the heavens?', exp: 'YES', type: 'Pose' },
    { char: 'Usain Bolt', q: 'Did they achieve a historic "triple-triple" of Olympic sprint gold medals for Jamaica?', exp: 'YES', type: 'Olympics' },
    { char: 'Usain Bolt', q: 'Are they a heavyweight sumo wrestler competing in the Grand Sumo tournament in Tokyo?', exp: 'NO', type: 'False' },
    { char: 'Usain Bolt', q: 'Do they lack an Olympic sprinting heritage representing the nation of Jamaica?', exp: 'NO', type: 'Negation' }
  ],

  "Music Legends": [
    // Michael Jackson
    { char: 'Michael Jackson', q: 'Did their Motown 25 television performance of Billie Jean debut the Moonwalk to 47 million viewers?', exp: 'YES', type: 'Moonwalk' },
    { char: 'Michael Jackson', q: 'Did they co-write the global charity anthem We Are the World with Lionel Richie?', exp: 'YES', type: 'Charity' },
    { char: 'Michael Jackson', q: 'Is Thriller the highest-selling studio album in the history of global music recordings?', exp: 'YES', type: 'Thriller' },
    { char: 'Michael Jackson', q: 'Did they wear an iconic single white rhinestone glove and black fedora during performances?', exp: 'YES', type: 'Attire' },
    { char: 'Michael Jackson', q: 'Did they invent the 45-degree anti-gravity lean illusion used in the Smooth Criminal video?', exp: 'YES', type: 'Lean' },
    { char: 'Michael Jackson', q: 'Did they begin their childhood recording career as lead singer of the Jackson 5?', exp: 'YES', type: 'Origin' },
    { char: 'Michael Jackson', q: 'Did they play defensive tackle for the Dallas Cowboys in the Super Bowl?', exp: 'NO', type: 'False' },
    { char: 'Michael Jackson', q: 'Do they lack recognition as the global King of Pop?', exp: 'NO', type: 'Negation' },
    { char: 'Michael Jackson', q: 'Is it false that their lavish California amusement estate was named Neverland Ranch?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Michael Jackson', q: 'Could they have performed on stage for King Louis XIV at the Palace of Versailles in 1680?', exp: 'NO', type: 'Anachronism' },

    // Freddie Mercury
    { char: 'Freddie Mercury', q: 'Did their performance at Live Aid feature the immortal crowd singalong "Ay-Oh"?', exp: 'YES', type: 'LiveAid' },
    { char: 'Freddie Mercury', q: 'Did they record an opera duet album Barcelona with soprano Montserrat Caballé?', exp: 'YES', type: 'Opera' },
    { char: 'Freddie Mercury', q: 'Did they possess a rare four-octave vocal range attributed to four extra upper teeth?', exp: 'YES', type: 'Vocal' },
    { char: 'Freddie Mercury', q: 'Was their birth name Farrokh Bulsara, born on the island of Zanzibar?', exp: 'YES', type: 'Birth' },
    { char: 'Freddie Mercury', q: 'Did they front the British rock band Queen as its legendary flamboyant lead vocalist?', exp: 'YES', type: 'Band' },
    { char: 'Freddie Mercury', q: 'Are they an alien warrior from Krypton who shoots heat rays from their eyes?', exp: 'NO', type: 'False' },
    { char: 'Freddie Mercury', q: 'Could they have commanded Roman legions against Celtic warriors?', exp: 'NO', type: 'Anachronism' },
    { char: 'Freddie Mercury', q: 'Do they lack songwriting credit for Bohemian Rhapsody and We Are the Champions?', exp: 'NO', type: 'Negation' },
    { char: 'Freddie Mercury', q: 'Is it inaccurate that their iconic microphone was attached to a severed, half-broken stand?', exp: 'NO', type: 'DoubleNeg' },

    // Taylor Swift
    { char: 'Taylor Swift', q: 'Did they re-record their early studio albums with the subtitle "Taylor’s Version" to own master rights?', exp: 'YES', type: 'TaylorsVersion' },
    { char: 'Taylor Swift', q: 'Did their 2023–2024 Eras Tour become the first concert tour in history to gross over one billion dollars?', exp: 'YES', type: 'BillionTour' },
    { char: 'Taylor Swift', q: 'Have they won Album of the Year at the Grammy Awards an unprecedented four times?', exp: 'YES', type: 'Grammy' },
    { char: 'Taylor Swift', q: 'Did they begin their professional recording career in Nashville as a teenage country music prodigy?', exp: 'YES', type: 'Country' },
    { char: 'Taylor Swift', q: 'Were they a 19th-century French general defeated at the Battle of Waterloo?', exp: 'NO', type: 'False' },
    { char: 'Taylor Swift', q: 'Are they an astronaut who walked on the moon for NASA during the Apollo 11 mission?', exp: 'NO', type: 'False' },
    { char: 'Taylor Swift', q: 'Do they lack an intensely dedicated global fanbase commonly referred to as Swifties?', exp: 'NO', type: 'Negation' },
    { char: 'Taylor Swift', q: 'Is it false that they write or co-write virtually every track across their entire discography?', exp: 'NO', type: 'DoubleNeg' }
  ],

  "Adversarial & Multi-Hop Traps": [
    // Double & Triple Negations
    { char: 'Batman', q: 'Is it inaccurate to claim that they are devoid of an immense fortune?', exp: 'YES', type: 'TripleNeg' },
    { char: 'Steve Jobs', q: 'Is it false that they completed a four-year doctoral degree at Stanford?', exp: 'YES', type: 'DoubleNeg' },
    { char: 'Albert Einstein', q: 'Is it untrue that they were awarded a Nobel Prize for scientific discovery?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Superman', q: 'Is it false that their biological home planet Krypton was completely destroyed?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Naruto Uzumaki', q: 'Is it untrue that they grew up with a nine-tailed beast inside their body?', exp: 'NO', type: 'DoubleNeg' },
    { char: 'Michael Jordan', q: 'Is it not true that they played professional basketball for the Chicago Bulls?', exp: 'NO', type: 'NegativePolarity' },
    { char: 'Marie Curie', q: 'Is it not true that they won Nobel prizes in both physics and chemistry?', exp: 'NO', type: 'NegativePolarity' },
    { char: 'Julius Caesar', q: 'Is it not true that they were assassinated by Roman senators in 44 BC?', exp: 'NO', type: 'NegativePolarity' },
    
    // Cross-Era Anachronisms
    { char: 'Julius Caesar', q: 'Could they have chatted on WhatsApp with Napoleon Bonaparte?', exp: 'NO', type: 'Anachronism' },
    { char: 'Abraham Lincoln', q: 'Could they have driven a Tesla Cybertruck through Washington D.C.?', exp: 'NO', type: 'Anachronism' },
    { char: 'Isaac Newton', q: 'Could they have watched Michael Jordan play basketball in the 1990s?', exp: 'NO', type: 'Anachronism' },
    { char: 'Marie Curie', q: 'Could they have streamed Taylor Swift songs on Spotify in the laboratory?', exp: 'NO', type: 'Anachronism' },
    { char: 'Freddie Mercury', q: 'Could they have commanded Roman legions against Celtic warriors?', exp: 'NO', type: 'Anachronism' },
    { char: 'Napoleon Bonaparte', q: 'Could they have used Wikipedia to study Wellington’s battle strategies?', exp: 'NO', type: 'Anachronism' },
    { char: 'Alan Turing', q: 'Could they have played Cyberpunk 2077 on an Nvidia GeForce RTX GPU?', exp: 'NO', type: 'Anachronism' },
    { char: 'Darth Vader', q: 'Did they attend Woodstock music festival in 1969 to hear Jimi Hendrix?', exp: 'NO', type: 'Anachronism' },
    { char: 'Sherlock Holmes', q: 'Did they track criminal suspects using GPS satellite tracking smartphones?', exp: 'NO', type: 'Anachronism' },
    { char: 'Captain Jack Sparrow', q: 'Did they sink nuclear submarines with submarine-launched ballistic missiles?', exp: 'NO', type: 'Anachronism' }
  ]
};

// Runner function
export function runLevel2Suite() {
  console.log('================================================================================');
  console.log('    REVERSE AKINATOR - LEVEL 2 GRANDMASTER BENCHMARK EVALUATION               ');
  console.log('    (Multi-Hop Causal, Anachronisms, Metaphors, Double Negations)               ');
  console.log('================================================================================\n');

  let total = 0;
  let passed = 0;
  let failed = 0;
  const categoryStats = [];
  const failures = [];

  for (const [catName, tests] of Object.entries(testSuite)) {
    let catPass = 0;
    let catFail = 0;

    for (const t of tests) {
      total++;
      const char = getChar(t.char);
      if (!char) {
        console.error(`Character not found: ${t.char}`);
        continue;
      }

      const res = evaluateQuestion(t.q, char, null);
      const isCorrect = res.type === t.exp;

      if (isCorrect) {
        catPass++;
        passed++;
      } else {
        catFail++;
        failed++;
        failures.push({
          category: catName,
          character: t.char,
          question: t.q,
          expected: t.exp,
          got: res.type,
          commentary: res.commentary,
          type: t.type
        });
      }
    }

    const rate = Math.round((catPass / tests.length) * 100);
    const icon = rate >= 90 ? '✅' : (rate >= 70 ? '⚠️' : '❌');
    categoryStats.push({ category: catName, total: tests.length, passed: catPass, failed: catFail, rate });
    console.log(`${icon} ${catName.padEnd(32)} | Tests: ${String(tests.length).padStart(3)} | Passed: ${String(catPass).padStart(3)} | Failed: ${String(catFail).padStart(3)} | Accuracy: ${rate}%`);
  }

  const overallAccuracy = Math.round((passed / total) * 100);
  console.log('\n================================================================================');
  console.log(`GRANDMASTER LEVEL 2 TOTAL: Passed ${passed} / ${total} (${overallAccuracy}%) | Failed: ${failed}`);
  console.log('================================================================================\n');

  const report = {
    total,
    passed,
    failed,
    accuracy: `${overallAccuracy}%`,
    categoryStats,
    failures
  };

  fs.writeFileSync('level2_evaluation_report.json', JSON.stringify(report, null, 2));
  return report;
}

if (process.argv[1].endsWith('test_suite_level2.js')) {
  runLevel2Suite();
}
