import { useCallback, useEffect, useState } from 'react'

import useIsFirst from '@/hooks/useIsFirst'

import styles from './index.module.scss'
import { makeClassNameByModuleCSS } from '@/lib/moduleCSS-helper'

const { classname } = makeClassNameByModuleCSS( styles )

type props = {
  children?: React.ReactNode
  isRandomFontFamily?: boolean
  isRandomFontSize?: boolean
}

// eslint-disable-next-line
const isArray = (value: unknown): value is any[] | Iterable<any> => {
  return Array.isArray( value )
}
const fontList = ['dongle', 'brush', 'pen', 'notosanskr']

const Font = ( { children, isRandomFontFamily = true, isRandomFontSize = false }: props ) => {
  const [ch, setCh] = useState( children )
  const { isFirst } = useIsFirst()

  const toSpan = useCallback(
    ( child: props['children'] ): React.ReactNode => {
      if ( typeof child === 'string' )
        return [...child].map( ( v ) =>
          v === ' ' ? (
            <span key={`${`${Math.random()}`.slice( 2 )}${`${Math.random()}`.slice( 2 )}`}>{v}</span>
          ) : (
            <span
              key={`${`${Math.random()}`.slice( 2 )}${`${Math.random()}`.slice( 2 )}`}
              className={classname( [isRandomFontFamily ? fontList[Math.floor( Math.random() * fontList.length )] : ''] )}
              style={{ ...( isRandomFontSize ? { fontSize: `${Math.random() * ( 1.4 - 0.8 ) + 0.8}em` } : {} ) }}
            >
              {v}
            </span>
          )
        )

      if ( typeof child === 'number' )
        return [...`${child}`].map( ( v ) => (
          <span
            key={`${`${Math.random()}`.slice( 2 )}${`${Math.random()}`.slice( 2 )}`}
            className={classname( [isRandomFontFamily ? fontList[Math.floor( Math.random() * fontList.length )] : ''] )}
            style={{ ...( isRandomFontSize ? { fontSize: `${Math.random() * ( 1.4 - 0.8 ) + 0.8}em` } : {} ) }}
          >
            {v}
          </span>
        ) )

      if ( typeof child === 'object' ) {
        if ( !child ) return child

        if ( isArray( child ) ) {
          return ( child as [] ).map( ( v: React.ReactNode ) => toSpan( v ) )
        }
        return {
          ...child,
          props: {
            ...child.props,
            children: toSpan( ( child as Exclude<typeof child, Iterable<React.ReactNode>> )?.props?.children ),
          },
        }
      }

      return child
    },
    [isRandomFontFamily, isRandomFontSize]
  )

  useEffect( () => {
    if ( !isFirst ) return

    setCh( ( v ) => {
      return toSpan( v )
    } )
  }, [isFirst, toSpan] )

  return <>{ch}</>
}

export default Font
