// components/Pagination.tsx
'use client'

import { useFilterState } from "@/lib/hooks/useFilterState"


export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const { filters, updateFilters } = useFilterState()
  
  const handlePageChange = (page: number) => {
    updateFilters({ page })
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          className={`px-3 py-1 border rounded-lg ${
            filters.page === page ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}