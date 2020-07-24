import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/utils/HashManager";
import { Authenticator } from "../services/utils/Authenticator";

export class UserController {

    async signup(req: Request, res: Response) {
        const userBusiness: UserBusiness = new UserBusiness();
        
        try {
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const role = req.body.role;

            const result =  await userBusiness.signup(name, email, password, role);

            res.status(200).send({ message: "Usuário criado com sucesso", result });

        } catch (err) {
            res.status(400).send({ error: err.message });
        }

    }

    async login(req: Request, res: Response) {
        const userBusiness: UserBusiness = new UserBusiness();

        try {
            const userData = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await userBusiness.getUserByEmail(userData.email);

            const hashManager = new HashManager();
            const hashCompare = hashManager.checkHash(userData.password, user.password)

            if(!hashCompare){
                throw new Error("Invalid Password")
            }

            const authenticator = new Authenticator();
            const token = authenticator.generateToken({
                id: user.id
            })

            res.status(200).send({token})


        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}