import { Suspense } from 'react'

import TextInput from '@/components/commons/control/text-input/lazy'

import style from './index.module.scss'
import { makeClassNameByModuleCSS } from '@/lib/moduleCSS-helper'

const { classname } = makeClassNameByModuleCSS( style )

export default function Test() {
  return (
    <div className={classname( ['main'] )}>
      <title>hi</title>
      <p>메인 페이지</p>
      <br />
      <br />
      <br />
      <p>test</p>
      <div style={{ width: 500 }}>
        <Suspense fallback={<></>}>
          <TextInput
            rest={{
              label: 'hi',
              maxLength: 5,
            }}
          />
        </Suspense>
      </div>
    </div>
  )
}
