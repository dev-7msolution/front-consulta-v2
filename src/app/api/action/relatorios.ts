import { api } from "@/lib/api"
import { getServerSession } from "next-auth"

const relatorios = async (id: number) => {

    const session = await getServerSession()
    console.log(session)
    
    const response = await api.get(`/rel_consulta_resumido/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    console.log(response.data.resultado)
    return response.data.resultado
}

const cardRelatorio = async (id: number) => {
    const session = await getServerSession()
    const response = await api.get(`/rel_consulta_resumido/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    return response.data.resultado
}

export default { relatorios, cardRelatorio }