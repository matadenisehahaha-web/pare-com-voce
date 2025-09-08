import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pause, Heart, Wind, Clock } from "lucide-react";

interface PausaButtonProps {
  onClick: () => void;
}

export const PausaButton = ({ onClick }: PausaButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleEmergency = () => {
    setShowDialog(true);
    onClick();
  };

  return (
    <>
      {/* Botão flutuante de emergência */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleEmergency}
          size="lg"
          className="h-16 w-16 rounded-full gradient-emergency shadow-emergency animate-gentle-pulse hover:scale-105 transition-smooth"
        >
          <Pause className="h-8 w-8" />
        </Button>
      </div>

      {/* Dialog de ferramentas rápidas */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Você não está sozinho
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-center text-muted-foreground">
              Respire fundo. Este momento vai passar.
            </p>
            
            {/* Ferramentas rápidas */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => {
                  // Implementar respiração guiada
                  setShowDialog(false);
                }}
              >
                <Wind className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Respiração Guiada</div>
                  <div className="text-xs text-muted-foreground">2 minutos</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => {
                  // Implementar adiamento
                  setShowDialog(false);
                }}
              >
                <Clock className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Adiar 15 Minutos</div>
                  <div className="text-xs text-muted-foreground">Apenas aguarde</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start h-12"
                onClick={() => {
                  // Implementar contato com buddy
                  setShowDialog(false);
                }}
              >
                <Heart className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Falar com Buddy</div>
                  <div className="text-xs text-muted-foreground">Suporte imediato</div>
                </div>
              </Button>
            </div>

            {/* Mensagem de apoio */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-center">
                💙 Lembre-se: você é mais forte que este momento.
                Cada segundo de resistência é uma vitória.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};