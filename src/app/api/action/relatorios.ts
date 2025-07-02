import { api } from "@/lib/api"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/nextAuth"

const relatorios = async (id: number, page: number = 1, limit: number = 10) => {

    const session = await getServerSession(authOptions)
    const new_id = session?.user.id

    
    const response = await api.get(`/rel_consulta_resumido/${new_id}?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    
    return response.data
}

const cardRelatorio = async (id: number) => {
    const session = await getServerSession(authOptions)
    const new_id = session?.user.id
    const response = await api.get(`/rel_consulta_resumido/${new_id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    return response.data.soma_total
}


const cardRelatorioMes = async (id: number) => {

    const session = await getServerSession(authOptions)
    const new_id = session?.user.id
    const response = await api.get(`/rel_consulta_resumido/${new_id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    return response.data.total_mes
}

const cardRelatorioDia = async (id: number) => {
    const session = await getServerSession(authOptions)
    const new_id = session?.user.id

    const response = await api.get(`/rel_consulta_resumido/${new_id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    return response.data.soma_dia
}

export default { relatorios, cardRelatorio, cardRelatorioMes , cardRelatorioDia}