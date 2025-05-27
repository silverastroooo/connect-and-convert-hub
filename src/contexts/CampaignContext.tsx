
import React, { createContext, useContext, useState } from 'react';

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
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Welcome Series',
      message: 'Welcome to our platform! Get 20% off your first order.',
      goal: 'Welcome new users',
      description: 'Automated welcome campaign for new registrations',
      audienceSize: 1247,
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000 * 2),
      sentCount: 1247,
      deliveredCount: 1198
    },
    {
      id: '2',
      name: 'Win-back Campaign',
      message: 'We miss you! Come back and enjoy 25% off.',
      goal: 'Re-engage inactive users',
      description: 'Target users inactive for 30+ days',
      audienceSize: 856,
      status: 'active',
      createdAt: new Date(Date.now() - 86400000),
      sentCount: 856,
      deliveredCount: 821
    }
  ]);

  const addCampaign = (campaignData: Omit<Campaign, 'id' | 'createdAt'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, updateCampaign, deleteCampaign }}>
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
