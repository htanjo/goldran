import { getTextureName } from './assets';

export interface TextureConfig {
  name: string;
  originalName: string;
  type: 'skybox' | 'reflection';
}

export type TextureConfigs = TextureConfig[];

export const textureConfigs: TextureConfigs = [
  {
    name: 'environment_skybox_texture',
    originalName: getTextureName('environment_skybox_texture'),
    type: 'skybox',
  },
  {
    name: 'environment_reflection_texture',
    originalName: getTextureName('environment_reflection_texture'),
    type: 'reflection',
  },
];
