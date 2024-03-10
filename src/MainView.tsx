
import { FunctionComponent } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type LampProps = {
  name: string;
  onState: boolean;
}

const Lamp: FunctionComponent<LampProps> = ({ name, onState }) => {
  const fakeOnPress = () => console.log('Pressed');

  return (
    <TouchableOpacity onPress={fakeOnPress} style={styles.lampButtonContainer}>
      <Text style={styles.lampName}>{name}</Text>
      <Text style={styles.lampSwitch}>{onState ? "On" : "Off"}</Text>
    </TouchableOpacity>
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


const styles = StyleSheet.create({
  lampButtonContainer: {
    backgroundColor: 'lightgrey',
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 4,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  lampName: {
    flexGrow: 2,
  },
  lampSwitch: {
    alignSelf: 'flex-end',
  }
});
