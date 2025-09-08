import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, Trophy } from "lucide-react";

interface CleanDaysCounterProps {
  days: number;
}

export const CleanDaysCounter = ({ days }: CleanDaysCounterProps) => {
  const getMilestone = (days: number) => {
    if (days >= 365) return { icon: Trophy, text: "1 Ano!", color: "text-yellow-500" };
    if (days >= 90) return { icon: Trophy, text: "3 Meses!", color: "text-purple-500" };
    if (days >= 30) return { icon: Star, text: "1 Mês!", color: "text-blue-500" };
    if (days >= 7) return { icon: Flame, text: "1 Semana!", color: "text-orange-500" };
    return { icon: Flame, text: "Continue!", color: "text-green-500" };
  };

  const milestone = getMilestone(days);
  const MilestoneIcon = milestone.icon;

  return (
    <Card className="shadow-card">
      <CardContent className="p-6 text-center">
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <MilestoneIcon className={`h-6 w-6 ${milestone.color}`} />
            <Badge variant="secondary" className="text-sm">
              {milestone.text}
            </Badge>
          </div>
          
          <div>
            <span className="text-4xl font-bold gradient-primary bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {days}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {days === 1 ? "dia limpo" : "dias limpos"}
            </p>
          </div>
          
          {/* Próximo marco */}
          {days < 365 && (
            <p className="text-xs text-muted-foreground">
              {days < 7 && `${7 - days} dias para 1 semana`}
              {days >= 7 && days < 30 && `${30 - days} dias para 1 mês`}
              {days >= 30 && days < 90 && `${90 - days} dias para 3 meses`}
              {days >= 90 && days < 365 && `${365 - days} dias para 1 ano`}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};