import { Bootcamp } from "../models/Bootcamp.model.js"
import { User } from "../models/User.model.js";

export const createBootcamp = async(req, res) =>{
    try {

        const user = await Bootcamp.create(req.body)
        
        console.log(user)
        res.status(201).json({
            message: 'Bootcamp creado con éxito',
            status: 201,
            data: user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear un bootcamp',
            status: 500,
            data: null
        })
        
    }
}

/*
export const findAllBootcamp = async (req, res) => {
    try {
        const users = await Bootcamp.findAll()



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
export const findById = async (req, res) => {
    try {
      const { id } = req.params;
      const bootcamp = await Bootcamp.findByPk(id)
      
  
      res.status(200).json({
        message: "Bootcamp encontrado con éxito",
        status: 200,
        data: bootcamp,
      });
    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Error al buscar el bootcamp",
          status: 500,
          data: null,
        });
    }
  };



export const updateBootcamp = async (req, res) => {
    try {
      const { id } = req.params;
  
      const bootcamp = await Bootcamp.update(req.body, {
        where: { id },
        returning: true,
       })
    
  
      res.status(200).json({
        message: "Bootcamp actualizado con éxito",
        status: 200,
        data: bootcamp,
      });
    } catch (error) {
      
          res.status(500).json({
            message: "Error al actualizar el bootcamp",
            status: 500,
            data: null,
          });
        }
    }

    export const deleteBootcampById = async (req, res) => {
        try {
          const { id } = req.params;
          await Bootcamp.destroy({ where: { id } });
      
          res.status(200).json({
            message: "Bootcamp eliminado con éxito",
            status: 200,
          });
        } catch (error) {
        
            res.status(500).json({
              message: "Error al eliminar el bootcamp",
              status: 500,
            });
  
        }
      };


      // controllers/bootcamp/bootcamp.controller.js
;

export const addUser = async (req, res) => {
    try {
        const { bootcampId, userId } = req.body;  // Se reciben los IDs de bootcamp y usuario
        const bootcamp = await Bootcamp.findByPk(bootcampId, {
          attributes: ['id', 'title']
        });  // Buscar el bootcamp por su ID
        const user = await User.findByPk(userId,  {
          attributes: ['id', 'firstName', 'lastName']
        });  // Buscar el usuario por su ID

        if (!bootcamp || !user) {
            return res.status(404).json({
                message: "Bootcamp o Usuario no encontrado",
                status: 404,
                data: null,
            });
        }

        // Asociar el usuario al bootcamp
        await bootcamp.addUser(user);  // Utilizando la asociación definida anteriormente

        res.status(200).json({
            message: 'Usuario agregado al Bootcamp con éxito',
            status: 200,
            data: { bootcamp, user },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al agregar el usuario al Bootcamp',
            status: 500,
            data: null,
        });
    }
};

export const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName'],  // Seleccionamos los campos de usuario que necesitamos
      include: {
        model: Bootcamp,  // Incluir los bootcamps asociados
        as: 'bootcamps',  // El alias que hemos definido en las asociaciones
        attributes: ['id', 'title'],  // Seleccionamos los campos que queremos del bootcamp
        through: {
          attributes: []  // Esto evitará que los campos de la tabla intermedia (como createdAt y updatedAt) sean devueltos
        }
      },
      //raw: true // Esto elimina automáticamente los metadatos como createdAt y updatedAt
    });

    if (users.length === 0) {
      return res.status(404).json({
        message: 'No hay usuarios encontrados',
        status: 404,
        data: null,
      });
    }

    res.status(200).json({
      message: 'Usuarios obtenidos con éxito',
      status: 200,
      data: users,
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

