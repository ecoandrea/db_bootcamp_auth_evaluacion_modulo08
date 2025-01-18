import { transporter } from "./config.mails.js";
import { emailHtmltemplate } from "./mailTemplate.js";

export const sendMailService = async ({ to, subject, message }) => {
    try {
        // Llama a emailHtmltemplate solo con el mensaje
        const htmlTemplate = emailHtmltemplate(undefined, message); // Usa undefined para title si no lo necesitas
 
        const mailOptions = {
            from: process.env.SMTP_USER, // Usuario es el correo que manda el mensaje
            to: to.join(', '), // Convierte el array de destinatarios a una cadena
            subject, // Asunto del mensaje
            html: htmlTemplate, // Contenido del mensaje en HTML
        };
 
        const infoData = await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito', infoData.messageId);
 
        return infoData; // Retorna la información del envío
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new MailError(error); // Lanza un error personalizado
    }
};