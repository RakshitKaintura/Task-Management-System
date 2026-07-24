'use client';

import { useState } from 'react';
import { Bell, Moon, Monitor, Sun, Lock, Loader2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useUIStore from '@/store/useUIStore';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { theme, setTheme } = useUIStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const saveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Settings saved successfully');
    }, 800);
  };

  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your app preferences and notifications.
        </p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
              <CardDescription>
                Customize the appearance of the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Light Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Bright and clean look for daytime use.
                  </p>
                </div>
                <Button 
                  variant={theme === 'light' ? 'default' : 'outline'} 
                  onClick={() => setTheme('light')}
                  className="w-24"
                >
                  <Sun className="mr-2 h-4 w-4" /> Light
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Easy on the eyes, perfect for low-light environments.
                  </p>
                </div>
                <Button 
                  variant={theme === 'dark' ? 'default' : 'outline'} 
                  onClick={() => setTheme('dark')}
                  className="w-24"
                >
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">System Default</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically switch based on your OS settings.
                  </p>
                </div>
                <Button 
                  variant={theme === 'system' ? 'default' : 'outline'} 
                  onClick={() => setTheme('system')}
                  className="w-24"
                >
                  <Monitor className="mr-2 h-4 w-4" /> System
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Choose how you want to receive alerts and updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive daily summaries and important alerts via email.
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={emailNotifs} 
                  onCheckedChange={setEmailNotifs} 
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get immediate alerts in your browser when tasks are due.
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={pushNotifs} 
                  onCheckedChange={setPushNotifs} 
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Report</Label>
                    <p className="text-sm text-muted-foreground">
                      A detailed summary of your productivity sent every Sunday.
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={weeklyReport} 
                  onCheckedChange={setWeeklyReport} 
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6 mt-2">
              <Button onClick={saveSettings} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg flex items-start gap-4">
                <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">2FA is currently disabled</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    When enabled, you'll be required to enter a code from your authenticator app when signing in.
                  </p>
                  <Button variant="outline" className="mt-4">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-red-200 dark:border-red-900/50">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that affect your account data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated tasks.
                  </p>
                </div>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
