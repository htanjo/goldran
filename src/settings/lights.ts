export interface LightConfig {
  name: string;
  effectivePeriod: 'former' | 'latter';
  variant: 'PointLight' | 'DirectionalLight';
  position: {
    x: number;
    y: number;
    z: number;
  };
  intensity: number;
  diffuseColorHex: string;
  radius: number;
  includedMeshNames?: string[];
}

export type LightConfigs = LightConfig[];

export const lightConfigs: LightConfigs = [
  {
    name: 'former_upper_light',
    effectivePeriod: 'former',
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
    name: 'former_side_light',
    effectivePeriod: 'former',
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
    name: 'former_lower_light',
    effectivePeriod: 'former',
    variant: 'PointLight',
    position: {
      x: -2,
      y: -2,
      z: -8,
    },
    intensity: 400,
    diffuseColorHex: '#ff593e',
    radius: 0.3,
  },
  {
    name: 'former_stone_light',
    effectivePeriod: 'former',
    variant: 'PointLight',
    position: {
      x: -2,
      y: 5,
      z: 0.5,
    },
    intensity: 20,
    diffuseColorHex: '#db2125',
    radius: 0.3,
  },
  {
    name: 'latter_upper_light',
    effectivePeriod: 'latter',
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
    name: 'latter_side_light',
    effectivePeriod: 'latter',
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
    name: 'latter_lower_light',
    effectivePeriod: 'latter',
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
    name: 'latter_stone_light',
    effectivePeriod: 'latter',
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
  {
    name: 'latter_head_light',
    effectivePeriod: 'latter',
    variant: 'PointLight',
    position: {
      x: 1,
      y: 11.5,
      z: 1,
    },
    intensity: 150,
    diffuseColorHex: '#ffef8e',
    radius: 1.0,
    includedMeshNames: [
      'goldran_ear_left',
      'goldran_ear_right',
      'goldran_face',
      'goldran_head',
      'goldran_jaw',
    ],
  },
];
