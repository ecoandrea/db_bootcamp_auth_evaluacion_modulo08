import { sendMailService } from "../services/mails/send.mail.services.js";
import { emailHtmltemplate } from "../services/mails/mailTemplate.js";
import { emailContent } from "../utils/validations/validate.js";

export const sendEmailController = async (req, res,next) => {
    try{
    const { to, subject } = req.body; // Solo necesitas 'to' y 'subject'
 
    // Validar que los campos necesarios estén presentes
    if (!Array.isArray(to) || to.length === 0 || !subject) {
        return res.status(400).json({ message: 'Faltan datos requeridos: to y subject son obligatorios.' });
    }
 
    // Generar el HTML utilizando la función de template
    const html = emailHtmltemplate(); // Llama a la función que crea el template
 
    // Validar el contenido del email
    emailContent(to, subject, html); // Llama a la función de validación
   
        const infoData = await sendMailService({ to, subject, html });
        return res.status(200).json({
            message: 'Correo enviado exitosamente',
            messageId: infoData.messageId });
    } catch (error) {
        next (error)
    }
}