import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Users, 
  FileCheck,
  Building2,
  TrendingUp,
  AlertTriangle,
  Eye,
  Download,
  Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VerificationResult {
  id: string;
  studentName: string;
  certificateName: string;
  institution: string;
  status: 'verified' | 'failed' | 'pending';
  verificationDate: string;
  details?: string;
}

const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [verificationResults, setVerificationResults] = useState<VerificationResult[]>([
    {
      id: '1',
      studentName: 'John Doe',
      certificateName: 'Bachelor of Technology',
      institution: 'Jharkhand University',
      status: 'verified',
      verificationDate: '2024-01-15',
      details: 'Certificate verified against institutional database'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      certificateName: 'Master of Business Administration',
      institution: 'IIM Ranchi',
      status: 'failed',
      verificationDate: '2024-01-14',
      details: 'Certificate number not found in database'
    }
  ]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Enter Student Name',
        description: 'Please enter a student name to search.',
        variant: 'destructive',
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult: VerificationResult = {
        id: String(verificationResults.length + 1),
        studentName: searchQuery,
        certificateName: 'Bachelor of Science',
        institution: 'Birla Institute of Technology',
        status: Math.random() > 0.3 ? 'verified' : 'failed',
        verificationDate: new Date().toISOString().split('T')[0],
        details: 'Verification completed'
      };

      setVerificationResults(prev => [mockResult, ...prev]);
      setIsSearching(false);
      setSearchQuery('');

      toast({
        title: 'Verification Complete',
        description: `Certificate verification for ${searchQuery} has been completed.`,
      });
    }, 2000);
  };

  const getStatusIcon = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
    }
  };

  const getStatusBadge = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return <span className="status-badge-verified">Verified</span>;
      case 'failed':
        return <span className="status-badge-failed">Failed</span>;
      case 'pending':
        return <span className="status-badge-pending">Pending</span>;
    }
  };

  const stats = {
    totalChecks: verificationResults.length,
    verified: verificationResults.filter(r => r.status === 'verified').length,
    failed: verificationResults.filter(r => r.status === 'failed').length,
    successRate: verificationResults.length > 0 
      ? Math.round((verificationResults.filter(r => r.status === 'verified').length / verificationResults.length) * 100)
      : 0
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-display font-bold mb-2">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name} • {user?.company}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card animate-fade-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Verifications</p>
                  <p className="text-2xl font-display font-bold">{stats.totalChecks}</p>
                </div>
                <FileCheck className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-2xl font-display font-bold text-success">{stats.verified}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-display font-bold text-destructive">{stats.failed}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-display font-bold text-gradient">{stats.successRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="glass-card mb-8 animate-fade-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Verify Student Certificate
            </CardTitle>
            <CardDescription>
              Enter the student name to verify their certificates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter student name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button 
                variant="primary" 
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <>Verifying...</>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verification Results */}
        <Card className="glass-card animate-fade-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Verification History
            </CardTitle>
            <CardDescription>
              Recent certificate verification results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {verificationResults.length === 0 ? (
                <div className="text-center py-12">
                  <FileCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No verifications performed yet</p>
                </div>
              ) : (
                verificationResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(result.status)}
                      <div>
                        <p className="font-medium">{result.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {result.certificateName} • {result.institution}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Verified on: {result.verificationDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(result.status)}
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterDashboard;