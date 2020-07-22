import {PostsDatabase} from '../data/PostsDatabase';
import {IdGenerator} from '../services/utils/IdGenerator';

export class PostsBusiness{
  
  async createPost(
    img_url: string,
    creator_id: string,
    type?:string,
    create_at?: string,
    description?:string
  ):Promise<void>{
    //TODO: validar criação de post mediante access token
    if(! img_url){
      throw new Error('Missing post image url.');
    };
    if(! creator_id){
      throw new Error('Missing post creator id.');
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
      description,
      creator_id
    });
  };
  async getPostById(id:string): Promise<any>{
    const usePostsDb = new PostsDatabase();
    const dbResponse = await usePostsDb.getPostById(id);

    return dbResponse;
  };

};