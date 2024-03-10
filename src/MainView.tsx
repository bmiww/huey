
import { FunctionComponent } from 'react';
import {
  SafeAreaView,
  ScrollView,
  // StyleSheet,
  // StatusBar,
  Text,
  // useColorScheme,
  View,
} from 'react-native';

type LampProps = {
  name: string;
  onState: boolean;
}

const Lamp: FunctionComponent<LampProps> = ({ name, onState }) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{onState ? "On" : "Off"}</Text>
    </View>
  );
}


export const HueyMain = () => {
  const lamps = [
    {name: 'Lamp 1', onState: true },
    {name: 'Lamp 2', onState: false },
    {name: 'Lamp 3', onState: true },
    {name: 'Lamp 4', onState: false },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
	{lamps.map(({ name, onState }) => <Lamp name={name} onState={onState} />)}
      </ScrollView>
    </SafeAreaView>
  );
};
