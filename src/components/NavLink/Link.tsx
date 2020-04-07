import React, {useEffect, useRef} from 'react'
import quicklink from 'quicklink'
import 'intersection-observer'

interface Props {
	href: string,
	className?: string,
	style?: React.CSSProperties
	prefetch?: boolean,
	params?: object,
	target?: '_blank' | '_self' | '_parent' | '_top',
	children: React.ReactNode
}

const stringQuery = (href: string, params: object | undefined) => {
	let query = ''

	if (params) {
		Object.keys(params).forEach((item) => {
			query += `${query ? '&' : ''}${item}=${(params as any)[item]}`
		})
	}
	return query ? href + '?' + query : href
}

export default function Link (props: Props) {
	const {
		href,
		prefetch,
		params,
		target = '',
		style,
		className,
		children
	} = props
	const url = stringQuery(href, params)
	const ref = useRef<HTMLAnchorElement>(null)

	useEffect(() => {
		if (url && prefetch) {
			ref.current &&
				quicklink({
					el: ref.current,
					urls: [url]
				})
		}
	}, [url, prefetch])

	return (
		<a {...{style, className}} ref={ref} href={url} target={target}>{children}</a>
	)
}