import React, {useEffect, useRef} from 'react'
import Swiper, { SwiperOptions, PaginationOptions } from 'swiper'
import cn from 'classnames'
import 'swiper/css/swiper.min.css'

export interface Props {
  swiperOptions?: {
    // 每行多少个，可以小数，小数不可 loop
    slidesPerView?: number | 'auto',
    // 有多少行，多行不能 loop
    slidesPerColumn?: number
    freeMode?: boolean // 每个 view 是否有停顿
    loop?: boolean // 循环
    slidesPerGroup?: number // 多少个 view 为一组
  },
  showPagination?: boolean,
  paginationOptions?: {
    type?: PaginationOptions['type']
    renderProgressbar?: PaginationOptions['renderProgressbar']
    renderBullet?: PaginationOptions['renderBullet']
  },
  showScrollbar?: boolean,
  swiperContainerCls?: string,
  swiperSlideCls?: string,
  swiperScrollbarCls?: string
  children: React.ReactElement[]
}

export default (props: Props) => {
  const { 
    swiperOptions, 
    showPagination,
    paginationOptions,
    showScrollbar,
    swiperSlideCls, 
    swiperContainerCls, 
    swiperScrollbarCls,
    children 
  } = props
  const wrap = useRef(null)
  const pagination = useRef(null)
  const scrollbar = useRef(null)
  
  useEffect(() => {
    let swiper: Swiper
    let options: SwiperOptions = {...swiperOptions}

    if (showPagination) {
      options = {
        ...swiperOptions,
        pagination: {
          el: pagination.current as any,
          ...paginationOptions
        },
      }
    }

    if (showScrollbar) {
      options = {
        ...swiperOptions,
        scrollbar: {
          el: scrollbar.current as any,
          dragSize: 15
        },
      }
    }
    
    import('swiper').then(({ default: Swiper }) => {
      swiper = new Swiper(wrap.current as any, options)
    })

    return () => swiper && swiper.destroy(true, true)
  }, [children])

  const Slides = Array.isArray(children) 
    ? children.map((i, index) => (
      <div className={cn(swiperSlideCls, "swiper-slide")} 
        key={'swiper-slide' + index}>
        {i}
      </div>
    ))
    : <div className={cn(swiperSlideCls, "swiper-slide")}>
      {children}
    </div>

  return (
    <div>
      <div ref={wrap} className={cn(swiperContainerCls, "swiper-container")}>
        <div className="swiper-wrapper">
          {Slides}
        </div>

        {
          showPagination &&
          <div ref={pagination} className="swiper-pagination" />
        }
        {
          showScrollbar &&
          <div ref={scrollbar} className={cn("swiper-scrollbar", swiperScrollbarCls)} style={{
            height: '2px',
            transform: 'translate3d(-50%, 0, 0)',
            left: '50%',
            width: '30px'
          }} />
        }
      </div>
    </div>
  )
}