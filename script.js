document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const questionScreen = document.getElementById('question-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    const cringeContent = document.getElementById('cringe-content');
    const heartsContainer = document.getElementById('hearts-container');

    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    // Evasive No Button Logic
    function moveButton() {
        const padding = 100;

        // Get dimensions before switching to fixed to maintain size
        const { width, height } = noBtn.getBoundingClientRect();

        const maxX = window.innerWidth - width - padding;
        const maxY = window.innerHeight - height - padding;

        const randomX = Math.max(padding, Math.random() * maxX);
        const randomY = Math.max(padding, Math.random() * maxY);

        noBtn.style.position = 'fixed';
        noBtn.style.width = `${width}px`;
        noBtn.style.height = `${height}px`;
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = '1000';
    }

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    // Yes Button Logic
    yesBtn.addEventListener('click', () => {
        questionScreen.classList.add('hidden');
        celebrationScreen.classList.remove('hidden');

        startLoading();
    });

    function startLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                showCringe();
            }
            loadingBar.style.width = `${progress}%`;

            // Fun loading messages
            if (progress > 20 && progress < 40) loadingText.textContent = "Syncing Heartbeats... 💓";
            if (progress > 40 && progress < 60) loadingText.textContent = "Checking compatibility... (100%!!) 😍";
            if (progress > 60 && progress < 80) loadingText.textContent = "Preparing the ultimate 'I Love You'... 💖";
            if (progress > 80 && progress < 99) loadingText.textContent = "Almost there, cutie... ✨";
        }, 50);
    }

    function showCringe() {
        loadingText.classList.add('hidden');
        document.querySelector('.loading-bar-container').classList.add('hidden');
        cringeContent.classList.remove('hidden');

        // Intensify hearts
        setInterval(createHeart, 100);
    }
});
