const prod = {
    APIUrl: 'https://dnd.oneroomgaming.com/api',
    dndAPI: 'https://dnd.oneroomgaming.com/api/dndAPI'
}

const staging = {
    APIUrl: 'https://staging.dnd.oneroomgaming.com/api',
    dndAPI: 'https://staging.dnd.oneroomgaming.com/api/dndAPI'
}

const dev = {
    APIUrl: 'http://192.168.0.54:5000',
    dndAPI: 'http://192.168.0.54:5000/dndAPI'
}

exports.config = () => {
    if(process.env.REACT_APP_ENV === 'development') return dev
    else if (process.env.REACT_APP_ENV === 'staging') return staging
    else if (process.env.REACT_APP_ENV === 'production') return prod
    return null
}