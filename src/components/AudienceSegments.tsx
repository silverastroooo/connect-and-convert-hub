
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, BarChart3, Edit, Trash2 } from 'lucide-react';
import RuleBuilder from './RuleBuilder';
import { useAudienceSegments } from '@/hooks/useAudienceSegments';
import { useToast } from '@/hooks/use-toast';

const AudienceSegments = () => {
  const { segments, isLoading, addSegment, deleteSegment } = useAudienceSegments();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSegmentName, setNewSegmentName] = useState('');
  const [newSegmentDescription, setNewSegmentDescription] = useState('');
  const [rules, setRules] = useState([]);

  const handleCreateSegment = async () => {
    if (!newSegmentName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a segment name.",
        variant: "destructive"
      });
      return;
    }

    await addSegment({
      name: newSegmentName,
      description: newSegmentDescription,
      rules: rules,
      size: Math.floor(Math.random() * 1000) + 100
    });

    // Reset form
    setNewSegmentName('');
    setNewSegmentDescription('');
    setRules([]);
    setIsCreateDialogOpen(false);
  };

  const handleDeleteSegment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this segment?')) {
      await deleteSegment(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audience Segments</h1>
          <p className="text-gray-600 mt-1">Manage and create customer segments for targeted campaigns</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Segment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Audience Segment</DialogTitle>
              <DialogDescription>
                Define a new customer segment with custom rules and criteria.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="segment-name">Segment Name</Label>
                <Input
                  id="segment-name"
                  placeholder="e.g., High Value Customers"
                  value={newSegmentName}
                  onChange={(e) => setNewSegmentName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="segment-description">Description</Label>
                <Textarea
                  id="segment-description"
                  placeholder="Describe this customer segment"
                  value={newSegmentDescription}
                  onChange={(e) => setNewSegmentDescription(e.target.value)}
                />
              </div>
              <div>
                <Label>Segment Rules</Label>
                <RuleBuilder onRulesChange={setRules} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSegment}>
                  Create Segment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                  Rules: {segment.rules.length > 0 ? `${segment.rules.length} conditions` : 'No specific rules'}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Analytics
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteSegment(segment.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {segments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No segments yet</h3>
            <p className="text-gray-600 text-center mb-6">
              Create your first audience segment to start targeting specific customer groups.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AudienceSegments;
