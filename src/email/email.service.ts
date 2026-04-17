import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      throw new Error(
        'SENDGRID_API_KEY is not defined in environment variables',
      );
    }

    sgMail.setApiKey(apiKey);
  }

  async sendThankYouEmail(to: string) {
    await sgMail.send({
      to,
      from: `"Birthday Rewards" <${process.env.SENDER_EMAIL}>`,
      subject: 'Thank you for registering 🎉',
      html: `
        <h2>Thank you for registering!</h2>
        <p>Your child has been enrolled in our Birthday Rewards Program 🎂</p>
      `,
    });
  }

  async sendBirthdayEmail(
    parentEmail: string,
    parentTitle: string,
    parentName: string,
    childName: string,
  ) {
    await sgMail.send({
      to: parentEmail,
      from: `"The Little Big Kid" <${process.env.SENDER_EMAIL}>`,
      subject: `🎉 ${childName}'s Birthday Gift – ₦15,000 Voucher`,
      html: `
        <p>Dear ${parentTitle} ${parentName},</p>

        <p>🎉 Today is <strong>${childName}</strong>'s birthday!</p>

        <p>To celebrate, we’re gifting you a <strong>₦15,000 voucher</strong> 🎁</p>

        <p>Visit our store and present this email to redeem.</p>

        <p>Kindly note that the gift voucher will expire at the end of the month.</p>

        <p>With love,<br/>
        <strong>The Little Big Kid</strong></p>
      `,
    });
  }

  async sendRewardClaimEmail(
    parentEmail: string,
    parentTitle: string,
    parentName: string,
    childName: string,
  ) {
    await sgMail.send({
      to: parentEmail,
      from: `"The Little Big Kid" <${process.env.SENDER_EMAIL}>`,
      subject: `🎉 ${childName}'s Reward Claimed!`,
      html: `
        <p>Dear ${parentTitle} ${parentName},</p>
        <p>${childName}'s reward has been successfully claimed. Enjoy your ₦15,000 gift voucher!</p>
        <p>Thank you for celebrating birthdays with us!</p>
        <p><strong>The Little Big Kid Team</strong></p>
      `,
    });
  }
}
