import React, { useCallback, useRef, useEffect } from 'react'
import { ContainerLoader } from '../Loader'
import quicklink from 'quicklink'
import 'intersection-observer'

interface BaseProps {
	style?: React.CSSProperties,
	className?: string,
	loading?: boolean,
	children?: React.ReactChild
}

interface AnchorButtonProps extends BaseProps {
	type?: 'link',
	href: string,
	target?: '_blank' | 'self',
	prefetch?: boolean,
	onClick?: React.MouseEventHandler<HTMLElement>
}

interface NativeButtonProps extends BaseProps {
	htmlType?: 'submit' | 'button' | 'reset',
	onClick?: React.MouseEventHandler<HTMLElement>
}

type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>

export default function Button (props: ButtonProps) {
	const {
		type,
		style, 
		className, 
		loading = false, 
		children = null, 
		href, 
		target, 
		onClick, 
		htmlType,
		prefetch,
	} = props

	const ref = useRef<HTMLAnchorElement>(null)

	useEffect(() => {
		if (type === 'link' && href && prefetch) {
			ref.current &&
				quicklink({
					el: ref.current,
					urls: [href]
				})
		}
	}, [type, href, prefetch])

	const handleClick: React.MouseEventHandler<HTMLElement | HTMLAnchorElement> = useCallback((e) => {
		if (loading) return

		onClick && onClick(e)
	}, [loading, onClick])
	
	if (type === 'link' && href) {
		const anchorProps = { style, className, href, target}
		
		return (
			<a 
				{...anchorProps} 
				onClick={handleClick}
				ref={ref}
			>
				{
					loading 
					? <ContainerLoader>{children}</ContainerLoader> 
					: children
				}
			</a>
		)
	}

	const buttonProps = { style, className }

	return (
		<button 
			{...buttonProps}
			onClick={handleClick}
			type={htmlType}
		>
			{
				loading
					? <ContainerLoader>{children}</ContainerLoader>
					: children
			}
		</button>
	)
}