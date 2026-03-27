import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
} from 'react-native';

const games = [
  {
    id: 1,
    name: 'Runner Adventure',
    screen: 'Game1',
    description: 'Dash through obstacles',
    icon: require('../../assets/images/game1_icon.png'),
  },
  {
    id: 2,
    name: 'Pirate Island',
    screen: 'Game2',
    description: 'Climb and survive',
    icon: require('../../assets/images/game2_icon.png'),
  },
  {
    id: 3,
    name: 'Treasure Catch',
    screen: 'Game3',
    description: 'Collect the gold',
    icon: require('../../assets/images/game3_icon.png'),
  },
];

export default function HomeScreen({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, slide]);

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fade, transform: [{ translateY: slide }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>MULTIGAME</Text>
          <Text style={styles.subtitle}>Choose your adventure</Text>
        </View>

        <View style={styles.cards}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate(game.screen)}
            >
              <Image source={game.icon} style={styles.icon} />

              <View style={styles.textBlock}>
                <Text style={styles.name}>{game.name}</Text>
                <Text style={styles.desc}>{game.description}</Text>
              </View>

              <Text style={styles.play}>PLAY</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#DDD',
    marginTop: 4,
    fontWeight: '600',
  },

  cards: {
    flex: 1,
    justifyContent: 'center',
    gap: 14,
  },

  card: {
    backgroundColor: 'rgba(0,0,0,0.50)',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },

  icon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    marginBottom: 10,
  },

  textBlock: {
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },

  desc: {
    fontSize: 12,
    color: '#CCC',
    marginTop: 2,
    textAlign: 'center',
  },

  play: {
    marginTop: 8,
    fontSize: 12,
    color: '#FF914D',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});