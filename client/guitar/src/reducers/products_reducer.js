// import {
//     GET_PRODUCTS_BY_SELL,
//     GET_PRODUCTS_BY_ARRIVAL
// } from '../actions/types';
 

// export default function(state={},action){
//     switch(action.type){
//         case GET_PRODUCTS_BY_SELL:
//             return {...state, bySell: action.payload }
//         case GET_PRODUCTS_BY_ARRIVAL:
//             return {...state, byArrival:  action.payload }    
//         default:
//             return state;
//     }
// }

/////////////// after shop creation
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP,//after the admin part
    ADD_PRODUCT,
    CLEAR_PRODUCT,

    ADD_WOOD,
    ADD_BRAND,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL
} from '../actions/types';
 

export default function(state={},action){
    switch(action.type){
        case GET_PRODUCTS_BY_SELL:
            return {...state, bySell: action.payload }
        case GET_PRODUCTS_BY_ARRIVAL:
            return {...state, byArrival:  action.payload }
        case GET_BRANDS:
            return {...state, brands2: action.payload }
        case ADD_BRAND:
            return {
                ...state, 
                addBrand: action.payload.success , 
                brands:action.payload.brands 
            }

        case GET_WOODS:
            return {...state, woods: action.payload }

        case ADD_WOOD:
            return {
                ...state, 
                addWood: action.payload.success , 
                woods:action.payload.woods 
            }
        case GET_PRODUCTS_TO_SHOP:
            return {
                ...state,
                toShop: action.payload.articles,
                toShopSize: action.payload.size
            }//after the admi part
        case ADD_PRODUCT:
            return {...state,addProduct: action.payload}
        case CLEAR_PRODUCT:
            return {...state,addProduct: action.payload}
        case GET_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload }
        case CLEAR_PRODUCT_DETAIL:
            return {...state, prodDetail: action.payload }
        default:
            return state;
    }
}