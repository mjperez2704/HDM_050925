
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { SplashScreen } from "@/components/splash-screen";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = React.useState("admin@example.com");
  const [password, setPassword] = React.useState("password123");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(true);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email === "admin@example.com" && password === "password123") {
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "Redirigiendo al dashboard.",
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "Las credenciales son incorrectas. Por favor, inténtalo de nuevo.",
      });
      setIsSubmitting(false);
    }
  };

  if (showSplash) {
    return <SplashScreen onFinished={() => setShowSplash(false)} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40" style={{background: 'hsl(210 40% 98%)'}}>
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Image 
                    src="https://hospitaldelmovil.mega-shop-test.shop/shared/logo.png" 
                    alt="Logo" 
                    width={80} 
                    height={80}
                    data-ai-hint="logo"
                    className="rounded-lg"
                />
            </div>
            <CardTitle className="text-2xl">Hospital del Móvil</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al sistema.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-destructive hover:bg-destructive/90" type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Iniciar Sesión
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
