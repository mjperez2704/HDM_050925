
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

type PredictiveAnalysisClientProps = {
    initialData: string;
};

export function PredictiveAnalysisClient({ initialData }: PredictiveAnalysisClientProps) {
  const { toast } = useToast();
  const [prediction, setPrediction] = useState<PredictFutureSalesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PredictFutureSalesInput>({
    resolver: zodResolver(PredictFutureSalesInputSchema),
    defaultValues: {
      historicalSalesData: initialData,
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
                      className="min-h-[200px] font-mono"
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
