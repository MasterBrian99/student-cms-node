import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStudentDto } from './dto/request/update-student.dto';
import { ApproveStudentDto } from './dto/request/approve-student.dto';
import { User } from 'src/schema/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from 'src/schema/schemas/student.schema';
import { TypedEventEmitter } from 'src/event-emitter/typed-event-emitter.class';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { STATUS, STUDENT_STATUS } from 'src/utils/constant';
import { GetAllStudentDto } from './dto/request/get-all-student.dto';
import { ListStudentDto } from './dto/response/list-student.dto';
import { StudentDto } from './dto/response/student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private readonly eventEmitter: TypedEventEmitter,
  ) {}
  async approveStudent(dto: ApproveStudentDto) {
    const student = await this.studentModel.findOne({
      _id: dto.id,
    });
    if (student.studentStatus === STUDENT_STATUS.APPROVED) {
      throw new NotFoundException(ERROR_MESSAGES.ALREADY_APPROVED);
    }
    const updatedStudent = await this.studentModel.findOneAndUpdate(
      {
        _id: student._id,
      },
      {
        $set: {
          studentStatus: dto.status,
          status: STATUS.ACTIVE,
        },
      },
      { new: true, runValidators: true },
    );

    if (!updatedStudent) {
      throw new NotFoundException(`Student with ID ${dto.id} not found.`);
    }
    if (dto.status == STUDENT_STATUS.APPROVED) {
      this.eventEmitter.emit('admin.approve-student', {
        name: updatedStudent.fullName,
        email: updatedStudent.email,
      });
    } else if (dto.status == STUDENT_STATUS.REJECTED) {
      this.eventEmitter.emit('admin.reject-student', {
        name: updatedStudent.fullName,
        email: updatedStudent.email,
      });
    }

    return;
  }

  async findAll(query: GetAllStudentDto) {
    const studentListQuery = await this.studentModel.find({
      studentStatus: query.studentStatus,
    });
    // console.log(studentList);
    if (!studentListQuery) {
      return [];
    }
    const listStudent = new Array<ListStudentDto>();
    studentListQuery.forEach((student) => {
      listStudent.push({
        id: student._id.toString(),
        name: student.fullName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        status: student.status,
        studentStatus: student.studentStatus,
      });
    });
    return listStudent;
  }

  async getCurrentStudent(user: User) {
    const student = await this.checkStudent(user);
    return new StudentDto(student);
  }
  async update(user: User, updateStudentDto: UpdateStudentDto) {
    const student = await this.checkStudent(user);

    const updatedStudent = await this.studentModel.findOneAndUpdate(
      {
        _id: student._id,
      },
      {
        $set: {
          firstName: updateStudentDto.firstName,
          lastName: updateStudentDto.lastName,
          phoneNumber: updateStudentDto.phoneNumber,
        },
      },
      { new: true, runValidators: true },
    );

    if (!updatedStudent) {
      throw new NotFoundException(ERROR_MESSAGES.STUDENT_NOT_FOUND);
    }

    return;
  }

  async checkStudent(user: User) {
    const student = await this.studentModel.findOne({
      user: user,
    });
    if (!student) {
      throw new NotFoundException(ERROR_MESSAGES.STUDENT_NOT_FOUND);
    }
    return student;
  }
}
