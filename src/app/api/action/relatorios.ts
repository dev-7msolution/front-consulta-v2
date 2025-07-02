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
    // Handle case where soma_total might be an array or object
    const somaTotal = response.data.soma_total
    if (Array.isArray(somaTotal) && somaTotal.length > 0) {
        return somaTotal[0].total_geral || 0
    }
    return somaTotal || 0
}


const cardRelatorioMes = async (id: number) => {

    const session = await getServerSession(authOptions)
    const new_id = session?.user.id
    const response = await api.get(`/rel_consulta_resumido/${new_id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    // Handle case where total_mes might be an array or object
    const totalMes = response.data.total_mes
    if (Array.isArray(totalMes) && totalMes.length > 0) {
        return totalMes[0].mes || 0
    }
    return totalMes || 0
}

const cardRelatorioDia = async (id: number) => {
    const session = await getServerSession(authOptions)
    const new_id = session?.user.id

    const response = await api.get(`/rel_consulta_resumido/${new_id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    // Handle case where soma_dia might be an array or object
    const somaDia = response.data.soma_dia
    if (Array.isArray(somaDia) && somaDia.length > 0) {
        return somaDia[0].total || 0
    }
    return somaDia || 0
}

export default { relatorios, cardRelatorio, cardRelatorioMes , cardRelatorioDia}