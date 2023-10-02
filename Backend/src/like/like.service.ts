import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like, LikeDocument } from './schemas/like.schema';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async create(createLikeDto: CreateLikeDto, userId: string, postId: string) {
    return await new this.likeModel({
      user: userId,
      post: postId,
      like: createLikeDto.like,
    }).save();
  }
  async findcnt(postId: string) {
    const likecnt = await this.likeModel.find({ post: postId, like: true });
    return { likecnt: likecnt.length };
  }
  async update(userId: string, postId: string, like: boolean) {
    const filter = { user: userId, post: postId };
    const update = { like: like };
    return await this.likeModel.findOneAndUpdate(filter, update, { new: true });
  }

  find(postId: string, userId: string) {
    return this.likeModel
      .findOne({
        user: userId,
        post: postId,
      })
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
