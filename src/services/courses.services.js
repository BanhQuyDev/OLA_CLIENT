import axios from "axios";
import { serverEndpoint } from "src/utilities/serverEndpoint";

export const getMultipleUnitPresignedUrls = async (names, type) => {
    const { data } = await axios.post(serverEndpoint + '/api/v1/upload/units', {
        fileNames: names,
        type: type
    })
    return data
}

export const uploadMultipleUnitPresignedUrls = async (files, urls, type) => {
    try {
        if (files.length > 0 && files.length === urls.length) {
            const contentType = type === 'video'
                ? 'video/mp4'
                : (type === 'pdf'
                    ? 'application/pdf' : 'image/jpeg'
                )
            let putRequests = []
            files.forEach((file, index) => {
                const request = fetch(urls[index], {
                    method: 'PUT',
                    headers: {
                        "Content-Type": contentType
                    },
                    body: file,
                })
                putRequests.push(request)
            })
            console.log(putRequests)
            let statuses
            const statusesPromise = Promise.allSettled(putRequests)
            statuses = await statusesPromise
            return statuses
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const createCourseSection = async (newCourse) => {
    try {
        const { data } = await axios.post(serverEndpoint + '/api/v1/course/create', newCourse)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getUpdateCourseSection = async (courseId) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/course/${courseId}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateCourseSection = async (updatedCourse, courseId) => {
    try {
        const { data } = await axios.put(serverEndpoint + `/api/v1/course/update/${courseId}`, updatedCourse)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const addNewUnitToDB = async (newUnit, courseId) => {
    try {
        const { data } = await axios.post(serverEndpoint + '/api/v1/unit/create', {
            newUnit,
            id_course: courseId,
        })
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updatedUnitInCourse = async (updatedUnit, unitId) => {
    try {
        const { status, data } = await axios.put(serverEndpoint + `/api/v1/unit/update/${unitId}`, updatedUnit)
        return {status, data}
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteUnit = async (deletedUnitId) => {
    try {
        const { status, data } = await axios.delete(serverEndpoint + `/api/v1/unit/${deletedUnitId}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getTop3Courses = async () => {
    try {
        const { data } = await axios.get(serverEndpoint + '/api/v1/course/top3course')
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getTop3CoursesWithType = async (type) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/course/top3courseeachtype?type=${type}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllCourseShort = async () => {
    try {
        const { data } = await axios.get(serverEndpoint + '/api/v1/course/short-info')
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllCourse = async () => {
    try {
        const { data } = await axios.get(serverEndpoint + '/api/v1/course')
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getCourseDetail = async (id) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/course/${id}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getCourseFeedback = async (id) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/feedback/course/${id}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

//this is the same with the one above
export const getCourseReviews = async (id) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/feedback/course/${id}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getCourseTeacher = async (id) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/course/getInfoInternal?id_course=${id}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const searchCourseQuery = async (query) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/course/getcoursequery${query}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllCoursesStudent = async (id) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/register/getAllCourse?studentID=${id}`)
        return {status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const createUnitWhenUpdateCourse = async (newUnit, id_course) => {
    try {
        const { status, data } = await axios.post(serverEndpoint + '/api/v1/unit/createwhenupdate', {
            newUnit,
            id_course: id_course,
        })
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getOneCoursePath = async (pathId) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/suggest/${pathId}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllCoursePath = async () => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/suggest/getAll`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteOneCourse = async (courseId) => {
    try {
        const { status, data } = await axios.delete(serverEndpoint + `/api/v1/course/${courseId}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

