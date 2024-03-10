import { useDispatch } from "react-redux";

const useDispatchFunc = (action) => {
  const dispatch = useDispatch();
  return (...args) => {
    dispatch(action(...args));
  }
}

// ┌─┐┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐┬─┐┌─┐
// └─┐├┤ │  ├┤ │   │ │ │├┬┘└─┐
// └─┘└─┘┴─┘└─┘└─┘ ┴ └─┘┴└─└─┘
export const selectPage = (state) => state.page;
export const selectUser = (state) => state.user;

// ┌─┐┌─┐┌┬┐┬┌─┐┌┐┌┌─┐
// ├─┤│   │ ││ ││││└─┐
// ┴ ┴└─┘ ┴ ┴└─┘┘└┘└─┘
export const START_USER_FLOW = 'START_USER_FLOW';
export const UPDATE_USER = 'UPDATE_USER';
export const PROMPT_BRIDGE_BUTTON = 'PROMPT_BRIDGE_BUTTON';
export const FAILED_BRIDGE_PROMPT = 'FAILED_BRIDGE_PROMPT';
export const FETCH_LIGHTS = 'FETCH_LIGHTS';
export const UPDATE_LIGHTS = 'UPDATE_LIGHTS';
export const CHANGE_LIGHT = 'CHANGE_LIGHT';

export const startUserFlow = () => useDispatchFunc(() => ({ type: START_USER_FLOW }));
export const fetchLightsFlow = () => useDispatchFunc(() => ({ type: FETCH_LIGHTS }));
export const changeLightState = () => useDispatchFunc((id) => ({ type: CHANGE_LIGHT, id }));
