export interface PlasticAnalysis {
  types: string[];
  count: number;
  intensity: 'Low' | 'Medium' | 'High';
  description: string;
}

export interface PollutionReport {
  id: string;
  timestamp: number;
  location: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  analysis: PlasticAnalysis;
}
