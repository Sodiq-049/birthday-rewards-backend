import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Child {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  birthday: Date

  @Prop({ required: true, enum: ['Male', 'Female'] })
  gender: string

  @Prop({ default: false })
  rewardClaimed: boolean

  @Prop({ default: null })
  lastBirthdayEmailSent?: Date
}

export const ChildSchema = SchemaFactory.createForClass(Child)
