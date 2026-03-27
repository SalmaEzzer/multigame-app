import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Game3Logic } from '../components/games/Game3/Game3Logic';
import styles from '../components/games/Game3/styles';

const { width, height } = Dimensions.get('window');
const HIGH_SCORE_KEY = 'game3_high_score';

export default function Game3Screen() {
  const gameEngine = useRef(new Game3Logic(width, height));
  const animationFrame = useRef(null);
  const gameAreaRef = useRef(null);
  const gameAreaPageX = useRef(0);

  const titleFloat = useRef(new Animated.Value(0)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const bgSoundRef = useRef(null);
  const coinSoundRef = useRef(null);
  const bombSoundRef = useRef(null);
  const gameOverSoundRef = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [startPressed, setStartPressed] = useState(false);
  const [retryPressed, setRetryPressed] = useState(false);

  const [gameState, setGameState] = useState({
    player: gameEngine.current.player,
    items: [],
    explosions: [],
    score: 0,
    lives: 3,
    isHurt: false,
  });

  useEffect(() => {
    const init = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });
      } catch {}
    };

    init();
    loadHighScore();
    loadSounds();

    return () => {
      unloadSounds();
    };
  }, []);

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
              toValue: -8,
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

        if (
          gameEngine.current.lastCollectedType === 'coin' ||
          gameEngine.current.lastCollectedType === 'chest'
        ) {
          playSound(coinSoundRef.current);
        }

        if (gameEngine.current.lastHitBomb) {
          playSound(bombSoundRef.current);
          triggerShake();
        }

        const nowGameOver = gameEngine.current.gameOver;

        setGameState({
          player: { ...gameEngine.current.player },
          items: [...gameEngine.current.items],
          explosions: [...gameEngine.current.explosions],
          score: gameEngine.current.score,
          lives: gameEngine.current.lives,
          isHurt: gameEngine.current.isHurt,
        });

        if (nowGameOver && !gameOver) {
          playSound(gameOverSoundRef.current);
          stopBackgroundMusic();
          saveHighScoreIfNeeded(gameEngine.current.score);
        }

        setGameOver(nowGameOver);

        animationFrame.current = requestAnimationFrame(loop);
      };

      animationFrame.current = requestAnimationFrame(loop);

      return () => {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
      };
    }
  }, [gameStarted, gameOver]);

  const loadHighScore = async () => {
    try {
      const saved = await AsyncStorage.getItem(HIGH_SCORE_KEY);
      if (saved) {
        setHighScore(Number(saved));
      }
    } catch {}
  };

  const saveHighScoreIfNeeded = async (score) => {
    try {
      if (score > highScore) {
        await AsyncStorage.setItem(HIGH_SCORE_KEY, String(score));
        setHighScore(score);
      }
    } catch {}
  };

  const loadSounds = async () => {
    try {
      const bg = new Audio.Sound();
      const coin = new Audio.Sound();
      const bomb = new Audio.Sound();
      const over = new Audio.Sound();

      await bg.loadAsync(require('../components/games/Game3/assets/sounds/bg.mp3'));
      await coin.loadAsync(require('../components/games/Game3/assets/sounds/coin.mp3'));
      await bomb.loadAsync(require('../components/games/Game3/assets/sounds/bomb.mp3'));
      await over.loadAsync(require('../components/games/Game3/assets/sounds/gameover.mp3'));

      bgSoundRef.current = bg;
      coinSoundRef.current = coin;
      bombSoundRef.current = bomb;
      gameOverSoundRef.current = over;
    } catch (e) {
      console.log('sound load error', e);
    }
  };

  const unloadSounds = async () => {
    try {
      if (bgSoundRef.current) await bgSoundRef.current.unloadAsync();
      if (coinSoundRef.current) await coinSoundRef.current.unloadAsync();
      if (bombSoundRef.current) await bombSoundRef.current.unloadAsync();
      if (gameOverSoundRef.current) await gameOverSoundRef.current.unloadAsync();
    } catch {}
  };

  const playSound = async (sound) => {
    try {
      if (!sound) return;
      await sound.replayAsync();
    } catch {}
  };

  const playBackgroundMusic = async () => {
    try {
      if (!bgSoundRef.current) return;
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

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -8, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
    ]).start();
  };

  const resetGameState = () => {
    gameEngine.current = new Game3Logic(width, height);

    setGameState({
      player: { ...gameEngine.current.player },
      items: [],
      explosions: [],
      score: 0,
      lives: 3,
      isHurt: false,
    });
  };

  const startGame = () => {
    resetGameState();
    setGameOver(false);
    setGameStarted(true);
    playBackgroundMusic();
  };

  const restartGame = () => {
    setRetryPressed(false);
    stopBackgroundMusic();
    resetGameState();
    setGameOver(false);
    setGameStarted(true);
    playBackgroundMusic();
  };

  const getItemImage = (type) => {
    switch (type) {
      case 'coin':
        return require('../components/games/Game3/assets/items/coin.png');
      case 'chest':
        return require('../components/games/Game3/assets/items/chest.png');
      case 'bomb':
        return require('../components/games/Game3/assets/items/bomb.png');
      default:
        return require('../components/games/Game3/assets/items/coin.png');
    }
  };

  const getPlayerImage = () => {
    if (gameState.isHurt) {
      return require('../components/games/Game3/assets/character/player_hurt.png');
    }
    return require('../components/games/Game3/assets/character/player_idle1.png');
  };

  const updatePlayerFromPageX = (pageX) => {
    const localX = pageX - gameAreaPageX.current;
    gameEngine.current.movePlayerToCenter(localX);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !gameOver,
      onMoveShouldSetPanResponder: () => !gameOver,
      onPanResponderGrant: (evt) => {
        if (gameOver) return;
        updatePlayerFromPageX(evt.nativeEvent.pageX);
      },
      onPanResponderMove: (evt) => {
        if (gameOver) return;
        updatePlayerFromPageX(evt.nativeEvent.pageX);
      },
    })
  ).current;

  if (!gameStarted) {
    return (
      <View style={styles.container}>
        <View style={styles.gameArea}>
          <Image
            source={require('../components/games/Game3/assets/environment/background.png')}
            style={styles.background}
            resizeMode="cover"
          />

          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: titleFade,
                transform: [{ translateY: titleFloat }],
              },
            ]}
          >
            <Text style={styles.mainTitle}>TREASURE</Text>
            <Text style={[styles.mainTitle, styles.titleAccent]}>CATCH</Text>
            <Text style={styles.subtitle}>Pirate Island Challenge</Text>
          </Animated.View>

          <View style={styles.instructionCard}>
            <View style={styles.instructionIconRow}>
              <View style={styles.instructionIconItem}>
                <Image
                  source={require('../components/games/Game3/assets/items/coin.png')}
                  style={{ width: 46, height: 46, marginBottom: 6 }}
                  resizeMode="contain"
                />
                <Text style={styles.instructionText}>+10</Text>
              </View>

              <View style={styles.instructionIconItem}>
                <Image
                  source={require('../components/games/Game3/assets/items/chest.png')}
                  style={{ width: 52, height: 52, marginBottom: 6 }}
                  resizeMode="contain"
                />
                <Text style={styles.instructionText}>+30</Text>
              </View>

              <View style={styles.instructionIconItem}>
                <Image
                  source={require('../components/games/Game3/assets/items/bomb.png')}
                  style={{ width: 46, height: 46, marginBottom: 6 }}
                  resizeMode="contain"
                />
                <Text style={styles.instructionText}>-1 ❤️</Text>
              </View>
            </View>

            <Text style={styles.instructionMainText}>
              Catch treasures and avoid bombs.
            </Text>

            <Text style={styles.instructionSubText}>
              Slide left and right to move
            </Text>
          </View>

          <View style={styles.startButtonContainer}>
            <TouchableOpacity
              onPress={startGame}
              activeOpacity={0.9}
              onPressIn={() => setStartPressed(true)}
              onPressOut={() => setStartPressed(false)}
              style={[
                styles.startButton,
                startPressed && styles.startButtonPressed,
              ]}
            >
              <Text style={styles.startButtonText}>▶ START</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      <View style={styles.header}>
        <Text style={styles.lives}>{'❤️'.repeat(gameState.lives)}</Text>
        <Text style={styles.score}>💰 {gameState.score}</Text>
        <TouchableOpacity onPress={() => setGameOver(true)}>
          <Text style={styles.pause}>⏸️</Text>
        </TouchableOpacity>
      </View>

      <View
        ref={gameAreaRef}
        style={styles.gameArea}
        onLayout={() => {
          if (gameAreaRef.current?.measure) {
            gameAreaRef.current.measure((x, y, w, h, pageX) => {
              gameAreaPageX.current = pageX;
            });
          }
        }}
        {...(!gameOver ? panResponder.panHandlers : {})}
      >
        <Image
          source={require('../components/games/Game3/assets/environment/background.png')}
          style={styles.background}
          resizeMode="cover"
        />

        {!gameOver && (
          <Image
            source={getPlayerImage()}
            style={[
              styles.player,
              {
                left: gameState.player.x,
                bottom: gameState.player.y,
                width: gameState.player.width,
                height: gameState.player.height,
                opacity: gameState.isHurt ? 0.6 : 1,
              },
            ]}
            resizeMode="contain"
          />
        )}

        {gameState.items.map((item, index) => (
          <Image
            key={`item-${index}`}
            source={getItemImage(item.type)}
            style={[
              styles.item,
              {
                left: item.x,
                bottom: item.y,
                width: item.width,
                height: item.height,
              },
            ]}
            resizeMode="contain"
          />
        ))}

        {!gameOver &&
          gameState.explosions.map((exp, index) => (
            <Image
              key={`exp-${index}`}
              source={require('../components/games/Game3/assets/effects/explosion.png')}
              style={[
                styles.explosion,
                {
                  left: exp.x,
                  bottom: exp.y,
                },
              ]}
              resizeMode="contain"
            />
          ))}

        {gameOver && (
          <View style={styles.gameOverOverlay} pointerEvents="box-none">
            <View style={styles.gameOverCard}>
              <Text style={styles.gameOverTitle}>💀 GAME OVER</Text>
              <Text style={styles.finalScore}>💰 {gameState.score}</Text>
              <Text style={styles.highScore}>🏆 Best: {highScore}</Text>

              <TouchableOpacity
                onPress={restartGame}
                activeOpacity={0.9}
                onPressIn={() => setRetryPressed(true)}
                onPressOut={() => setRetryPressed(false)}
                style={[
                  styles.retryButton,
                  retryPressed && styles.retryButtonPressed,
                ]}
              >
                <Text style={styles.retryButtonText}>PLAY AGAIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
}