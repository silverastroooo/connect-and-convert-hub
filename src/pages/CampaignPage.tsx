
import React from 'react';
import Navigation from '@/components/Navigation';
import CampaignCreator from '@/components/CampaignCreator';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from '@/components/LoginPage';

const CampaignPage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CampaignCreator />
      </main>
    </div>
  );
};

export default CampaignPage;
