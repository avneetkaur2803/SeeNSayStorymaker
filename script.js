class StoryMaker {
    constructor() {
        this.words = [
            ["A brave knight", "A clever fox", "An old wizard"],   // Characters
            ["rescued", "found", "defeated"],                      // Actions
            ["a dragon", "a treasure", "a dark curse"],            // Objects
            ["in a magical forest", "on a distant planet", "in a hidden cave"], // Places
            ["and lived happily ever after", "and became a legend", "and changed the world"] // Endings
        ];
        this.selectedWords = Array(this.words.length).fill('');
        this.initButtons();
    }

    initButtons() {
        for (let i = 0; i < this.words.length; i++) {
            const button = document.getElementById(`word${i + 1}`);
            const span = document.getElementById(`selectedWord${i + 1}`);
            button.addEventListener('click', () => {
                this.selectWord(i, span);
            });
        }

        document.getElementById('showStory').addEventListener('click', () => {
            this.showStory();
        });

        document.getElementById('randomStory').addEventListener('click', () => {
            this.generateRandomStory();
        });

        document.getElementById('reset').addEventListener('click', () => {
            this.resetSelections();
        });
    }

    selectWord(index, span) {
        const wordsArray = this.words[index];
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        this.selectedWords[index] = wordsArray[randomIndex];
        span.textContent = this.selectedWords[index];
    }

    showStory() {
        const story = this.selectedWords.join(' ');
        document.getElementById('storyOutput').textContent = story;
        this.speakStory(story); // Call the speakStory method to read aloud the story
    }

    generateRandomStory() {
        this.selectedWords = this.words.map(wordsArray => {
            const randomIndex = Math.floor(Math.random() * wordsArray.length);
            return wordsArray[randomIndex];
        });
        this.updateStoryDisplay();
    }

    resetSelections() {
        this.selectedWords.fill('');
        for (let i = 1; i <= this.words.length; i++) {
            document.getElementById(`selectedWord${i}`).textContent = '';
        }
        document.getElementById('storyOutput').textContent = '';
    }

    updateStoryDisplay() {
        for (let i = 0; i < this.selectedWords.length; i++) {
            document.getElementById(`selectedWord${i + 1}`).textContent = this.selectedWords[i];
        }
        this.showStory();
    }

    speakStory(story) {
        const utterance = new SpeechSynthesisUtterance(story);
        speechSynthesis.speak(utterance);
    }
}

window.onload = () => {
    new StoryMaker();
};
