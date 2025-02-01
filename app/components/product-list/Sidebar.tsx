'use client'

import { useGetCategoriesQuery } from "@/lib/features/category/categoryApiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useFilterState } from "@/lib/hooks/useFilterState";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Sidebar() {
  const { filters, updateFilters } = useFilterState()
  const { register, handleSubmit } = useForm({
    defaultValues: filters // Initialize form with current URL values
  })

  const { data: categories, isLoading, isError } = useGetCategoriesQuery()

  const onSearch = (data:any) => {
    updateFilters({
      ...data,
      page: 1 // Reset to first page on new search
    })
  }
  return (
    <aside className="w-full h-[100%] md:w-64 bg-white rounded-lg shadow-sm p-4">
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded-lg mb-4"
            {...register("searchText")}
          />

          <div className="space-y-2">
            {
              isLoading ? (
                <h1>Loading...</h1>
              ) : isError ? (
                <h1>Error fetching categories.</h1>
              ) : categories ? (
                categories.map(category => (
                  <label key={category.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className="form-radio"
                      defaultChecked={filters.category === category.id}
                      value={category.id}
                      {...register("category")}
                    />
                    <span>{category.name}</span>
                  </label>
                ))
              ) : <></>
            }
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <input
            type="number"
            placeholder="Price from"
            className="w-full p-2 border rounded-lg"
            {...register("priceMin")}
          />
          <input
            type="number"
            placeholder="Price to"
            className="w-full p-2 border rounded-lg"
            {...register("priceMax")}
          />
        </div>
        <div className="">
          <button type="submit" className=" w-full py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            Apply filter
          </button>
        </div>
      </form>
    </aside>
  )
}