class StoryMaker {
    constructor() {
        this.words = [
            ["A brave knight", "A clever fox", "An old wizard"],   // Characters
            ["rescued", "found", "defeated"],                      // Actions
            ["a dragon", "a treasure", "a dark curse"],            // Objects
            ["in a magical forest", "on a distant planet", "in a hidden cave"], // Places
            ["and lived happily ever after", "and became a legend", "and changed the world"] // Endings
        ];
        this.selectedWords = Array(this.words.length).fill(''); // Initialize selected words
        this.audio = new Audio('button-click.mp3'); // Load the audio file once
        this.initButtons(); // Initialize buttons and their functionality
    }

    initButtons() {
        // Add event listeners to each word selection button
        for (let i = 0; i < this.words.length; i++) {
            const button = document.getElementById(`word${i + 1}`);
            const span = document.getElementById(`selectedWord${i + 1}`);
            button.addEventListener('click', () => {
                this.selectWord(i, span); // Select a word and update the display
                this.playSound(); // Play sound on button click
            });
        }

        // Event listener for showing the constructed story
        document.getElementById('showStory').addEventListener('click', () => {
            this.showStory(); // Display the constructed story

        });

        // Event listener for generating a random story
        document.getElementById('randomStory').addEventListener('click', () => {
            this.generateRandomStory(); // Create a random story
            
        });

        // Event listener for resetting selections
        document.getElementById('reset').addEventListener('click', () => {
            this.resetSelections(); // Clear all selections and outputs
            
        });
    }

    // Method to select a word from the array
    selectWord(index, span) {
        const wordsArray = this.words[index];
        const randomIndex = Math.floor(Math.random() * wordsArray.length); // Select a random word
        this.selectedWords[index] = wordsArray[randomIndex]; // Update the selected words array
        span.textContent = this.selectedWords[index]; // Display the selected word
    }

    // Method to display the constructed story
    showStory() {
        const story = this.selectedWords.join(' '); // Join selected words to form a story
        document.getElementById('storyOutput').textContent = story; // Output the story
        this.speakStory(story); // Read aloud the story
    }

    // Method to generate a random story
    generateRandomStory() {
        this.selectedWords = this.words.map(wordsArray => {
            const randomIndex = Math.floor(Math.random() * wordsArray.length); // Select random words
            return wordsArray[randomIndex]; // Return the randomly selected word
        });
        this.updateStoryDisplay(); // Update the display to show the new story
    }

    // Method to reset all selections and outputs
    resetSelections() {
        this.selectedWords.fill(''); // Clear selected words
        for (let i = 1; i <= this.words.length; i++) {
            document.getElementById(`selectedWord${i}`).textContent = ''; // Clear displayed words
        }
        document.getElementById('storyOutput').textContent = ''; // Clear story output
    }

    // Method to update the display with selected words
    updateStoryDisplay() {
        for (let i = 0; i < this.selectedWords.length; i++) {
            document.getElementById(`selectedWord${i + 1}`).textContent = this.selectedWords[i]; // Update displays
        }
        this.showStory(); // Show the constructed story
    }

    // Method to read the constructed story aloud
    speakStory(story) {
        const utterance = new SpeechSynthesisUtterance(story); // Create speech utterance
        speechSynthesis.speak(utterance); // Speak the story
    }

    // Method to play button click sound
    playSound() {
        this.audio.currentTime = 0; // Rewind the audio to the start
        this.audio.play().catch(error => console.error('Audio playback failed:', error));
    }
}

// Initialize the StoryMaker when the window loads
window.onload = () => {
    new StoryMaker();
};
