import Header from '@components/Header';
import ZipCodeDataViewer from '@components/ZipCodeDataViewer';
import ZipCodeInput from '@components/ZipCodeInput';
import { ZipCodeData } from '@models/ZipCodeData';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function App() {
  const [ zipCode, setZipCode ] = useState<string>('');
  const [ zipCodeData, setZipCodeData ] = useState<ZipCodeData | null>();
  const [ loading, setLoading ] = useState<boolean>(false);

  function showErrorMessage(message: string) {
    Toast.show({
      text1: 'Error!',
      text2: message,
      type: 'error',
      position: 'bottom',
      visibilityTime: 10000,
      autoHide: true,
      bottomOffset: 30,
    });
  }

  useEffect(() => {
    async function getZipCodeData() {
      setLoading(true);

      try {
        const { data } = await axios.get<ZipCodeData | { erro: boolean }>(`https://viacep.com.br/ws/${zipCode}/json/`);

        if ('erro' in data) {
          showErrorMessage('Zip code data not found');
        } else {
          setZipCodeData(data);
        }
      } catch (error) {
        console.log(error);
        showErrorMessage('An error occurred while fetching zip code data');
      } finally {
        setLoading(false);
      }
    }

    const id = setTimeout(() => {
      setZipCodeData(null);

      if (zipCode.length === 8) {
        getZipCodeData();
      }
    }, 1000);

    /**
     * Cleanup function:
     * -> Função executada antes da próxima execução do useEffect ou quando o componente é desmontado.
     * 
     * -> Ela é usada para limpar efeitos colaterais, como timeouts, event listeners, ou qualquer outro
     * 
     *    recurso que precise ser finalizado para evitar vazamentos de memória ou comportamentos indesejados.
     * -> A cleanup function é útil para desfazer o que foi configurado pelo useEffect anterior.
     */
    return () => {
      clearTimeout(id);
    }
  }, [zipCode]);

  return (
    <SafeAreaProvider>
      <StatusBar style="light"/>
      <SafeAreaView style={styles.container}>
        <Header/>
        <ZipCodeInput
          value={zipCode}
          onChangeText={setZipCode}
        />
        {loading ? (
          <ActivityIndicator
            color="#243647"
            size={48}
          />
        ) : (
          <>
            { zipCodeData && <ZipCodeDataViewer data={zipCodeData}/> }
          </>
        )}
        <Toast/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121A21',
    paddingHorizontal: 16,
  },
});
