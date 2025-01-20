import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

// create data API
export const createDataAPI = async (data) => {
    return await commonAPI("POST",SERVERURL, data)
}

// get data API
export const getDataAPI = async () => {
    return await commonAPI("GET", SERVERURL, "")
}

// update data API
export const updateDataAPI = async (data) => {
    return await commonAPI("PUT", `${SERVERURL}/${data.id}`, data)
}

// delete data API
export const deleteDataAPI = async (id) => {
    return await commonAPI("DELETE", `${SERVERURL}/${id}`, {})
}