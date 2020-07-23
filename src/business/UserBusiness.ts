import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/utils/IdGenerator";

export class UserBusiness{

    public async signup(name: string, email: string, password: string){
        
        const idGenerator = new IdGenerator();
        const id:string = idGenerator.generate();

        const userDatabase = new UserDatabase();
        await userDatabase.signup(id, name, email, password)
        
    }

    
}