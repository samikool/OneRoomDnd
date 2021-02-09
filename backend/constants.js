const prod = {
    port: 5004,
    baseURL: "dnd.oneroomgaming.com",
    dndURL: 'https://dnd5eapi.co',
}

const staging = {
    port: 5003,
    baseURL: "staging.dnd.oneroomgaming.com",
    dndURL: 'https://dnd5eapi.co',
}

const dev = {
    port: 5000,
    baseURL: "192.168.0.54:3000",
    dndURL: 'https://dnd5eapi.co',
}

exports.config = () => {
    if(process.env.NODE_ENV === 'development') return dev
    else if (process.env.NODE_ENV === 'staging') return staging
    else if (process.env.NODE_ENV === 'production') return prod
    return null
}