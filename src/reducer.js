import CartItem from "./CartItem";


const reducer = (state, action) => { // state is the current state before the update and action is what we are trying to do


 // for clearing cart
 if (action.type === 'CLEAR_CART') { // for clearing cart
  return {...state, cart: []}
 }

 // for removing individual item
 if (action.type === "REMOVE") { // for removing individual item
  return {...state, cart: state.cart.filter((CartItem)=> CartItem.id !== action.payload)} // grab the values 
  // cartitem(every item in array). if the cart item id does not match the id that is passed in the payload then that item will be returned
 }



// // for increasing the cart
// if (action.type === "INCREASE") {

//  let tempCart = state.cart.map((cartItem)=> {
//   if(cartItem.id === action.payload) { // if cartitem id matches the payload that is being passed then increase the amount by 1
//    return {...cartItem, amount: cartItem.amount + 1}
//   }// if not return as it is
//   return cartItem
//  })

//  return {...state, cart: tempCart}
// }


// // for decreasing the cart ( also remove the item if the cart is below 1. i.e. 0)

// if (action.type === "DECREASE") {

//  let tempCart = state.cart.map((cartItem)=> {
//   if(cartItem.id === action.payload) { // if cartitem id matches the payload that is being passed then decrease the amount by 1
//    return {...cartItem, amount: cartItem.amount - 1}
//   }// if not return as it is
//   return cartItem

//    //also remove the item if the cart is below 1. i.e. 0)
//  }).filter((cartItem)=> cartItem.amount !==0)

//  return {...state, cart: tempCart}
// }

// for getting the total cart

if(action.type ==="GET_TOTALS") {

 const {total, amount} = state.cart.reduce((cartTotal, cartItem) => {

  const {price, amount} = cartItem;

  const itemTotal = price * amount;

  cartTotal.total += itemTotal;
  cartTotal.amount += amount;
  return cartTotal;
 }, 

  {
   total: 0, 
   amount: 0,
  }
 )

 // total = parseFloat(total.toFixed(3))
 // total = parseFloat(total.toFixed(2))

 //  // this is done so total have set didgits after .(dot). limit the number after dot (2 in this case)

 return {...state, total, amount}
}

// for loading
if(action.type === 'LOADING') {
 return {...state,loading: true}
}

// for displaying item
if(action.type === 'DISPLAY_ITEMS') {
 return {...state,cart:action.payload, loading:false}
}

// for toggling 
if(action.type === 'TOGGLE_AMOUNT') {
 let tempCart = state.cart.map((cartItem)=> {

  if(cartItem.id ===action.payload.id) { // if cartitem id matches the action.payload.id that is being passed then return new item
   if(action.payload.type ==='inc') { // if it is increasing
    return {...cartItem, amount: cartItem.amount + 1}
   }
   if(action.payload.type === 'dec') {
    return {...cartItem, amount: cartItem.amount - 1}

   }
  }
  // if not return as it is
  return cartItem
 })
//also remove the item if the cart is below 1. i.e. 0)
 .filter((cartItem)=> cartItem.amount !==0)


 return {...state, cart: tempCart}
}

 throw new Error ('no matching action type')
}



export default reducer;