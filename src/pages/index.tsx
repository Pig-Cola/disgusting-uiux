import { makeClassNameByModuleCSS } from '@/lib/moduleCSS-helper'
import style from './index.module.scss'
// import { useEffect, useState } from 'react'

const { classname } = makeClassNameByModuleCSS( style )

export default function Test() {
  // const [count, setCount] = useState( 0 )
  // useEffect( () => {
  //   if ( count < 100 ) {
  //     const timer = setTimeout( () => {
  //       setCount( ( v ) => v + 1 )
  //     }, 20 )

  //     return () => {
  //       clearTimeout( timer )
  //     }
  //   }
  // }, [count] )

  return (
    <div className={classname( ['main'] )}>
      <p>메인 페이지</p>
      {/* <p>ReRender: {count}</p> */}
    </div>
  )
}
