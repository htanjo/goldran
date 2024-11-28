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
    radius: 0.2,
  },
  {
    name: 'side_light',
    variant: 'PointLight',
    position: {
      x: 1.5,
      y: 2,
      z: 3,
    },
    intensity: 30,
    diffuseColorHex: '#79eeff',
    radius: 0.2,
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
    radius: 0.5,
  },
];
