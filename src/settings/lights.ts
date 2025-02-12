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
      x: 9,
      y: 16,
      z: 8,
    },
    intensity: 600,
    diffuseColorHex: '#ffef8e',
    radius: 2,
  },
  {
    name: 'side_light',
    variant: 'PointLight',
    position: {
      x: 8,
      y: 1,
      z: -1,
    },
    intensity: 100,
    diffuseColorHex: '#79eeff',
    radius: 0.8,
  },
  {
    name: 'lower_light',
    variant: 'PointLight',
    position: {
      x: -7,
      y: -1,
      z: 3,
    },
    intensity: 800,
    diffuseColorHex: '#ff593e',
    radius: 0.6,
  },
  {
    name: 'stone_light',
    variant: 'PointLight',
    position: {
      x: 3,
      y: 8.5,
      z: 4.5,
    },
    intensity: 20,
    diffuseColorHex: '#db2125',
    radius: 0.8,
  },
];
