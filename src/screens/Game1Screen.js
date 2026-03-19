import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/common/Header';
import { globalStyles } from '../styles/globalStyles';

const Game1Screen = () => {
  return (
    <View style={styles.container}>
      <Header title="Game 1" />
      <View style={styles.content}>
        {/* Add Game 1 components here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default Game1Screen;
