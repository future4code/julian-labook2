import { BaseDatabase } from "./BaseDatabase";
import { IdGenerator } from "../services/utils/IdGenerator";

export class UserDatabase extends BaseDatabase {
    private tableName: string = process.env.USERS_DB_NAME;

    public async signup(
        id: string, 
        name: string, 
        email: string, 
        password: string,
        role:string
        ) {
        
        try {
            return await super.getConnection()
            .insert({
                id,
                name,
                email,
                password,
                role
            })
            .into(this.tableName)

            } catch (error) {
                throw new Error(error.message || error.sqlMessage);
            }
    }

    public getByEmail = async (email:string):Promise<any> => {
        const result = await this.getConnection()
        .select('*')
        .from(this.tableName)
        .where({ email });
        return result[0];
    }

}