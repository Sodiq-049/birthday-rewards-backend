import { Controller, Get, Patch, Post, Body, Param } from '@nestjs/common';
import { RegistrationsService } from '../registrations/registrations.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return { success: true }; // just a placeholder for now
  }

  @Get('children')
  async getAllChildren() {
    return this.registrationsService.getAllChildren();
  }

  @Patch('claim/:parentId/:childIndex')
  async claimReward(
    @Param('parentId') parentId: string,
    @Param('childIndex') childIndex: string,
  ) {
    return this.registrationsService.claimReward(parentId, Number(childIndex));
  }
}
