'use client'

export default function Sidebar() {
  const categories = ['cat 1', 'cat 2', 'cat 3', 'cat 4'];

    return (
        <aside className="w-full h-[100%] md:w-64 bg-white rounded-lg shadow-sm p-4">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded-lg mb-4"
          />
          
          {/* Categories */}
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  // checked={selectedCategory === category}
                  // onChange={() => setSelectedCategory(category)}
                  className="form-radio"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2 mb-6">
          <input
            type="number"
            placeholder="Price from"
            // value={priceFrom}
            // onChange={(e) => setPriceFrom(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Price to"
            // value={priceTo}
            // onChange={(e) => setPriceTo(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="">
        <button className=" w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Apply filter
              </button>
        </div>
      </aside>
    )
}