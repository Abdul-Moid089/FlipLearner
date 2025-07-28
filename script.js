// FlipLearner - Flashcard Application
class FlipLearner {
    constructor() {
        this.decks = this.loadDecks();
        this.currentDeck = null;
        this.currentCardIndex = 0;
        this.isFlipped = false;
        this.studySession = {
            correct: 0,
            wrong: 0,
            total: 0
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderDecks();
        this.updateProgress();
        this.showSection('home');
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
                this.setActiveNavLink(link);
            });
        });

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Create Deck Modal
        document.getElementById('createDeckBtn').addEventListener('click', () => {
            this.showModal('createDeckModal');
        });

        document.getElementById('closeDeckModal').addEventListener('click', () => {
            this.hideModal('createDeckModal');
        });

        document.getElementById('cancelDeckBtn').addEventListener('click', () => {
            this.hideModal('createDeckModal');
        });

        // Create Deck Form
        document.getElementById('createDeckForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createDeck();
        });

        // Add Card Modal
        document.getElementById('closeCardModal').addEventListener('click', () => {
            this.hideModal('addCardModal');
        });

        document.getElementById('cancelCardBtn').addEventListener('click', () => {
            this.hideModal('addCardModal');
        });

        // Add Card Form
        document.getElementById('addCardForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCard();
        });

        // Edit Deck Modal
        document.getElementById('closeEditDeckModal').addEventListener('click', () => {
            this.hideModal('editDeckModal');
        });

        document.getElementById('closeEditBtn').addEventListener('click', () => {
            this.hideModal('editDeckModal');
        });

        document.getElementById('addCardBtn').addEventListener('click', () => {
            this.hideModal('editDeckModal');
            this.showModal('addCardModal');
        });

        document.getElementById('deleteDeckBtn').addEventListener('click', () => {
            this.deleteDeck();
        });

        // Study Controls
        document.getElementById('backToDecks').addEventListener('click', () => {
            this.backToDecks();
        });

        document.getElementById('shuffleBtn').addEventListener('click', () => {
            this.shuffleDeck();
        });

        document.getElementById('resetProgressBtn').addEventListener('click', () => {
            this.resetStudySession();
        });

        // Flashcard Controls
        document.getElementById('flashcard').addEventListener('click', () => {
            this.flipCard();
        });

        document.getElementById('correctBtn').addEventListener('click', () => {
            this.markCard('correct');
        });

        document.getElementById('againBtn').addEventListener('click', () => {
            this.markCard('again');
        });

        document.getElementById('wrongBtn').addEventListener('click', () => {
            this.markCard('wrong');
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            this.previousCard();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextCard();
        });

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideAllModals();
            }
        });

        // Updated Keyboard shortcuts with isTyping check
        document.addEventListener('keydown', (e) => {
            const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
            if (isTyping) return;

            if (this.currentDeck && document.getElementById('flashcardContainer').style.display !== 'none') {
                switch(e.key) {
                    case ' ':
                        e.preventDefault();
                        this.flipCard();
                        break;
                    case 'ArrowLeft':
                        this.previousCard();
                        break;
                    case 'ArrowRight':
                        this.nextCard();
                        break;
                    case '1':
                        this.markCard('wrong');
                        break;
                    case '2':
                        this.markCard('again');
                        break;
                    case '3':
                        this.markCard('correct');
                        break;
                }
            }
        });
    }

    // ... rest of the code remains unchanged (already provided above)
}

// Initialize the application
let flipLearner;

document.addEventListener('DOMContentLoaded', () => {
    flipLearner = new FlipLearner();

    if (flipLearner.decks.length === 0) {
        const sampleDeck = {
            id: 'sample-1',
            name: 'Sample Deck - JavaScript Basics',
            description: 'Basic JavaScript concepts for beginners',
            cards: [
                {
                    id: 'card-1',
                    question: 'What is a variable in JavaScript?',
                    answer: 'A variable is a container that stores data values. It can be declared using var, let, or const keywords.',
                    createdAt: new Date().toISOString(),
                    stats: { timesStudied: 0, correctCount: 0, wrongCount: 0, lastStudied: null }
                },
                {
                    id: 'card-2',
                    question: 'What is the difference between let and const?',
                    answer: 'let allows you to reassign values, while const creates a constant that cannot be reassigned after declaration.',
                    createdAt: new Date().toISOString(),
                    stats: { timesStudied: 0, correctCount: 0, wrongCount: 0, lastStudied: null }
                },
                {
                    id: 'card-3',
                    question: 'What is a function in JavaScript?',
                    answer: 'A function is a reusable block of code that performs a specific task. It can accept parameters and return values.',
                    createdAt: new Date().toISOString(),
                    stats: { timesStudied: 0, correctCount: 0, wrongCount: 0, lastStudied: null }
                }
            ],
            createdAt: new Date().toISOString(),
            stats: { totalStudied: 0, correctAnswers: 0, lastStudied: null }
        };

        flipLearner.decks.push(sampleDeck);
        flipLearner.saveDecks();
        flipLearner.renderDecks();
    }
});

