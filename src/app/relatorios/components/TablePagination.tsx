'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal,
  Rows3
} from "lucide-react"

interface TablePaginationProps {
  page: number
  last_page: number
  limit: number
}

export function TablePagination({
  page,
  last_page,
  limit,
}: TablePaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (params: { [key: string]: string | number }) => {
    const newSearchParams = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(params)) {
      newSearchParams.set(key, String(value))
    }
    return `${pathname}?${newSearchParams.toString()}`
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (last_page <= maxVisible) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i)
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(last_page)
      } else if (page >= last_page - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = last_page - 3; i <= last_page; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(last_page)
      }
    }
    
    return pages
  }

  const startItem = (page - 1) * limit + 1
  const endItem = Math.min(page * limit, last_page * limit)
  const totalItems = last_page * limit

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Info e Rows per page */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {startItem}-{endItem} de {totalItems}
          </Badge>
          <span>resultados</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Rows3 className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium">Linhas por página:</span>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              router.push(createPageURL({ limit: value, page: 1 }))
            }}
          >
            <SelectTrigger className="h-8 w-16 border-gray-300 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* First Page */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
          onClick={() => router.push(createPageURL({ page: 1 }))}
          disabled={page <= 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous Page */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
          onClick={() => router.push(createPageURL({ page: page - 1 }))}
          disabled={page <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum, index) => (
            <div key={index}>
              {pageNum === '...' ? (
                <div className="flex h-8 w-8 items-center justify-center">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </div>
              ) : (
                <Button
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  className={`h-8 w-8 p-0 ${
                    pageNum === page 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  onClick={() => router.push(createPageURL({ page: pageNum }))}
                >
                  {pageNum}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next Page */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
          onClick={() => router.push(createPageURL({ page: page + 1 }))}
          disabled={page >= last_page}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
          onClick={() => router.push(createPageURL({ page: last_page }))}
          disabled={page >= last_page}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 