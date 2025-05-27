
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AudienceSegment {
  id: string;
  name: string;
  description: string;
  rules: any;
  size: number;
  created_at: string;
  updated_at: string;
}

export const useAudienceSegments = () => {
  const [segments, setSegments] = useState<AudienceSegment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSegments = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('audience_segments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedSegments = (data || []).map(segment => ({
        id: segment.id,
        name: segment.name,
        description: segment.description || '',
        rules: Array.isArray(segment.rules) ? segment.rules : [],
        size: segment.size || 0,
        created_at: segment.created_at,
        updated_at: segment.updated_at
      }));
      
      setSegments(formattedSegments);
    } catch (error: any) {
      toast({
        title: "Error fetching segments",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSegment = async (segmentData: Omit<AudienceSegment, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('audience_segments')
        .insert([{
          ...segmentData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      const formattedSegment = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        rules: Array.isArray(data.rules) ? data.rules : [],
        size: data.size || 0,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      
      setSegments(prev => [formattedSegment, ...prev]);
      toast({
        title: "Segment created!",
        description: `${data.name} has been created successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error creating segment",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateSegment = async (id: string, updates: Partial<AudienceSegment>) => {
    try {
      const { data, error } = await supabase
        .from('audience_segments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      const formattedSegment = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        rules: Array.isArray(data.rules) ? data.rules : [],
        size: data.size || 0,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      
      setSegments(prev => prev.map(segment => 
        segment.id === id ? formattedSegment : segment
      ));
    } catch (error: any) {
      toast({
        title: "Error updating segment",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteSegment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('audience_segments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSegments(prev => prev.filter(segment => segment.id !== id));
      toast({
        title: "Segment deleted",
        description: "Segment has been successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting segment",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchSegments();
  }, [user]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('segments-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'audience_segments' },
        () => {
          fetchSegments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    segments,
    isLoading,
    addSegment,
    updateSegment,
    deleteSegment,
    refetch: fetchSegments
  };
};
