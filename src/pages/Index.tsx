import { useState } from "react";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    // Aqui você salvaria no localStorage que o usuário completou o onboarding
    localStorage.setItem('pare_onboarding_completed', 'true');
  };

  // Verificar se já completou o onboarding
  const checkOnboarding = () => {
    const completed = localStorage.getItem('pare_onboarding_completed');
    return completed === 'true' || hasCompletedOnboarding;
  };

  if (!checkOnboarding()) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard />;
};

export default Index;
