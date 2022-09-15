import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'


const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState)

  // for clearing the cart
  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }

  // for removing individual item in cart (needs id to clear items)
  const remove = (id) => {
    dispatch({type: 'REMOVE', payload:id})
  }

  // for increasing the items in cart
  const increase = (id) => {
    dispatch({type: "INCREASE", payload: id})
  }

  // for decreasing the items in cart
  const decrease = (id) => {
    dispatch({type: "DECREASE", payload: id})
  }

  // cart- fetching data
  const fetchData = async () => {
    dispatch({type: "LOADING"});
    
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type: 'DISPLAY_ITEMS' , payload:cart})
  }

// for toggling the functionality instead using two function
const toggleAmount = (id,type) => {
  dispatch({type: "TOGGLE_AMOUNT", payload:{id, type}})
}

// getting total of the carts
useEffect(()=> {
  dispatch({type: 'GET_TOTALS'})
},[state.cart])

useEffect(() => {
  fetchData()
},[]) 



  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
 }

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
