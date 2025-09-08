import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Heart, Shield } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    focusArea: "",
    whyQuit: "",
    triggers: "",
    goals: ""
  });

  const steps = [
    {
      title: "Bem-vindo ao P.A.R.E.",
      subtitle: "Vamos conhecer você melhor"
    },
    {
      title: "Seu Foco Principal",
      subtitle: "Qual comportamento você quer modificar?"
    },
    {
      title: "Seus Motivadores",
      subtitle: "Por que essa mudança é importante?"
    },
    {
      title: "Seus Gatilhos",
      subtitle: "O que costuma desencadear o comportamento?"
    },
    {
      title: "Suas Metas",
      subtitle: "O que você espera alcançar?"
    }
  ];

  const focusAreas = [
    { value: "gambling", label: "Jogos e Apostas" },
    { value: "pornography", label: "Pornografia" },
    { value: "alcohol", label: "Álcool" },
    { value: "smoking", label: "Tabaco/Cigarro" },
    { value: "drugs", label: "Drogas" },
    { value: "screen", label: "Tempo de Tela" },
    { value: "other", label: "Outro" }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-card">
        <CardHeader className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
          <p className="text-muted-foreground">{steps[currentStep].subtitle}</p>
          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Passo 0: Boas-vindas */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  O P.A.R.E. é seu companheiro na jornada de recuperação.
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-muted rounded-lg">
                    <Shield className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Privado</p>
                    <p className="text-xs text-muted-foreground">100% confidencial</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <Heart className="h-5 w-5 mx-auto mb-2 text-secondary" />
                    <p className="font-medium">Sem julgamentos</p>
                    <p className="text-xs text-muted-foreground">Apenas apoio</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Como você gostaria de ser chamado? (opcional)</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome ou apelido"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Passo 1: Foco Principal */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <RadioGroup value={formData.focusArea} onValueChange={(value) => updateFormData('focusArea', value)}>
                {focusAreas.map((area) => (
                  <div key={area.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value={area.value} id={area.value} />
                    <Label htmlFor={area.value} className="flex-1 cursor-pointer">
                      {area.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Passo 2: Motivadores */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="why">Por que você quer fazer essa mudança?</Label>
                <Textarea
                  id="why"
                  placeholder="Ex: Quero ser um exemplo melhor para meus filhos, ter mais energia, cuidar da minha saúde..."
                  value={formData.whyQuit}
                  onChange={(e) => updateFormData('whyQuit', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Passo 3: Gatilhos */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="triggers">Quais situações costumam te desafiar?</Label>
                <Textarea
                  id="triggers"
                  placeholder="Ex: Estresse no trabalho, tédio, noites sozinho, discussões em casa..."
                  value={formData.triggers}
                  onChange={(e) => updateFormData('triggers', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Passo 4: Metas */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goals">Quais são suas metas principais?</Label>
                <Textarea
                  id="goals"
                  placeholder="Ex: 30 dias limpos, economizar R$ 500/mês, melhorar o sono, fortalecer relacionamentos..."
                  value={formData.goals}
                  onChange={(e) => updateFormData('goals', e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-center text-muted-foreground">
                  🌟 Suas informações ficam totalmente privadas e podem ser alteradas a qualquer momento.
                </p>
              </div>
            </div>
          )}

          {/* Botões de navegação */}
          <div className="flex gap-3 pt-4">
            {currentStep > 0 && (
              <Button variant="outline" onClick={prevStep} className="flex-1">
                Voltar
              </Button>
            )}
            <Button onClick={nextStep} className="flex-1">
              {currentStep === steps.length - 1 ? 'Começar Jornada' : 'Próximo'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};