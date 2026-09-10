// Reverse Akinator - Main Application Controller
import confetti from 'canvas-confetti';
import { CATEGORIES, CHARACTERS } from './src/characterBank.js';
import { GameEngine, GAME_STATES } from './src/gameEngine.js';
import { sound } from './src/soundEffects.js';
import { fetchWikiSummary, searchWikipedia } from './src/searchEngine.js';

// DOM Elements Selection
const setupView = document.getElementById('setupView');
const gameView = document.getElementById('gameView');
const categoryGrid = document.getElementById('categoryGrid');
const startGameBtn = document.getElementById('startGameBtn');
const customTopicInput = document.getElementById('customTopicInput');
const customTopicBtn = document.getElementById('customTopicBtn');

// HUD Elements
const hudCategoryBadge = document.getElementById('hudCategoryBadge');
const hudQuestionsCount = document.getElementById('hudQuestionsCount');
const hudCounterSubtext = document.getElementById('hudCounterSubtext');
const progressRingBar = document.getElementById('progressRingBar');
const openGuessModalBtn = document.getElementById('openGuessModalBtn');
const quitGameBtn = document.getElementById('quitGameBtn');
const inGameFace = document.getElementById('inGameFace');
const aiSpeechText = document.getElementById('aiSpeechText');

// Chat & Inputs
const chatFeed = document.getElementById('chatFeed');
const questionForm = document.getElementById('questionForm');
const questionInput = document.getElementById('questionInput');
const promptChipsList = document.getElementById('promptChipsList');

// Climax / Final Guesses
const finalGuessesBar = document.getElementById('finalGuessesBar');
const finalGuessesCount = document.getElementById('finalGuessesCount');
const openClimaxGuessBtn = document.getElementById('openClimaxGuessBtn');

// Modals
const guessModal = document.getElementById('guessModal');
const closeGuessModalBtn = document.getElementById('closeGuessModalBtn');
const cancelGuessBtn = document.getElementById('cancelGuessBtn');
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const guessErrorMsg = document.getElementById('guessErrorMsg');
const guessModalDescription = document.getElementById('guessModalDescription');

const revealModal = document.getElementById('revealModal');
const revealTitle = document.getElementById('revealTitle');
const revealSubtitle = document.getElementById('revealSubtitle');
const revealOutcomeIcon = document.getElementById('revealOutcomeIcon');
const revealCharacterImg = document.getElementById('revealCharacterImg');
const revealCharacterFallback = document.getElementById('revealCharacterFallback');
const revealCharacterName = document.getElementById('revealCharacterName');
const revealCategoryTag = document.getElementById('revealCategoryTag');
const revealOriginTag = document.getElementById('revealOriginTag');
const revealStatusTag = document.getElementById('revealStatusTag');
const revealTrivia = document.getElementById('revealTrivia');
const statQuestionsAsked = document.getElementById('statQuestionsAsked');
const statGuessesMade = document.getElementById('statGuessesMade');
const statAccuracy = document.getElementById('statAccuracy');
const playAgainBtn = document.getElementById('playAgainBtn');

const rulesModal = document.getElementById('rulesModal');
const rulesBtn = document.getElementById('rulesBtn');
const closeRulesModalBtn = document.getElementById('closeRulesModalBtn');
const gotItBtn = document.getElementById('gotItBtn');

const soundBtn = document.getElementById('soundBtn');
const soundIconOn = document.getElementById('soundIconOn');
const soundIconOff = document.getElementById('soundIconOff');

// Initialize Engine State
const engine = new GameEngine();
let selectedCategoryId = 'all';

// Audio Icons state
function updateAudioIcons() {
  if (sound.isMuted()) {
    soundIconOn.classList.add('hidden');
    soundIconOff.classList.remove('hidden');
  } else {
    soundIconOn.classList.remove('hidden');
    soundIconOff.classList.add('hidden');
  }
}

soundBtn.addEventListener('click', () => {
  const isMuted = sound.toggleMute();
  updateAudioIcons();
});
updateAudioIcons();

