import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ShieldCheck, 
  FileCheck, 
  Users, 
  Lock, 
  Zap, 
  Award,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Building2
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileCheck,
      title: 'Instant Verification',
      description: 'AI-powered certificate verification in seconds, not days'
    },
    {
      icon: Lock,
      title: 'Blockchain Security',
      description: 'Immutable records ensure complete document authenticity'
    },
    {
      icon: Zap,
      title: 'Real-time Detection',
      description: 'Advanced algorithms detect tampering and forgeries instantly'
    },
    {
      icon: Award,
      title: 'Institution Integration',
      description: 'Direct connection with university databases for accuracy'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Accuracy Rate' },
    { value: '<2s', label: 'Verification Time' },
    { value: '500+', label: 'Institutions' },
    { value: '1M+', label: 'Certificates Verified' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by 500+ Institutions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              Verify Academic
              <span className="text-gradient"> Credentials</span>
              <br />
              with Confidence
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced AI-powered platform to detect fake degrees and certificates. 
              Protect your institution's integrity with blockchain-secured verification.
            </p>
            
            <div className="flex gap-4 justify-center pt-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/register')}
                className="gap-2"
              >
                Start Verifying <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Powerful Features for
              <span className="text-gradient"> Complete Protection</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              State-of-the-art technology to ensure academic integrity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass-card p-6 hover:scale-105 transition-transform duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Upload Certificate', desc: 'Students upload their academic certificates for verification' },
              { step: '02', title: 'AI Analysis', desc: 'Our AI engine cross-verifies with institutional databases' },
              { step: '03', title: 'Instant Results', desc: 'Get verification status with detailed authenticity report' }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="text-5xl font-display font-bold text-gradient mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Ready to Secure Your
                <span className="text-gradient"> Academic Future?</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of institutions and recruiters who trust CertifyGuard
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/register?role=student')}
                  className="gap-2"
                >
                  <Users className="h-5 w-5" />
                  For Students
                </Button>
                <Button 
                  variant="glass" 
                  size="lg"
                  onClick={() => navigate('/register?role=recruiter')}
                  className="gap-2"
                >
                  <Building2 className="h-5 w-5" />
                  For Recruiters
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;