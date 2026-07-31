// src/components/PaginationComponent.tsx
'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'

interface PaginationComponentProps {
  /** 当前页码 */
  currentPage: number
  /** 总页数 */
  totalPages: number
}

export function PaginationComponent({
  currentPage,
  totalPages,
}: PaginationComponentProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  // 在客户端生成 URL
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (pageNumber > 1) {
      params.set('page', pageNumber.toString())
    } else {
      params.delete('page')
    }
    return `${pathname}?${params.toString()}`
  }

  // 生成页码数组
  const generatePaginationItems = () => {
    const items: number[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) items.push(i)
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) items.push(i)
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) items.push(i)
      }
    }
    return items
  }

  const pageItems = generatePaginationItems()

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          {/* 上一页 */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={createPageURL(currentPage - 1)} />
            </PaginationItem>
          )}

          {/* 页码 */}
          {pageItems.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={createPageURL(pageNum)}
                isActive={pageNum === currentPage}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* 下一页 */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={createPageURL(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}