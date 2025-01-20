/**
 * 
 * @param {Object} data -Datos que llegan desde petición con la información del usuario a destructurar
 * @returns {Array}  - Array con 3 elementos , los datos generales del usuario como objeto, el email en la segunda posicion, y la contraseña en la última.
 */
export const destructuringUserData = (data) => {
    const {
        firstName,
        lastName,
        email,
        password,
      
    } = data;

    const globalDataUser = {
        firstName,
        lastName,
        
    };

  
    return [globalDataUser, email, password]; //se necesita la info, pero el password se debe aparte ver si es unico , y el password hat que cachearla y transformarla
};

//esta funcion abstrae la info y se puede volver a reutilizar tantas veces sea necesaria la info
// retorna un arreglo un objeto con toda las propieddes y el email y password por separado


export const normalizeUserData = (email, password, generalData = {}) => { //se convierte en objeto con valor default vacio de base y ahi se puede aplicar el rest operator
    return {
        email,
        password,
        ...generalData
    };
};



export const normalizeUserPrivateData = (user) => {
    const { id, firstName, lastName, email } = user;

    //se retorna objeto nuevo con datos , que sera una copia del de arriba
    return {
        id,
        firstName,
        lastName,
        email,
    };
};