import axios from "axios";
import { serverEndpoint } from "src/utilities/serverEndpoint";

export const loginFunction = async (userName,password) => {
    try {
        const { status, data } = await axios.post(serverEndpoint + `/api/v1/login`, {
            userName,
            password
        })
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}