import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

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
}