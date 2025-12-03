
export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  MAP_EXPLORER = 'MAP_EXPLORER',
  AI_ANALYSIS = 'AI_ANALYSIS',
  PREDICTIONS = 'PREDICTIONS',
  UPLOAD = 'UPLOAD',
  ALERTS = 'ALERTS',
  SETTINGS = 'SETTINGS',
}

export interface Alert {
  id: string;
  title: string;
  region: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  type: 'bloom' | 'anomaly' | 'pollen';
}

export interface Metric {
  label: string;
  value: string;
  trend: number;
  unit?: string;
}

export interface PredictionData {
  month: string;
  risk: number;
  temperature: number;
  humidity: number;
}

export interface AnalysisContext {
  id: string;
  source: 'upload' | 'map' | 'default';
  imageUrl: string;
  regionName: string;
  metrics: {
    accuracy: number;
    area: string;
    confidence: 'High' | 'Medium' | 'Low';
  };
  date: string;
}
