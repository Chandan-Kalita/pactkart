'use client'
import { loadInitialProducts, searchProduct, selectProducts, selectSuggestions, selectLoading } from "@/lib/features/product/productSearchSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback, useEffect, useState } from "react";
import debounce from 'lodash.debounce';
import ProductGrid from "../components/search-page/ProductGrid";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const products = useAppSelector(selectProducts);
    const suggestions = useAppSelector(selectSuggestions);
    const isLoading = useAppSelector(selectLoading)
    const dispatch = useAppDispatch();
    const debouncedSearch = useCallback(
        debounce(async (term: string, dispatch) => {
            if (term.trim() === '') {
                dispatch(loadInitialProducts());
            } else {
                await Promise.all([
                    dispatch(searchProduct(term)),
                ]);
            }
        }, 300),
        []
    );

    useEffect(() => {
        debouncedSearch(searchTerm, dispatch);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm, debouncedSearch]);


    // Handle search input focus
    const handleFocus = () => {
        setShowSuggestions(true);
    };

    // Handle clicking outside of search area
    const handleClickOutside = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion);
        setShowSuggestions(false);
    };




    return <>
        <div className="w-[500px] mb-5">
            <input
                placeholder="Search products by title...."
                className="border-b-2 border-gray-300 focus:border-black focus:outline-none relative"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleClickOutside}
            />
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 bg-white shadow-lg mt-1">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center  border-b-2 border-gray-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <span className="mr-2">🔍</span>
                            <span>{suggestion}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <ProductGrid isLoading={isLoading} products={products} />


    </>
}

export default SearchPage;