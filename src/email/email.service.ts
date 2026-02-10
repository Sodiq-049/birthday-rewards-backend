import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // IMPORTANT for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    this.transporter.verify((err, success) => {
    if (err) console.error('SMTP Connection Failed:', err);
    else console.log('SMTP Connection OK!');
    });
  }

    async sendThankYouEmail(to: string, name?: string) {
        return this.transporter.sendMail({
        from: `"Birthday Rewards" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Thank you for registering 🎉',
        html: `
            <h2>Thank you for registering!</h2>
            <p>Your child has been enrolled in our Birthday Rewards Program 🎂</p>
        `,
        });
    }

    
    async sendBirthdayEmail(
    parentEmail: string,
    parentName: string,
    childName: string,
    ) {
    await this.transporter.sendMail({
        from: `"The Little Big Kid" <${process.env.EMAIL_USER}>`,
        to: parentEmail,
        subject: `🎉 ${childName}'s Birthday Gift – ₦15,000 Voucher`,
        html: `
        <p>Dear ${parentName},</p>

        <p>🎉 Today is <strong>${childName}</strong>'s birthday!</p>

        <p>To celebrate, we’re gifting you a <strong>₦15,000 voucher</strong> 🎁</p>

        <p>Visit our store and present this email to redeem.</p>

        <p>With love,<br/>
        <strong>The Little Big Kid</strong></p>
        `,
    })
    }

    async sendRewardClaimEmail(parentEmail: string, parentName: string, childName: string) {
    await this.transporter.sendMail({
        from: `"The Little Big Kid" <${process.env.EMAIL_USER}>`,
        to: parentEmail,
        subject: `🎉 ${childName}'s Reward Claimed!`,
        html: `
        <p>Dear ${parentName},</p>
        <p>${childName}'s reward has been successfully claimed. Enjoy your ₦15,000 gift voucher!</p>
        <p>Thank you for celebrating birthdays with us!</p>
        <p><strong>The Little Big Kid Team</strong></p>
        `,
    });
    }

}
