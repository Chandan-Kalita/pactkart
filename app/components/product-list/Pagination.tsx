'use client'

import { selectPage, setPage } from "@/lib/features/filter/filterSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"

export const Paginations = () =>{
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(selectPage)
    const handlePageChange = (page:number)=>{
        dispatch(setPage(page))
    }
    return <>
    {[1, 2, 3,4].map(page => (
              <button
                key={page}
                className={`px-3 py-1 border rounded-lg ${currentPage == page ? 'bg-blue-500 text-white hover:bg-blue-600 transition-colors' : ''}`}
                onClick={()=>{handlePageChange(page)}}
              >
                {page}
              </button>
            ))}
    </>
}