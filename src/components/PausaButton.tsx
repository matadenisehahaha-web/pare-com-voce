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
          className="h-16 w-16 rounded-full gradient-emergency shadow-emergency animate-gentle-pulse hover:scale-110 transition-all duration-300 border-none hover:shadow-xl"
        >
          <Pause className="h-8 w-8 text-white drop-shadow-sm" />
        </Button>
      </div>

      {/* Dialog de ferramentas rápidas */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md border-none shadow-xl bg-card/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Você não está sozinho
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <p className="text-center text-muted-foreground leading-relaxed">
              Respire fundo. Este momento vai passar.
            </p>
            
            {/* Ferramentas rápidas */}
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start h-14 hover:bg-primary/5 hover:border-primary/30 transition-all group border-border/50"
                onClick={() => {
                  // Implementar respiração guiada
                  setShowDialog(false);
                }}
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/15 mr-3 transition-colors">
                  <Wind className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Respiração Guiada</div>
                  <div className="text-xs text-muted-foreground">2 minutos de calma</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start h-14 hover:bg-warning/5 hover:border-warning/30 transition-all group border-border/50"
                onClick={() => {
                  // Implementar adiamento
                  setShowDialog(false);
                }}
              >
                <div className="p-2 rounded-lg bg-warning/10 group-hover:bg-warning/15 mr-3 transition-colors">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Adiar 15 Minutos</div>
                  <div className="text-xs text-muted-foreground">Apenas aguarde um pouco</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start h-14 hover:bg-secondary/5 hover:border-secondary/30 transition-all group border-border/50"
                onClick={() => {
                  // Implementar contato com buddy
                  setShowDialog(false);
                }}
              >
                <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/15 mr-3 transition-colors">
                  <Heart className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Falar com Buddy</div>
                  <div className="text-xs text-muted-foreground">Suporte humano imediato</div>
                </div>
              </Button>
            </div>

            {/* Mensagem de apoio */}
            <div className="mt-6 p-5 bg-gradient-to-r from-muted/50 via-muted to-muted/50 rounded-xl border border-border/30">
              <p className="text-sm text-center leading-relaxed">
                💙 <span className="font-medium">Lembre-se:</span> você é mais forte que este momento.
                <br />
                <span className="text-primary font-medium">Cada segundo de resistência é uma vitória.</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};