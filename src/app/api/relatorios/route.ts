import { NextRequest, NextResponse } from 'next/server'
import relatorios from '../action/relatorios'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  try {
    const data = await relatorios.relatorios(2, page, limit)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro na API de relatórios:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
} 