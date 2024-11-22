export interface LightConfig {
  name: string;
  variant: 'PointLight' | 'DirectionalLight';
  position: {
    x: number;
    y: number;
    z: number;
  };
  intensity: number;
  diffuseColorHex: string;
  radius: number;
}

export type LightConfigs = LightConfig[];

export const lightConfigs: LightConfigs = [
  {
    name: 'upper_light',
    variant: 'PointLight',
    position: {
      x: 10,
      y: 10,
      z: 10,
    },
    intensity: 1000,
    diffuseColorHex: '#ffbf44',
    radius: 0.2,
  },
  {
    name: 'side_light',
    variant: 'PointLight',
    position: {
      x: -5,
      y: 5,
      z: 20,
    },
    intensity: 1600,
    diffuseColorHex: '#ff6035',
    radius: 0.2,
  },
  {
    name: 'lower_light',
    variant: 'PointLight',
    position: {
      x: 5,
      y: -10,
      z: 5,
    },
    intensity: 300,
    diffuseColorHex: '#4e45ff',
    radius: 0.2,
  },
];
