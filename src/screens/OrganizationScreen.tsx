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

// Adjusted gradient colors for a more vibrant mix of purple and blue
const solanaGradientColors = ['#A770EF', '#CF8BF3', '#FDB99B', '#81D4FA', '#00B0FF']; // A rich gradient from purple to blue

const CustomButton: React.FC<ButtonProps> = ({ onPress, voteNumber, text }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    onPress(voteNumber);
    navigation.navigate('VotingDetailScreen');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <LinearGradient colors={solanaGradientColors} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
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
      {/* Adding a new button */}
      <CustomButton
        onPress={handleButtonPress}
        voteNumber={4}
        text="Vote for Option 4"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  button: {
    width: 250, // Increased width for bigger buttons
    height: 70, // Increased height for a more modern and prominent look
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15, // Adjust spacing between buttons
    borderRadius: 35, // More pronounced rounded edges
    overflow: 'hidden', // Keep the gradient within the button border
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20, // Slightly larger text for better readability
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrganizationScreen;
