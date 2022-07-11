import axios from "axios";
import { serverEndpoint } from "src/utilities/serverEndpoint";

export const CreateOneCoursePath = async (newCoursePath) => {
    try {
        const { status, data } = await axios.post(serverEndpoint + `/api/v1/suggest/create`, newCoursePath)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateOneCoursePath = async (editedPath) => {
    try {
        const { status, data } = await axios.put(serverEndpoint + `/api/v1/suggest/updatePath`, editedPath)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}