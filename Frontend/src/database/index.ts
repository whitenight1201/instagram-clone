import { IPost } from '../types/post';
import { IStory } from '../types/story';
import { IFollow } from '../types/follwer';

export const followData: IFollow[] = [
  {
    _id: '1',
    user: {
      _id: '1',
      username: 'terylucas',
      dp: 'images/img_smallpost_1x292.png'
    },
    followers: 2,
  },
  {
    _id: '1',
    user: {
      _id: '1',
      username: 'terylucas',
      dp: 'images/img_smallpost_1x292.png'
    },
    followers: 2,
  },
  {
    _id: '1',
    user: {
      _id: '1',
      username: 'terylucas',
      dp: 'images/img_smallpost_1x292.png'
    },
    followers: 2,
  },
  {
    _id: '1',
    user: {
      _id: '1',
      username: 'terylucas',
      dp: 'images/img_smallpost_1x292.png'
    },
    followers: 2,
  },
  {
    _id: '1',
    user: {
      _id: '1',
      username: 'terylucas',
      dp: 'images/img_smallpost_1x292.png'
    },
    followers: 2,
  }
]

export const postsData1: IPost[] = [
  {
    _id: '1',
    content: 'Imperdiet in sit rhoncus, eleifend tellus augue lectus potentipellentesqueadsfasdfffffffffffffasdf',
    author: {
      _id: '1',
      username: 'terrylucas',
      avatar: 'images/img_smallpost_1x292.png',
    },
    file: 'images/img_smallpost_1x292.png',
    likecnt: 129,
    comments: [
      {
        _id: 'comments"id1',
        commentary: 'this is a test aaaaaaa',
        post: 'post id1',
        user: {
          _id: "commenter's id",
          username: "commenter's nameaa"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'comments"id2',
        commentary: 'this is a test bb',
        post: 'post id2',
        user: {
          _id: "commenter's id",
          username: "commenter's namebb"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'comments"id3',
        commentary: 'this is a test aaaaaaa',
        post: 'post id1',
        user: {
          _id: "commenter's id",
          username: "commenter's nameaa"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'comments"id4',
        commentary: 'this is a test bb',
        post: 'post id2',
        user: {
          _id: "commenter's id",
          username: "commenter's namebb"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    shares: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    content: 'write you caption',
    author: {
      _id: '1',
      username: 'shirleyromero',
      avatar: 'images/img_smallpost_293x293.png',
    },
    file: 'images/img_smallpost_293x293.png',
    likecnt: 798,
    comments: [],
    shares: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    content: 'write you caption',
    author: {
      _id: '1',
      username: 'ednamanz',
      avatar: 'images/img_smallpost_1.png',
    },
    file: 'images/img_smallpost_1.png',
    likecnt: 456,
    comments: [
      {
        _id: 'comments"id1',
        commentary: 'this is a test aa',
        post: 'post id1',
        user: {
          _id: "commenter's id",
          username: "commenter's nameaa"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'comments"id2',
        commentary: 'this is a test bb',
        post: 'post id2',
        user: {
          _id: "commenter's id",
          username: "commenter's namebb"
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    shares: 80,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // {
  //   _id: '4',
  //   content:'write you caption',
  //   author: {
  //     _id: '1',
  //     username: 'lauramatthews',
  //     avatar: 'images/img_smallpost.png',
  //   },
  //   file: 'images/img_smallpost.png',
  //   likecnt: 29,
  //   comments: 1,
  //   shares: 2,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // },
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
