'use client'

import { ISearchFormData } from "@/lib/config/model";
import { useGetCategoriesQuery } from "@/lib/features/category/categoryApiSlice";
import {  IFilterSliceState, selectCategory, selectPage, selectPriceMax, selectPriceMin, selectSearchText, setFilters } from "@/lib/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Sidebar() {
  const pageNo = useAppSelector(selectPage)

  const stateCategory = useAppSelector(selectCategory)
  const statePriceMin = useAppSelector(selectPriceMin)
  const statePriceMax = useAppSelector(selectPriceMax)
  const stateSearchText = useAppSelector(selectSearchText)

  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ISearchFormData>();
  const queries = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  useEffect(()=>{
    if(stateCategory>0){
      queries.set('category',stateCategory.toString())
    }else{
      queries.delete('category')
    }
    if(statePriceMax>0 && statePriceMax > statePriceMin && statePriceMin > 0){
      queries.set('priceMax',statePriceMax.toString())
      queries.set('priceMin',statePriceMin.toString())
    }else{
      queries.delete("priceMax")
      queries.delete("priceMin")
    }
    if(stateSearchText != ""){
      queries.set('searchText',stateSearchText)
    }else{
      queries.delete('searchText')
    }
    queries.set('page', pageNo.toString())

    router.push(`?${queries.toString()}`)

  },[stateCategory, statePriceMax, statePriceMin, stateSearchText, pageNo])

  useEffect(()=>{
    const initialState:IFilterSliceState = {
      searchText : queries.get('searchText') ?? '',
      priceMax: Number(queries.get('priceMax')) ?? 0,
      priceMin: Number(queries.get('priceMin')) ?? 0,
      category: Number(queries.get('category')) ?? 0,
      page: Number(queries.get('page')) ?? 1
    }
    dispatch(setFilters(initialState))    
  },[])

  const result = useGetCategoriesQuery();
  const { isLoading, isError, data: categories } = result
  const onSearch: SubmitHandler<ISearchFormData>=(data)=>{

    dispatch(setFilters({searchText:data.searchText, priceMax:Number(data.priceMax), priceMin:Number(data.priceMin), category:Number(data.category), page:1}))
    console.log({data});
  }
  return (
    <aside className="w-full h-[100%] md:w-64 bg-white rounded-lg shadow-sm p-4">
      <form onSubmit={handleSubmit(onSearch)}>
        <div className="mb-6">
          <input
            type="text"
            defaultValue={stateSearchText}
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
                      defaultChecked={stateCategory === category.id}
                      // onChange={() => setSelectedCategory(category)}
                      className="form-radio"
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
            defaultValue={statePriceMin}
            className="w-full p-2 border rounded-lg"
            {...register("priceMin")}
          />
          <input
            type="number"
            placeholder="Price to"
            defaultValue={statePriceMax}
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