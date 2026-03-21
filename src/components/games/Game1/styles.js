import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },

  header: {
    height: 80,
    backgroundColor: '#4E7280',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  score: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  pause: {
    fontSize: 24,
  },

  coins: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
  },

  gameArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#87CEEB',
  },

  background: {
    position: 'absolute',
    top: 0,
    height: '100%',
    zIndex: 1,
  },

  startOverlay: {
    position: 'absolute',
    top: '35%',
    left: 30,
    right: 30,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 100,
  },

  startEmoji: {
    fontSize: 42,
    marginBottom: 12,
  },

  startText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  gameOverOverlay: {
    position: 'absolute',
    top: '32%',
    left: 28,
    right: 28,
    backgroundColor: 'rgba(0,0,0,0.72)',
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 100,
  },

  gameOverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  gameOverInfo: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 4,
  },

  button: {
    marginTop: 14,
    backgroundColor: '#FF8C42',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 150,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});