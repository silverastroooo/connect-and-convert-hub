
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Send, Save } from 'lucide-react';
import RuleBuilder from './RuleBuilder';
import { useToast } from '@/hooks/use-toast';

const CampaignCreator = () => {
  const [campaignName, setCampaignName] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const { toast } = useToast();

  const generateAIMessage = async () => {
    setIsGeneratingAI(true);
    // Simulate AI message generation
    setTimeout(() => {
      const aiMessages = [
        "Hi {{name}}! We noticed you haven't shopped with us in a while. Come back and enjoy 20% off your next order!",
        "Hello {{name}}! Your favorite products are back in stock. Don't miss out - limited quantities available!",
        "Hey {{name}}! Thanks for being a loyal customer. Here's an exclusive offer just for you: 25% off everything!"
      ];
      const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)];
      setCampaignMessage(randomMessage);
      setIsGeneratingAI(false);
      toast({
        title: "AI Message Generated!",
        description: "Your personalized message is ready to customize.",
      });
    }, 2000);
  };

  const saveCampaign = () => {
    toast({
      title: "Campaign Saved!",
      description: "Your campaign has been saved as a draft.",
    });
  };

  const launchCampaign = () => {
    toast({
      title: "Campaign Launched!",
      description: "Your campaign is now being sent to the target audience.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Campaign</h1>
          <p className="text-gray-600 mt-1">Build and launch your marketing campaign</p>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Campaign Details</TabsTrigger>
          <TabsTrigger value="audience">Target Audience</TabsTrigger>
          <TabsTrigger value="message">Message & AI</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Information</CardTitle>
              <CardDescription>Basic details about your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input 
                  id="campaign-name"
                  placeholder="e.g., Winter Sale 2024"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="campaign-goal">Campaign Goal</Label>
                <Input 
                  id="campaign-goal"
                  placeholder="e.g., Increase sales, Re-engage customers"
                />
              </div>
              <div>
                <Label htmlFor="campaign-description">Description</Label>
                <Textarea 
                  id="campaign-description"
                  placeholder="Describe the purpose and expected outcome of this campaign"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segmentation</CardTitle>
              <CardDescription>Define rules to target specific customer segments</CardDescription>
            </CardHeader>
            <CardContent>
              <RuleBuilder />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="message" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Message</CardTitle>
              <CardDescription>Craft your message with AI assistance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="message">Message Content</Label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={generateAIMessage}
                  disabled={isGeneratingAI}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGeneratingAI ? 'Generating...' : 'Generate AI Message'}
                </Button>
              </div>
              <Textarea 
                id="message"
                placeholder="Enter your campaign message here. Use {{name}} for personalization."
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
                rows={6}
                className="font-mono"
              />
              <div className="text-sm text-gray-600">
                <p><strong>Personalization variables:</strong></p>
                <ul className="mt-1 space-y-1">
                  <li>• <code>{'{{name}}'}</code> - Customer name</li>
                  <li>• <code>{'{{total_spent}}'}</code> - Total amount spent</li>
                  <li>• <code>{'{{last_order}}'}</code> - Last order date</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={saveCampaign}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              onClick={launchCampaign}
            >
              <Send className="w-4 h-4 mr-2" />
              Launch Campaign
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignCreator;
