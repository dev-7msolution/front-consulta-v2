'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

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

  return (
    <>
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Página {page} de {last_page}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Linhas por página</p>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              router.push(createPageURL({ limit: value, page: 1 }))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={`${limit}`} />
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
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => router.push(createPageURL({ page: page - 1 }))}
            disabled={page <= 1}
          >
            <span className="sr-only">Go to previous page</span>
            {"<"}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => router.push(createPageURL({ page: page + 1 }))}
            disabled={page >= last_page}
          >
            <span className="sr-only">Go to next page</span>
            {">"}
          </Button>
        </div>
      </div>
    </div>
    </>
  )
} 