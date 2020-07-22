import {BaseDatabase} from './BaseDatabase';
import {createPostInput} from '../model/PostsModels';

export class PostsDatabase extends BaseDatabase{
  private tableName: string = process.env.POSTS_DB_NAME;

  public async createPost(input: createPostInput){
    try{
      //TODO: receber id do criador do post
      await this.getConnection()
      .insert({
        id: input.id,
        img_url: input.img_url,
        description: input.description,
        create_at: input.create_at,
        type: input.type
      })
      .into(this.tableName);

    }catch(e){
      throw {message: e.sqlMessage || e.message}
    };
  };
  
  public async getPostById(){

  };
};