// Rules modal handlers
rulesBtn.addEventListener('click', () => rulesModal.classList.remove('hidden'));
closeRulesModalBtn.addEventListener('click', () => rulesModal.classList.add('hidden'));
gotItBtn.addEventListener('click', () => rulesModal.classList.add('hidden'));

// Render Category Cards
function renderCategories() {
  categoryGrid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    card.className = `category-card ${cat.id === selectedCategoryId ? 'selected' : ''}`;
    card.setAttribute('data-id', cat.id);
    card.innerHTML = `
      <div class="category-name">${cat.name}</div>
      <div class="category-desc">${cat.desc}</div>
    `;
    card.addEventListener('click', () => {
      sound.playAsk();
      selectedCategoryId = cat.id;
      document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
    categoryGrid.appendChild(card);
  });
}
renderCategories();

// Start Game Handler
startGameBtn.addEventListener('click', () => {
  startSession(selectedCategoryId);
});

// Custom Topic Handler
customTopicBtn.addEventListener('click', async () => {
  const topic = customTopicInput.value.trim();
  if (!topic) return;

  customTopicBtn.disabled = true;
  customTopicBtn.textContent = 'Searching...';

  try {
    // Search Wikipedia for characters related to this topic
    const results = await searchWikipedia(topic);
    if (results && results.length > 0) {
      // Pick one from top results
      const pick = results[Math.floor(Math.random() * Math.min(results.length, 5))];
      const customChar = {
        name: pick.title,
        aliases: [pick.title.toLowerCase()],
        category: 'Custom: ' + topic,
        fictional: true, // evaluated dynamically
        gender: 'other',
        alive: true,
        human: true,
        superpowers: false,
        origin: topic,
        medium: 'real',
        era: 'modern',
        hair: 'unknown',
        occupation: topic,
        tags: [topic.toLowerCase(), pick.title.toLowerCase()],
        trivia: pick.snippet ? pick.snippet.replace(/<\/?[^>]+(>|$)/g, '') : 'Character discovered via live search.',
        wikiTitle: pick.title
      };
      await startSession('custom', customChar, topic);
    } else {
      // Fallback
      await startSession('all');
    }
  } catch (e) {
    await startSession('all');
  } finally {
    customTopicBtn.disabled = false;
    customTopicBtn.textContent = 'Start Custom';
  }
});

async function startSession(categoryId, customCharacter = null, customLabel = null) {
  sound.playAsk();
  await engine.startGame(categoryId, customCharacter);

  // Update HUD
  const catObj = CATEGORIES.find(c => c.id === categoryId);
  hudCategoryBadge.textContent = customLabel ? `✨ ${customLabel}` : (catObj ? catObj.name : 'Random Universe');
  
  updateHUD();
  chatFeed.innerHTML = '';
  finalGuessesBar.classList.add('hidden');
  updateGenieMood('smug', "I've picked my secret entity! Go ahead and ask your first Yes/No question.");

  // View switch
  setupView.classList.add('hidden');
  gameView.classList.remove('hidden');
  questionInput.focus();
}

// Update HUD & Progress Ring
function updateHUD() {
  const remaining = engine.maxQuestions - engine.questionsAsked;
  hudQuestionsCount.textContent = remaining;

  // Update SVG Progress ring (circumference = 2 * PI * 20 ≈ 125.66)
  const circumference = 125.66;
  const progressRatio = remaining / engine.maxQuestions;
  const offset = circumference - (progressRatio * circumference);
  progressRingBar.style.strokeDashoffset = offset;

  if (remaining <= 5) {
    progressRingBar.style.stroke = '#ff4b72'; // Crimson alert
  } else if (remaining <= 10) {
    progressRingBar.style.stroke = '#ffb800'; // Amber warning
  } else {
    progressRingBar.style.stroke = '#00f2fe'; // Cyan default
  }

  // Climax / Final Guesses check
  if (engine.state === GAME_STATES.FINAL_GUESSES) {
    finalGuessesBar.classList.remove('hidden');
    finalGuessesCount.textContent = engine.finalGuessesRemaining;
    hudCounterSubtext.textContent = 'FINAL GUESSES!';
    hudQuestionsCount.textContent = '0';
  } else {
    finalGuessesBar.classList.add('hidden');
    hudCounterSubtext.textContent = `Out of ${engine.maxQuestions}`;
  }
}

