document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById('player');
    const obstacle = document.getElementById('obstacle');
    const scoreDisplay = document.getElementById('score');

    let isJumping = false;
    let gravity = 0.95;  // Reduced gravity for a smoother jump
    let score = 0;

    function jump() {
        if (isJumping) return;
        let position = 0;
        isJumping = true;

        let upInterval = setInterval(() => {
            if (position >= 120) {
                clearInterval(upInterval);

                let downInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    position -= 3;  // Slower descent
                    position = position * gravity;
                    player.style.bottom = position + 'px';
                }, 20);
            }
            position += 20;  // Slower ascent
            position = position * gravity;
            player.style.bottom = position + 'px';
        }, 20);
    }

    function checkCollision() {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top
        ) {
            alert('Game Over! Your score: ' + score);
            document.location.reload();
        }

        
        if (obstacleRect.right < playerRect.left && obstacleRect.right >= playerRect.left - 30) {
            score++;
            scoreDisplay.textContent = score;
            resetObstacle();
        }
    }

    function resetObstacle() {
        obstacle.style.right = '-30px';
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            jump();
        }
    });

    document.addEventListener('touchstart', (event) => {
        jump();
    });

    setInterval(checkCollision, 10);
});
