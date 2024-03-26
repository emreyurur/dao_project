import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

interface ButtonProps {
  onPress: (voteNumber: number) => void;
  voteNumber: number;
  text: string;
}

interface OrganizationScreenProps {
  userPublicKey: Uint8Array;
}

const CustomButton: React.FC<ButtonProps> = ({ onPress, voteNumber, text }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    onPress(voteNumber);
    navigation.navigate('VotingDetailScreen');
  };

  // Tüm buttonların rengini ve boyutunu 2. buttonun renkleri ve boyutu olarak ayarlayın
  const colors = ['#FF6EDF', '#7B61FF'];

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <LinearGradient colors={colors} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const OrganizationScreen: React.FC<OrganizationScreenProps> = ({ userPublicKey }) => {
  const handleButtonPress = (voteNumber: number) => {
    console.log('Pressed Vote', voteNumber);
  };

  return (
    <LinearGradient colors={['#ACE2E1', '#F7EEDD']} style={styles.fullScreen}>
      <View style={styles.container}>
        <CustomButton
          onPress={handleButtonPress}
          voteNumber={1}
          text="Vote for Option 1"
        />
        <CustomButton
          onPress={handleButtonPress}
          voteNumber={2}
          text="Vote for Option 2"
        />
        <CustomButton
          onPress={handleButtonPress}
          voteNumber={3}
          text="Vote for Option 3"
        />
        {/* Additional buttons can be added here */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1, // Ekranın tamamını kaplamasını sağlar
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300, // Genişlik 300 olarak ayarlandı
    height: 80, // Yükseklik 80 olarak ayarlandı
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 40, // Border yarı çapı 40 olarak ayarlandı
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24, // Yazı boyutu 24 olarak ayarlandı
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrganizationScreen;
