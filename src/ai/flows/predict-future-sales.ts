'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting future sales trends.
 *
 * - predictFutureSales - An async function that triggers the sales prediction flow.
 */

import {ai} from '@/ai/genkit';
import type { PredictFutureSalesInput, PredictFutureSalesOutput } from '@/ai/schemas/predict-future-sales-schemas';
import { PredictFutureSalesInputSchema, PredictFutureSalesOutputSchema } from '@/ai/schemas/predict-future-sales-schemas';

export async function predictFutureSales(
  input: PredictFutureSalesInput
): Promise<PredictFutureSalesOutput> {
  return predictFutureSalesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictFutureSalesPrompt',
  input: {schema: PredictFutureSalesInputSchema},
  output: {schema: PredictFutureSalesOutputSchema},
  prompt: `You are an AI sales analyst. Analyze the historical sales data provided and predict future sales trends.

Historical Sales Data:
{{{historicalSalesData}}}

Provide a summary of the predicted sales trend, including key insights and potential future sales figures. Also, provide the confidence level of the prediction.

Output the predicted sales trend and the confidence level in JSON format.  Use the descriptions in the schema to guide formatting.`, 
});

const predictFutureSalesFlow = ai.defineFlow(
  {
    name: 'predictFutureSalesFlow',
    inputSchema: PredictFutureSalesInputSchema,
    outputSchema: PredictFutureSalesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
