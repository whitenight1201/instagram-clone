import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/strategies/local-auth.guard';
import { ErrorResponseDTO } from 'src/error/dto/error.response.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  CredentialsDTO,
  GeneralResponseDTO,
  LoginResponseDTO,
  RefreshTokenDTO,
  SignupResponseDTO,
} from './dto/auth.dto';
import { AccessTokenGuard } from './strategies/gaurd.access_token';
import { RefreshTokenGuard } from './strategies/gaurd.refresh_token';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //signup
  @Post('signup')
  @ApiOperation({
    summary: 'User register endpoint.',
    description: 'User signup with email, password.',
  })
  @ApiResponse({
    status: 200,
    type: SignupResponseDTO,
    description: 'Verify your email',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDTO,
    description: 'Validation error',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  async signup(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @UploadedFile() avatar,
  ) {
    return this.authService.signUp(createUserDto, avatar);
  }
  //signin
  @ApiBody({ type: CredentialsDTO })
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'User login endpoint.',
    description: 'User login with email, password.',
  })
  @ApiResponse({
    status: 201,
    type: LoginResponseDTO,
    description: 'User logged and JWT returned.',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDTO,
    description: 'Validation error',
  })
  @Post('signin')
  // @ApiConsumes('multipart/form-data')
  async signin(@Request() req: any) {
    return this.authService.signIn(req.user);
  }
  //logout
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @ApiOperation({
    summary: 'Logout endpoint.',
    description: 'User logout api. Access token is required.',
  })
  @ApiResponse({
    status: 201,
    type: GeneralResponseDTO,
    description: 'New access_token, refresh_token are returned.',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDTO,
    description: 'Validation error',
  })
  async logout(@Req() req: any) {
    Logger.log(req.user.id);
    const user = await this.authService.logout(req.user.id);
    if (!user) throw new BadRequestException('Bad request');
    return { msg: 'Signed out successfully', status: 1 };
  }
  //refresh
  @ApiBearerAuth('access-token')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOperation({
    summary: 'Refresh token endpoint.',
    description:
      'Getting a new access token when the access token has been terminated. Attach the previous refresh_token value into Bearer header.',
  })
  @ApiResponse({
    status: 201,
    type: RefreshTokenDTO,
    description: 'New access_token, refresh_token are returned.',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDTO,
    description: 'Validation error',
  })
  refreshTokens(@Req() req: any) {
    return this.authService.refreshTokens(
      req.user.sub,
      req.user.sub.refreshToken,
    );
  }
}
