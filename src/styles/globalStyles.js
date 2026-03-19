import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../utils/constants';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONTS.regular,
    color: COLORS.dark,
  },
  title: {
    fontSize: FONTS.xlarge,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONTS.large,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: SPACING.sm,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.medium,
    fontWeight: 'bold',
  },
  shadow: {
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
