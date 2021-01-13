import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000'
})

export async function signUpUserService(user: string) {
    const res = await api.post<{ id:number }>('/user', { user })
    return res.data.id
}

export async function getAllUsers() {
    const res = await api.get<{ id: number, user: string }[]>('/user')
    return res.data
}

export async function saveUserSubscription(userId: number, subscription: PushSubscriptionJSON) {
    await api.post(`/subscription/user/${userId} `, { subscription })
}

export async function sendNotification(userId: number, senderId: number) {
    await api.post(`/notification/user/${userId}`, { senderId })
}