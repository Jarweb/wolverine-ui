import React, { useCallback, useEffect, useRef } from 'react'
import 'intersection-observer'
import raf from 'raf'

interface Props {
	src: string,
	alt?: string,
	className?: string,
	https?: boolean,
	lazy?: boolean,
	cdnSize?: string,
	onClick?: (e: EventTarget, src: string) => void
}

const formatHttps = (url: string) => {
	return url.replace('http://', 'https://')
}

const resizeCDN = (url: string, cdnSize: string) => {
	const arr = url.split('.')
	arr.splice(-1, 0, cdnSize)
	return arr.join('.')
}

const useImage = (props: Props) => {
	const {src = '', lazy, onClick, https, cdnSize, alt = ''} = props
	const ref = useRef<HTMLImageElement>(null)

	let pic = https ? formatHttps(src) : src
	pic = cdnSize ? resizeCDN(pic, cdnSize) : pic

	const handleClick = useCallback((e) => {
		onClick && onClick(e, pic)
	}, [onClick, pic])

	const asyncLoad = useCallback(() => {
		const img = new Image()
		img.decoding = 'async'
		img.src = pic
		img.alt = alt
		img.decode()
		.then(() => {
			const rafId = raf(() => {
				cancelAnimationFrame(rafId)
				ref.current && ref.current.appendChild(img)
			})
		})
		.catch(err => {
			ref.current && ref.current.appendChild(img)
		})
	}, [alt, pic])

	useEffect(() => {
		if (lazy) {
			const o = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						asyncLoad()
						ref.current && o.unobserve(ref.current)
					}
				})
			}, {
				rootMargin: '0 100px',
				threshold: 0.1
			})
			ref.current && o.observe(ref.current)
		
			return () => {
				o.disconnect()
			}
		}
		else {
			asyncLoad()
		}
	}, [lazy, pic, alt, asyncLoad])

	return {
		ref: ref,
		src: pic,
		handleClick,
	}
}

export default function Picture(props: Props) {
	const { className = '' } = props
	const { ref, handleClick } = useImage(props)

	return (
		<div 
			className={className}
			onClick={handleClick} 
			ref={ref} 
		/>
	)
}