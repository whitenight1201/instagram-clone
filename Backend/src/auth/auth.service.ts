import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { FileService } from '../file/file.service';
import { ValidateEmail } from './utils/utils';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private fileService: FileService,
  ) {}
  async signUp(createUserDto: CreateUserDto, avatar): Promise<any> {
    // Check if user exists
    const userEmailExists = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (userEmailExists) {
      throw new BadRequestException('UserEmail already exists');
    }
    const userNameExists = await this.usersService.findByName(
      createUserDto.username,
    );
    if (userNameExists) {
      throw new BadRequestException('UserName already exists');
    }
    const { email } = createUserDto;
    const validationResult = ValidateEmail(email);
    if (!validationResult) {
      throw new HttpException(
        'Email format is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Hash password
    const hash = await this.hashData(createUserDto.password);
    let filename: string;
    if (avatar) {
      filename = this.fileService.createFile(avatar);
      avatar = `/image/${filename}`;
    }
    const newUser = await this.usersService.create({
      ...createUserDto,
      avatar,
      password: hash,
    });
    const tokens = await this.getTokens(newUser._id, newUser.email);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return {
      id: newUser._id.toString(),
      message: 'SignUp successfully',
      status: 1,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const validationResult = ValidateEmail(email);
    if (!validationResult) {
      throw new BadRequestException('Email format is not correct');
    }
    const user = await this.usersService.findOne(email);
    if (!user) throw new NotFoundException('User Not found');

    const passwordMatches = await argon2.verify(user.password, password);
    if (passwordMatches) {
      const { ...result } = user;
      return result;
    } else {
      throw new BadRequestException('Password not matched');
    }
  }
  async signIn(user: any) {
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return {
      accessToken: tokens.accessToken,
      status: 1,
      token_type: 'Bearer',
      expires_in: process.env.JWT_EXPIRATION_TIME,
    };
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshTokens(userId: string, refreshToken: string): Promise<any> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      status: 1,
    };
  }
}
