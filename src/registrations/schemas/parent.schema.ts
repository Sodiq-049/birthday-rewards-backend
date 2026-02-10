import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Child, ChildSchema } from './child.schema'

@Schema({ timestamps: true })
export class Parent extends Document {
  @Prop({ required: true, enum: ['Mr', 'Mrs'] })
  title: string

  @Prop({ required: true })
  fullName: string

  @Prop({ required: true })
  email: string

  @Prop({
    type: [ChildSchema],
    validate: [(val: Child[]) => val.length <= 4, 'Max 4 children allowed'],
  })
  children: Child[]
}

export const ParentSchema = SchemaFactory.createForClass(Parent)
