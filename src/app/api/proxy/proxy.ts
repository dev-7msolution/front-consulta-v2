// pages/api/datastone.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.request({
      method: req.method,
      url: `https://api.datastone.com.br/v1`, // você pode adicionar paths se quiser, tipo /clientes etc
      headers: {
        'Authorization': req.headers.authorization || '', // ou insira direto o token aqui
        'Content-Type': 'application/json',
      },
      data: req.body, // só será usado em POST/PUT
    })

    res.status(response.status).json(response.data)
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      message: 'Erro ao acessar a API da DataStone',
      error: error.message,
      detalhes: error.response?.data || null,
    })
  }
}
