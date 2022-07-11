import axios from "axios";
import { serverEndpoint } from "src/utilities/serverEndpoint";

export const userChangePassword = async (userId, currentPassword, newPassword) => {
    try {
        // incorrect url when coding, url is student yet it is actually all users
        const { data, status } = await axios.put(serverEndpoint + `/api/v1/student/changepassword/${userId}`, {
            currentPassword,
            newPassword
        })
        return { data, status }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllTeachersType = async (type) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/teacher/getallowtypeteach?type=${type}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllTeachersInternal = async () => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/teacher/getallinternalteacher`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllTeachersExternal = async () => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/teacher/getallexternalteacher`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllFeedbackTeacher = async (teacherId) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/feedback/teacher/${teacherId}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getUserInfo = async (teacherId) => {
    try {
        const { data } = await axios.get(serverEndpoint + `/api/v1/feedback/teacher/${teacherId}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const checkStudentRegisterCourseStatus = async (studentId, courseId) => {
    try {
        //this data from BE is a little bit funny, it could be isReg, or it could contain isReg (check BE), fix if have time
        const { data } = await axios.get(serverEndpoint + `/api/v1/register/status?studentID=${studentId}&courseID=${courseId}`)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const studentRegisterCourse = async (studentId, courseId) => {
    try {
        const { status, data } = await axios.post(serverEndpoint + `/api/v1/register`, {
            id_student: studentId,
            id_course: courseId,
            status: 'unfinished'
        })
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const studentUnRegisterCourse = async (studentId, courseId) => {
    try {
        const { status } = await axios.delete(serverEndpoint + `/api/v1/register/cancel?studentID=${studentId}&courseID=${courseId}`)
        return status
    } catch (error) {
        console.log(error)
        return error
    }
}

export const studentFinishUnit = async (unitDone, courseID, studentID, isLasted) => {
    try {
        const { status, data } = await axios.post(serverEndpoint + `/api/v1/checklog`, {
            unitDone, courseID, studentID, isLasted
        })
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getStudentFinishedUnit = async (courseID, studentID) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/checklog?courseID=${courseID}&studentID=${studentID}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getUserProfile = async (userId) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getStudentMembership = async (studentId) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/student/membership-check/${studentId}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllStudents = async () => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/student`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllTeachers = async () => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/teacher/getallteacher`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getAllAdmins = async () => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/admin/getAll`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getDetailStudent = async (id) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/student/${id}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getDetailTeacher = async (id) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/teacher/${id}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getDetailAdmin = async (id) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/admin/${id}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}


export const updateUserProfile = async (id, type, updatedProfile) => {
    try {
        const { status, data } = await axios.put(serverEndpoint + `/api/v1/${type}/${id}`, updatedProfile)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const createNewUser = async (role, newProfile) => {
    try {
        const { status, data } = await axios.post(serverEndpoint + `/api/v1/${role}`, newProfile)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getUserNotification = async (userId) => {
    try {
        const { status, data } = await axios.get(serverEndpoint + `/api/v1/notification/${userId}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const sendNotificationToUser = async (userID, content) => {
    try {
        const { status, data } = await axios.post(serverEndpoint + `/api/v1/notification`, { content, userID })
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}


export const updateNotificationStatus = async (notificationId) => {
    try {
        const { status, data } = await axios.put(serverEndpoint + `/api/v1/notification//update-status/${notificationId}`)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const actionDisableUser = async (userId, type, teacherType) => {
    let url
    if (type === 'admin') {
        url = `/api/v1/admin/${userId}`
    } else {
        url = `/api/v1/teacher/${teacherType}/${userId}`
    }
    try {
        const { status, data } = await axios.delete(serverEndpoint + url)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const actionActivateUser = async (userId, type) => {
    let url
    if (type === 'admin') {
        url = `/api/v1/admin/active/${userId}`
    } else {
        url = `/api/v1/teacher/active/${userId}`
    }
    try {
        const { status, data } = await axios.put(serverEndpoint + url)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const registerNewUser = async (user) => {
    try {
        const { status, data } = await axios.post(serverEndpoint + `/api/v1/student/register`, user)
        return { status, data }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateUserAvatar = async (id, urlImage) => {
    try {
        const { status } = await axios.put(serverEndpoint + `/api/v1/user/update-image/${id}`, { urlImage })
        return { status }
    } catch (error) {
        console.log(error)
        return error
    }
}