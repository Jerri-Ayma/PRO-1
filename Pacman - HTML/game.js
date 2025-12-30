const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        const TILE_SIZE = 20;
        const COLS = 28;
        const ROWS = 31;

        // Mapa del laberinto (0 = pasillo, 1 = pared, 2 = punto, 3 = power pellet, 4 = casa de fantasmas)
        const maze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
            [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,4,4,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,1,1,1,1,1],
            [0,0,0,0,0,0,2,0,0,0,1,4,4,4,4,4,4,1,0,0,0,2,0,0,0,0,0,0],
            [1,1,1,1,1,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
            [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
            [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
            [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
            [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        let gameState = {
            score: 0,
            highScore: localStorage.getItem('pacmanHighScore') || 0,
            level: 1,
            lives: 3,
            paused: false,
            gameOver: false,
            powerMode: false,
            powerModeTimer: 0,
            dotsRemaining: 0
        };

        class Pacman {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = 14;
                this.y = 23;
                // Posición visual (interpolada) para movimiento fluido
                this.visualX = 14;
                this.visualY = 23;
                this.direction = { x: 0, y: 0 };
                this.nextDirection = { x: 0, y: 0 };
                this.mouthOpen = 0;
                this.mouthSpeed = 0.05;
                this.speed = 0.08; // Velocidad de movimiento fluido (ajustable)
            }

            update() {
                // Intentar cambiar de dirección cuando llega a una celda completa
                if (this.isAtCenter()) {
                    let nextX = Math.round(this.visualX) + this.nextDirection.x;
                    let nextY = Math.round(this.visualY) + this.nextDirection.y;
                    
                    if (this.canMove(nextX, nextY)) {
                        this.direction = { ...this.nextDirection };
                    }
                }

                // ⭐ Ajustar velocidad según power mode
                let currentSpeed = gameState.powerMode ? this.speed * 1.4 : this.speed;

                // Movimiento fluido continuo
                if (this.direction.x !== 0 || this.direction.y !== 0) {
                    let nextVisualX = this.visualX + this.direction.x * currentSpeed;
                    let nextVisualY = this.visualY + this.direction.y * currentSpeed;

                    // ⭐ Manejo especial del túnel - permitir movimiento fuera de límites
                    let canContinue = false;
                    
                    // Si está cerca de los bordes, siempre permitir movimiento (túnel)
                    if (nextVisualX < -0.5 || nextVisualX >= COLS - 0.5) {
                        canContinue = true;
                    } else {
                        // Verificar si puede continuar moviéndose normalmente
                        let targetX = Math.round(nextVisualX + this.direction.x * 0.5);
                        let targetY = Math.round(nextVisualY + this.direction.y * 0.5);
                        canContinue = this.canMove(targetX, targetY);
                    }

                    if (canContinue) {
                        this.visualX = nextVisualX;
                        this.visualY = nextVisualY;

                        // Túnel (envolver alrededor de la pantalla)
                        if (this.visualX < -0.5) {
                            this.visualX = COLS - 0.5;
                            this.x = COLS - 1;
                        } else if (this.visualX >= COLS - 0.5) {
                            this.visualX = -0.5;
                            this.x = 0;
                        } else {
                            // Actualizar posición en grid cuando cruza el centro de una celda
                            this.x = Math.round(this.visualX);
                            this.y = Math.round(this.visualY);
                        }

                        // Comer puntos (solo cuando está en el centro de la celda)
                        if (this.isAtCenter() && this.x >= 0 && this.x < COLS && this.y >= 0 && this.y < ROWS) {
                            const tile = maze[this.y][this.x];
                            if (tile === 2) {
                                maze[this.y][this.x] = 0;
                                gameState.score += 10;
                                gameState.dotsRemaining--;
                            } else if (tile === 3) {
                                maze[this.y][this.x] = 0;
                                gameState.score += 50;
                                gameState.powerMode = true;
                                gameState.powerModeTimer = 380;
                                gameState.dotsRemaining--;
                            }
                        }
                    } else {
                        // Ajustar a la posición más cercana si choca
                        this.visualX = Math.round(this.visualX);
                        this.visualY = Math.round(this.visualY);
                    }
                }

                // Animar boca
                this.mouthOpen += this.mouthSpeed;
                if (this.mouthOpen > 0.7 || this.mouthOpen < 0) {
                    this.mouthSpeed *= -1;
                }
            }

            isAtCenter() {
                // Verifica si está cerca del centro de una celda
                const distX = Math.abs(this.visualX - Math.round(this.visualX));
                const distY = Math.abs(this.visualY - Math.round(this.visualY));
                return distX < 0.1 && distY < 0.1;
            }

            canMove(x, y) {
                if (y < 0 || y >= ROWS || x < 0 || x >= COLS) return true; // Túnel
                const tile = maze[y][x];
                return tile !== 1 && tile !== 4;
            }

            draw() {
                const centerX = this.visualX * TILE_SIZE + TILE_SIZE / 2;
                const centerY = this.visualY * TILE_SIZE + TILE_SIZE / 2;
                const radius = TILE_SIZE / 2 - 2;

                // Determinar ángulo de la boca según dirección
                let startAngle = 0;
                if (this.direction.x === 1) startAngle = 0;
                else if (this.direction.x === -1) startAngle = Math.PI;
                else if (this.direction.y === -1) startAngle = Math.PI * 1.5;
                else if (this.direction.y === 1) startAngle = Math.PI * 0.5;

                const mouthAngle = this.mouthOpen * Math.PI / 4;

                ctx.fillStyle = '#FFFF00';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngle + mouthAngle, startAngle + (Math.PI * 2) - mouthAngle);
                ctx.lineTo(centerX, centerY);
                ctx.fill();

                // Sombra/glow
                ctx.shadowColor = '#FFFF00';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        class Ghost {
            constructor(x, y, color, personality) {
                this.startX = x;
                this.startY = y;
                this.x = x;
                this.y = y;
                // Posición visual (interpolada) para movimiento fluido
                this.visualX = x;
                this.visualY = y;
                this.color = color;
                this.direction = { x: 0, y: 0 };
                this.personality = personality;
                this.scared = false;
                this.speed = 0.06; // Ligeramente más lento que Pacman (0.08)
                this.decisionCooldown = 0;
            }

            reset() {
                this.x = this.startX;
                this.y = this.startY;
                this.visualX = this.startX;
                this.visualY = this.startY;
                this.direction = { x: 0, y: 0 };
                this.decisionCooldown = 0;
            }

            update(pacman) {
                this.scared = gameState.powerMode;

                // Tomar decisiones solo cuando está en el centro de una celda
                if (this.isAtCenter()) {
                    this.decisionCooldown--;
                    
                    if (this.decisionCooldown <= 0) {
                        if (this.scared) {
                            this.moveRandom();
                        } else {
                            switch(this.personality) {
                                case 'chase':
                                    this.chasePacman(pacman);
                                    break;
                                case 'ambush':
                                    this.ambushPacman(pacman);
                                    break;
                                case 'patrol':
                                    this.patrol();
                                    break;
                                default:
                                    this.moveRandom();
                            }
                        }
                        this.decisionCooldown = 5; // Tomar decisión cada 5 frames en el centro
                    }
                }

                // Movimiento fluido continuo
                if (this.direction.x !== 0 || this.direction.y !== 0) {
                    let nextVisualX = this.visualX + this.direction.x * this.speed;
                    let nextVisualY = this.visualY + this.direction.y * this.speed;

                    // ⭐ Manejo especial del túnel - permitir movimiento fuera de límites
                    let canContinue = false;
                    
                    // Si está cerca de los bordes, siempre permitir movimiento (túnel)
                    if (nextVisualX < -0.5 || nextVisualX >= COLS - 0.5) {
                        canContinue = true;
                    } else {
                        // Verificar si puede continuar moviéndose normalmente
                        let targetX = Math.round(nextVisualX + this.direction.x * 0.5);
                        let targetY = Math.round(nextVisualY + this.direction.y * 0.5);
                        canContinue = this.canMove(targetX, targetY);
                    }

                    if (canContinue) {
                        this.visualX = nextVisualX;
                        this.visualY = nextVisualY;

                        // Túnel (envolver alrededor de la pantalla)
                        if (this.visualX < -0.5) {
                            this.visualX = COLS - 0.5;
                            this.x = COLS - 1;
                        } else if (this.visualX >= COLS - 0.5) {
                            this.visualX = -0.5;
                            this.x = 0;
                        } else {
                            // Actualizar posición en grid
                            this.x = Math.round(this.visualX);
                            this.y = Math.round(this.visualY);
                        }
                    } else {
                        // Ajustar a la posición más cercana si choca
                        this.visualX = Math.round(this.visualX);
                        this.visualY = Math.round(this.visualY);
                    }
                }
            }

            isAtCenter() {
                const distX = Math.abs(this.visualX - Math.round(this.visualX));
                const distY = Math.abs(this.visualY - Math.round(this.visualY));
                return distX < 0.1 && distY < 0.1;
            }

            chasePacman(pacman) {
                const directions = [
                    { x: 0, y: -1 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                    { x: 1, y: 0 }
                ];

                let bestDir = this.direction;
                let minDist = Infinity;

                for (let dir of directions) {
                    const nextX = Math.round(this.visualX) + dir.x;
                    const nextY = Math.round(this.visualY) + dir.y;
                    
                    if (this.canMove(nextX, nextY) && 
                        !(dir.x === -this.direction.x && dir.y === -this.direction.y)) {
                        const dist = Math.abs(nextX - pacman.x) + Math.abs(nextY - pacman.y);
                        if (dist < minDist) {
                            minDist = dist;
                            bestDir = dir;
                        }
                    }
                }

                this.direction = bestDir;
            }

            ambushPacman(pacman) {
                const targetX = pacman.x + pacman.direction.x * 4;
                const targetY = pacman.y + pacman.direction.y * 4;
                
                const directions = [
                    { x: 0, y: -1 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                    { x: 1, y: 0 }
                ];

                let bestDir = this.direction;
                let minDist = Infinity;

                for (let dir of directions) {
                    const nextX = Math.round(this.visualX) + dir.x;
                    const nextY = Math.round(this.visualY) + dir.y;
                    
                    if (this.canMove(nextX, nextY) && 
                        !(dir.x === -this.direction.x && dir.y === -this.direction.y)) {
                        const dist = Math.abs(nextX - targetX) + Math.abs(nextY - targetY);
                        if (dist < minDist) {
                            minDist = dist;
                            bestDir = dir;
                        }
                    }
                }

                this.direction = bestDir;
            }

            patrol() {
                if (Math.random() < 0.05) {
                    this.moveRandom();
                }
            }

            moveRandom() {
                const directions = [
                    { x: 0, y: -1 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                    { x: 1, y: 0 }
                ];

                const validDirs = directions.filter(dir => {
                    const nextX = Math.round(this.visualX) + dir.x;
                    const nextY = Math.round(this.visualY) + dir.y;
                    return this.canMove(nextX, nextY) && 
                           !(dir.x === -this.direction.x && dir.y === -this.direction.y);
                });

                if (validDirs.length > 0) {
                    this.direction = validDirs[Math.floor(Math.random() * validDirs.length)];
                }
            }

            canMove(x, y) {
                if (y < 0 || y >= ROWS || x < 0 || x >= COLS) return true;
                const tile = maze[y][x];
                return tile !== 1;
            }

            draw() {
                const centerX = this.visualX * TILE_SIZE + TILE_SIZE / 2;
                const centerY = this.visualY * TILE_SIZE + TILE_SIZE / 2;
                const radius = TILE_SIZE / 2 - 2;

                if (this.scared) {
                    ctx.fillStyle = '#0000FF';
                } else {
                    ctx.fillStyle = this.color;
                }

                // Cuerpo del fantasma
                ctx.beginPath();
                ctx.arc(centerX, centerY - 2, radius, Math.PI, 0);
                ctx.lineTo(centerX + radius, centerY + radius);
                ctx.lineTo(centerX + radius - 4, centerY + radius - 4);
                ctx.lineTo(centerX + radius - 8, centerY + radius);
                ctx.lineTo(centerX, centerY + radius - 4);
                ctx.lineTo(centerX - radius + 8, centerY + radius);
                ctx.lineTo(centerX - radius + 4, centerY + radius - 4);
                ctx.lineTo(centerX - radius, centerY + radius);
                ctx.closePath();
                ctx.fill();

                // Ojos
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(centerX - 4, centerY - 2, 3, 0, Math.PI * 2);
                ctx.arc(centerX + 4, centerY - 2, 3, 0, Math.PI * 2);
                ctx.fill();

                if (!this.scared) {
                    ctx.fillStyle = 'black';
                    ctx.beginPath();
                    ctx.arc(centerX - 4, centerY - 2, 1.5, 0, Math.PI * 2);
                    ctx.arc(centerX + 4, centerY - 2, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Glow
                ctx.shadowColor = this.scared ? '#0000FF' : this.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Inicializar entidades
        const pacman = new Pacman();
        const ghosts = [
            new Ghost(13, 11, '#FF0000', 'chase'),    // Blinky - rojo
            new Ghost(14, 14, '#FFB8FF', 'ambush'),   // Pinky - rosa
            new Ghost(12, 14, '#00FFFF', 'patrol'),   // Inky - cyan
            new Ghost(15, 14, '#FFB852', 'random')    // Clyde - naranja
        ];

        // Contar puntos iniciales
        function countDots() {
            let count = 0;
            for (let row of maze) {
                for (let tile of row) {
                    if (tile === 2 || tile === 3) count++;
                }
            }
            return count;
        }

        gameState.dotsRemaining = countDots();

        // ⚙️ CONFIGURACIÓN DE CONTROL
        // Cambia esto a true si quieres que Pacman se detenga al soltar la tecla
        // false = Comportamiento clásico (sigue moviéndose hasta cambiar dirección o chocar)
        // true = Se detiene cuando sueltas la tecla
        const STOP_ON_KEY_RELEASE = false;

        // Variable para rastrear teclas presionadas
        let keysPressed = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        // Controles - Presionar tecla
        document.addEventListener('keydown', (e) => {
            if (gameState.gameOver) return;

            switch(e.key) {
                case 'ArrowUp':
                    keysPressed.up = true;
                    pacman.nextDirection = { x: 0, y: -1 };
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    keysPressed.down = true;
                    pacman.nextDirection = { x: 0, y: 1 };
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    keysPressed.left = true;
                    pacman.nextDirection = { x: -1, y: 0 };
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    keysPressed.right = true;
                    pacman.nextDirection = { x: 1, y: 0 };
                    e.preventDefault();
                    break;
                case ' ':
                    gameState.paused = !gameState.paused;
                    e.preventDefault();
                    break;
                case 'Escape':
                    restartGame();
                    e.preventDefault();
                    break;
            }
        });

        // Controles - Soltar tecla
        document.addEventListener('keyup', (e) => {
            if (!STOP_ON_KEY_RELEASE || gameState.gameOver) return;

            let shouldStop = false;

            switch(e.key) {
                case 'ArrowUp':
                    keysPressed.up = false;
                    if (pacman.direction.y === -1) shouldStop = true;
                    break;
                case 'ArrowDown':
                    keysPressed.down = false;
                    if (pacman.direction.y === 1) shouldStop = true;
                    break;
                case 'ArrowLeft':
                    keysPressed.left = false;
                    if (pacman.direction.x === -1) shouldStop = true;
                    break;
                case 'ArrowRight':
                    keysPressed.right = false;
                    if (pacman.direction.x === 1) shouldStop = true;
                    break;
            }

            // Detener si soltaste la tecla de la dirección actual
            // y no hay otra tecla de dirección presionada
            if (shouldStop && !keysPressed.up && !keysPressed.down && 
                !keysPressed.left && !keysPressed.right) {
                pacman.direction = { x: 0, y: 0 };
                pacman.nextDirection = { x: 0, y: 0 };
            }
        });

        function drawMaze() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLS; col++) {
                    const tile = maze[row][col];
                    const x = col * TILE_SIZE;
                    const y = row * TILE_SIZE;

                    if (tile === 1) {
                        // Paredes
                        ctx.fillStyle = '#2121DE';
                        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                        ctx.strokeStyle = '#4848FF';
                        ctx.lineWidth = 1;
                        ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE);
                    } else if (tile === 2) {
                        // Puntos pequeños
                        ctx.fillStyle = '#FFB8AE';
                        ctx.beginPath();
                        ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 2, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (tile === 3) {
                        // Power pellets
                        ctx.fillStyle = '#FFB8AE';
                        ctx.beginPath();
                        ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 5, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.shadowColor = '#FFB8AE';
                        ctx.shadowBlur = 10;
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    } else if (tile === 4) {
                        // Casa de fantasmas
                        ctx.fillStyle = '#000033';
                        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
                    }
                }
            }
        }

        function checkCollisions() {
            for (let ghost of ghosts) {
                // Usar distancia visual para colisiones más precisas
                const distX = Math.abs(pacman.visualX - ghost.visualX);
                const distY = Math.abs(pacman.visualY - ghost.visualY);
                const distance = Math.sqrt(distX * distX + distY * distY);
                
                if (distance < 0.6) { // Tolerancia de colisión
                    if (gameState.powerMode) {
                        // Comer fantasma
                        ghost.reset();
                        gameState.score += 200;
                    } else {
                        // Perder vida
                        gameState.lives--;
                        if (gameState.lives <= 0) {
                            gameState.gameOver = true;
                            showGameOver();
                        } else {
                            resetPositions();
                        }
                    }
                }
            }
        }

        function resetPositions() {
            pacman.reset();
            ghosts.forEach(ghost => ghost.reset());
        }

        function updateGame() {
            if (gameState.paused || gameState.gameOver) return;

            pacman.update();
            ghosts.forEach(ghost => ghost.update(pacman));
            checkCollisions();

            // Power mode timer
            if (gameState.powerMode) {
                gameState.powerModeTimer--;
                if (gameState.powerModeTimer <= 0) {
                    gameState.powerMode = false;
                }
            }

            // Verificar si se completó el nivel
            if (gameState.dotsRemaining <= 0) {
                gameState.level++;
                resetLevel();
            }

            // Actualizar high score
            if (gameState.score > gameState.highScore) {
                gameState.highScore = gameState.score;
                localStorage.setItem('pacmanHighScore', gameState.highScore);
            }

            updateUI();
        }

        function resetLevel() {
            // Restaurar puntos
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLS; col++) {
                    if (maze[row][col] === 0 && 
                        !(row >= 11 && row <= 16 && col >= 10 && col <= 17)) {
                        // Restaurar puntos (excepto en la casa de fantasmas)
                        if ((row === 3 && col === 1) || (row === 3 && col === 26) ||
                            (row === 23 && col === 1) || (row === 23 && col === 26)) {
                            maze[row][col] = 3; // Power pellets
                        } else {
                            maze[row][col] = 2; // Puntos normales
                        }
                    }
                }
            }
            gameState.dotsRemaining = countDots();
            resetPositions();
        }

        function drawGame() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawMaze();
            ghosts.forEach(ghost => ghost.draw());
            pacman.draw();

            // Efecto de power mode
            if (gameState.powerMode) {
                ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // ⭐ Indicador de tiempo restante del power mode
                const powerTimePercent = gameState.powerModeTimer / 380;
                const barWidth = 200;
                const barHeight = 15;
                const barX = (canvas.width - barWidth) / 2;
                const barY = 10;
                
                // Borde de la barra
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 2;
                ctx.strokeRect(barX, barY, barWidth, barHeight);
                
                // Relleno de la barra (se va vaciando)
                const fillWidth = barWidth * powerTimePercent;
                const gradient = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
                gradient.addColorStop(0, '#00FFFF');
                gradient.addColorStop(0.5, '#0099FF');
                gradient.addColorStop(1, '#0000FF');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(barX, barY, fillWidth, barHeight);
                
                // Texto "POWER MODE"
                ctx.fillStyle = '#FFFF00';
                ctx.font = '10px "Press Start 2P"';
                ctx.textAlign = 'center';
                ctx.fillText('POWER MODE', canvas.width / 2, barY + barHeight + 15);
                ctx.textAlign = 'left';
            }
        }

        function updateUI() {
            document.getElementById('score').textContent = gameState.score;
            document.getElementById('highScore').textContent = gameState.highScore;
            document.getElementById('level').textContent = gameState.level;
            
            // Actualizar vidas
            const livesContainer = document.getElementById('lives');
            livesContainer.innerHTML = '';
            for (let i = 0; i < gameState.lives; i++) {
                const life = document.createElement('div');
                life.className = 'life';
                livesContainer.appendChild(life);
            }
        }

        function gameLoop() {
            updateGame();
            drawGame();
            requestAnimationFrame(gameLoop);
        }

        function startGame() {
            document.getElementById('gameStart').style.display = 'none';
            gameState.gameOver = false;
            gameLoop();
        }

        function showGameOver() {
            document.getElementById('finalScore').textContent = gameState.score;
            document.getElementById('gameOver').style.display = 'block';
        }

        function restartGame() {
            gameState = {
                score: 0,
                highScore: localStorage.getItem('pacmanHighScore') || 0,
                level: 1,
                lives: 3,
                paused: false,
                gameOver: false,
                powerMode: false,
                powerModeTimer: 0,
                dotsRemaining: 0
            };
            
            resetLevel();
            document.getElementById('gameOver').style.display = 'none';
            updateUI();
        }

        // Mostrar pantalla de inicio
        document.getElementById('gameStart').style.display = 'block';
        updateUI();