import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/utils/IdGenerator";
import {HashManager} from '../services/utils/HashManager';
import {Authenticator} from '../services/utils/Authenticator';

export class UserBusiness{

    public async signup(name: string, email: string, password: string, role:string){
        
        try {
        const idGenerator = new IdGenerator();
        const id:string = idGenerator.generate();

        const useHashed = new HashManager();
        const passwordHashed = await useHashed.hash(password);

        const userDatabase = new UserDatabase();
        await userDatabase.signup(id, name, email, passwordHashed, role)

        const autheticated = new Authenticator();
        const token = autheticated.generateToken({ id, name, email, role },process.env.ACC_TOKEN_EXPIRES_IN);


        return { accessToken: token }
        
        } catch (error) {
            throw new Error(error.message)
        }
    }

    /* Metodo do login a fazer */

    public login(){
        try {
            
            if (!email || email.indexOf('@') === -1) {
                throw new Error('Insert a valid email');
            }
            if (!password) {
                throw new Error('Insert a password');
            }

            const userDb = new UserDatabase();
            const user = await userDb.getByEmail(email);
        
            const useHashed = new HashManager();
            const passwordHashed = await useHashed.checkHash(password, user.password);

            if (!passwordHashed) {
                throw new Error('Invalid password');
            }
            const { id, role } = user;
        
            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id, role }, process.env.ACCESS_TOKEN_EXPIRES_IN as string);
        
            return { accessToken };

        } catch (error) {
            throw new Error (error.message)
        }
    }
}