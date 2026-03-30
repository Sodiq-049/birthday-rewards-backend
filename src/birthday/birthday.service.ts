import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parent } from '../registrations/schemas/parent.schema';
import { EmailService } from '../email/email.service';

@Injectable()
export class BirthdayService {
  constructor(
    @InjectModel(Parent.name)
    private parentModel: Model<Parent>,
    private emailService: EmailService,
  ) {}

  // Runs every day at 8:00 AM
  @Cron('0 9 * * *', {
    timeZone: 'Africa/Lagos',
  })
  async sendBirthdayEmails() {
    console.log('🎂 Birthday cron running:', new Date());

    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    const parents = await this.parentModel.find();

    for (const parent of parents) {
      for (const child of parent.children) {
        const birthday = new Date(child.birthday);

        if (
          birthday.getDate() === todayDay &&
          birthday.getMonth() === todayMonth
        ) {
          console.log(`🎉 Sending birthday email to ${parent.email}`);

          await this.emailService.sendBirthdayEmail(
            parent.email,
            parent.title,
            parent.fullName,
            child.name,
          );
        }
      }
    }
  }
}