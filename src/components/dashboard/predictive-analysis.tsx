"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { predictFutureSales } from '@/ai/flows/predict-future-sales';
import type { PredictFutureSalesInput, PredictFutureSalesOutput } from '@/ai/schemas/predict-future-sales-schemas';
import { PredictFutureSalesInputSchema } from '@/ai/schemas/predict-future-sales-schemas';


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from 'lucide-react';

const placeholderData = `Fecha,Ventas
2024-01-01,1500
2024-01-02,1750
2024-01-03,1600
2024-01-04,1800
2024-01-05,1900
2024-02-01,2100
2024-02-02,2300
2024-02-03,2200
2024-03-01,2500
2024-03-02,2650
2024-04-01,2800
2024-05-01,3000
2024-06-01,3200
`;

export function PredictiveAnalysis() {
  const { toast } = useToast();
  const [prediction, setPrediction] = useState<PredictFutureSalesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PredictFutureSalesInput>({
    resolver: zodResolver(PredictFutureSalesInputSchema),
    defaultValues: {
      historicalSalesData: placeholderData,
    },
  });

  async function onSubmit(values: PredictFutureSalesInput) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictFutureSales(values);
      setPrediction(result);
    } catch (error) {
      console.error("La predicción falló:", error);
      toast({
        variant: "destructive",
        title: "Predicción Fallida",
        description: "Ocurrió un error al analizar los datos de ventas. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis Predictivo de Ventas</CardTitle>
        <CardDescription>
          Usa IA para analizar datos históricos de ventas (en formato CSV) y pronosticar tendencias futuras.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="historicalSalesData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datos Históricos de Ventas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Pega aquí tus datos históricos de ventas en formato CSV."
                      className="min-h-[200px] font-code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Analizar y Predecir
            </Button>
          </CardFooter>
        </form>
      </Form>
      {prediction && (
        <CardContent className="grid gap-4 pt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Tendencia de Ventas Predicha</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{prediction.predictedSalesTrend}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Nivel de Confianza</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{prediction.confidenceLevel}</p>
                </CardContent>
            </Card>
        </CardContent>
      )}
    </Card>
  );
}
