import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2F3A',
  },

  header: {
    position: 'absolute',
    top: 45,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },

  lives: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  score: {
    color: '#FFD966',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  pause: {
    color: '#fff',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  gameArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },

  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  player: {
    position: 'absolute',
    zIndex: 10,
  },

  item: {
    position: 'absolute',
    zIndex: 8,
  },

  explosion: {
    position: 'absolute',
    width: 60,
    height: 60,
    zIndex: 15,
  },

  titleContainer: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 5,
  },

  mainTitle: {
    color: '#FFE5B4',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },

  titleAccent: {
    color: '#FFA559',
  },

  subtitle: {
    marginTop: 10,
    color: '#FFF3E0',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  instructionCard: {
    position: 'absolute',
    left: 25,
    right: 25,
    top: '38%',
    backgroundColor: 'rgba(10, 47, 58, 0.8)',
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,165,89,0.6)',
  },

  instructionIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 18,
  },

  instructionIconItem: {
    alignItems: 'center',
  },

  instructionText: {
    color: '#FFE5B4',
    fontSize: 14,
    fontWeight: 'bold',
  },

  instructionMainText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },

  instructionSubText: {
    color: '#FFA559',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  startButtonContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  startButton: {
    backgroundColor: '#FF914D',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
  },

  startButtonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.92,
  },

  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },

  gameOverCard: {
    width: '75%',
    backgroundColor: 'rgba(10, 47, 58, 0.9)',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  gameOverTitle: {
    color: '#FF6B6B',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  finalScore: {
    color: '#FFD966',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  highScore: {
    color: '#FFE5B4',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 22,
  },

  retryButton: {
    backgroundColor: '#FF914D',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },

  retryButtonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.92,
  },

  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});