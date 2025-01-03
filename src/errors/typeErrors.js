import { CustomError } from "./CustomError.js";

export class NotFoundError extends CustomError {
  constructor(message, details, entity) {
    super(message || `${entity} No Encontrado`, 404, details);
  }
}


export class InternalServerError extends CustomError {
  constructor(message, details) {
    super(message || "Error interno del Servidor", 500, details);
  }
}