import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  OrganizationScreen: { userPublicKey: Uint8Array };
};

type OrganizationScreenRouteProp = RouteProp<RootStackParamList, 'OrganizationScreen'>;

const OrganizationScreen: React.FC = () => {
  const [organizationPublicKey, setOrganizationPublicKey] = useState('');
  const navigation = useNavigation();
  const route = useRoute<OrganizationScreenRouteProp>();
  const userPublicKey = route.params?.userPublicKey || new Uint8Array();

  const handleRegister = () => {
    // Kullanıcının girdiği ve önceki ekrandan gelen public key'leri kullanarak kayıt işlemini gerçekleştir
    console.log('User Public Key:', userPublicKey);
    console.log('Organization Public Key:', organizationPublicKey);
    // Kayıt işlemini gerçekleştirdikten sonra uygun navigasyonu yapabilirsiniz
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Public Key:</Text>
      <Text style={styles.publicKey}>{userPublicKey}</Text>
      <Text style={styles.label}>Enter Organization's Public Key:</Text>
      <TextInput
        style={styles.input}
        placeholder="Organization's Public Key"
        onChangeText={setOrganizationPublicKey}
        value={organizationPublicKey}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  publicKey: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#36008D',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OrganizationScreen;
