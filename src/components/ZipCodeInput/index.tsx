import { Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { MaskedTextInput } from 'react-native-mask-text';

interface ZipCodeInputProps {
  value: string;
  onChangeText: (value: string) => void;
}

export default function ZipCodeInput({ value, onChangeText }: ZipCodeInputProps) {
  const [ fontsLoaded ] = useFonts({
    Roboto_400Regular,
  });

  function handleChangeText(_text: string, rawText: string) {
    onChangeText(rawText);
  }

  if (fontsLoaded) {
    return (
      <View style={styles.inputWrapper}>
        <View>
          <Icon name="search" size={24} color="#91ADC9"/>
        </View>
        <MaskedTextInput
          onChangeText={handleChangeText}
          mask="99999-999"
          style={styles.input}
          placeholder="Enter zip code"
          placeholderTextColor="#91ADC9"
          keyboardType="numeric"
          value={value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#243647',
  },
  input: {
    fontFamily: 'Roboto_400Regular',
    color: '#91ADC9',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
})
