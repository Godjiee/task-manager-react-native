import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PaperSettingsCard from '../components/PaperSettingsCard';
import data from '../utils/settingsData.json'; // Ensure this path is correct
import fontScaling from '../utils/fontScaling';
import {hp, wp} from '../utils/screenSizes';

export default function Settings() {
  const navigation = useNavigation();

  const handlePress = item => {
    if (item.link) {
      Linking.openURL(item.link);
    } else {
      navigation.navigate('Settings');
    }
  };

  const renderItem = ({item}) => (
    <PaperSettingsCard
      icon={item.icon}
      title={item.title}
      description={item.description}
      status={item.status}
      onPress={() => handlePress(item)}
      notAnimated={item.status !== 'none'}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Your Battle Plan Customization</Text>
      </View>
      <View style={styles.cardContainer}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: wp('2%'), gap: 10}}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    padding: 5,
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: hp('6%'),
    paddingBottom: hp('6%'),
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#333',
    fontSize: fontScaling(4),
  },
  cardContainer: {
    flex: 1,
    paddingBottom: hp('3%'),
  },
});
