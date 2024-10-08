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
    }
}

window.onload = () => {
    new StoryMaker();
};
