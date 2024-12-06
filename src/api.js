//hämtar API-nyckel
export const getApiKey = async (apiType, endpoint) => {
    const url = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com" + endpoint
    const options = {
        method: apiType
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Fel vid hämtning av nyckel: ${response.statusText}`)
        }
        const data = await response.json()
        return data.key
    } 

    catch (error) {
        throw error
    }
}

//hämtar information från API:n med hjälp av nyckeln
export const getAllPlanets = async (apiType, endpoint, key) => {
    const url = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com" + endpoint
    const options = {
        method: apiType,
        headers: {
            "x-zocom": key
        }
    }
    //console.log(key)// visar att det är en ny nyckel som genereras vid siduppdatering
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`Fel vid hämtning av planetdata: ${errorData.message || response.statusText}`)
        }
        return await response.json()
    } 
    catch (error) {
        throw error
    }
}



