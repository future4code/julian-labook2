import {Request, Response} from 'express';
import {PostsBusiness} from '../business/PostsBusiness';
import {PostsDatabase} from '../data/PostsDatabase';

export class PostsController {

  async createPost(req: Request, res: Response): Promise<void>{
    try{
      const body = req.body;
      await new PostsBusiness().createPost(
        body.img_url, body.creator_id, body.type, body.create_at, body.description
      );
      
      res.send({message: `Post created successfully!`}).status(200);

      await new PostsDatabase().destroyConnection();
    }catch(e){
        res.status(400).send({error: e.message});
    }
  };

  async getPostById(req: Request, res: Response): Promise<void>{
    try{
      const postId = req.params.id as string;
      const response = await new PostsBusiness().getPostById(postId);
      //TODO: mudar data de moment para formato DD/MM/AAAA
      res.send({post: response}).status(200);
    }catch(e){
      res.status(400).send({error: e.message});
    };
  };
};