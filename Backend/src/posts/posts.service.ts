import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import ffmpeg from 'fluent-ffmpeg';
import { Model } from 'mongoose';
import { Commentary } from 'src/commentaries/schemas/commentary.schema';
import { FileService } from 'src/file/file.service';
import { Like, LikeDocument } from 'src/like/schemas/like.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ffprobePath = require('@ffprobe-installer/ffprobe').path,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Like.name) private likeModel: Model<LikeDocument>,
    private fileService: FileService,
    @InjectModel(Commentary.name)
    private commentaryModel: Model<Commentary>,
  ) {}
  async create(createPostDto: CreatePostDto, userId: string, files: any) {
    let thumbnailurl: string;
    let fileurl: string;
    let contentType: string;
    let videoPath: string;
    let imagename: string;
    let filename: string;
    if (files) {
      const fileType = files.mimetype.split('/')[0];
      contentType = fileType == 'image' ? 'IMAGE' : 'VIDEO';
      filename = this.fileService.createFile(files);
      videoPath = `./static/video/${filename}`;
      imagename = `${filename}.png`;

      if (contentType == 'VIDEO') {
        fileurl = `/video/${filename}`;
        thumbnailurl = `/thumbnail/${imagename}`;
        generateThumbnail(videoPath, imagename)
          .then(() => console.log('Thumnail generated successfully'))
          .catch((err) => console.error(err));
      } else {
        fileurl = `/image/${filename}`;
      }
    }
    const createdPosts = new this.postModel({
      content: createPostDto.content,
      author: userId,
      filename: fileurl,
      type: contentType,
      thumbnailurl: thumbnailurl,
    });
    return (await createdPosts.save()).populate('author', ['username']);
  }
  async findAll(pagenum: number, pagecnt: number, userId: string) {
    const page: number = (pagenum - 1) * pagecnt;
    const posts = await this.postModel
      .find()
      .populate('author', ['username', 'avatar'])
      .sort({ _id: -1 })
      .skip(page)
      .limit(pagecnt)
      .lean()
      .exec();
    const postdata: any[] = [];
    let liketype: boolean;
    for (const post of posts) {
      const comments = await this.commentaryModel
        .find({ post: post._id })
        .populate('user', 'username')
        .sort({ _id: -1 })
        .limit(3);
      const commentscnt = await this.commentaryModel.find({ post: post._id });
      const commentcnt = commentscnt.length;
      const cnt = await this.likeModel.find({
        post: post._id,
        like: true,
      });
      const likecnt = cnt.length;
      const type = await this.likeModel.findOne({
        user: userId,
        post: post._id,
      });
      if (!type) {
        liketype = false;
      } else {
        liketype = type.like;
      }
      const _post = {
        ...post,
        likecnt,
        liketype,
        commentcnt,
      };
      postdata.push({ post: _post, comments });
    }
    return postdata;
  }

  async findById(id: string): Promise<PostDocument> {
    return this.postModel.findById(id);
  }

  async postsAll() {
    return this.postModel.find({});
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

async function generateThumbnail(videoPath: string, imagename: string) {
  const timePosition = '00:00:00.500';
  return ffmpeg(videoPath).thumbnail({
    timestamps: [timePosition],
    filename: imagename,
    folder: './static/thumbnail',
    size: '320x240',
  });
}
