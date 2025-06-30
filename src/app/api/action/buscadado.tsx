'use server'

import { api } from "@/lib/api"
import {  getServerSession } from "next-auth";
import { authOptions } from "../lib/nextAuth";


const buscadadoapi = async (cpf?: string, nome?: string, celular?: string) => {

    try {
        const session = await getServerSession(authOptions)
        console.log(cpf, nome, celular)
        console.log(session?.user)
         console.log( '>>>>>>>>>>>>>> user id ')
       
        const token = session?.accessToken
        const response = await api.post('/buscacliente', {
            cpf: cpf || '',
            nome: nome || '',
            celular: celular || '',
            id_user: session?.user?.id || '',
        }, {
            headers: {
                'Authorization': `Token ${token}`,

            },
        });
    
       console.log(response.data.busca)
        return response.data.busca;
        
    } catch (error) {
        console.log(error)
        return error;
    }

}

export {  buscadadoapi };