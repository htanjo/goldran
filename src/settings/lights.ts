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
      x: -1,
      y: 6,
      z: 1.5,
    },
    intensity: 100,
    diffuseColorHex: '#ffef8e',
    radius: 0.5,
  },
  {
    name: 'side_light',
    variant: 'PointLight',
    position: {
      x: 3,
      y: 4,
      z: 6,
    },
    intensity: 100,
    diffuseColorHex: '#79eeff',
    radius: 2.0,
  },
  {
    name: 'lower_light',
    variant: 'PointLight',
    position: {
      x: -1,
      y: -5,
      z: -8,
    },
    intensity: 400,
    diffuseColorHex: '#ff593e',
    radius: 3.0,
  },
  {
    name: 'side_light',
    variant: 'PointLight',
    position: {
      x: 3,
      y: 4,
      z: 6,
    },
    intensity: 100,
    diffuseColorHex: '#79eeff',
    radius: 2.0,
  },
];
