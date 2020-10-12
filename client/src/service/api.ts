import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000'
})

export async function createUser(name: string) {
    const user = await api.post('/user')
    return user
}