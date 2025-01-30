
import { NotFoundError } from "../errors/typeErrors.js";
import { Bootcamp } from "../models/Bootcamp.model.js";
import { User } from "../models/User.model.js";
import { isEmptyResponseData, validateExistData } from "../utils/validations/validate.js";
import {hashPassword} from "../services/auth/hash.service.js"


export const findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ["id", "firstName", "lastName"], 
      include: {
        model: Bootcamp, 
        as: "bootcamps", 
        attributes: ["id", "title"],
        through: {
          attributes: [],
        },
      },
    });

    isEmptyResponseData(user);

    if (!user) {
      throw new NotFoundError("Usuario no encontrado")
    }

    res.status(200).json({
      message: "Usuario y bootcamps obtenidos con éxito",
      status: 200,
      data: user,
    });
  } catch (error) {
    next(error)
  }
};

export const findAll = async (req, res, next) => {
  try {
   
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email"], 
      include: {
        model: Bootcamp, 
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [], 
        },
      },
    });

    isEmptyResponseData(users)


    res.status(200).json({
      message: "Usuarios obtenidos con éxito",
      status: 200,
      data: users, 
    });
  } catch (error) {
  next(error)
  }
};



export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Si la contraseña está presente en los datos de actualización, la hasheamos
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);  // Hashea la contraseña
    }

    await validateExistData(User, updateData, ["email"], id);

  
    const [updateRows, [updatedUser]] = await User.update(updateData, {
      where: { id },
      returning: true,
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    });

    // Si no se encontró el usuario, lanzamos un error
    if (updateRows === 0) {
      throw new NotFoundError(`No se encontró al usuario con el ID: ${id}`);
    }

    res.status(200).json({
      message: "Usuario actualizado con éxito",
      status: 200,
      newData: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });

    isEmptyResponseData(user);

    res.status(200).json({
      message: "Usuario eliminado con éxito",
      status: 200,
    });
  } catch (error) {
    next(error)
  }
};
