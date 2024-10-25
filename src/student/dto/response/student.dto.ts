import { Student } from './../../../schema/schemas/student.schema';
import { STATUS, STUDENT_STATUS } from 'src/utils/constant';

export class StudentDto {
  name: string;
  email: string;
  phoneNumber: string;
  status: STATUS;
  studentStatus: STUDENT_STATUS;
  id: string;

  constructor(student: Student) {
    this.name = student.firstName;
    this.email = student.email;
    this.phoneNumber = student.phoneNumber;
    this.status = student.status;
    this.studentStatus = student.studentStatus;
    this.id = student._id.toString();
  }
}
