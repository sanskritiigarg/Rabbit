import React from 'react'
import { useSearchParams } from 'react-router'

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleSortChange = (e) => {
    const sortBy = e.target.value
    searchParams.set('sortBy', sortBy)
    setSearchParams(searchParams)
  }

  return (
    <div>
      <div className='mb-4 lg:flex items-center justify-end hidden'>
        <select id="sort" onChange={handleSortChange} value={searchParams.get('sortBy') || ''} className='border p-2 rounded-md focus:outline-none'>
          <option disabled value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      <div className='lg:hidden flex flex-col border-t-1 px-4'>
        <button onClick={handleSortChange} value="priceAsc" className='w-full p-2 text-xl border-b-1 border-gray-300'>Price: Low to High</button>
        <button onClick={handleSortChange} value="priceDesc" className='w-full p-2 text-xl border-b-1 border-gray-300'>Price: High to Low</button>
        <button onClick={handleSortChange} value="popularity" className='w-full p-2 text-xl'>Popularity</button>
      </div>
    </div>
  )
}

export default SortOptions