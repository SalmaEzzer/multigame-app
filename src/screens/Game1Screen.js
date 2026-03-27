import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
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
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState(null);
  const [characterFrame, setCharacterFrame] = useState(0);

  const titleFloat = useRef(new Animated.Value(0)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const gameEngine = useRef(new Game1Logic(width));
  const animationFrame = useRef(null);

  // sons
  const bgSoundRef = useRef(null);
  const hitSoundRef = useRef(null);
  const gameOverSoundRef = useRef(null);
  const prevIsHurtRef = useRef(false);
  const prevGameOverRef = useRef(false);

  useEffect(() => {
    const loadSounds = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });

        const bg = new Audio.Sound();
        const hit = new Audio.Sound();
        const over = new Audio.Sound();

        await bg.loadAsync(
          require('../components/games/Game1/assets/sounds/bg.mp3')
        );
        await hit.loadAsync(
          require('../components/games/Game1/assets/sounds/hit.mp3')
        );
        await over.loadAsync(
          require('../components/games/Game1/assets/sounds/gameover.mp3')
        );

        bgSoundRef.current = bg;
        hitSoundRef.current = hit;
        gameOverSoundRef.current = over;
      } catch (e) {
        console.log('sound load error', e);
      }
    };

    loadSounds();

    return () => {
      bgSoundRef.current?.unloadAsync();
      hitSoundRef.current?.unloadAsync();
      gameOverSoundRef.current?.unloadAsync();
    };
  }, []);

  const playSound = async (soundRef) => {
    try {
      if (!soundRef) return;
      await soundRef.replayAsync();
    } catch {}
  };

  const playBackgroundMusic = async () => {
    try {
      if (!bgSoundRef.current) return;

      const status = await bgSoundRef.current.getStatusAsync();
      if (!status.isLoaded) return;

      if (status.isPlaying) {
        return;
      }

      await bgSoundRef.current.setIsLoopingAsync(true);
      await bgSoundRef.current.setVolumeAsync(0.3);
      await bgSoundRef.current.playAsync();
    } catch {}
  };

  const stopBackgroundMusic = async () => {
    try {
      if (!bgSoundRef.current) return;

      const status = await bgSoundRef.current.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await bgSoundRef.current.stopAsync();
      }
    } catch {}
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        setCharacterFrame((prev) => (prev + 1) % 2);
      }, 140);

      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted) {
      Animated.parallel([
        Animated.timing(titleFade, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(titleFloat, {
              toValue: -10,
              duration: 1400,
              useNativeDriver: true,
            }),
            Animated.timing(titleFloat, {
              toValue: 0,
              duration: 1400,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    }
  }, [gameStarted, titleFade, titleFloat]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const loop = () => {
        gameEngine.current.update();

        const currentIsHurt = gameEngine.current.isHurt;
        const currentGameOver = gameEngine.current.gameOver;

        if (currentIsHurt && !prevIsHurtRef.current) {
          playSound(hitSoundRef.current);
        }

        if (currentGameOver && !prevGameOverRef.current) {
          playSound(gameOverSoundRef.current);
          stopBackgroundMusic();
        }

        prevIsHurtRef.current = currentIsHurt;
        prevGameOverRef.current = currentGameOver;

        setScore(gameEngine.current.score);
        setCoins(gameEngine.current.coinsCollected);
        setLives(gameEngine.current.lives);
        setGameOver(currentGameOver);

        setGameState({
          player: { ...gameEngine.current.player },
          obstacles: [...gameEngine.current.obstacles],
          coins: [...gameEngine.current.coins],
          isHurt: gameEngine.current.isHurt,

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

      prevIsHurtRef.current = false;
      prevGameOverRef.current = false;

      setGameState({
        player: { ...gameEngine.current.player },
        obstacles: [],
        coins: [],
        isHurt: false,

        mountainsX1: 0,
        mountainsX2: width,

        groundX1: 0,
        groundX2: width,
      });

      setScore(0);
      setCoins(0);
      setLives(3);
      setGameOver(false);
      setCharacterFrame(0);
      setGameStarted(true);

      playBackgroundMusic();
    } else if (!gameOver) {
      gameEngine.current.jump();
    }
  };

  const restartGame = () => {
    gameEngine.current = new Game1Logic(width);
    gameEngine.current.reset();

    prevIsHurtRef.current = false;
    prevGameOverRef.current = false;

    setGameState({
      player: { ...gameEngine.current.player },
      obstacles: [],
      coins: [],
      isHurt: false,

      mountainsX1: 0,
      mountainsX2: width,

      groundX1: 0,
      groundX2: width,
    });

    setGameOver(false);
    setScore(0);
    setCoins(0);
    setLives(3);
    setCharacterFrame(0);

    playBackgroundMusic();
  };

  const goToMenu = () => {
    stopBackgroundMusic();
    setGameStarted(false);
    setGameOver(false);
    setGameState(null);
    setLives(3);
    prevIsHurtRef.current = false;
    prevGameOverRef.current = false;
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

          {/* MOUNTAINS FIXES */}
          <Image
            source={require('../components/games/Game1/assets/environment/mountains_strip.png')}
            style={{
              position: 'absolute',
              left: 0,
              bottom: MOUNTAINS_BOTTOM,
              width,
              height: MOUNTAINS_HEIGHT,
              zIndex: 3,
            }}
            resizeMode="stretch"
          />

          {/* GROUND FIXE */}
          <Image
            source={require('../components/games/Game1/assets/environment/ground_strip.png')}
            style={{
              position: 'absolute',
              left: 0,
              bottom: GROUND_BOTTOM,
              width,
              height: GROUND_HEIGHT,
              zIndex: 4,
            }}
            resizeMode="stretch"
          />

          <Animated.View
            style={[
              styles.startTitleContainer,
              {
                opacity: titleFade,
                transform: [{ translateY: titleFloat }],
              },
            ]}
          >
            <Text style={styles.startMainTitle}>RUNNER</Text>
            <Text style={[styles.startMainTitle, styles.startAccentTitle]}>
              ADVENTURE
            </Text>
            <Text style={styles.startSubtitle}>
              Jump, survive and collect coins
            </Text>
          </Animated.View>

          <View style={styles.startCard}>
            <Text style={styles.startCardText}>
              Tap anywhere to start
            </Text>

            <View style={styles.startFakeButton}>
              <Text style={styles.startFakeButtonText}>▶ START</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleTap} activeOpacity={1}>
      <View style={styles.header}>
        <View style={styles.headerBubble}>
          <Text style={styles.livesText}>{'❤️'.repeat(lives)}</Text>
        </View>

        <View style={styles.headerBubble}>
          <Text style={styles.coinsText}>💰 {coins}</Text>
        </View>

        <TouchableOpacity style={styles.headerBubble} onPress={() => setGameOver(true)}>
          <Text style={styles.pauseText}>⏸</Text>
        </TouchableOpacity>
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
                gameState?.isHurt
                  ? require('../components/games/Game1/assets/character/hurt.png')
                  : gameState.player.isJumping
                    ? require('../components/games/Game1/assets/character/jump.png')
                    : characterFrame === 0
                      ? require('../components/games/Game1/assets/character/run1.png')
                      : require('../components/games/Game1/assets/character/run2.png')
              }
              style={{
                width: PLAYER_SIZE,
                height: PLAYER_SIZE,
                opacity: gameState?.isHurt ? 0.85 : 1,
              }}
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
            <View style={styles.gameOverCard}>
              <Text style={styles.gameOverTitle}>GAME OVER</Text>

              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Score</Text>
                <Text style={styles.scoreValue}>{Math.floor(score)}</Text>
              </View>

              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Coins</Text>
                <Text style={styles.scoreValue}>💰 {coins}</Text>
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={restartGame}>
                <Text style={styles.primaryButtonText}>▶ PLAY AGAIN</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} onPress={goToMenu}>
                <Text style={styles.secondaryButtonText}>🏠 MENU</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}