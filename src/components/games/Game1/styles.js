import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },

  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
  },

  headerBubble: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  livesText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  coinsText: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
  },

  pauseText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  coins: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },

  pause: {
    fontSize: 22,
  },

  gameArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#87CEEB',
  },

  // ================= START SCREEN =================

  startTitleContainer: {
    position: 'absolute',
    top: 90,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 20,
  },

  startMainTitle: {
    color: '#FFF3D6',
    fontSize: 46,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },

  startAccentTitle: {
    color: '#FF9A4D',
  },

  startSubtitle: {
    marginTop: 8,
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  startCard: {
    position: 'absolute',
    left: 28,
    right: 28,
    top: '42%',
    backgroundColor: 'rgba(15, 35, 45, 0.75)',
    borderRadius: 24,
    paddingVertical: 26,
    paddingHorizontal: 22,
    alignItems: 'center',
    zIndex: 30,
  },

  startCardText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  startFakeButton: {
    backgroundColor: '#FF914D',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 18,
    minWidth: 180,
    alignItems: 'center',
  },

  startFakeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // ================= GAME OVER =================

  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 100,
  },

  gameOverCard: {
    width: '80%',
    backgroundColor: 'rgba(15, 35, 45, 0.92)',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 22,
    alignItems: 'center',
  },

  gameOverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFB066',
    marginBottom: 18,
  },

  gameOverInfo: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 6,
  },

  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 6,
  },

  scoreLabel: {
    color: '#DDD',
    fontSize: 18,
    fontWeight: '600',
  },

  scoreValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  primaryButton: {
    marginTop: 20,
    backgroundColor: '#FF914D',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 18,
    width: '100%',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  secondaryButton: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    opacity: 0.85,
    fontWeight: '600',
  },

  button: {
    marginTop: 16,
    backgroundColor: '#FF914D',
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 16,
    minWidth: 170,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});