import { useMatches, useParams } from 'react-router-dom'

/**
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
export const useCustomParams = () => {
  const _params = useParams()
  const matches = useMatches()

  const temp = matches
    .filter( ( { handle } ) => handle )
    .map( ( v ) => {
      return ( v.handle as { originPathName: string } ).originPathName
    } )

  const { '*': star, ...lestParams } = _params
  return {
    params: { ...lestParams, ...( temp[0] ? { [temp[0]]: star?.split( '/' ) } : {} ) } as typeof _params,
  }
}
