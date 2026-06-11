import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLevelTitle = (level: number): string => {
  const titles: Record<number, string> = {
    1: 'Curious Visitor',
    2: 'Heritage Explorer',
    3: 'Story Seeker',
    4: 'Kolkata Wanderer',
    5: 'Cultural Keeper',
    6: 'Monument Guardian',
    7: 'Heritage Defender',
    8: 'Kolkata Historian',
    9: 'Living Legend',
    10: 'Guardian of Kolkata',
  };
  return titles[level] || 'Guardian of Kolkata';
};

export const getRiskColor = (level: string): string => {
  const colors: Record<string, string> = {
    low: '#2D5016',
    medium: '#E8651A',
    high: '#C83050',
  };
  return colors[level.toLowerCase()] || '#2D5016';
};

export const getFeatureAccentColor = (feature: string): string => {
  const colors: Record<string, string> = {
    'monument-explorer': '#E8651A',
    '3d-viewer': '#E8651A',
    'ai-storyteller': '#6B3FA0',
    'ai-guide': '#6B3FA0',
    language: '#6B3FA0',
    'danger-map': '#1A7A6A',
    'risk-tracker': '#1A7A6A',
    'tram-tales': '#C8A020',
    'time-machine': '#C8A020',
    'heritage-passport': '#C83050',
    quiz: '#C83050',
    'guardian-score': '#C83050',
    'adda-ai': '#4A2080',
    'folk-archive': '#2D7A4A',
    'oral-history': '#2D7A4A',
    'adopt-monument': '#C8800A',
    'spot-change': '#C8800A',
  };
  return colors[feature.toLowerCase()] || '#2D5016';
};
