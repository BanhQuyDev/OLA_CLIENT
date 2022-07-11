import axios from "axios";
import { serverEndpoint } from "src/utilities/serverEndpoint";

export const getTop10RegisteredCourses = async (id) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/course/top10course/rating`)
        return { status, data }
    } catch (error) {
        return error
    }
}

export const getRatioMembership = async (type) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/student/membership/getInfoBetweenTypeAndAll?type=${type}`)
        return { status, data }
    } catch (error) {
        return error
    }
}