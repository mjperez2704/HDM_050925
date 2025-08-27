/**
 * @fileOverview This file defines the Zod schemas and TypeScript types for the predictFutureSales flow.
 *
 * - PredictFutureSalesInputSchema - The Zod schema for the input of the predictFutureSales function.
 * - PredictFutureSalesInput - The TypeScript type for the input of the predictFutureSales function.
 * - PredictFutureSalesOutputSchema - The Zod schema for the output of the predictFutureSales function.
 * - PredictFutureSalesOutput - The TypeScript type for the output of the predictFutureSales function.
 */
import { z } from 'zod';

export const PredictFutureSalesInputSchema = z.object({
  historicalSalesData: z
    .string()
    .describe(
      'Historical sales data in CSV format, with columns for date and sales amount.'
    ),
});
export type PredictFutureSalesInput = z.infer<typeof PredictFutureSalesInputSchema>;

export const PredictFutureSalesOutputSchema = z.object({
  predictedSalesTrend: z
    .string()
    .describe(
      'A summary of the predicted sales trend, including key insights and potential future sales figures.'
    ),
  confidenceLevel: z
    .string()
    .describe(
      'The confidence level of the prediction, indicating the reliability of the forecasted trend.'
    ),
});
export type PredictFutureSalesOutput = z.infer<typeof PredictFutureSalesOutputSchema>;
