import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";

export const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const phases = {
    inhale: { duration: 4, text: 'Inspire', instruction: 'Respire fundo pelo nariz' },
    hold: { duration: 4, text: 'Segure', instruction: 'Mantenha o ar nos pulmões' },
    exhale: { duration: 6, text: 'Expire', instruction: 'Solte o ar lentamente pela boca' },
    pause: { duration: 2, text: 'Pausa', instruction: 'Relaxe completamente' }
  };

  const phaseOrder: (keyof typeof phases)[] = ['inhale', 'hold', 'exhale', 'pause'];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        setTotalTime(prev => prev + 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Próxima fase
      const currentIndex = phaseOrder.indexOf(phase);
      const nextIndex = (currentIndex + 1) % phaseOrder.length;
      const nextPhase = phaseOrder[nextIndex];
      
      setPhase(nextPhase);
      setTimeLeft(phases[nextPhase].duration);
      
      if (nextPhase === 'inhale' && currentIndex === 3) {
        setCycle(prev => prev + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimeLeft(phases.inhale.duration);
  };

  const pauseExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(phases.inhale.duration);
    setCycle(0);
    setTotalTime(0);
  };

  const progress = ((phases[phase].duration - timeLeft) / phases[phase].duration) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <CardTitle>Respiração Guiada</CardTitle>
          <p className="text-muted-foreground">Técnica 4-4-6-2 para relaxamento</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Círculo de respiração */}
          <div className="flex justify-center">
            <div className={`
              w-32 h-32 rounded-full gradient-calm flex items-center justify-center
              transition-all duration-1000 ease-in-out
              ${phase === 'inhale' && isActive ? 'scale-125' : ''}
              ${phase === 'exhale' && isActive ? 'scale-75' : ''}
              animate-breathe
            `}>
              <div className="text-white text-center">
                <div className="text-2xl font-bold">{timeLeft}</div>
                <div className="text-sm opacity-80">{phases[phase].text}</div>
              </div>
            </div>
          </div>

          {/* Progresso da fase atual */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fase atual</span>
              <span className="font-medium">{phases[phase].text}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Instruções */}
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">{phases[phase].instruction}</p>
            <p className="text-sm text-muted-foreground">
              Ciclo {cycle + 1} • {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
            </p>
          </div>

          {/* Controles */}
          <div className="flex gap-3 justify-center">
            {!isActive && cycle === 0 ? (
              <Button onClick={startExercise} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Começar
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={pauseExercise} className="flex-1">
                  {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isActive ? 'Pausar' : 'Continuar'}
                </Button>
                <Button variant="outline" onClick={resetExercise}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Dicas */}
          {!isActive && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-center">
                💡 <strong>Dica:</strong> Encontre uma posição confortável e foque apenas na sua respiração.
                É normal a mente vagar - apenas traga sua atenção de volta.
              </p>
            </div>
          )}

          {/* Estatísticas */}
          {cycle > 0 && (
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{cycle}</p>
                <p className="text-xs text-muted-foreground">Ciclos completos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{Math.floor(totalTime / 60)}</p>
                <p className="text-xs text-muted-foreground">Minutos meditados</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};