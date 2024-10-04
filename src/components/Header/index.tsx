import { Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  const [ fontsLoaded ] = useFonts({
    Roboto_700Bold,
  });

  if (fontsLoaded) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Brazil Zip Code Search</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
  }
})
