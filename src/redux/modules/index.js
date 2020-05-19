import { combineReducers } from "redux"
import common from "./common"
import home from "./home"
import detail from "./detail"
import entities from "./entities"

const rootReducer = combineReducers({
  common,
  home,
  detail,
  entities,
})

export default rootReducer
