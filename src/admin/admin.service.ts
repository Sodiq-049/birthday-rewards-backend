import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ADMIN_EMAILS, ADMIN_PASSWORD } from './admin.constants'

@Injectable()
export class AdminService {
  login(email: string, password: string) {
    if (!ADMIN_EMAILS.includes(email)) {
      throw new UnauthorizedException('Unauthorized email')
    }

    if (password !== ADMIN_PASSWORD) {
      throw new UnauthorizedException('Invalid password')
    }

    return {
      message: 'Admin login successful',
    }
  }
}
