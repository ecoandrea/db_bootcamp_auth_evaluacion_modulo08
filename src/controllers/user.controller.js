import { Bootcamp } from "../models/Bootcamp.model.js";
import { User } from "../models/User.model.js";


export const createUser = async (req, res) => {
    try {

        const user = await User.create(req.body)

        console.log(user)
        res.status(201).json({
            message: 'Usuario creado con éxito',
            status: 201,
            data: user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el usuario',
            status: 500,
            data: null
        })

    }
}
/*
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id)


        res.status(200).json({
            message: "Producto encontrado con éxito",
            status: 200,
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al buscar el usuario",
            status: 500,
            data: null,
        });
    }
};
*/
/*
export const findAll = async (req, res) => {
    try {
        const users = await User.findAll()



        res.status(200).json({
            message: "Usuarios encontrados con éxito",
            status: 200,
            data: users,
        });
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: "Error al obtener los usuarios",
            status: 500,
            data: null,
        });
    }
};
*/


export const findUserById = async (req, res) => {
    try {
      const { id } = req.params;  // Obtén el ID del usuario desde los parámetros de la URL
  
      const user = await User.findByPk(id, {
        attributes: ['id', 'firstName', 'lastName', 'email'],  // Seleccionamos los campos de usuario que necesitamos
        include: {
          model: Bootcamp,  // Incluir los bootcamps asociados
          as: 'bootcamps',  // El alias que hemos definido en las asociaciones
          attributes: ['id', 'title'],  // Seleccionamos los campos que queremos del bootcamp
          through: {
            attributes: []  // Excluir los campos de la tabla intermedia (createdAt, updatedAt)
          }
        }
      });
  
      // Si no se encuentra el usuario, devolver un error
      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
          status: 404,
          data: null,
        });
      }
  
      // Responder con el usuario y sus bootcamps
      res.status(200).json({
        message: 'Usuario obtenido con éxito',
        status: 200,
        data: user,  // Esto contiene el usuario con sus bootcamps
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error al obtener el usuario',
        status: 500,
        data: null,
      });
    }
  };

  

  
export const findAll = async (req, res) => {
    try {
      // Obtener todos los usuarios con sus bootcamps asociados
      const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],  // Seleccionamos los campos de usuario que necesitamos
        include: {
          model: Bootcamp,  // Incluir los bootcamps asociados
          as: 'bootcamps',  // El alias que hemos definido en las asociaciones
          attributes: ['id', 'title'],  // Seleccionamos los campos que queremos del bootcamp
          through: {
            attributes: []  // Excluir los campos de la tabla intermedia (createdAt, updatedAt)
          }
        }
      });
  
      if (users.length === 0) {
        return res.status(404).json({
          message: 'No hay usuarios encontrados',
          status: 404,
          data: null,
        });
      }
  
      // Responder con la lista de usuarios y sus bootcamps
      res.status(200).json({
        message: 'Usuarios obtenidos con éxito',
        status: 200,
        data: users,  // Esto contiene una lista de usuarios con sus bootcamps
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Error al obtener los usuarios',
        status: 500,
        data: null,
      });
    }
  };

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.update(req.body, {
            where: { id },
            returning: true,
        })


        res.status(200).json({
            message: "Producto actualizado con éxito",
            status: 200,
            data: user,
        });
    } catch (error) {

        res.status(500).json({
            message: "Error al actualizar el usuario",
            status: 500,
            data: null,
        });
    }
}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });

        res.status(200).json({
            message: "Usuario eliminado con éxito",
            status: 200,
        });
    } catch (error) {

        res.status(500).json({
            message: "Error al eliminar el usuario",
            status: 500,
        });

    }
};

