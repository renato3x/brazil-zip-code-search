import { Roboto_400Regular, Roboto_500Medium, useFonts } from '@expo-google-fonts/roboto';
import { ZipCodeData } from '@models/ZipCodeData';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

interface ZipCodeDataViewerProps {
  data: ZipCodeData;
}

export default function ZipCodeDataViewer({ data }: ZipCodeDataViewerProps) {
  const [ fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  async function copyZipCodeData() {
    const zipCodeData = `
    Zip code: ${data.cep}
    Neighborhood: ${data.bairro || 'Not informed'}
    City: ${data.localidade || 'Not informed'}
    State: ${`${data.estado}, ${data.uf}` || 'Not informed'}
    Street: ${data.logradouro || 'Not informed'}
    `;

    await Clipboard.setStringAsync(zipCodeData);

    Toast.show({
      text2: 'Zip code data added to clipboard',
      type: 'info',
      position: 'bottom',
      visibilityTime: 10000,
      autoHide: true,
      bottomOffset: 30,
    })
  }

  if (fontsLoaded) {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          onLongPress={copyZipCodeData}
          activeOpacity={0.7}
          style={styles.container}
        >
          <View style={styles.iconContainer}>
            <Icon name="map-pin" color="#fff" size={24}/>
          </View>
          <View style={styles.zipCodeData}>
            <Text style={styles.zipCodeText}>{ data.cep }</Text>
            <Text style={styles.text}>Neighborhood: { data.bairro || 'Not informed' }</Text>
            <Text style={styles.text}>City: { data.localidade || 'Not informed' }</Text>
            <Text style={styles.text}>State: { `${data.estado}, ${data.uf}` || 'Not informed' }</Text>
            <Text style={styles.text}>Street: { data.logradouro || 'Not informed' }</Text>
          </View>
        </TouchableOpacity>
        <Toast/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#243647',
    borderRadius: 8,
  },
  zipCodeData: {
    paddingHorizontal: 16,
    flex: 1,
  },
  zipCodeText: {
    color: '#fff',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  text: {
    color: '#91ADC9',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    lineHeight: 21,
  },
});
