import React, { useEffect, useRef, useState } from 'react'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import {Link} from 'react-router-dom'

const NewArrivals = () => {
    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(true)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const newArrivals = [
        {
            _id: "1",
            name: 'Stylish Jacket',
            price: 120,
            images: [
                {
                    url: 'https://picsum.photos/500/500?random=1',
                    altText: "Stylish Jacket"
                },
            ],
        },
        {
            _id: "2",
            name: 'Stylish Jacket',
            price: 120,
            images: [
                {
                    url: 'https://picsum.photos/500/500?random=2',
                    altText: "Stylish Jacket"
                },
            ],
        },
        {
            _id: "3",
            name: 'Stylish Jacket',
            price: 120,
            images: [
                {
                    url: 'https://picsum.photos/500/500?random=3',
                    altText: "Stylish Jacket"
                },
            ],
        },
        {
            _id: "4",
            name: 'Stylish Jacket',
            price: 120,
            images: [
                {
                    url: 'https://picsum.photos/500/500?random=4',
                    altText: "Stylish Jacket"
                },
            ],
        },
        {
            _id: "5",
            name: 'Stylish Jacket',
            price: 120,
            images: [
                {
                    url: 'https://picsum.photos/500/500?random=5',
                    altText: "Stylish Jacket"
                },
            ],
        },
        {
            _id: "6",
            name: 'Stylish Jacket',
            price: 120,
            images: [
                {
                    url: 'https://picsum.photos/500/500?random=6',
                    altText: "Stylish Jacket"
                },
            ],
        },
        {
            _id: "7",
            name: 'Stylish Jacket',
            price: 120,
            images: [
                {
                    url: 'https://picsum.photos/500/500?random=7',
                    altText: "Stylish Jacket"
                },
            ],
        },
    ]

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollRef.current.offsetLeft)
        setScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if(!isDragging) return
        const x = e.pageX - scrollRef.current.offsetLeft
        const walk = x- startX
        scrollRef.current.scrollLeft = scrollLeft - walk

    }

    const handleMouseUpOrLeave = () => {
        setIsDragging(false)
    }

    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -300 : 300
        scrollRef.current.scrollBy({left: scrollAmount, behavior: 'smooth'})
    }

    const updateScrollButtons = () => {
        const container = scrollRef.current
        
        if (container) {
            const leftScroll = container.scrollLeft
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth

            setCanScrollLeft(leftScroll > 0)
            setCanScrollRight(rightScrollable)
        }
        
    }

    useEffect(() => {
        const container = scrollRef.current
        if (container) {
            container.addEventListener('scroll', updateScrollButtons)
            updateScrollButtons()
            return () => container.removeEventListener('scroll', updateScrollButtons)
        }
    },[])
    
  return (
    <section>
        <div className='container mx-auto text-center mb-10 relative'>
            <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
            <p className='text-lg text-gray-600 mb-8'>Discover the latest styles straight off the runway, freshly added to keep your wadrobe on the cutting edge of trendiness.</p>

            {/*scroll icons */}
            <div className='absolute right-2 hidden sm:flex top-0  space-x-2'>
                <button onClick={() => scroll('left')} disabled={!canScrollLeft} className={`p-1 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FiChevronLeft className='text-2xl'/>
                </button>
                <button onClick={() => scroll('right')} disabled={!canScrollRight} className={`p-1 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FiChevronRight className='text-2xl'/>
                </button>
            </div>

            {/*Scrollable content */}
            <div ref={scrollRef} className={`container mx-auto px-4 overflow-x-scroll flex space-x-6 relative ${isDragging ? "cursor-grabbing" : 'cursor-grab'}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}>
                {newArrivals.map((product) => (
                    <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img draggable={false} src={product.images[0]?.url} alt={product.images[0]?.altText || product.name} className='w-full h-[400px] object-cover rounded-lg'/>
                        <div className='absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg opacity-50'>
                            <Link to={`product/${product._id}`} className='block'>
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default NewArrivals