import React from 'react';
import SVGs from '../../assets';
import useLanguage from '../../hooks/useLanguage';

export interface TOnboardingData {
  id: number;
  img: React.ReactNode;
  title: string;
  details: string;
}

export const useOnboardingData = () => {
  const language = useLanguage();

  const OnboardingData: TOnboardingData[] = [
    {
      id: 1,
      img: SVGs.VaistatLogo(140, 280),
      title: language.ONBOARDING_SCREEN.TITLE_WELCOME,
      details: language.ONBOARDING_SCREEN.DETAILS_WELCOME,
    },
    {
      id: 2,
      img: SVGs.OrderFulfill(245, 288),
      title: language.ONBOARDING_SCREEN.TITLE_FULLFIL,
      details: language.ONBOARDING_SCREEN.DETAILS_FULLFIL,
    },
    {
      id: 3,
      img: SVGs.RouteCar(249, 272),
      title: language.ONBOARDING_SCREEN.TITLE_ROUTE,
      details: language.ONBOARDING_SCREEN.DETAILS_ROUTE,
    },
    {
      id: 4,
      img: SVGs.DeliveryConfirm(242, 244),
      title: language.ONBOARDING_SCREEN.TITLE_CONFIRMATION,
      details: language.ONBOARDING_SCREEN.DETAILS_CONFIRMATION,
    },
  ];
  return OnboardingData;
};