// Update Mascot Mood & Dialogue
function updateGenieMood(mood, dialogue = '') {
  const faces = {
    smug: '😏',
    thinking: '🤔',
    surprised: '😲',
    confident: '😎',
    defeated: '😵',
    excited: '✨'
  };
  inGameFace.textContent = faces[mood] || '🔮';
  if (dialogue) {
    aiSpeechText.textContent = dialogue;
  }
}

// Handle Asking a Question
questionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const qText = questionInput.value.trim();
  if (!qText) return;

  if (engine.state === GAME_STATES.FINAL_GUESSES) {
    // If questions are exhausted, prompt user to use guess modal
    openGuessModal();
    return;
  }

  questionInput.value = '';
  sound.playAsk();

  // Show thinking state
  updateGenieMood('thinking', "Consulting universal archives...");

  try {
    const res = await engine.askQuestion(qText);
    renderQuestionEntry(res.entry);
    updateHUD();

    if (res.entry.answer === 'YES') {
      sound.playYes();
    } else if (res.entry.answer === 'NO') {
      sound.playNo();
    }

    updateGenieMood(res.entry.mood, res.entry.commentary);

    // If 20 questions reached, sound buzzer and show climax mode
    if (res.state === GAME_STATES.FINAL_GUESSES) {
      sound.playBuzzer();
      updateGenieMood('surprised', "You have used all 20 questions! You now have 3 Final Guesses to name the character.");
    }
  } catch (err) {
    console.error(err);
  }
});

// Render Chat Entry
function renderQuestionEntry(entry) {
  const row = document.createElement('div');
  row.className = 'chat-row';

  const badgeClass = entry.answer === 'YES' ? 'badge-yes' : (entry.answer === 'NO' ? 'badge-no' : 'badge-maybe');
  const badgeIcon = entry.answer === 'YES' ? '✓' : (entry.answer === 'NO' ? '✕' : '≈');

  row.innerHTML = `
    <div class="user-msg-bubble">
      <span class="q-index-badge">#${entry.qIndex}</span>
      <span class="user-question-text">${escapeHtml(entry.question)}</span>
    </div>
    <div class="ai-answer-bubble">
      <div class="ai-answer-badge ${badgeClass}">
        <span>${badgeIcon}</span>
        <span>${entry.answer}</span>
      </div>
      <p class="ai-commentary-text">${escapeHtml(entry.commentary)}</p>
    </div>
  `;

  chatFeed.appendChild(row);
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

// Quick Prompt Chips
promptChipsList.addEventListener('click', (e) => {
  const btn = e.target.closest('.chip-btn');
  if (!btn) return;
  const promptText = btn.getAttribute('data-q');
  if (promptText) {
    questionInput.value = promptText;
    questionInput.focus();
  }
});

// Direct Guessing Modal Handlers
function openGuessModal() {
  guessInput.value = '';
  guessErrorMsg.classList.add('hidden');
  guessModal.classList.remove('hidden');

  if (engine.state === GAME_STATES.FINAL_GUESSES) {
    guessModalDescription.textContent = `FINAL GUESS CLIMAX! You have ${engine.finalGuessesRemaining} of 3 guesses left. Who is this character?`;
  } else {
    guessModalDescription.textContent = `Think you know who it is? Type the name. If you are right, you win instantly!`;
  }
  setTimeout(() => guessInput.focus(), 50);
}

function closeGuessModal() {
  guessModal.classList.add('hidden');
}

openGuessModalBtn.addEventListener('click', openGuessModal);
openClimaxGuessBtn.addEventListener('click', openGuessModal);
closeGuessModalBtn.addEventListener('click', closeGuessModal);
cancelGuessBtn.addEventListener('click', closeGuessModal);

// Submit Guess
guessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const guessText = guessInput.value.trim();
  if (!guessText) return;

  const result = engine.submitGuess(guessText);

  if (result.isMatch) {
    closeGuessModal();
    sound.playWin();
    triggerConfetti();
    showRevealModal('win', result.secretCharacter, result.wikiData);
  } else {
    sound.playNo();
    updateHUD();

    if (result.state === GAME_STATES.LOST) {
      closeGuessModal();
      sound.playLose();
      showRevealModal('lose', result.secretCharacter, result.wikiData);
    } else {
      // Wrong guess feedback
      const remainingGuesses = result.finalGuessesRemaining;
      if (engine.state === GAME_STATES.FINAL_GUESSES) {
        guessErrorMsg.textContent = `Incorrect! That is not them. You have ${remainingGuesses} guess(es) remaining.`;
      } else {
        guessErrorMsg.textContent = `Nope! It is NOT "${guessText}". Keep asking questions!`;
      }
      guessErrorMsg.classList.remove('hidden');
      updateGenieMood('smug', `Nice try, but "${guessText}" is incorrect!`);
    }
  }
});

