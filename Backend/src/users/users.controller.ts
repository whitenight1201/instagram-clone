import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/strategies/gaurd.access_token';
// import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('profile')
  profile(@Request() req: any) {
    return this.usersService.findAll(req.user.id);
  }
}
