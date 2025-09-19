import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Upload, 
  FileText, 
  Award,
  TrendingUp,
  Shield,
  Plus,
  Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CertificateCard from '@/components/student/CertificateCard';
import CertificateViewer from '@/components/student/CertificateViewer';
import type { Certificate } from '@/types/certificate';
import { simulateOCR } from '@/utils/ocrSimulation';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      name: 'Bachelor of Technology',
      type: 'Degree',
      institution: 'Jharkhand University',
      issueDate: '2023-05-15',
      status: 'verified',
      uploadDate: '2024-01-10',
      certificateNumber: 'JU/2023/BTech/001',
      grade: 'First Class',
      extractedText: 'This is to certify that Rahul Kumar Singh has successfully completed...',
      ocrData: {
        studentName: 'Rahul Kumar Singh',
        rollNumber: 'JU201945',
        marks: '85%',
        year: '2023',
        department: 'Computer Science'
      }
    },
    {
      id: '2',
      name: 'Data Science Certificate',
      type: 'Professional Certificate',
      institution: 'Coursera',
      issueDate: '2023-12-01',
      status: 'pending',
      uploadDate: '2024-01-15',
      certificateNumber: 'CRS-DS-2023-456',
      extractedText: 'Certificate of Completion for Data Science Specialization...'
    }
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        // Simulate OCR processing
        const ocrResult = simulateOCR(file.name);
        
        // Create a fake URL for the file (in real app, this would be uploaded to storage)
        const fakeFileUrl = URL.createObjectURL(file);
        
        const newCertificate: Certificate = {
          id: String(Date.now() + Math.random()),
          name: file.name.replace(/\.[^/.]+$/, ''),
          type: 'Document',
          institution: 'Pending Verification',
          issueDate: new Date().toISOString().split('T')[0],
          status: 'pending',
          uploadDate: new Date().toISOString().split('T')[0],
          fileUrl: fakeFileUrl,
          ...ocrResult
        };

        setCertificates(prev => [...prev, newCertificate]);

        toast({
          title: 'Certificate Uploaded',
          description: `${file.name} has been uploaded. OCR processing complete.`,
        });

        // Simulate verification process
        setTimeout(() => {
          setCertificates(prev => 
            prev.map(cert => 
              cert.id === newCertificate.id 
                ? { 
                    ...cert, 
                    status: Math.random() > 0.3 ? 'verified' : 'failed',
                    institution: cert.ocrData?.department ? 'Jharkhand University' : cert.institution
                  }
                : cert
            )
          );
          
          toast({
            title: 'Verification Complete',
            description: `${file.name} verification process completed.`,
          });
        }, 3000);
      } else {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload PDF or image files only.',
          variant: 'destructive',
        });
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsViewerOpen(true);
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = certificate.fileUrl || '#';
    link.download = `${certificate.name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Download Started',
      description: `${certificate.name} is being downloaded.`,
    });
  };

  const handleDeleteCertificate = (certificate: Certificate) => {
    setCertificates(prev => prev.filter(cert => cert.id !== certificate.id));
    
    toast({
      title: 'Certificate Deleted',
      description: `${certificate.name} has been removed.`,
      variant: 'destructive',
    });
  };

  const stats = {
    total: certificates.length,
    verified: certificates.filter(c => c.status === 'verified').length,
    pending: certificates.filter(c => c.status === 'pending').length,
    failed: certificates.filter(c => c.status === 'failed').length
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl font-display font-bold mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card animate-fade-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Certificates</p>
                  <p className="text-2xl font-display font-bold">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-primary opacity-50" />
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
                <Shield className="h-8 w-8 text-success opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-display font-bold text-warning">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-warning opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Trust Score</p>
                  <p className="text-2xl font-display font-bold text-gradient">98%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="glass-card mb-8 animate-fade-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Certificates
            </CardTitle>
            <CardDescription>
              Upload your academic certificates for verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                isDragging ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drag and drop your certificates here</p>
              <p className="text-sm text-muted-foreground mb-4">or</p>
              <Button variant="primary" onClick={() => document.getElementById('file-upload')?.click()}>
                <Plus className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: PDF, JPG, PNG (Max 10MB)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Certificates List */}
        <Card className="glass-card animate-fade-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              My Certificates
            </CardTitle>
            <CardDescription>
              View and manage your uploaded certificates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificates.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No certificates uploaded yet</p>
                </div>
              ) : (
                certificates.map((cert) => (
                  <CertificateCard
                    key={cert.id}
                    certificate={cert}
                    onView={handleViewCertificate}
                    onDownload={handleDownloadCertificate}
                    onDelete={handleDeleteCertificate}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificate Viewer Modal */}
      <CertificateViewer
        certificate={selectedCertificate}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
};

export default StudentDashboard;