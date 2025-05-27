
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, MessageSquare, Plus } from 'lucide-react';
import { useCampaigns } from '@/contexts/CampaignContext';

const CampaignList = () => {
  const { campaigns } = useCampaigns();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (campaigns.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h3>
          <p className="text-gray-600 text-center mb-6">
            Create your first campaign to start reaching your audience with targeted messages.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create First Campaign
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Campaigns</h2>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{campaign.goal}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Audience Size</span>
                  <span className="font-semibold">{campaign.audienceSize.toLocaleString()}</span>
                </div>
                {campaign.sentCount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sent</span>
                    <span className="font-semibold">{campaign.sentCount.toLocaleString()}</span>
                  </div>
                )}
                {campaign.deliveredCount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Delivered</span>
                    <span className="font-semibold">{campaign.deliveredCount.toLocaleString()}</span>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                Created: {campaign.createdAt.toLocaleDateString()}
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Users className="w-4 h-4 mr-1" />
                  Audience
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
