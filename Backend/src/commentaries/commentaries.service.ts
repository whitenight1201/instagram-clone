import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
// import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { User } from 'src/users/schemas/user.schema';
import { Commentary } from './schemas/commentary.schema';

@Injectable()
export class CommentariesService {
  constructor(
    @InjectModel(Commentary.name) private commentaryModel: Model<Commentary>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(
    userId: string,
    postId: string,
    createCommentaryDto: CreateCommentaryDto,
  ) {
    // const postdata: any[] = [];
    const createdCommentary = new this.commentaryModel({
      commentary: createCommentaryDto.commentary,
      user: userId,
      post: postId,
    });
    const newcomment = await createdCommentary.save();
    const comments = await newcomment.populate('user', 'username');
    const commentscnt = await this.commentaryModel.find({ post: postId });
    const commentcnt = commentscnt.length;
    return { comments, commentcnt };
  }

  async findAll(postId: string): Promise<any> {
    const commentary = await this.commentaryModel
      .find({ post: postId })
      .populate('user', 'username')
      .sort({ _id: -1 });
    return commentary;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentary`;
  }

  // update(id: number, updateCommentaryDto: UpdateCommentaryDto) {
  //   return `This action updates a #${id} commentary`;
  // }

  remove(id: number) {
    return `This action removes a #${id} commentary`;
  }
}
