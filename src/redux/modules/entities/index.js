import { combineReducers } from "redux"
import products from "./products"
import comments from "./comments"
import orders from "./orders"
import shops from "./shops"

//合併領域狀態
export default combineReducers({
  products,
  comments,
  orders,
  shops,
})
