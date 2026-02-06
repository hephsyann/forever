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

        setupGiftInteractions();
    }

    function setupGiftInteractions() {
        const giftGrid = document.querySelector('.gift-grid');
        const giftBoxes = Array.from(document.querySelectorAll('.gift-box'));
        const overlays = document.querySelectorAll('.overlay');
        const closeBtns = document.querySelectorAll('.close-overlay');

        // Shuffle gift boxes
        for (let i = giftBoxes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            giftGrid.appendChild(giftBoxes[j]);
            [giftBoxes[i], giftBoxes[j]] = [giftBoxes[j], giftBoxes[i]];
        }

        giftBoxes.forEach((box) => {
            const index = parseInt(box.getAttribute('data-index'));
            box.addEventListener('click', function () {
                if (!this.classList.contains('open')) {
                    this.classList.add('open');
                    createSparkles(this);

                    // Delay opening the overlay slightly for the animation
                    setTimeout(() => {
                        const overlayId = `overlay-${index + 1}`;
                        document.getElementById(overlayId).classList.add('active');

                        if (index === 1) initQuiz(); // Box 2 is the quiz
                    }, 800);
                } else {
                    // If already open, just show overlay again
                    const overlayId = `overlay-${index + 1}`;
                    document.getElementById(overlayId).classList.add('active');
                    if (index === 1) initQuiz();
                }
            });
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.overlay').classList.remove('active');
            });
        });
    }

    // --- Quiz Logic ---
    const quizData = [
        {
            question: "Who is the boss in this relationship? 😎",
            options: ["You", "Me", "Neither of us"],
            correct: 1 // "Me"
        },
        {
            question: "Who loves to irritate or annoy? 😜",
            options: ["Him", "Me", "Both"],
            correct: 0 // "Him"
        },
        {
            question: "Where do I plan to settle? 🌍",
            options: ["Moon", "His Heart", "Africa"],
            correct: 1 // "His Heart"
        }
    ];

    let currentQuestion = 0;

    function initQuiz() {
        currentQuestion = 0;
        showQuestion();
    }

    function showQuestion() {
        const container = document.getElementById('quiz-container');
        const q = quizData[currentQuestion];

        container.innerHTML = `
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option" onclick="checkAnswer(${i})">${opt}</div>
                `).join('')}
            </div>
            <div id="quiz-feedback" style="margin-top: 1.5rem; font-weight: 600; min-height: 1.5rem;"></div>
        `;
    }

    window.checkAnswer = function (choice) {
        const feedback = document.getElementById('quiz-feedback');
        const options = document.querySelectorAll('.quiz-option');

        if (choice === quizData[currentQuestion].correct) {
            options[choice].classList.add('correct');
            feedback.innerHTML = "Correct! ✨ Moving to next...";
            feedback.style.color = "#28a745";

            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < quizData.length) {
                    showQuestion();
                } else {
                    document.getElementById('quiz-container').innerHTML = `
                        <h3 class="title pink-text">Quiz Complete! 💖</h3>
                        <p>You know me so well! 🥰</p>
                    `;
                }
            }, 1500);
        } else {
            options[choice].classList.add('wrong');
            feedback.innerHTML = "Oho, try again! 🤭";
            feedback.style.color = "#dc3545";

            setTimeout(() => {
                feedback.innerHTML = "";
                options[choice].classList.remove('wrong');
            }, 1000);
        }
    };

    // --- Truth or Dare Logic ---
    const tdData = {
        truth: [
            "What was your first impression of me?",
            "What's one thing you're most afraid of losing?",
            "What's the most romantic thing you've ever thought about us?",
            "If you could change one thing about our first meeting, what would it be?",
            "What's your favorite memory of us together?"
        ],
        dare: [
            "Send me a voice note saying something sweet right now!",
            "Take a silly selfie and send it to me!",
            "Call me and tell me you love me!",
            "Write a 3-line poem about my eyes.",
            "Post a picture of us (or just me) on your status with a cute caption!"
        ]
    };

    window.playTD = function (type) {
        const result = document.getElementById('td-result');
        const items = tdData[type];
        const randomItem = items[Math.floor(Math.random() * items.length)];

        result.style.opacity = '0';
        setTimeout(() => {
            result.innerHTML = `<strong>${type.toUpperCase()}:</strong> ${randomItem}`;
            result.style.opacity = '1';
        }, 300);
    };

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + rect.width / 2) + 'px';
            sparkle.style.top = (rect.top + rect.height / 2) + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '2000';
            sparkle.style.fontSize = (Math.random() * 15 + 10) + 'px';
            sparkle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            document.body.appendChild(sparkle);

            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 200 + 50;
                sparkle.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
                sparkle.style.opacity = '0';
            }, 50);

            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    const hugBtn = document.getElementById('hug-btn');
    if (hugBtn) {
        hugBtn.addEventListener('click', () => {
            // Mega heart explosion
            for (let i = 0; i < 60; i++) {
                setTimeout(createHeart, i * 30);
            }
            hugBtn.innerHTML = "Aww! I love you too! 🥰💖";
            hugBtn.disabled = true;
            hugBtn.style.transform = "scale(1.1)";

            // Add a sweet message change
            const title = document.querySelector('.love-note-section .title');
            title.textContent = "You're my everything! ❤️";
        });
    }
});
