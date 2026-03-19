import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

const games = [
  { id: 1, name: 'Jeu 1', screen: 'Game1', color: '#FF6B6B', description: 'Jeu du membre 1' },
  { id: 2, name: 'Jeu 2', screen: 'Game2', color: '#4ECDC4', description: 'Jeu du membre 2' },
  { id: 3, name: 'Jeu 3', screen: 'Game3', color: '#45B7D1', description: 'Jeu du membre 3' },
];

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../../assets/images/background.jpg')} 
      style={styles.container}
    >
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Text style={styles.title}>🎮 MultiGame App</Text>
        <Text style={styles.subtitle}>Choisis ton jeu !</Text>
      </Animatable.View>

      <View style={styles.gamesContainer}>
        {games.map((game, index) => (
          <Animatable.View
            key={game.id}
            animation="bounceIn"
            delay={index * 200}
          >
            <TouchableOpacity
              style={[styles.gameCard, { backgroundColor: game.color }]}
              onPress={() => navigation.navigate(game.screen)}
            >
              <Text style={styles.gameName}>{game.name}</Text>
              <Text style={styles.gameDescription}>{game.description}</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  gamesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCard: {
    width: 250,
    height: 150,
    borderRadius: 15,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gameName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  gameDescription: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});