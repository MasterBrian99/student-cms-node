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
}
