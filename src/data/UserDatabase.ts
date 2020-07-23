import { BaseDatabase } from "./BaseDatabase";
import { IdGenerator } from "../services/utils/IdGenerator";

export class UserDatabase extends BaseDatabase {
    static TABLE_NAME: string = "USERS_DB_NAME";

    public async signup(
        id: string, 
        name: string, 
        email: string, 
        password: string,
        ) {
        
        try {
            return await super.getConnection()
            .insert({
                id,
                name,
                email,
                password,
            })
            .into(UserDatabase.TABLE_NAME)

            } catch (err) {
                throw new Error(err.message || err.sqlMessage);
            }
    }

    public async login(id: string):Promise<any>{
        try {
            return await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({id})

        } catch (error) {
            throw new Error (error.sqlMessage || error.message);
        }
    }
}