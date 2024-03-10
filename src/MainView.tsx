
import { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import { changeLightState, fetchLightsFlow, selectUser, startUserFlow } from './selectors';
import { useSelector } from 'react-redux';
import { Light } from './types';

type LampProps = {
  light: Light;
  onPress: (id: string) => void;
}

const Lamp: FunctionComponent<LampProps> = ({ light, onPress }) => {
  const { name, id, state: { on } } = light;
  const toggleLight = useCallback(() => onPress(id), [id]);

  return (
    <TouchableOpacity onPress={toggleLight} style={styles.lampButtonContainer}>
      <Text style={styles.lampName}>{name}</Text>
      <Text style={styles.lampSwitch}>{on ? "On" : "Off"}</Text>
    </TouchableOpacity>
  );
}


export const HueyMain = () => {
  const startUserFlowFn = startUserFlow();
  const fetchLights = fetchLightsFlow();
  const toggleLight = changeLightState();

  const user = useSelector(selectUser);
  const failedBridgePrompt = useSelector((state) => state.failedBridgePrompt);
  const promptBridgeClick = useSelector((state) => state.promptBridgeButton);
  const lights = useSelector((state) => state.lights);

  useEffect(() => {
    if (user) fetchLights();
  }, [user]);

  if (!user) {
    return (
      <SafeAreaView>
	<Button title="Press here to authorize" onPress={startUserFlowFn} />
	{promptBridgeClick && <Text>Press the button on the HUE bridge to authorize</Text>}
      	{failedBridgePrompt && <Text>You have missed the 60 second window to press the hue bridge button. Try again.</Text>}
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{user}</Text>
        {lights.map((light) => <Lamp light={light} onPress={toggleLight} key={light.uniqueid} />)}
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
