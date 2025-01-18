export const emailHtmltemplate=(title, message, footer)=>{
    const htmlTemplate=`
   <div style="max-width: 600px; margin: auto; background: #4B6A9D; border-radius: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); padding: 30px; font-family: 'Arial', sans-serif; color: #F9F9F9;">
    <h1 style="font-size: 28px; color: #F9F9F9; text-align: center; font-weight: bold; margin-bottom: 20px;">¡Felicidades, has aprobado el Bootcamp!</h1>
    
    <p style="font-size: 18px; color: #E0F1F1; line-height: 1.6; text-align: center; margin-bottom: 30px;">Recuerda, cuando intentes recordar algo, tal vez seas como Doris de *Buscando a Nemo* 😄. ¡No te preocupes, todo está bien! Sigue avanzando.</p>

    <div style="text-align: center; font-size: 14px; color: #D1D1D1;">
        <p>&copy; 2025 CriszDev. Todos los derechos reservados.</p>
    </div>
</div>

`
return htmlTemplate 

}