import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import commonReducer from "./common/commonSlice";
import cartReducer from "./cart/cartSlice";
import blogReducer from "./blog/blogSlice";

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  cartReducer,
  blogReducer,
});

export default rootReducer;
