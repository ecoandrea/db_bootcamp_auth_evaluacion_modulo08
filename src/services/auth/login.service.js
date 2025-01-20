import jwt from 'jsonwebtoken';

import { User } from '../../models/User.model.js';
import { comparePassword } from './hash.service.js';
import { config } from '../../config/env.config.js';
import { normalizeUserPrivateData } from '../../utils/normalize/user.js';
import { isNotFound, isNotMatchedPassword } from '../../utils/validations/authValidation.js';
import { AuthError } from '../../errors/typeErrors.js';


const { secretKey } = config;

export const loginService = async({ email, password }) => { //se destructura los parametros para que sea uno solo 
    try {
        const user = await User.findOne( {where: {email}}); //busca por email
        isNotFound(user); //que no este vacio el dato, si llega null, undefined, o un arreglo vacio o un objeto sin propiedades

        const passwordMatch = await comparePassword (password, user.password); //pass texto plano desde el body , la hasheada dentro de user

        isNotMatchedPassword(passwordMatch);
        
        //jwt

        const privateUser = normalizeUserPrivateData(user);// para privatizar datos
        const token = jwt.sign(
            { uid: user.id, email: user.email }, // email no es obligatorio, se mandan por cuerpo de jwt payload
            secretKey,
            { expiresIn: '1h' } //una vez expirado no es valido el token
        );

        return {
            token,
            user: privateUser //aqui van datos privados, solo info general
        };
    } catch (error) {
        throw new AuthError('Login no autorizado', 500, error); 
    }
};
