
import { useReducer, useEffect } from 'react';
import axios from 'axios'

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


const useGet = (url) => {

    const [data, dispatch] = useReducer(reducer, {
        loading: true,
        data: {}
    })

    useEffect(() => {

        dispatch({ type: 'REQUEST' })

        axios.get(url)
            .then(response => {
                dispatch({ type: 'SUCCESS', data: response.data })
            })
    }, [url])

    return data;
}


export default useGet