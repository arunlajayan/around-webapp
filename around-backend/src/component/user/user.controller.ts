import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from 'src/schema/user.schema';
UserService
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get('all')
    async findAll(){
        return await this.userService.getMyInfo();
      }
      @Get(':id')
      async findOne(@Param('id') id){
        return await this.userService.findById(id);
      }
}
