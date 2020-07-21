import {Request, Response} from 'express';
import {PostsBusiness} from '../business/PostsBusiness';
import {PostsDatabase} from '../data/PostsDatabase';

export class PostsController {

  async createPost(req: Request, res: Response){
      try{
        const body = req.body;
        await new PostsBusiness().createPost(
          body.img_url, body.type, body.create_at, body.description
        );
        
        res.send({message: `Post created successfully!`}).status(200);

        await new PostsDatabase().destroyConnection();
      }catch(e){
          res.status(400).send({error: e.message});
      }
  }
};