import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Brain, 
  Zap, 
  Target, 
  CheckCircle,
  Calendar,
  TrendingUp
} from "lucide-react";

export const CheckInForm = () => {
  const [mood, setMood] = useState([5]);
  const [craving, setCraving] = useState([3]);
  const [energy, setEnergy] = useState([6]);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [gratitude, setGratitude] = useState('');
  const [notes, setNotes] = useState('');

  const moodLabels = [
    'Muito mal', 'Mal', 'Ruim', 'Neutro', 'Ok', 
    'Bem', 'Muito bem', 'Ótimo', 'Excelente', 'Incrível'
  ];

  const cravingLabels = [
    'Nenhum', 'Muito baixo', 'Baixo', 'Moderado', 'Alto', 
    'Muito alto', 'Intenso', 'Muito intenso', 'Crítico', 'Emergência'
  ];

  const commonTriggers = [
    'Estresse', 'Tédio', 'Solidão', 'Ansiedade', 'Raiva',
    'Tristeza', 'Pressão social', 'Cansaço', 'Comemoração'
  ];

  const toggleTrigger = (trigger: string) => {
    setTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    );
  };

  const handleSubmit = () => {
    const checkInData = {
      date: new Date(),
      mood: mood[0],
      craving: craving[0],
      energy: energy[0],
      triggers,
      gratitude,
      notes
    };
    
    console.log('Check-in salvo:', checkInData);
    
    // Aqui você salvaria no localStorage ou enviaria para o backend
    const existingCheckIns = JSON.parse(localStorage.getItem('pare_checkins') || '[]');
    existingCheckIns.push(checkInData);
    localStorage.setItem('pare_checkins', JSON.stringify(existingCheckIns));
    
    // Feedback visual
    alert('Check-in salvo com sucesso! 🎉');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <div className="w-12 h-12 mx-auto gradient-primary rounded-full flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Check-in Diário</CardTitle>
            <p className="text-muted-foreground text-sm">
              Como você está se sentindo hoje?
            </p>
          </CardHeader>
        </Card>

        {/* Humor */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <Label className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Humor geral
            </Label>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={mood}
              onValueChange={setMood}
              max={9}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <Badge variant="secondary" className="text-sm">
                {moodLabels[mood[0]]}
              </Badge>
              <span>10</span>
            </div>
          </CardContent>
        </Card>

        {/* Intensidade do Desejo */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <Label className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Intensidade do desejo/craving
            </Label>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={craving}
              onValueChange={setCraving}
              max={9}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <Badge 
                variant={craving[0] > 6 ? "destructive" : craving[0] > 3 ? "outline" : "secondary"}
                className="text-sm"
              >
                {cravingLabels[craving[0]]}
              </Badge>
              <span>10</span>
            </div>
          </CardContent>
        </Card>

        {/* Energia */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <Label className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Nível de energia
            </Label>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={energy}
              onValueChange={setEnergy}
              max={9}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Exausto</span>
              <Badge variant="secondary" className="text-sm">
                {energy[0] + 1}/10
              </Badge>
              <span>Energizado</span>
            </div>
          </CardContent>
        </Card>

        {/* Gatilhos */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <Label className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Gatilhos de hoje
            </Label>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Toque nos gatilhos que você experimentou:
            </p>
            <div className="flex flex-wrap gap-2">
              {commonTriggers.map((trigger) => (
                <Badge
                  key={trigger}
                  variant={triggers.includes(trigger) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTrigger(trigger)}
                >
                  {trigger}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gratidão */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <Label>Pelo que você é grato hoje?</Label>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Ex: Consegui resistir a uma tentação, minha família me apoiou, tive um dia produtivo..."
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Notas */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <Label>Notas adicionais</Label>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Como foi seu dia? O que aprendeu? Qual foi seu maior desafio?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Botão de salvar */}
        <Button onClick={handleSubmit} className="w-full" size="lg">
          <CheckCircle className="h-5 w-5 mr-2" />
          Salvar Check-in
        </Button>

        {/* Estatísticas rápidas */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-primary">7</p>
                <p className="text-xs text-muted-foreground">Check-ins</p>
              </div>
              <div>
                <p className="text-lg font-bold text-secondary">
                  {Math.round((mood[0] + 1) * 10)}%
                </p>
                <p className="text-xs text-muted-foreground">Humor médio</p>
              </div>
              <div>
                <TrendingUp className="h-5 w-5 mx-auto text-green-500" />
                <p className="text-xs text-muted-foreground">Tendência</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};