// "I Quit" Button Handler - Direct graceful surrender with reveal modal
quitGameBtn.addEventListener('click', () => {
  sound.playLose();
  const result = engine.quitGame();
  showRevealModal('quit', result.secretCharacter, result.wikiData);
});


// Reveal & Game Over Modal
async function showRevealModal(outcome, character, wikiData) {
  revealModal.classList.remove('hidden');

  // Stats calculation
  statQuestionsAsked.textContent = engine.questionsAsked;
  statGuessesMade.textContent = engine.guessHistory.length;

  if (outcome === 'win') {
    revealOutcomeIcon.textContent = '🏆';
    revealTitle.textContent = 'YOU WIN!';
    revealSubtitle.textContent = `Brilliant deduction! You uncovered the identity in ${engine.questionsAsked} questions!`;
    statAccuracy.textContent = 'VICTORY';
    statAccuracy.style.color = 'var(--accent-emerald)';
  } else if (outcome === 'quit') {
    revealOutcomeIcon.textContent = '🏳️';
    revealTitle.textContent = 'SURRENDERED!';
    revealSubtitle.textContent = 'The AI was too sneaky this time. Here was the secret character:';
    statAccuracy.textContent = 'QUIT';
    statAccuracy.style.color = 'var(--accent-amber)';
  } else {
    revealOutcomeIcon.textContent = '💀';
    revealTitle.textContent = 'THE AI WINS!';
    revealSubtitle.textContent = 'All 20 questions and 3 final guesses were exhausted! Here was the secret:';
    statAccuracy.textContent = 'DEFEAT';
    statAccuracy.style.color = 'var(--accent-crimson)';
  }

  // Populate character details
  revealCharacterName.textContent = character.name;
  revealCategoryTag.textContent = character.category.toUpperCase();
  revealOriginTag.textContent = character.origin || 'Unknown Origin';
  revealStatusTag.textContent = character.fictional ? 'FICTIONAL' : 'REAL WORLD';
  revealTrivia.textContent = `"${character.trivia || 'No trivia available.'}"`;

  // Fetch or display live Wikipedia image
  if (wikiData?.thumbnail) {
    revealCharacterImg.src = wikiData.thumbnail;
    revealCharacterImg.classList.remove('hidden');
    revealCharacterFallback.classList.add('hidden');
  } else if (character.wikiTitle) {
    const liveWiki = await fetchWikiSummary(character.wikiTitle);
    if (liveWiki?.thumbnail) {
      revealCharacterImg.src = liveWiki.thumbnail;
      revealCharacterImg.classList.remove('hidden');
      revealCharacterFallback.classList.add('hidden');
    } else {
      revealCharacterImg.classList.add('hidden');
      revealCharacterFallback.classList.remove('hidden');
    }
  } else {
    revealCharacterImg.classList.add('hidden');
    revealCharacterFallback.classList.remove('hidden');
  }
}

// Play Again
playAgainBtn.addEventListener('click', () => {
  sound.playAsk();
  revealModal.classList.add('hidden');
  gameView.classList.add('hidden');
  setupView.classList.remove('hidden');
});

// Confetti celebration
function triggerConfetti() {
  const count = 200;
  const defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

// Security string escaper
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
