// OCR Simulation utility
export const simulateOCR = (fileName: string): {
  extractedText: string;
  ocrData: {
    studentName?: string;
    rollNumber?: string;
    marks?: string;
    year?: string;
    department?: string;
  };
} => {
  // Simulate OCR processing with random data
  const studentNames = [
    'Rahul Kumar Singh',
    'Priya Sharma',
    'Amit Patel',
    'Sneha Gupta',
    'Vikram Rao',
    'Anjali Verma'
  ];

  const departments = [
    'Computer Science',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Information Technology',
    'Electronics & Communication'
  ];

  const randomStudent = studentNames[Math.floor(Math.random() * studentNames.length)];
  const randomDepartment = departments[Math.floor(Math.random() * departments.length)];
  const randomRoll = `JU${Math.floor(Math.random() * 900000 + 100000)}`;
  const randomMarks = `${Math.floor(Math.random() * 30 + 70)}%`;
  const randomYear = `${Math.floor(Math.random() * 4 + 2020)}`;

  const extractedText = `
    This is to certify that ${randomStudent} 
    Roll Number: ${randomRoll}
    has successfully completed the requirements for
    ${randomDepartment} program
    with ${randomMarks} marks
    in the academic year ${randomYear}
    from Jharkhand University of Technology
  `.trim();

  return {
    extractedText,
    ocrData: {
      studentName: randomStudent,
      rollNumber: randomRoll,
      marks: randomMarks,
      year: randomYear,
      department: randomDepartment
    }
  };
};