import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Clock, FileText, Calendar, Building, Hash, User, BookOpen } from 'lucide-react';
import type { Certificate } from '@/types/certificate';

interface CertificateViewerProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificate, isOpen, onClose }) => {
  if (!certificate) return null;

  const getStatusBadge = () => {
    switch (certificate.status) {
      case 'verified':
        return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" /> Verified</Badge>;
      case 'pending':
        return <Badge variant="warning" className="gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Failed</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Certificate Details
            </span>
            {getStatusBadge()}
          </DialogTitle>
          <DialogDescription>
            Detailed view of the uploaded certificate
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Certificate Preview */}
          <Card className="p-6 bg-secondary/20">
            <div className="aspect-[1.414/1] bg-muted rounded-lg flex items-center justify-center">
              {certificate.fileUrl ? (
                <img 
                  src={certificate.fileUrl} 
                  alt="Certificate preview" 
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <FileText className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Certificate Preview</p>
                </div>
              )}
            </div>
          </Card>

          {/* Certificate Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Certificate Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <FileText className="h-3 w-3" /> Certificate Name
                </p>
                <p className="font-medium">{certificate.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Building className="h-3 w-3" /> Institution
                </p>
                <p className="font-medium">{certificate.institution}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <BookOpen className="h-3 w-3" /> Type
                </p>
                <p className="font-medium">{certificate.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Issue Date
                </p>
                <p className="font-medium">{certificate.issueDate}</p>
              </div>
              {certificate.certificateNumber && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Hash className="h-3 w-3" /> Certificate Number
                  </p>
                  <p className="font-medium">{certificate.certificateNumber}</p>
                </div>
              )}
              {certificate.grade && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Grade</p>
                  <p className="font-medium">{certificate.grade}</p>
                </div>
              )}
            </div>
          </div>

          {/* OCR Data if available */}
          {certificate.ocrData && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Extracted Data (OCR)</h3>
                <div className="grid grid-cols-2 gap-4">
                  {certificate.ocrData.studentName && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" /> Student Name
                      </p>
                      <p className="font-medium">{certificate.ocrData.studentName}</p>
                    </div>
                  )}
                  {certificate.ocrData.rollNumber && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Roll Number</p>
                      <p className="font-medium">{certificate.ocrData.rollNumber}</p>
                    </div>
                  )}
                  {certificate.ocrData.marks && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Marks</p>
                      <p className="font-medium">{certificate.ocrData.marks}</p>
                    </div>
                  )}
                  {certificate.ocrData.department && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{certificate.ocrData.department}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Verification Status */}
          <Separator />
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Verification Status</h3>
            {certificate.status === 'verified' && (
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <p className="text-success font-medium">✓ This certificate has been successfully verified</p>
                <p className="text-sm text-muted-foreground mt-1">Verified on {certificate.uploadDate}</p>
              </div>
            )}
            {certificate.status === 'pending' && (
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-warning font-medium">⏱ Verification in progress</p>
                <p className="text-sm text-muted-foreground mt-1">Please wait while we verify this certificate</p>
              </div>
            )}
            {certificate.status === 'failed' && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-destructive font-medium">✗ Verification failed</p>
                <p className="text-sm text-muted-foreground mt-1">This certificate could not be verified. Please check the document and try again.</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateViewer;