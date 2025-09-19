import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Download, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Certificate } from '@/types/certificate';

interface CertificateCardProps {
  certificate: Certificate;
  onView: (cert: Certificate) => void;
  onDownload: (cert: Certificate) => void;
  onDelete: (cert: Certificate) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onView,
  onDownload,
  onDelete
}) => {
  const getStatusIcon = (status: Certificate['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Certificate['status']) => {
    switch (status) {
      case 'verified':
        return <span className="status-badge-verified">Verified</span>;
      case 'pending':
        return <span className="status-badge-pending">Pending</span>;
      case 'failed':
        return <span className="status-badge-failed">Failed</span>;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all">
      <div className="flex items-center gap-4">
        {getStatusIcon(certificate.status)}
        <div>
          <p className="font-medium">{certificate.name}</p>
          <p className="text-sm text-muted-foreground">
            {certificate.institution} • {certificate.type} • Issued: {certificate.issueDate}
          </p>
          {certificate.certificateNumber && (
            <p className="text-xs text-muted-foreground mt-1">
              Certificate #: {certificate.certificateNumber}
            </p>
          )}
          {certificate.extractedText && (
            <p className="text-xs text-muted-foreground mt-1 italic">
              OCR: {certificate.extractedText.substring(0, 50)}...
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {getStatusBadge(certificate.status)}
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onView(certificate)}
            title="View Certificate"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onDownload(certificate)}
            title="Download Certificate"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onDelete(certificate)}
            title="Delete Certificate"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;