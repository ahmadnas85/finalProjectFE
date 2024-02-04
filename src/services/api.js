import {axiosInstance as axios} from './axiosInstance'

// user related endpoints
const REGISTER_USER = () => '/user/register';
const LOGIN_USER = () => '/user/login';
const DELETE_USER = () => '/user/delete';
// item related endpoints
const GET_ALL_ITEMS = () => '/item/getAll';
const UPDATE_ITEM = () => '/item/update';
// order related endpoints
const CREATE_ORDER = () => '/orders/add';
const REMOVIE_ITEM_FROM_ORDER = () => '/orders/delete/item';
const UPDATE_ORDER = () => '/orders/update';
const DELETE_ORDER = () => '/orders/delete';
const GET_ALL_ORDERS_FOR_USER = () => '/orders/all/user';
const GET_ALL_ORDERS = () => '/orders/all';
const GET_ORDER_BY_ID = () => '/orders/get';
const GET_ORDER_ITEMS_BY_ORDER_ID = () => '/orders/items';
// favorite related endpoints
const ADD_TO_FAVORITES = () => '/favorites/add';
const GET_FAVORITES_BY_USER_ID = () => '/favorites/getFavById';
const REMOVE_FROM_FAVORITES = () => '/favorites/delete';



export const registerUser = (user) => {
    return axios.post(REGISTER_USER(), user);
}

export const loginUser = (user) => {
    return axios.post(LOGIN_USER(), user);    
}

export const deleteUser = (user) => {
    return axios.post(DELETE_USER(), user);
}

export const getAllItems = () => {
    return axios.get(GET_ALL_ITEMS());
}

export const updateItem = (item) => {
    return axios.post(UPDATE_ITEM(), item);
}

export const createOrder = (fullOrder) => {
    return axios.post(CREATE_ORDER(), fullOrder);    
}

export const removeItemFromOrder = (orderId, itemId) => {
    return axios.delete(REMOVIE_ITEM_FROM_ORDER(), { params: { orderId, itemId } });
  }
  
  export const updateOrder = (order) => {
    return axios.put(UPDATE_ORDER(), order);
  }
  
  export const deleteOrder = (orderId) => {
    return axios.delete(DELETE_ORDER(), { params: { orderId } });
  }
  
  export const getAllOrdersForUser = (userId) => {
    return axios.get(GET_ALL_ORDERS_FOR_USER(), { params: { userId } });
  }
  
  export const getAllOrders = () => {
    return axios.get(GET_ALL_ORDERS());
  }
  
  export const getOrderById = (orderId) => {
    return axios.get(GET_ORDER_BY_ID(), { params: { orderId } });
  }
  
  export const getOrderItemsByOrderId = (orderId) => {
    return axios.get(GET_ORDER_ITEMS_BY_ORDER_ID(), { params: { orderId } });
  }

  export const addFavorite = (userId, itemId) => {
    return axios.post(ADD_TO_FAVORITES(), { userId, itemId });
  }
  export const getFavoritesByUserId = (userId) => {
    return axios.get(GET_FAVORITES_BY_USER_ID(), { params: { userId } });
  }
  
  export const deleteFavorite = (userId, itemId) => {
    return axios.delete(REMOVE_FROM_FAVORITES(), { params: { userId, itemId } });
  }