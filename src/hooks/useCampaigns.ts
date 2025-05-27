
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Campaign {
  id: string;
  name: string;
  message: string;
  goal: string;
  description: string;
  audience_size: number;
  status: 'draft' | 'active' | 'completed';
  sent_count: number;
  delivered_count: number;
  created_at: string;
  updated_at: string;
}

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCampaigns = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching campaigns",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addCampaign = async (campaignData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([{
          ...campaignData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setCampaigns(prev => [data, ...prev]);
      toast({
        title: "Campaign created!",
        description: `${data.name} has been ${data.status === 'active' ? 'launched' : 'saved as draft'}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error creating campaign",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === id ? data : campaign
      ));
    } catch (error: any) {
      toast({
        title: "Error updating campaign",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
      toast({
        title: "Campaign deleted",
        description: "Campaign has been successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting campaign",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('campaigns-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'campaigns' },
        () => {
          fetchCampaigns();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    campaigns,
    isLoading,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    refetch: fetchCampaigns
  };
};
