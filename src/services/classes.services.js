import axios from "axios";
import { serverEndpoint } from "src/utilities/serverEndpoint";

export const getTeacherBusyTime = async (id) => {
    //this only get teacher time for classes
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/bookclass/getBusyTimeOfTeacher/${id}`)
        return { status, data }
    } catch (error) {
        return error
    }
}

export const studentBookClass = async (idStudent, idTeacher, startTime, endTime) => {
    try {
        const { status } = await axios.post(serverEndpoint + `/api/v1/bookclass`, {
            idStudent, idTeacher, startTime, endTime
        })
        return status
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllClassesStudent = async (id) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/bookclass/getAllClass/student/${id}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllClassesTeacher = async (id) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/bookclass/getAllClass/teacher/${id}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const saveClassReport = async (report) => {
    try {
        const { status, data } = await axios.post(serverEndpoint + `/api/v1/class-report/save`, report)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllClassReport = async () => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/class-report/getAll`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getOneClassReport = async (classId) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/class-report/get-class-report/${classId}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateClassReport = async (updatedReport, reportId) => {
    try {
        const { status, data } = await axios.put(serverEndpoint + `/api/v1/class-report/update/${reportId}`, updatedReport)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateClassStatus = async (classId, classStatus) => {
    try {
        const { status, data } = await axios.put(serverEndpoint + `/api/v1/bookclass/updatestatus/${classId}`,classStatus)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}