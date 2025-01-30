import { dbConnect } from "./dbConnection.js";
import { verifyConnectionMail } from "./mails/config.mails.js";


export const serverInit = async(app, port) => {
    try {
        console.log('Verificando conexión a la base de datos');
        await dbConnect()
        app.listen (port,() =>{
            try { //aqui probamos la coneccion
                verifyConnectionMail();
                console.log('El transportador de correos esta listo para trabajar 😺');
            } catch (error) {
                console.error('Problemas con el transportador de correos', error)
            }
            console.log(`Servidor corriendo en el puerto ${port} 👻`);
        })
    } catch (error) {
        console.error('Error al inicializar el servidosr ☠️')
    }
}