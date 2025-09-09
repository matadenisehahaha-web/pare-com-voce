import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, Trophy } from "lucide-react";

interface CleanDaysCounterProps {
  days: number;
}

export const CleanDaysCounter = ({ days }: CleanDaysCounterProps) => {
  const getMilestone = (days: number) => {
    if (days >= 365) return { icon: Trophy, text: "1 Ano Incrível!", color: "text-warning", bg: "bg-warning/10" };
    if (days >= 90) return { icon: Trophy, text: "3 Meses!", color: "text-accent", bg: "bg-accent/10" };
    if (days >= 30) return { icon: Star, text: "1 Mês!", color: "text-primary", bg: "bg-primary/10" };
    if (days >= 7) return { icon: Flame, text: "1 Semana!", color: "text-secondary", bg: "bg-secondary/10" };
    return { icon: Flame, text: "Começando!", color: "text-success", bg: "bg-success/10" };
  };

  const milestone = getMilestone(days);
  const MilestoneIcon = milestone.icon;

  return (
    <Card className="shadow-lg border-none bg-gradient-to-br from-card via-card to-card-hover animate-scale-in">
      <CardContent className="p-6 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className={`p-3 rounded-xl ${milestone.bg} transition-colors`}>
              <MilestoneIcon className={`h-6 w-6 ${milestone.color}`} />
            </div>
            <Badge variant="secondary" className="text-sm font-medium px-3 py-1 bg-muted/70 border-border/50">
              {milestone.text}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <span className="text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent drop-shadow-sm">
                {days}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-glow/20 to-primary/20 blur-xl -z-10 opacity-50"></div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {days === 1 ? "dia limpo" : "dias limpos"}
            </p>
          </div>
          
          {/* Próximo marco com melhor design */}
          {days < 365 && (
            <div className="pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground bg-muted/30 rounded-full px-3 py-1 inline-block">
                {days < 7 && `🎯 ${7 - days} dias para 1 semana`}
                {days >= 7 && days < 30 && `🎯 ${30 - days} dias para 1 mês`}
                {days >= 30 && days < 90 && `🎯 ${90 - days} dias para 3 meses`}
                {days >= 90 && days < 365 && `🎯 ${365 - days} dias para 1 ano`}
              </p>
            </div>
          )}

          {/* Celebração para marcos importantes */}
          {(days === 7 || days === 30 || days === 90 || days === 365) && (
            <div className="animate-success-bounce">
              <div className="text-2xl">🎉</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};