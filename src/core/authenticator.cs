import { Request, Response, NextFunction } from 'express';
import {authenticationFactory} from "../modules/authentication/authenticationFactory"

const Authenticator = async ({req: Request, res: Response, next: NextFunction) : Promise<void> = > {

}