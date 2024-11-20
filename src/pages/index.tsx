// import { Suspense } from 'react'

// import TextInput from '@/components/commons/control/text-input/lazy'
import TextInput from '@/components/commons/control/text-input'
import Font from '@/components/visual/font'

import style from './index.module.scss'
import { makeClassNameByModuleCSS } from '@/lib/moduleCSS-helper'

const { classname } = makeClassNameByModuleCSS( style )

export default function Test() {
  return (
    <div className={classname( ['main'] )}>
      <p>메인 페이지</p>
      <br />
      <p>test</p>
      <br />
      <div style={{ width: 500 }}>
        {Font.example}
        {TextInput.example}
      </div>
    </div>
  )
}
