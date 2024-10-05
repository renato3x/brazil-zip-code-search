import Header from '@components/Header';
import ZipCodeInput from '@components/ZipCodeInput';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

type ZipCodeData = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export default function App() {
  const [ zipCode, setZipCode ] = useState<string>('');
  const [ zipCodeData, setZipCodeData ] = useState<ZipCodeData | null>();
  const [ loading, setLoading ] = useState<boolean>(false);

  function showErrorMessage() {
    Toast.show({
      text1: 'Error!',
      text2: 'An error occurred while fetching zip code data',
      type: 'info',
      position: 'bottom',
      visibilityTime: 10000,
      autoHide: true,
      bottomOffset: 30,
    });
  }

  useEffect(() => {
    async function getZipCodeData() {
      setZipCodeData(null);
      setLoading(true);

      try {
        const { data } = await axios.get<ZipCodeData | { erro: boolean }>(`https://viacep.com.br/ws/${zipCode}/json/`);

        if ('erro' in data) {
          showErrorMessage();
        } else {
          setZipCodeData(data);
        }
      } catch (error) {
        console.log(error);
        showErrorMessage();
      } finally {
        setLoading(false);
      }
    }

    const id = setTimeout(() => {
      if (zipCode.length > 0) {
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
        <Toast/>
        {loading ? (
          // this will be an skeleton
          <>
            <Text>Some skeleton</Text>
          </>
        ) : (
          <>
            { zipCodeData && <Text style={{ color: '#fff' }}>{ JSON.stringify(zipCodeData, null, 2) }</Text> }
          </>
        )}
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
