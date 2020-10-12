import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000'
})

export async function signUpUserService(name: string) {
    const user = await api.post<string>('/user', { name })
    return user
}

export async function getAllUsers() {
    const users = await api.get<string[]>('/user')
    return users.data
}

export async function saveUserSubscription(user:string, subscription: PushSubscription) {
    await api.post('/notification', { subscription, user })
}