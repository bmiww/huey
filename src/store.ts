
// ███████╗████████╗ ██████╗ ██████╗ ███████╗
// ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝
// ███████╗   ██║   ██║   ██║██████╔╝█████╗
// ╚════██║   ██║   ██║   ██║██╔══██╗██╔══╝
// ███████║   ██║   ╚██████╔╝██║  ██║███████╗
// ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
import { all, call, delay, fork, put, take, select } from 'redux-saga/effects';
import { CHANGE_LIGHT, FAILED_BRIDGE_PROMPT, FETCH_LIGHTS, PROMPT_BRIDGE_BUTTON, START_USER_FLOW, UPDATE_LIGHTS, UPDATE_USER } from './selectors';
import { Light } from './types';
// ┬─┐┌─┐┌┬┐┬ ┬┌─┐┌─┐┬─┐
// ├┬┘├┤  │││ ││  ├┤ ├┬┘
// ┴└─└─┘─┴┘└─┘└─┘└─┘┴└─
interface State {
  promptBridgeButton: boolean;
  user: string;
  lights: Light[];
}

const reducers = {
  "UPDATE_USER": (state, { user }) => ({ ...state, user, promptBridgeButton: false }),
  "PROMPT_BRIDGE_BUTTON": (state) => ({ ...state, promptBridgeButton: true, failedBridgePrompt: false }),
  "FAILED_BRIDGE_PROMPT": (state) => ({ ...state, promptBridgeButton: false, failedBridgePrompt: true }),
  "UPDATE_LIGHTS": (state, { lights }) => ({ ...state, lights })
};

export const reducer = (state: State, action) => {
  return (reducers[action.type] || (() => state))(state, action);
}


// ┌─┐┌─┐┌┬┐┌─┐┬ ┬┌─┐┌─┐
// ├┤ ├┤  │ │  ├─┤├┤ └─┐
// └  └─┘ ┴ └─┘┴ ┴└─┘└─┘
// TODO: Add network discovery to get the actual ip of the HUE hub
const CURRENT_IP = "192.168.2.50";
const hueAuth = async () => {
  const response = await fetch(`http://${CURRENT_IP}/api/`, { body: JSON.stringify({ devicetype: 'huey-user' }), method: 'POST' });
  return await response.json();
}

const hueFetch = async (user, url, body, method = 'GET') => {
  const response = await fetch(`http://${CURRENT_IP}/api/${user}${url}`, {
    ...(body ? { body: JSON.stringify(body) } : {}),
    method
  });

  return await response.json();
};

// ███████╗ █████╗  ██████╗  █████╗
// ██╔════╝██╔══██╗██╔════╝ ██╔══██╗
// ███████╗███████║██║  ███╗███████║
// ╚════██║██╔══██║██║   ██║██╔══██║
// ███████║██║  ██║╚██████╔╝██║  ██║
// ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝


// ┌─┐┌─┐┌┐┌┌─┐┬─┐┌─┐┌┬┐┌─┐┬─┐┌─┐
// │ ┬├┤ │││├┤ ├┬┘├─┤ │ │ │├┬┘└─┐
// └─┘└─┘┘└┘└─┘┴└─┴ ┴ ┴ └─┘┴└─└─┘

function* callHue(...args) {
  const user = yield select(state => state.user);
  if (!user) throw new Error('No active user for hue bridge');
  // @ts-ignore
  return yield call(hueFetch, user, ...args);
}

const MAX_ATTEMPTS = 60;

function* userRegistrationFlow() {
  let response = yield call(hueAuth);
  let attempts = 0;

  if (response?.[0].error) {
    yield put({ type: PROMPT_BRIDGE_BUTTON });
    while (true) {
      if (attempts >= MAX_ATTEMPTS) return yield put({ type: FAILED_BRIDGE_PROMPT });

      yield delay(1000);
      response = yield call(hueAuth);
      if (response?.[0]?.success?.username) break;
      attempts++;
    }
  }

  yield put({ type: UPDATE_USER, user: response[0].success.username });
}

function* fetchLights() {
  const lights = yield call(callHue, `/lights`, null, 'GET');
  yield put({ type: UPDATE_LIGHTS, lights: Object.entries(lights).map(([id, light]) => ({ id, ...light })) });
}

// ┬ ┬┌─┐┬─┐┬┌─┌─┐┬─┐┌─┐
// ││││ │├┬┘├┴┐├┤ ├┬┘└─┐
// └┴┘└─┘┴└─┴ ┴└─┘┴└─└─┘
function* fetchUserFlow() {
  while (true) {
    yield take(START_USER_FLOW);
    yield call(userRegistrationFlow);
  }
}

function* lightFetcher() {
  while (true) {
    yield take(FETCH_LIGHTS);
    yield call(fetchLights);
  }
}

function* lightSwitcher() {
  while (true) {
    // TODO: Continue here - the action should be applied to the store based on success/failure of the call
    // TODO: This whole worker is rudimentary. It should be able to process more than just on/off
    const action = yield take(CHANGE_LIGHT);
    const { id } = action;
    const light = yield select(state => state.lights.find(light => light.id === id));
    const { state: { on }} = light;

    const result = yield call(callHue, `/lights/${id}/state`, { on: !on }, 'PUT');
    console.log(result);
  }
}

export function* rootSaga() {
  yield all([
    fork(fetchUserFlow),
    fork(lightFetcher),
    fork(lightSwitcher)
  ]);
}
