export interface Caption {
  id: string;
  startFrame: number;
  type: 'info' | 'quote' | 'image';
}

export const captions: Caption[] = [
  { id: 'incantation', startFrame: 20 * 2.5, type: 'quote' },
  { id: 'vehicleData', startFrame: 80 * 2.5, type: 'info' },
  { id: 'dranDiagram', startFrame: 220 * 2.5, type: 'image' },
  { id: 'dranShout', startFrame: 310 * 2.5, type: 'quote' },
  { id: 'dranData', startFrame: 370 * 2.5, type: 'info' },
  { id: 'golgonShout', startFrame: 440 * 2.5, type: 'quote' },
  { id: 'golgonData', startFrame: 560 * 2.5, type: 'info' },
  { id: 'combinationData', startFrame: 680 * 2.5, type: 'info' },
  { id: 'goldranDiagram', startFrame: 890 * 2.5, type: 'image' },
  { id: 'goldranShout', startFrame: 1235 * 2.5, type: 'quote' },
  { id: 'goldranData', startFrame: 1390 * 2.5, type: 'info' },
];
