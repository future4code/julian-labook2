interface createPostInput{
  id: string,
  img_url: string,
  type?:string,
  create_at?: string,
  description?:string,
  creator_id: string
};
export {createPostInput};