
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, BarChart3 } from 'lucide-react';
import RuleBuilder from './RuleBuilder';

const AudienceSegments = () => {
  const [segments] = useState([
    {
      id: 1,
      name: 'High Value Customers',
      description: 'Customers who spent more than ₹50,000',
      size: 1247,
      rules: 'total_spent > 50000'
    },
    {
      id: 2,
      name: 'Inactive Users',
      description: 'Users who haven\'t ordered in 30 days',
      size: 856,
      rules: 'last_order_date > 30 days ago'
    },
    {
      id: 3,
      name: 'New Customers',
      description: 'Customers who registered in the last 7 days',
      size: 342,
      rules: 'registration_date <= 7 days ago'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audience Segments</h1>
          <p className="text-gray-600 mt-1">Manage and create customer segments for targeted campaigns</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          New Segment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {segments.map((segment) => (
          <Card key={segment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{segment.name}</span>
                <Users className="w-5 h-5 text-blue-600" />
              </CardTitle>
              <CardDescription>{segment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Audience Size</span>
                  <span className="font-semibold text-lg">{segment.size.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  Rules: {segment.rules}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Analytics
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Segment</CardTitle>
          <CardDescription>Build a custom audience segment using our rule builder</CardDescription>
        </CardHeader>
        <CardContent>
          <RuleBuilder />
        </CardContent>
      </Card>
    </div>
  );
};

export default AudienceSegments;
