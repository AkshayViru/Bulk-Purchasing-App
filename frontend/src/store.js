/*Redux Store File */
/* To connect reducers and middleware */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, 
      productUpdateReducer, productReviewCreateReducer, productListMyReducer,
      productDispatchReadyReducer, productDispatchReducer,
      productDispatchedListReducer, } from './reducers/productReducers' 
import { cartReducer } from './reducers/cartReducers' 
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer, 
  userDeleteReducer, 
  userUpdateReducer, 
} from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, 
  orderDeliverReducer, orderListReducer, } from './reducers/orderReducers' 

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer, 
    productCreate: productCreateReducer, 
    productUpdate: productUpdateReducer, 
    productReviewCreate: productReviewCreateReducer, 
    productListMy: productListMyReducer,
    productDispatchReady: productDispatchReadyReducer,
    productDispatch: productDispatchReducer,
    productDispatchedList: productDispatchedListReducer,
    cart: cartReducer, 
    userLogin: userLoginReducer,   
    userRegister: userRegisterReducer,  
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer, 
    userDelete: userDeleteReducer, 
    userUpdate: userUpdateReducer, 
    orderCreate: orderCreateReducer, 
    orderDetails: orderDetailsReducer, 
    orderPay: orderPayReducer, 
    orderDeliver: orderDeliverReducer, 
    orderListMy: orderListMyReducer, 
    orderList: orderListReducer, 
  })

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
 
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
? JSON.parse(localStorage.getItem('shippingAddress'))
: {}

const initialState = {
  cart: { cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,  
  },
  userLogin: { userInfo: userInfoFromStorage }, 
}

/*when you dispatch an action to redux store it should be a plain text not a function. 
but in a real scenario, we need to dispatch a function to do some logics. here redux-thunk comes 
into the picture and converts our function to a plain text object for redux. so it is a middleware 
that needs to be introduced to store on createStore function. */

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store