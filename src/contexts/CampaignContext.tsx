import React, { createContext, useContext } from 'react';

// This context is now deprecated - we use Supabase hooks instead
// Keeping this file to avoid breaking imports during transition

interface Campaign {
  id: string;
  name: string;
  message: string;
  goal: string;
  description: string;
  audienceSize: number;
  status: 'draft' | 'active' | 'completed';
  createdAt: Date;
  sentCount?: number;
  deliveredCount?: number;
}

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Empty provider - functionality moved to useCampaigns hook
  const contextValue: CampaignContextType = {
    campaigns: [],
    addCampaign: () => {},
    updateCampaign: () => {},
    deleteCampaign: () => {}
  };

  return (
    <CampaignContext.Provider value={contextValue}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};
