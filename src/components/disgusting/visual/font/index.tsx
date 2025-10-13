import React, { useEffect, useMemo } from 'react'

import { default as isNull } from 'lodash/isNull'

import { makeClassNameByModuleCSS } from '@/lib/moduleCSS-helper'
import styles from './index.module.scss'

const { classname } = makeClassNameByModuleCSS( styles )

type props = {
  children?: React.ReactNode
  isRandomFontFamily?: boolean
  isRandomFontSize?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = ( value: unknown ): value is any[] | Iterable<any> => {
  return Array.isArray( value )
}

const fontList = Object.keys( styles )

const whiteSpace = /\s/

const toSpan = ( {
  child,
  isRandomFontFamily,
  isRandomFontSize,
}: {
  child: Exclude<props['children'], Promise<unknown>>
  isRandomFontSize: boolean
  isRandomFontFamily: boolean
} ): Exclude<React.ReactNode, Promise<unknown>> => {
  if ( typeof child === 'number' ) child = `${child}`

  if ( typeof child === 'string' )
    return [...child].map( ( v ) =>
      whiteSpace.test( v ) ? (
        <span key={`${`${Math.random()}`.slice( 2 )}${`${Math.random()}`.slice( 2 )}`}>{v}</span>
      ) : (
        <span
          key={`${`${Math.random()}`.slice( 2 )}${`${Math.random()}`.slice( 2 )}`}
          className={classname( [isRandomFontFamily ? fontList[Math.floor( Math.random() * fontList.length )] : ''] )}
          style={{ ...( isRandomFontSize ? { fontSize: `${Math.random() * ( 1.4 - 0.8 ) + 0.8}em` } : {} ) }}
        >
          {v}
        </span>
      ),
    )

  if ( typeof child === 'object' ) {
    if ( isNull( child ) ) return child

    if ( isArray( child ) ) {
      return ( child as Exclude<React.ReactNode, Promise<unknown>>[] ).map( ( v ) =>
        toSpan( { child: v, isRandomFontFamily, isRandomFontSize } ),
      )
    }

    return {
      ...child,
      props: {
        ...( ( child.props as object ) || {} ),
        children: toSpan( {
          child: (
            ( child as Exclude<typeof child, Iterable<React.ReactNode> | Promise<React.ReactNode>> )?.props as {
              children: React.HTMLElementType
            }
          )?.children,
          isRandomFontFamily,
          isRandomFontSize,
        } ),
      },
    }
  }

  return child
}

/**
 * font의 기준 사이즈는 가장 가까운 부모 요소에서의 fontsize를 따라감
 */
const Font = ( { children, isRandomFontFamily = false, isRandomFontSize = false }: props ) => {
  const child = useMemo( () => ( <span>{children}</span> ) as React.JSX.Element & HTMLSpanElement, [children] )
  const t = useMemo(
    () => toSpan( { child: child as Exclude<React.ReactNode, Promise<unknown>>, isRandomFontSize, isRandomFontFamily } ),
    /* eslint-disable-next-line react-hooks/exhaustive-deps */ /* 여기선 child가 아닌 child.outerText 를 기반한 memo를 진행 */
    [child.outerText, isRandomFontFamily, isRandomFontSize],
  )

  useEffect( () => {
    console.log( child.outerText )
  }, [child] )

  return <>{t}</>
}

const FontExample = () => (
  <div style={{ fontSize: 20 }}>
    <span>예시1: </span>
    <Font isRandomFontFamily>
      <span>
        안녕하세요 저는 <b>황대성</b> 입니다.
      </span>
    </Font>
    <br />
    <span>예시2: </span>
    <Font isRandomFontSize>
      <span>
        안녕하세요 저는 <b>황대성</b> 입니다.
      </span>
    </Font>
    <br />
    <span>예시3: </span>
    <Font isRandomFontSize isRandomFontFamily>
      <span>
        안녕하세요 저는 <b>황대성</b> 입니다.
      </span>
    </Font>
    <br />
    <span>원본: </span>
    <span>
      안녕하세요 저는 <b>황대성</b> 입니다.
    </span>
  </div>
)

export { Font, FontExample }
