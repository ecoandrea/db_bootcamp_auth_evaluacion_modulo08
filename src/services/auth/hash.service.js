import * as bcrypt from 'bcrypt'; //bcrypts usa algoritmo de rondas
import { InternalServerError } from '../../errors/typeErrors.js';


const SALT_ROUND = 10;

//funcion que hashea la pass
export const hashPassword = async(plainPassword) =>{
    try {
        const salt = await bcrypt.genSalt(SALT_ROUND); // 
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        return hashedPassword;
    } catch(error){

        throw new InternalServerError('No pudimos encriptar la contraseña', 500, error);
    }
};

//comparar la contraseña la de texto plano con la encriptada

export const comparePassword = async(plainPassword, hashedPassword) =>{
    try {
        const password = bcrypt.compare(plainPassword, hashedPassword);
        
        return password;
    } catch (error) {
        throw new InternalServerError('No pudimos desencriptar la contraseña', 500, error);
    }
};