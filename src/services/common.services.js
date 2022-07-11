import axios from "axios";
import { serverEndpoint } from "src/utilities/serverEndpoint";

export const sendFeedback = async (studentId, id, type, content, rating) => {
    try {
        const { data, status } = await axios.post(serverEndpoint + `/api/v1/feedback`, {
            id_student: studentId,
            id_course: type === 'course' ? id : null,
            id_teacher: type === 'teacher' ? id : null,
            content: content,
            rating: rating
        })
        return status
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteFeedback = async (feedbackId) => {
    try {
        const { data, status } = await axios.delete(serverEndpoint + `/api/v1/feedback/delete/${feedbackId}`)
        return { data, status }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateFeedback = async (feedbackId, content, rating) => {
    try {
        const { data, status } = await axios.put(serverEndpoint + `/api/v1/feedback/update/${feedbackId}`, {
            content, rating
        })
        return { data, status }
    } catch (error) {
        console.log(error)
        return error
    }
}

export const paymentMembership = async (line_items, idStudent, memberShip, classInWeek, validMembership) => {
    try {
        const { data, status } = await axios.post(serverEndpoint + `/api/v1/payment/create-checkout-session`, {
            line_items, idStudent, memberShip, classInWeek, validMembership
        })
        return { data, status }
    } catch (error) {
        console.log(error)
        return error
    }
}