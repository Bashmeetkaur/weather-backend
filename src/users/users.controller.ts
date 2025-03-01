/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // Route: GET /users/admins
@Get('admins')
getAdmins() {
  return this.usersService.getAdmins();
}



  @Patch(':id/role')
  updateUserRole(@Param('id') id: string, @Body('role') role: string) {
    return this.usersService.updateUserRole(id, role);
  }

  @Patch(':id/status')
  toggleUserStatus(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.usersService.toggleUserStatus(id, isActive);
  }
}

