//import { dbConfig } from "../../config/db.config.js"
import { initBootcamp } from "../../models/Bootcamp.model.js"
import { initUser } from "../../models/User.model.js"

//import { initUserBootcamp } from "../../models/UserBootcamp.js"


export const initModels = (config) => {
    try {
        initUser(config)
        initBootcamp(config)
        //initUserBootcamp(dbConfig)
    } catch (error) {
        console.error(error)
    }
}