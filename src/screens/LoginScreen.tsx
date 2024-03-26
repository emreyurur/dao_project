import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image,Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import nacl from 'tweetnacl';
import base58 from 'bs58';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack=createNativeStackNavigator();

interface KeyPair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

const LoginScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dappKeyPair, setDappKeyPair] = useState<KeyPair | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const generateRandomKeyPair = () => {
      try {
        const newKeyPair: KeyPair = nacl.box.keyPair();
        setDappKeyPair(newKeyPair);
      } catch (error) {
        console.error('Error generating random key pair:', error);
      }
    };

    generateRandomKeyPair();
  }, []);

  const handleConnectPhantom = async () => {
    if (dappKeyPair) {
      const params = new URLSearchParams({
        dapp_encryption_public_key: base58.encode(dappKeyPair.publicKey),
        cluster: 'mainnet-beta',
        app_url: 'https://phantom.app',
        redirect_link: 'myapp://onConnect',
      });

      const connectUrl = `phantom://v1/connect?${params.toString()}`;

      try {
        await Linking.openURL(connectUrl);
        // Phantom cüzdan bağlandıktan sonra uygulamanın OrganizationScreen ekranına yönlendirme
        navigation.navigate("OrganizationScreen");
      } catch (error) {
        console.error('Error connecting to Phantom:', error);
      }
    }
  };

  return (
    <LinearGradient colors={['#03001C', '#27005D', '#190482']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Image style={styles.daoLogo} source={require('../assets/dao_logo.png')} />
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Image style={styles.phantomIcon} source={require('../assets/phantom_icon.png')} />
          <Text style={styles.buttonText}>Connect your Phantom Wallet</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalBackground}>
            <View style={styles.centeredView}>
              <TouchableOpacity style={styles.exitButton} onPress={() => setModalVisible(false)}>
                <Image source={require('../assets/remove-button.png')} style={styles.exitIcon} />
              </TouchableOpacity>
              <View style={styles.modalView}>
                <Image style={styles.phantomIcon} source={require('../assets/phantom_icon.png')} />
                <Text style={styles.modalHeaderText}>Choose an Option</Text>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    Linking.openURL('https://phantom.app/');
                  }}>
                  <Text style={styles.modalOptionText}>Create a New Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={handleConnectPhantom}>
                  <Text style={styles.modalOptionText}>I Have a Already Wallet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  daoLogo: {
    height: 500,
    width: 500,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 20,
    backgroundColor: '#36008D',
    padding: 25,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  phantomIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity for the desired blurring effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    alignItems: 'center',
  },
  exitButton: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 1,
  },
  exitIcon: {
    height: 30,
    width: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#27005D',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  modalOption: {
    backgroundColor: '#4D0099',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    fontSize: 25, // Aynı font size
  },
  modalOptionText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default LoginScreen;
