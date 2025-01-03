
import { NotFoundError } from "../errors/typeErrors.js";
import { Bootcamp } from "../models/Bootcamp.model.js";
import { User } from "../models/User.model.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "Usuario creado con éxito",
      status: 201,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ["id", "firstName", "lastName"], 
      include: {
        model: Bootcamp, // Incluir los bootcamps asociados
        as: "bootcamps", 
        attributes: ["id", "title"],
        through: {
          attributes: [],
        },
      },
    });

    if (!user) {
      throw new NotFoundError("Usuario no encontrado")
    }

    res.status(200).json({
      message: "Usuario y bootcamps obtenidos con éxito",
      status: 200,
      data: user, // Esto contiene el usuario con sus bootcamps
    });
  } catch (error) {
    next(error)
  }
};

export const findAll = async (req, res, next) => {
  try {
    // Obtener todos los usuarios con sus bootcamps asociados
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email"], // Seleccionamos los campos de usuario que necesitamos
      include: {
        model: Bootcamp, // Incluir los bootcamps asociados
        as: "bootcamps", // El alias que hemos definido en las asociaciones
        attributes: ["id", "title"], // Seleccionamos los campos que queremos del bootcamp
        through: {
          attributes: [], // Excluir los campos de la tabla intermedia (createdAt, updatedAt)
        },
      },
    });

    if (users.length === 0) {
      throw NotFoundError("No se ha encontrado ningún usuario")
  
    }

    res.status(200).json({
      message: "Usuarios obtenidos con éxito",
      status: 200,
      data: users, // Esto contiene una lista de usuarios con sus bootcamps
    });
  } catch (error) {
  next(error)
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.update(req.body, {
      where: { id },
      returning: true,
    });

    res.status(200).json({
      message: "Usuario actualizado con éxito",
      status: 200,
      data: user,
    });
  } catch (error) {
   next(error)
  
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });

    res.status(200).json({
      message: "Usuario eliminado con éxito",
      status: 200,
    });
  } catch (error) {
    next(error)
  }
};
