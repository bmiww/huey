
import {
  SafeAreaView,
  ScrollView,
  // StyleSheet,
  // StatusBar,
  Text,
  // useColorScheme,
  View,
} from 'react-native';

const Lamp = ({ name, onState }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{onState}</Text>
    </View>
  );
}


export const HueyMain = () => {
  const lamps = [
    {name: 'Lamp 1', onState: 'On'},
    {name: 'Lamp 2', onState: 'Off'},
    {name: 'Lamp 3', onState: 'On'},
    {name: 'Lamp 4', onState: 'Off'},
  ];

  return (
    <SafeAreaView>
      <ScrollView>
	{lamps.map(({ name, onState }) => <Lamp name={name} onState={onState} />)}
      </ScrollView>
    </SafeAreaView>
  );
};
