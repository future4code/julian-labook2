import { UserDatabase } from "../data/UserDatabase";

export class UserBusiness{
    private userDatabase = new UserDatabase();

    public async signup(name: string, email: string){
        
        await this.userDatabase.signup(name, email);
    }

    public async approve(id: string){
        await this.userDatabase.approve(id);
    }

    public async getUserById(id: string){
        
        return await this.userDatabase.getUserById(id);
    }
}