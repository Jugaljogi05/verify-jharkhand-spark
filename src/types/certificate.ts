export interface Certificate {
  id: string;
  name: string;
  type: string;
  institution: string;
  issueDate: string;
  status: 'verified' | 'pending' | 'failed';
  uploadDate: string;
  certificateNumber?: string;
  grade?: string;
  fileUrl?: string;
  extractedText?: string;
  ocrData?: {
    studentName?: string;
    rollNumber?: string;
    marks?: string;
    year?: string;
    department?: string;
  };
}