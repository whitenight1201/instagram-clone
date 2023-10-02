import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow } from './schemas/follow.schema';

@Injectable()
export class FollowsService {
  constructor(@InjectModel(Follow.name) private followModel: Model<Follow>) {}

  async create(userId: string, followId: string) {
    const createFollow = await new this.followModel({
      userId: userId,
      followId: followId,
      createdAt: Date.now(),
    });
    return createFollow.save();
  }

  async findAll(userId) {
    const follower = await this.followModel.find({ userId: userId });
    const followers = follower.length;
    const following = await this.followModel.find({ followId: userId });
    const followings = following.length;
    return { followers, followings };
  }

  findOne(id: number) {
    return `This action returns a #${id} follow`;
  }

  // update(id: number, updateFollowDto: UpdateFollowDto) {
  //   return `This action updates a #${id} follow`;
  // }

  remove(id: number) {
    return `This action removes a #${id} follow`;
  }
}
