import Header from '@components/Header';
import ZipCodeInput from '@components/ZipCodeInput';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [ zipCode, setZipCode ] = useState<string>('');

  return (
    <SafeAreaProvider>
      <StatusBar style="light"/>
      <SafeAreaView style={styles.container}>
        <Header/>
        <ZipCodeInput
          value={zipCode}
          onChangeText={setZipCode}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121A21',
    paddingHorizontal: 16,
  }
})
