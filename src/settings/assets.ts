import dranHighMeshUrl from '../assets/dran_high.glb?url';
import dranLowMeshUrl from '../assets/dran_low.glb?url';
import environmentSkyboxTextureUrl from '../assets/environment_skybox.env?url';
import environmentReflectionTextureUrl from '../assets/environment_reflection.env?url';
import { qualityMode } from './general';

export interface AssetConfig {
  type: 'mesh' | 'texture' | 'cubeTexture';
  name: string;
  url: string;
}

export type AssetConfigs = AssetConfig[];

export const assetConfigs: AssetConfigs = [
  {
    type: 'mesh',
    name: 'dran_mesh',
    url: qualityMode ? dranHighMeshUrl : dranLowMeshUrl,
  },
  {
    type: 'cubeTexture',
    name: 'environment_skybox_texture',
    url: environmentSkyboxTextureUrl,
  },
  {
    type: 'cubeTexture',
    name: 'environment_reflection_texture',
    url: environmentReflectionTextureUrl,
  },
];

export function getTextureName(assetName: string) {
  const assetConfig = assetConfigs.find((config) => config.name === assetName);
  if (!assetConfig) {
    return assetName;
  }
  // By default, textures are named according to the URL string.
  return assetConfig.url;
}
