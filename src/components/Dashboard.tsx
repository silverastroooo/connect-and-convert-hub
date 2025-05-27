
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, MessageSquare, Target, Plus, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useAudienceSegments } from '@/hooks/useAudienceSegments';

const Dashboard = () => {
  const { campaigns } = useCampaigns();
  const { segments } = useAudienceSegments();
  
  // Calculate total audience size from segments
  const totalAudienceSize = segments.reduce((total, segment) => total + segment.size, 0);
  
  const stats = [
    {
      title: 'Total Customers',
      value: totalAudienceSize.toLocaleString(),
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Campaigns',
      value: campaigns.filter(c => c.status === 'active').length.toString(),
      change: '+2',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      title: 'Total Segments',
      value: segments.length.toString(),
      change: '+3.2%',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Total Campaigns',
      value: campaigns.length.toString(),
      change: '+18.7%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const recentCampaigns = campaigns.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your campaigns.</p>
        </div>
        <Link to="/campaigns">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Recent Campaigns
            </CardTitle>
            <CardDescription>Performance overview of your latest campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.length > 0 ? (
                recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">
                        {campaign.audience_size.toLocaleString()} recipients • {campaign.delivered_count.toLocaleString()} delivered
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : campaign.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No campaigns created yet</p>
                  <Link to="/campaigns" className="text-blue-600 hover:underline">
                    Create your first campaign
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/campaigns" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create New Campaign
              </Button>
            </Link>
            <Link to="/audience" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Build Audience Segment
              </Button>
            </Link>
            <Link to="/campaigns" className="block">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
