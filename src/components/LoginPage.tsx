
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { BarChart3, Users, MessageSquare, Target } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('demo@minicrm.com');
  const [password, setPassword] = useState('password');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left side - Branding and Features */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              MiniCRM
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Powerful customer engagement platform with AI-driven insights
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">Real-time campaign insights</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Segmentation</h3>
              <p className="text-sm text-gray-600">Smart audience targeting</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">AI Messages</h3>
              <p className="text-sm text-gray-600">Personalized content</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm">
              <Target className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900">Campaigns</h3>
              <p className="text-sm text-gray-600">Multi-channel delivery</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your MiniCRM account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
              <p className="text-sm text-blue-600">Email: demo@minicrm.com</p>
              <p className="text-sm text-blue-600">Password: password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
