import axios from 'axios'; 
import { useReducer } from 'react';


// facilita para realizar testes
// ex.: passar um state vazio com type request o retorno será um objeto com  propriedade loading = true
//      passar um state vazio com type SUCCESS o retorno será um objeto com propriedade loading = false e data com os dados enviados
const reducer = (state, action) => {

    console.log('state', state, 'action', action)
    if (action.type === 'REQUEST') {
        return {
            ...state,
            loading: true
        }
    }
    if (action.type === 'SUCCESS') {
        return {
            ...state,
            loading: false,
            data: action.data
        }
    }

    // manipular o estado
    return state;
}





const usePost = (url) => {

    const [data, dispatch] = useReducer(reducer, {
        loading: false,
        data: {}
    })


    const post = data => {
        dispatch({type:'REQUEST'})
        axios
          .post(url,data)
          .then(res => {
             dispatch({type:'SUCCESS',
                       data: res.data
            })
          })
    }

    return [data,post]
}

export default usePost