
"use client";

import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlert } from "lucide-react";

type PinConfirmationModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: (pin: string) => void;
};

export function PinConfirmationModal({ isOpen, onOpenChange, onConfirm }: PinConfirmationModalProps) {
  const [pin, setPin] = useState<string[]>(Array(4).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
        setPin(Array(4).fill(''));
        inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === '') {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move to next input
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pastedData.length === 4) {
      const newPin = pastedData.split('');
      setPin(newPin);
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = () => {
    const finalPin = pin.join('');
    if (finalPin.length === 4) {
      onConfirm(finalPin);
    }
  };

  const isPinComplete = pin.every(digit => digit !== '');

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
             <div className="p-3 bg-primary/10 rounded-full mb-4">
                <ShieldAlert className="h-8 w-8 text-primary" />
             </div>
            <DialogTitle className="text-2xl">Confirmación Requerida</DialogTitle>
            <DialogDescription className="mt-2">
              Por tu seguridad, ingresa tu PIN de 4 dígitos para continuar.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex justify-center gap-2 py-4" onPaste={handlePaste}>
          {pin.map((digit, index) => (
            <Input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-2xl font-bold border-primary/50 focus:border-primary ring-offset-background focus-visible:ring-primary"
            />
          ))}
        </div>
        <DialogFooter className="flex-col gap-2">
          <Button 
            type="button" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
            onClick={handleSubmit}
            disabled={!isPinComplete}
          >
            Confirmar Acción
          </Button>
           <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
