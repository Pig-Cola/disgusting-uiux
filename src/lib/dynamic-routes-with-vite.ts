import { lazy } from 'react'
import type { RouteObject, RouteProps } from 'react-router-dom'

import Custom from '@/pages/_pages'

const NotFound = lazy( () => import( '@/pages/_404' ) )

const pages = import.meta.glob( [
  '/src/pages/**/*.(j|t)s(x)?',
  '!/src/pages/_pages.(j|t)s(x)?',
  '!/src/pages/_404.(j|t)s(x)?',
] )

/**
 * `Next.js` 의 `pages` router 방식을 참고함.
 *
 * ---
 * #### 용어 정리
 * - 디렉토리 경로
 *   src/pages 디렉토리로 부터 파일까지 파생되는 경로
 *   ex) `src/pages/a/b/c/index.tsx` -> `/a/b/c`
 *   ex) `src/pages/index.tsx` -> `/`
 * - 파일 이름
 *   page로 사용 가능한 파일의 이름.
 *   `파일이름.(확장자)`로 되어있으며,
 *   확장자는 `(j|t)sx?` 이다.
 * ---
 * ## 일반 라우터
 * 디렉토리 경로 + 파일이름 = path이며,
 * 파일 이름이 `index`일 경우 디렉토리 경로가 path가 된다.
 *
 * ---
 * ## 다이나믹 라우터
 * 경로 또는 파일이름을 대괄호로 묶어서 구성.
 *
 * `useCustomParams`를 통해 세그먼트에 접근 가능하다.
 *
 * |route|url|params|
 * |-----|---|------|
 * |`pages/post/[id]`|`/post/a`|`{id: 'a'}`|
 * |`pages/post/[id]`|`/post/b`|`{id: 'b'}`|
 * |`pages/post/[id]`|`/post/c`|`{id: 'c'}`|
 *
 * ## 중첩된 다이나믹 라우터
 * 경로 또는 파일들을 대괄호로 두번 묶어서 구성.
 *
 * `useCustomParams`를 통해 세그먼트에 접근 가능하다.
 *
 * |route|url|params|
 * |-----|---|------|
 * |`pages/shop/[[slug]]`|`/shop/a`|`{slug: ['a']}`|
 * |`pages/shop/[[slug]]`|`/shop/a/b`|`{slug: ['a', 'b']}`|
 * |`pages/shop/[[slug]]`|`/shop/a/b/c`|`{slug: ['a', 'b', 'c']}`|
 */
export const dynamicRoutes = [{ path: '/', Component: Custom, children: [] }] as RouteObject[]

for ( const i in pages ) {
  const Component = lazy(
    pages[i] as () => Promise<{
      default: Exclude<RouteProps['Component'], null | undefined>
    }>
  )

  const pathArr = i
    .replace( /^.*\/pages\//, '' )
    .replace( /\.(j|t)sx?$/, '' )
    .split( '/' )
    .map( ( v ) => {
      const temp = v.replace( /\[\[(.+)\]\]/, '*' ).replace( /\[(.+)\]/, ( _mach, p1 ) => `:${p1}` )
      return { path: temp, origin: v.replace( /\[\[(.+)\]\]/, '$1' ) }
    } )
  const file = pathArr.pop()!

  let target = dynamicRoutes[0].children!
  pathArr.forEach( ( { path: targetPath } ) => {
    if ( targetPath === '' ) return

    const temp = target.find( ( { path } ) => path === targetPath )
    if ( !temp ) {
      const newTemp = {
        path: targetPath,
        children: [],
      } as RouteObject
      target.push( newTemp )
      target = newTemp.children!
    } else {
      target = temp.children!
    }
  } )
  if ( file.path === '*' ) {
    target.push( {
      path: '*',
      Component: Component,
      handle: { originPathName: file.origin },
    } )
    continue
  }
  if ( file.path !== 'index' ) {
    const newTemp = { path: file.path, children: [] } as RouteObject
    target.push( newTemp )
    target = newTemp.children!
  }

  target.push( { path: '', Component: Component } )
}

dynamicRoutes[0].children!.push( { path: '*', Component: NotFound } )
