import { Injectable, Logger} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Parent } from './schemas/parent.schema'
import { EmailService } from '../email/email.service'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class RegistrationsService {
    private readonly logger = new Logger(RegistrationsService.name)
  constructor(
    @InjectModel(Parent.name)
    private parentModel: Model<Parent>,
    private emailService: EmailService,
  ) {}

  async create(data: any) {
    // Save parent + children
    const created = new this.parentModel({
      title: data.parent.title,
      fullName: data.parent.fullName,
      email: data.parent.email,
      children: data.children,
    })

    await created.save()

    // Send thank you email asynchronously (does NOT block request)
    this.emailService
      .sendThankYouEmail(data.parent.email, data.parent.fullName)
      .catch((err) => console.error('Failed to send email:', err))

    return {
      message: 'Registration saved successfully',
    }
  }

    @Cron('0 8 * * *') // every day at 8am
        async sendDailyBirthdayEmails() {
        this.logger.log('🎂 Running daily birthday check...')

        const today = new Date()
        const todayMonth = today.getMonth()
        const todayDate = today.getDate()
        const currentYear = today.getFullYear()

        const parents = await this.parentModel.find()

        for (const parent of parents) {
            for (const child of parent.children) {
            const birthday = new Date(child.birthday)

            // ✅ Check if email was already sent this year
            const alreadySentThisYear =
                child.lastBirthdayEmailSent &&
                new Date(child.lastBirthdayEmailSent).getFullYear() === currentYear

            if (
                birthday.getMonth() === todayMonth &&
                birthday.getDate() === todayDate &&
                !alreadySentThisYear
            ) {
                // Send birthday email
                await this.emailService.sendBirthdayEmail(
                parent.email,
                parent.fullName,
                child.name,
                )

                // Mark as sent
                child.lastBirthdayEmailSent = new Date()
                await parent.save()

                this.logger.log(
                `🎁 Birthday email sent for ${child.name} to ${parent.email}`,
                )
            } else if (alreadySentThisYear) {
                this.logger.log(
                `⚠️ Birthday email already sent for ${child.name} this year`
                )
            }
            }
        }
    }

    // Fetch all parents with children
  async getAllChildren() {
    return this.parentModel.find().select('fullName email children').exec()
  }

  // Claim reward
    async claimReward(parentId: string, childIndex: number) {
    try {
        const parent = await this.parentModel.findById(parentId)
        if (!parent) throw new Error('Parent not found')

        const child = parent.children[childIndex]
        if (!child) throw new Error('Child not found')

        if (child.rewardClaimed) {
        return { message: `${child.name} already claimed` }
        }

        child.rewardClaimed = true
        await parent.save()

        await this.emailService.sendRewardClaimEmail(
        parent.email,
        parent.fullName,
        child.name,
        )

        return { message: `${child.name} reward marked as claimed` }
    } catch (err) {
        console.error('Error claiming reward:', err)
        throw err
    }
    }


}
