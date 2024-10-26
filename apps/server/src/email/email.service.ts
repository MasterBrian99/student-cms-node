import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('student.welcome')
  async welcomeEmail(data) {
    const { email, name } = data;

    const subject = `Welcome to Student Management System: ${name}`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './student-welcome',
      context: {
        name,
      },
    });
  }
  @OnEvent('admin.pending-student')
  async pendingStudent(data) {
    const { email, name, student_email, phone_number } = data;

    const subject = `New Student Registration Pending Approval`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './pending-student',
      context: {
        name,
        student_email,
        phone_number,
      },
    });
  }
  @OnEvent('admin.approve-student')
  async approveStudent(data) {
    const { email, name } = data;

    const subject = `Congratulations! Your Account Has Been Approved`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './approve-mail',
      context: {
        name,
      },
    });
  }
  @OnEvent('admin.reject-student')
  async rejectStudent(data) {
    const { email, name } = data;

    const subject = `Registration Update – Account Rejected`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './reject-mail',
      context: {
        name,
      },
    });
  }
}
