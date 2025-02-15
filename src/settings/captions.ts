export interface Caption {
  id: string;
  startFrame: number;
  type: 'info' | 'quote';
}

export const captions: Caption[] = [
  { id: 'incantation', startFrame: 20 * 2.5, type: 'quote' },
  { id: 'vehicleData', startFrame: 80 * 2.5, type: 'info' },
  { id: 'dranShout', startFrame: 310 * 2.5, type: 'quote' },
  { id: 'dranData', startFrame: 380 * 2.5, type: 'info' },
  { id: 'golgonShout', startFrame: 440 * 2.5, type: 'quote' },
  { id: 'golgonData', startFrame: 540 * 2.5, type: 'info' },
  { id: 'goldranShout', startFrame: 1240 * 2.5, type: 'quote' },
  { id: 'goldranData', startFrame: 1420 * 2.5, type: 'info' },
];
