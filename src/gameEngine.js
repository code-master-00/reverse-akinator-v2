// Core Reverse Akinator Game Engine
import { CHARACTERS } from './characterBank.js';
import { evaluateQuestion, fetchWikiSummary } from './searchEngine.js';

export const GAME_STATES = {
  SETUP: 'SETUP',
  PLAYING: 'PLAYING',
  FINAL_GUESSES: 'FINAL_GUESSES',
  WON: 'WON',
  LOST: 'LOST',
  QUIT: 'QUIT'
};

export class GameEngine {
  constructor() {
    this.maxQuestions = 20;
    this.maxFinalGuesses = 3;
    this.reset();
  }

  reset() {
    this.state = GAME_STATES.SETUP;
    this.selectedCategory = 'all';
    this.customTopic = '';
    this.secretCharacter = null;
    this.wikiData = null;
    this.questionsAsked = 0;
    this.questionHistory = [];
    this.finalGuessesRemaining = this.maxFinalGuesses;
    this.guessHistory = [];
    this.gameResult = null; // { outcome: 'win' | 'lose' | 'quit', reason: '' }
    this.characterMood = 'smug';
  }

  /**
   * Start a new game with a selected category or custom pool
   */
  async startGame(categoryId = 'all', customCharacter = null) {
    this.reset();
    this.selectedCategory = categoryId;

    if (customCharacter) {
      this.secretCharacter = customCharacter;
    } else {
      let pool = CHARACTERS;
      if (categoryId !== 'all') {
        pool = CHARACTERS.filter(c => c.category === categoryId);
        if (pool.length === 0) pool = CHARACTERS;
      }
      const randomIndex = Math.floor(Math.random() * pool.length);
      this.secretCharacter = pool[randomIndex];
    }

    // Proactively fetch Wikipedia summary & image in the background
    if (this.secretCharacter.wikiTitle) {
      fetchWikiSummary(this.secretCharacter.wikiTitle).then(data => {
        if (data) this.wikiData = data;
      });
    }

    this.state = GAME_STATES.PLAYING;
    this.characterMood = 'smug';
    return {
      state: this.state,
      category: this.selectedCategory,
      totalQuestions: this.maxQuestions
    };
  }

  /**
   * Ask one of the 20 Yes/No questions
   */
  async askQuestion(questionText) {
    if (this.state !== GAME_STATES.PLAYING) {
      throw new Error(`Cannot ask question in current state: ${this.state}`);
    }

    if (this.questionsAsked >= this.maxQuestions) {
      throw new Error('All 20 questions have already been exhausted!');
    }

    this.questionsAsked++;
    const evalResult = evaluateQuestion(questionText, this.secretCharacter, this.wikiData);
    this.characterMood = evalResult.mood || 'thinking';

    const entry = {
      qIndex: this.questionsAsked,
      question: questionText.trim(),
      answer: evalResult.type, // 'YES', 'NO', 'MAYBE'
      commentary: evalResult.commentary,
      mood: evalResult.mood,
      timestamp: Date.now()
    };

    this.questionHistory.push(entry);

    // Check if 20 questions reached without guessing
    if (this.questionsAsked >= this.maxQuestions) {
      this.state = GAME_STATES.FINAL_GUESSES;
      this.characterMood = 'confident';
    }

    return {
      entry,
      questionsRemaining: this.maxQuestions - this.questionsAsked,
      state: this.state
    };
  }

  /**
   * Submit a guess for the character
   */
  submitGuess(guessText) {
    const rawGuess = (guessText || '').trim();
    if (!rawGuess) return { isCorrect: false, error: 'Empty guess' };

    const isMatch = this.checkMatch(rawGuess, this.secretCharacter);
    
    this.guessHistory.push({
      guess: rawGuess,
      isCorrect: isMatch,
      timestamp: Date.now()
    });

    if (isMatch) {
      this.state = GAME_STATES.WON;
      this.characterMood = 'defeated';
      this.gameResult = {
        outcome: 'win',
        reason: 'correct_guess',
        questionsUsed: this.questionsAsked,
        secretCharacter: this.secretCharacter,
        wikiData: this.wikiData
      };
      return {
        isMatch: true,
        state: this.state,
        secretCharacter: this.secretCharacter,
        wikiData: this.wikiData
      };
    }

    // Wrong guess handling
    if (this.state === GAME_STATES.FINAL_GUESSES) {
      this.finalGuessesRemaining--;
      if (this.finalGuessesRemaining <= 0) {
        this.state = GAME_STATES.LOST;
        this.characterMood = 'smug';
        this.gameResult = {
          outcome: 'lose',
          reason: 'guesses_exhausted',
          questionsUsed: this.questionsAsked,
          secretCharacter: this.secretCharacter,
          wikiData: this.wikiData
        };
      }
    } else {
      this.characterMood = 'smug';
    }

    return {
      isMatch: false,
      state: this.state,
      finalGuessesRemaining: this.finalGuessesRemaining,
      secretCharacter: (this.state === GAME_STATES.LOST) ? this.secretCharacter : null,
      wikiData: (this.state === GAME_STATES.LOST) ? this.wikiData : null
    };
  }

  /**
   * Player gives up / clicks "I Quit"
   */
  quitGame() {
    this.state = GAME_STATES.QUIT;
    this.characterMood = 'smug';
    this.gameResult = {
      outcome: 'quit',
      reason: 'player_surrendered',
      questionsUsed: this.questionsAsked,
      secretCharacter: this.secretCharacter,
      wikiData: this.wikiData
    };
    return {
      state: this.state,
      secretCharacter: this.secretCharacter,
      wikiData: this.wikiData
    };
  }

  /**
   * Flexible fuzzy string match against name and aliases
   */
  checkMatch(userGuess, character) {
    const clean = str => (str || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const normalizedGuess = clean(userGuess);
    if (!normalizedGuess) return false;

    // Direct name match
    if (clean(character.name) === normalizedGuess) return true;

    // Check all known aliases
    for (const alias of character.aliases || []) {
      if (clean(alias) === normalizedGuess) return true;
    }

    // Check if user input is contained inside the official name or vice versa (for multi-word names like "Lionel Messi" -> "messi")
    const words = clean(character.name).split(' ');
    if (words.some(w => w.length > 3 && w === normalizedGuess)) return true;

    for (const alias of character.aliases || []) {
      const aliasWords = clean(alias).split(' ');
      if (aliasWords.some(w => w.length > 3 && w === normalizedGuess)) return true;
    }

    return false;
  }
}
