import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RegistrationsService } from './registrations.service'
import { Parent, ParentSchema } from './schemas/parent.schema'
import { EmailModule } from '../email/email.module'
import { RegistrationsController } from './registrations.controller'
import { AdminController } from '../admin/admin.controller'


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Parent.name, schema: ParentSchema },
    ]),
    EmailModule,
  ],
  controllers: [RegistrationsController, AdminController],
  providers: [RegistrationsService],
  exports: [RegistrationsService],
})
export class RegistrationsModule {}
