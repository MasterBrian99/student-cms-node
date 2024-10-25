import { STATUS, STUDENT_STATUS } from 'src/utils/constant';

export class ListStudentDto {
  name: string;
  email: string;
  phoneNumber: string;
  status: STATUS;
  studentStatus: STUDENT_STATUS;
  id: string;
}
