import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import styles from '../components/games/Game1/styles';
import { Game1Logic } from '../components/games/Game1/Game1Logic';

const { width, height } = Dimensions.get('window');

const PLAYER_SIZE = 76;
const OBSTACLE_SIZE = 52;
const COIN_SIZE = 30;

// Réglages visuels du décor
const SKY_BOTTOM = 0;
const MOUNTAINS_HEIGHT = 600;
const MOUNTAINS_BOTTOM = 0;

const GROUND_HEIGHT = 500;
const GROUND_BOTTOM = 0;



// Position du joueur / obstacles sur le sol
const FLOOR_OFFSET = 164;

export default function Game1Screen() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [gameState, setGameState] = useState(null);
  const [characterFrame, setCharacterFrame] = useState(0);

  const gameEngine = useRef(new Game1Logic(width));
  const animationFrame = useRef(null);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        setCharacterFrame((prev) => (prev + 1) % 2);
      }, 140);

      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const loop = () => {
        gameEngine.current.update();

        setScore(gameEngine.current.score);
        setCoins(gameEngine.current.coinsCollected);
        setGameOver(gameEngine.current.gameOver);

        setGameState({
          player: { ...gameEngine.current.player },
          obstacles: [...gameEngine.current.obstacles],
          coins: [...gameEngine.current.coins],

          mountainsX1: gameEngine.current.mountainsX1,
          mountainsX2: gameEngine.current.mountainsX2,

          groundX1: gameEngine.current.groundX1,
          groundX2: gameEngine.current.groundX2,
        });

        animationFrame.current = requestAnimationFrame(loop);
      };

      animationFrame.current = requestAnimationFrame(loop);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [gameStarted, gameOver]);

  const handleTap = () => {
    if (!gameStarted) {
      gameEngine.current = new Game1Logic(width);
      gameEngine.current.reset();

      setGameState({
        player: { ...gameEngine.current.player },
        obstacles: [],
        coins: [],

        mountainsX1: 0,
        mountainsX2: width,

        groundX1: 0,
        groundX2: width,
      });

      setScore(0);
      setCoins(0);
      setGameOver(false);
      setCharacterFrame(0);
      setGameStarted(true);
    } else if (!gameOver) {
      gameEngine.current.jump();
    }
  };

  const restartGame = () => {
    gameEngine.current = new Game1Logic(width);
    gameEngine.current.reset();

    setGameState({
      player: { ...gameEngine.current.player },
      obstacles: [],
      coins: [],

      mountainsX1: 0,
      mountainsX2: width,

      groundX1: 0,
      groundX2: width,
    });

    setGameOver(false);
    setScore(0);
    setCoins(0);
    setCharacterFrame(0);
  };

  const goToMenu = () => {
    setGameStarted(false);
    setGameOver(false);
    setGameState(null);
  };

  const getObstacleImage = (type, index) => {
    switch (type) {
      case 'rock':
        return require('../components/games/Game1/assets/obstacles/rock.png');
      case 'box':
        return require('../components/games/Game1/assets/obstacles/box.png');
      case 'fire':
        return index % 2 === 0
          ? require('../components/games/Game1/assets/obstacles/fire1.png')
          : require('../components/games/Game1/assets/obstacles/fire2.png');
      case 'spikes':
        return require('../components/games/Game1/assets/obstacles/spikes.png');
      default:
        return require('../components/games/Game1/assets/obstacles/rock.png');
    }
  };

  if (!gameStarted) {
    return (
      <TouchableOpacity style={styles.container} onPress={handleTap} activeOpacity={1}>
        <View style={styles.header}>
          <Text style={styles.title}>🏁 RUNNER ADVENTURE</Text>
        </View>

        <View style={styles.startOverlay}>
          <Text style={styles.startEmoji}>🏴‍☠️</Text>
          <Text style={styles.startText}>TAPE POUR COMMENCER</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleTap} activeOpacity={1}>
      <View style={styles.header}>
        <Text style={styles.score}>🔴 {Math.floor(score)}</Text>

        <TouchableOpacity onPress={() => setGameOver(true)}>
          <Text style={styles.pause}>⏸️</Text>
        </TouchableOpacity>

        <Text style={styles.coins}>💰 {coins}</Text>
      </View>

      <View style={styles.gameArea}>
        {/* SKY FIXE */}
        <Image
          source={require('../components/games/Game1/assets/environment/sky_strip.png')}
          style={{
            position: 'absolute',
            left: 0,
            bottom: SKY_BOTTOM,
            width,
            height,
            zIndex: 1,
          }}
          resizeMode="stretch"
        />

        
        {/* MOUNTAINS */}
        <Image
          source={require('../components/games/Game1/assets/environment/mountains_strip.png')}
          style={{
            position: 'absolute',
            left: gameState?.mountainsX1 ?? 0,
            bottom: MOUNTAINS_BOTTOM,
            width,
            height: MOUNTAINS_HEIGHT,
            zIndex: 3,
          }}
          resizeMode="stretch"
        />
        <Image
          source={require('../components/games/Game1/assets/environment/mountains_strip.png')}
          style={{
            position: 'absolute',
            left: gameState?.mountainsX2 ?? width,
            bottom: MOUNTAINS_BOTTOM,
            width,
            height: MOUNTAINS_HEIGHT,
            zIndex: 3,
          }}
          resizeMode="stretch"
        />

        {/* GROUND */}
        <Image
          source={require('../components/games/Game1/assets/environment/ground_strip.png')}
          style={{
            position: 'absolute',
            left: gameState?.groundX1 ?? 0,
            bottom: GROUND_BOTTOM,
            width,
            height: GROUND_HEIGHT,
            zIndex: 4,
          }}
          resizeMode="stretch"
        />
        <Image
          source={require('../components/games/Game1/assets/environment/ground_strip.png')}
          style={{
            position: 'absolute',
            left: gameState?.groundX2 ?? width,
            bottom: GROUND_BOTTOM,
            width,
            height: GROUND_HEIGHT,
            zIndex: 4,
          }}
          resizeMode="stretch"
        />

        {/* PLAYER */}
        {gameState?.player && (
          <View
            style={{
              position: 'absolute',
              left: gameState.player.x,
              bottom: FLOOR_OFFSET + gameState.player.y,
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
              zIndex: 10,
            }}
          >
            <Image
              source={
                gameState.player.isJumping
                  ? require('../components/games/Game1/assets/character/jump.png')
                  : characterFrame === 0
                    ? require('../components/games/Game1/assets/character/run1.png')
                    : require('../components/games/Game1/assets/character/run2.png')
              }
              style={{ width: PLAYER_SIZE, height: PLAYER_SIZE }}
              resizeMode="contain"
            />
          </View>
        )}

        {/* OBSTACLES */}
        {gameState?.obstacles?.map((obs, index) => (
          <View
            key={`obs-${index}`}
            style={{
              position: 'absolute',
              left: obs.x,
              bottom: FLOOR_OFFSET + obs.y + 2,
              width: OBSTACLE_SIZE,
              height: OBSTACLE_SIZE,
              zIndex: 9,
            }}
          >
            <Image
              source={getObstacleImage(obs.type, index)}
              style={{ width: OBSTACLE_SIZE, height: OBSTACLE_SIZE }}
              resizeMode="contain"
            />
          </View>
        ))}

        {/* COINS */}
        {gameState?.coins?.map((coin, index) => (
          <View
            key={`coin-${index}`}
            style={{
              position: 'absolute',
              left: coin.x,
              bottom: FLOOR_OFFSET + coin.y + 50,
              width: COIN_SIZE,
              height: COIN_SIZE,
              zIndex: 8,
            }}
          >
            <Image
              source={
                Math.floor(coin.frame) === 0
                  ? require('../components/games/Game1/assets/effects/coin1.png')
                  : require('../components/games/Game1/assets/effects/coin2.png')
              }
              style={{ width: COIN_SIZE, height: COIN_SIZE }}
              resizeMode="contain"
            />
          </View>
        ))}

        {/* GAME OVER */}
        {gameOver && (
          <View style={styles.gameOverOverlay}>
            <Text style={styles.gameOverTitle}>GAME OVER</Text>
            <Text style={styles.gameOverInfo}>Score: {Math.floor(score)}</Text>
            <Text style={styles.gameOverInfo}>Coins: {coins}</Text>

            <TouchableOpacity style={styles.button} onPress={restartGame}>
              <Text style={styles.buttonText}>🔄 RETRY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={goToMenu}>
              <Text style={styles.buttonText}>🏠 MENU</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}