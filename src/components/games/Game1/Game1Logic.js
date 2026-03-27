export const PLAYER_WIDTH = 42;
export const PLAYER_HEIGHT = 42;

export const GRAVITY = -0.75;
export const JUMP_FORCE = 15;

export const INITIAL_SPEED = 6;
export const MAX_SPEED = 12;
export const SPEED_INCREMENT = 0.1;

export const GROUND_Y = 0;

export class Game1Logic {
  constructor(screenWidth = 360) {
    this.screenWidth = screenWidth;
    this.reset();
  }

  reset() {
    this.player = {
      x: 60,
      y: GROUND_Y,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      vy: 0,
      isJumping: false,
    };

    this.obstacles = [];
    this.coins = [];
    this.score = 0;
    this.coinsCollected = 0;
    this.speed = INITIAL_SPEED;
    this.gameOver = false;
    this.frame = 0;

    this.obstacleCooldown = 0;
    this.coinCooldown = 0;

    this.mountainsX1 = 0;
    this.mountainsX2 = this.screenWidth;

    this.groundX1 = 0;
    this.groundX2 = this.screenWidth;

    // ✅ ajout minimal
    this.lives = 3;
    this.isHurt = false;
    this.hurtTimer = 0;
    this.invincible = false;
    this.invincibleTimer = 0;
  }

  update() {
    if (this.gameOver) return;

    this.frame++;

    // timers hurt / invincible
    if (this.hurtTimer > 0) {
      this.hurtTimer--;
    } else {
      this.isHurt = false;
    }

    if (this.invincibleTimer > 0) {
      this.invincibleTimer--;
    } else {
      this.invincible = false;
    }

    // Player physics
    this.player.vy += GRAVITY;
    this.player.y += this.player.vy;

    if (this.player.y < GROUND_Y) {
      this.player.y = GROUND_Y;
      this.player.vy = 0;
      this.player.isJumping = false;
    }

    // Background parallax nettoyé
    this.scrollLayer('mountains', 1.2);
    this.scrollLayer('ground', this.speed);

    // Cooldowns
    if (this.obstacleCooldown > 0) this.obstacleCooldown--;
    if (this.coinCooldown > 0) this.coinCooldown--;

    // Spawn obstacles
    if (this.obstacleCooldown <= 0 && Math.random() < 0.025) {
      const types = ['rock', 'box', 'fire', 'spikes'];
      const type = types[Math.floor(Math.random() * types.length)];

      let obstacleWidth = 42;
      let obstacleHeight = 42;

      if (type === 'spikes') {
        obstacleWidth = 44;
        obstacleHeight = 26;
      }

      if (type === 'fire') {
        obstacleWidth = 40;
        obstacleHeight = 40;
      }

      this.obstacles.push({
        x: this.screenWidth + 50,
        y: GROUND_Y,
        width: obstacleWidth,
        height: obstacleHeight,
        type,
      });

      this.obstacleCooldown = 48;
    }

    // Spawn coins
    if (this.coinCooldown <= 0 && Math.random() < 0.02) {
      this.coins.push({
        x: this.screenWidth + 80,
        y: GROUND_Y + 70,
        width: 24,
        height: 24,
        frame: 0,
      });

      this.coinCooldown = 42;
    }

    // Move obstacles
    this.obstacles = this.obstacles.filter((obs) => {
      obs.x -= this.speed;
      return obs.x + obs.width > -40;
    });

    // Move coins
    this.coins = this.coins.filter((coin) => {
      coin.x -= this.speed;
      coin.frame = (coin.frame + 0.2) % 2;
      return coin.x + coin.width > -30;
    });

    // Collisions obstacles
    this.obstacles.forEach((obs) => {
      if (this.checkCollision(this.player, obs) && !this.invincible) {
        this.lives -= 1;
        this.isHurt = true;
        this.hurtTimer = 18;
        this.invincible = true;
        this.invincibleTimer = 50;

        if (this.lives <= 0) {
          this.gameOver = true;
        }
      }
    });

    // Collisions coins
    this.coins = this.coins.filter((coin) => {
      if (this.checkCollision(this.player, coin)) {
        this.coinsCollected++;
        this.score += 10;
        return false;
      }
      return true;
    });

    this.speed = Math.min(this.speed + SPEED_INCREMENT * 0.01, MAX_SPEED);
    this.score += 0.1;
  }

  scrollLayer(prefix, speed) {
    this[`${prefix}X1`] -= speed;
    this[`${prefix}X2`] -= speed;

    if (this[`${prefix}X1`] <= -this.screenWidth) {
      this[`${prefix}X1`] = this[`${prefix}X2`] + this.screenWidth;
    }

    if (this[`${prefix}X2`] <= -this.screenWidth) {
      this[`${prefix}X2`] = this[`${prefix}X1`] + this.screenWidth;
    }
  }

  jump() {
    if (!this.player.isJumping && !this.gameOver) {
      this.player.vy = JUMP_FORCE;
      this.player.isJumping = true;
    }
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
}