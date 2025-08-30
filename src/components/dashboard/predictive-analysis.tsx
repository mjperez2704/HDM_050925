
'use server';

import { getHistoricalSalesData } from '@/actions/dashboard-actions';
import { PredictiveAnalysisClient } from './predictive-analysis-client';

export async function PredictiveAnalysis() {
  const historicalData = await getHistoricalSalesData();

  return <PredictiveAnalysisClient initialData={historicalData} />;
}
