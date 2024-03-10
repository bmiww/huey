
// ████████╗██╗   ██╗██████╗ ███████╗███████╗
// ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝
//    ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗
//    ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║
//    ██║      ██║   ██║     ███████╗███████║
//    ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝
// ┬  ┬┌─┐┬ ┬┌┬┐
// │  ││ ┬├─┤ │
// ┴─┘┴└─┘┴ ┴ ┴
export interface LightState {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: number[];
  ct: number;
  alert: string;
  colormode: string;
  mode: string;
  reachable: boolean;
}

export interface LightConfig {
  archetype: string;
  function: string;
  direction: string;
  startup: {
    mode: string;
    configured: boolean;
  }
}

export interface Light {
  state: LightState;
  config: LightConfig;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;

  // Custom properties
  id: string;
}
