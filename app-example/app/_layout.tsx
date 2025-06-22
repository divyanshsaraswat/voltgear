import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Lufga': require('../assets/fonts/LufgaRegular.ttf'),
  });

  // Set default theme with Lufga as base font
    const theme = {
    ...DefaultTheme,
    fonts: {
      ...DefaultTheme.fonts,
      regular: {
        fontFamily: 'Lufga',
        fontWeight: "500" as "500",
      },
    },
  };

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={theme}>
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
