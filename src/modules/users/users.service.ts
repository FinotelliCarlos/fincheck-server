import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserById(meUserId: string) {
    return { meUserId }
  }
}
