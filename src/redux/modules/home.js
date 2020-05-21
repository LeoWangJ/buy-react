import url from "../../utils/url"
import { schema } from './entities/products'
import { FETCH_DATA } from '../middleware/api'
import { combineReducers } from 'redux'
export const types = {
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",
  FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST",
  FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS",
  FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE",
}

const params = {
  PATH_LIKES: "likes",
  PATH_DISCOUNTS: "discounts",
  PAGE_SIZE_LIKES: 5,
  PAGE_SIZE_DISCOUNTS: 3
}

const initialState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: []
  },
  discounts: {
    isFetching: false,
    ids: []
  }
}
export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {
      let { pageCount } = getState().home.likes
      let rowIndex = pageCount * params.PAGE_SIZE_LIKES
      let endpoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES)
      return dispatch(fetchLikes(endpoint))
    }
  },
  loadDiscounts: () => {
    return (dispatch, getState) => {
      if (getState().home.discounts.ids.length > 0) {
        return null
      }
      let endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS)
      return dispatch(fetchDiscounts(endpoint))
    }
  }
}

const fetchLikes = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE,
    ],
    endpoint,
    schema
  }
})

const fetchDiscounts = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_DISCOUNTS_REQUEST,
      types.FETCH_DISCOUNTS_SUCCESS,
      types.FETCH_DISCOUNTS_FAILURE,
    ],
    endpoint,
    schema
  }
})

const likes = (state = initialState.likes, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_LIKES_SUCCESS:
      console.log(action.response)
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids),
        pageCount: state.pageCount + 1
      }
    case types.FETCH_LIKES_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const discounts = (state = initialState.discounts, action) => {
  switch (action.type) {
    case types.FETCH_DISCOUNTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_DISCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids),
      }
    case types.FETCH_DISCOUNTS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  likes,
  discounts
})

export default reducer

export const getLikes = (state) => {
  console.log(state)
  return state.home.likes.ids.map(id => {
    return state.entities.products[id]
  })
}
export const getDiscounts = (state) => {
  return state.home.discounts.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getPageCountOfLikes = state => {
  return state.home.likes.pageCount
}