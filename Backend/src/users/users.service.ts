import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FollowsService } from 'src/follows/follows.service';
import { PostsService } from 'src/posts/posts.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(
    private readonly followsService: FollowsService,
    private readonly postService: PostsService,
    @InjectModel(User.name) private userModel: Model<UserDocument>, // @InjectModel(Follow.name) private FollowModel: Model<FollowDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(user_id: string) {
    const users = await this.userModel.findById(user_id);
    const follow = await this.followsService.findAll(user_id);
    const posts = await this.postService.postsAll();
    const postcnt = posts.length;
    const user = {
      username: users.username,
      avatar: users.avatar,
      _id: users._id,
    };
    return { user, follow, posts, postcnt };
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }
  async findOne(email: string) {
    return this.userModel
      .findOne({ email: email })
      .select('email password emailVerified')
      .lean()
      .exec();
  }
  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }
  async findByName(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
}
