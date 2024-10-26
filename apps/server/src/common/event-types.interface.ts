export interface EventPayloads {
  'student.welcome': { name: string; email: string };
  'admin.pending-student': {
    email: string;
    name: string;
    student_email: string;
    phone_number: string;
  };
  'user.verify-email': { name: string; email: string; otp: string };
  'admin.approve-student': { name: string; email: string };
  'admin.reject-student': { name: string; email: string };
}
