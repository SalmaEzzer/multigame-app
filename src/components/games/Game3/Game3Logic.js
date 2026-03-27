export class Game3Logic {
  constructor(screenWidth = 360, screenHeight = 640) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.reset();
  }

  reset() {
    this.player = {
      x: this.screenWidth / 2 - 45,
      y: 150,
      width: 120,
      height: 120,
    };

    this.items = [];
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;

    this.spawnCooldown = 0;
    this.frame = 0;

    this.isHurt = false;
    this.hurtTimer = 0;

    this.invincible = false;
    this.invincibleTimer = 0;

    this.explosions = [];
    this.lastCollectedType = null;
    this.lastHitBomb = false;
  }

  update() {
    if (this.gameOver) return;

    this.frame++;
    this.lastCollectedType = null;
    this.lastHitBomb = false;

    if (this.spawnCooldown > 0) {
      this.spawnCooldown--;
    }

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

    if (this.spawnCooldown <= 0) {
      this.spawnItem();
      this.spawnCooldown = 28;
    }

    this.items = this.items.filter((item) => {
      item.y -= item.speed;

      if (this.checkCollision(this.player, item)) {
        if (item.type === 'coin') {
          this.score += 10;
          this.lastCollectedType = 'coin';
        } else if (item.type === 'chest') {
          this.score += 30;
          this.lastCollectedType = 'chest';
        } else if (item.type === 'bomb') {
          this.hitPlayer(item.x, item.y);
        }
        return false;
      }

      if (item.y + item.height < 0) {
        return false;
      }

      return true;
    });

    this.explosions = this.explosions.filter((exp) => {
      exp.timer -= 1;
      return exp.timer > 0;
    });
  }

  hitPlayer(x, y) {
    if (this.invincible || this.gameOver) return;

    this.lives -= 1;
    this.isHurt = true;
    this.hurtTimer = 20;

    this.invincible = true;
    this.invincibleTimer = 60;
    this.lastHitBomb = true;

    this.explosions.push({
      x,
      y,
      width: 60,
      height: 60,
      timer: 20,
    });

    if (this.lives <= 0) {
      this.gameOver = true;
    }
  }

  spawnItem() {
    const random = Math.random();

    let type = 'coin';
    if (random > 0.68 && random <= 0.88) {
      type = 'chest';
    } else if (random > 0.88) {
      type = 'bomb';
    }

    let size = 42;
    let speed = 4.2;

    if (type === 'chest') {
      size = 65;
      speed = 3.2;
    }

    if (type === 'bomb') {
      size = 46;
      speed = 5.2;
    }

    this.items.push({
      type,
      x: Math.random() * (this.screenWidth - size),
      y: this.screenHeight + 20,
      width: size,
      height: size,
      speed,
    });
  }

  movePlayerToCenter(centerX) {
    const newX = centerX - this.player.width / 2;
    this.player.x = Math.max(
      0,
      Math.min(this.screenWidth - this.player.width, newX)
    );
  }

  checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
}