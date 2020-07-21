import {PostsDatabase} from '../data/PostsDatabase';
import {IdGenerator} from '../services/utils/IdGenerator';

export class PostsBusiness{
  
  async createPost(
    img_url: string,
    type?:string,
    create_at?: string,
    description?:string
  ){
    //TODO: validar criação de post mediante access token
    if(! img_url){
      throw new Error('Missing post image url.');
    };
    
    if(!img_url.includes('http')){
      throw new Error('Invalid post image url.');
    };

    const usePostsDb = new PostsDatabase();
    const idGen = new IdGenerator();

    await usePostsDb.createPost({
      id: idGen.generate(),
      img_url,
      type,
      create_at,
      description
    });
  };

};