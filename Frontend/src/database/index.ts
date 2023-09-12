import { IPost } from '../types/post';
import { IStory } from '../types/story';
import {IFollow} from '../types/follwer';

export const followData: IFollow[] =[
  {
    _id: '1',
    user:{
      _id: '1',
      username: 'terylucas',
      dp:'images/img_smallpost_1x292.png'
    },
    followers: 2,
  },
  {
    _id: '1',
    user:{
      _id: '1',
      username: 'terylucas',
      dp:'images/img_smallpost_1x292.png'
    },
    followers: 2,
  },
  {
    _id: '1',
    user:{
      _id: '1',
      username: 'terylucas',
      dp:'images/img_smallpost_1x292.png'
    },
    followers: 2,
  },
  {
    _id: '1',
    user:{
      _id: '1',
      username: 'terylucas',
      dp:'images/img_smallpost_1x292.png'
    },
    followers: 2,
  },
  {
    _id: '1',
    user:{
      _id: '1',
      username: 'terylucas',
      dp:'images/img_smallpost_1x292.png'
    },
    followers: 2,
  }
]

export const postsData: IPost[] = [
  {
    _id: '1',
    user: {
      _id: '1',
      username: 'terrylucas',
      fullname: 'terrylucas',
      dp: 'images/img_smallpost_1x292.png',
    },
    image: 'images/img_smallpost_1x292.png',
    likes: 129,
    comments: 5,
    shares: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    user: {
      _id: '1',
      fullname: 'shirleyromero',
      username: 'shirleyromero',
      dp: 'images/img_smallpost_293x293.png',
    },
    image: 'images/img_smallpost_293x293.png',
    likes: 798,
    comments: 52,
    shares: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    user: {
      _id: '1',
      fullname: 'ednamanz',
      username: 'ednamanz',
      dp: 'images/img_smallpost_1.png',
    },
    image: 'images/img_smallpost_1.png',
    likes: 456,
    comments: 15,
    shares: 80,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '4',
    user: {
      _id: '1',
      fullname: 'LauraMatthews',
      username: 'lauramatthews',
      dp: 'images/img_smallpost.png',
    },
    image: 'images/img_smallpost.png',
    likes: 29,
    comments: 1,
    shares: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const storiesData: IStory[] = [
  {
    _id: '1',
    user: {
      _id: '1',
      fullname: 'your story',
      dp: 'images/img_profilepics_13.png',
    },
    createdAt: new Date(),
  },
  {
    _id: '2',
    user: {
      _id: '1',
      fullname: 'terrylucas',
      dp: 'images/img_profilepics_56x56.png',
    },
    createdAt: new Date(),
  },
  {
    _id: '3',
    user: {
      _id: '1',
      fullname: 'LauraMattaAnitaKuear',
      dp: 'images/img_profilepics_10.png',
    },
    createdAt: new Date(),
  },
  {
    _id: '4',
    user: {
      _id: '1',
      fullname: 'harryprescott',
      dp: 'images/img_profilepics_11.png',
    },
    createdAt: new Date(),
  },
  {
    _id: '5',
    user: {
      _id: '1',
      fullname: 'ednamanz',
      dp: 'images/img_profilepics_12.png',
    },
    createdAt: new Date(),
  },
  {
    _id: '6',
    user: {
      _id: '1',
      fullname: 'christinaste...',
      dp: 'images/img_profilepics_8.png',
    },
    createdAt: new Date(),
  },
  {
    _id: '7',
    user: {
      _id: '1',
      fullname: 'johnschmit',
      dp: 'images/img_profilepics_5.png',
    },
    createdAt: new Date(),
  },
  {
    _id: '8',
    user: {
      _id: '1',
      fullname: 'amyporte...',
      dp: 'images/img_smallpost_1x293.png',
      // image: 'https://random.imagecdn.app/1920/1050',
    },
    createdAt: new Date(),
  },
];
