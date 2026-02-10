import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BirthdayService } from './birthday.service'
import { Parent, ParentSchema } from '../registrations/schemas/parent.schema'
import { EmailModule } from '../email/email.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }]),
    EmailModule,
  ],
  providers: [BirthdayService],
})
export class BirthdayModule {}
