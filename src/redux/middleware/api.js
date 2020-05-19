import { get } from '../../utils/request'

export const FETCH_DATA = 'FETCH_DATA'


export default store => next => action => {
    const callAPI = action[FETCH_DATA]

    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    const { endpoint, schema, types } = callAPI
    if (typeof endpoint !== 'string') {
        throw new Error('endpoint is must string type')
    }

    if (!schema) {
        throw new Error('The schema of the domain entity must be specified')
    }

    if (!Array.isArray(types) && types.length !== 3) {
        throw new Error('Need to specify an array containing 3 action types')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('action type must be a string type')
    }

    const actionWith = data => {
        const finalAction = { ...action, ...data }
        delete finalAction[FETCH_DATA]
        return finalAction
    }
    const [requestType, successType, failureType] = types
    next(actionWith({ type: requestType }))
    return fetchData(endpoint, schema).then(
        response => next(actionWith({ type: successType, response })),
        error => next(actionWith({ type: failureType, error: error.message || 'fetch failure' })),
    )


}


const fetchData = (endpoint, schema) => {
    return get(endpoint).then(data => {
        return normalizeData(data, schema)
    })
}

const normalizeData = (data, schema) => {
    const { id, name } = schema
    let obj = {}
    let ids = []
    if (Array.isArray(data)) {
        data.forEach(item => {
            obj[item[id]] = item
            ids.push(item[id])
        })
    } else {
        obj[data[id]] = data
        ids.push(data[id])
    }
    return {
        [name]: obj,
        ids
    }
}