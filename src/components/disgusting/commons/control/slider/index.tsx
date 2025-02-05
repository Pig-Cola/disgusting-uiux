import { useEffect, useMemo, useRef, useState } from 'react'

import { throttle } from 'lodash'

import { Progress } from '@/components/ui/progress'

import { makeClassNameByModuleCSS } from '@/lib/moduleCSS-helper'
import styles from './index.module.scss'

const { classname } = makeClassNameByModuleCSS( styles )

type props = {
  /**
   * @default 0.3
   * range: 0.1 ~ 1
   */
  sensitivity?: number
  defaultPercent?: number
  style?: { [x in 'wrapper' | 'progress']?: React.CSSProperties }
  onChangeValue?: ( value: number ) => void
  onCommitValue?: ( value: number ) => void
}

const Slider = ( {
  sensitivity = 0.3,
  defaultPercent = 0,
  style,
  onChangeValue = () => {},
  onCommitValue = () => {},
}: props ) => {
  const [value, _setValue] = useState( defaultPercent )
  const [deg, setDeg] = useState( 0 )
  const degRef = useRef( deg )
  const valueRef = useRef( value )
  const onChangeValueWithThrottle = useMemo( () => throttle( onChangeValue, 500, { trailing: true } ), [onChangeValue] )

  const mouseDown = ( e: React.MouseEvent<HTMLDivElement, MouseEvent>, isFront = true ) => {
    // console.log( 'prev', e.pageY )

    const timerFunction = () => {
      _setValue( ( s ) => {
        const v = s + degRef.current * Math.abs( Math.tan( ( degRef.current * Math.PI ) / 270 ) )
        const newValue = v > 100 ? 100 : v < 0 ? 0 : v
        valueRef.current = newValue
        return newValue
      } )
    }
    const timer = setInterval( timerFunction, 100 )

    const listener1 = ( ee: unknown ) => {
      mouseMove( ee as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>, isFront, e.pageY )
    }
    const listener2 = () => {
      clearInterval( timer )
      timerFunction()
      mouseUp()
      document.removeEventListener( 'mousemove', listener1 )
      document.removeEventListener( 'mouseup', listener2 )
    }

    document.addEventListener( 'mousemove', listener1 )
    document.addEventListener( 'mouseup', listener2 )
  }

  const mouseMove = ( e: React.MouseEvent<HTMLDivElement, MouseEvent>, isFront = true, prev: number ) => {
    // console.log( `prev: ${prev}, curr: ${e.pageY}` )

    if ( !prev ) return

    setDeg( () => {
      const target = ( prev - e.pageY ) * ( isFront ? 1 : -1 ) * sensitivity

      if ( target > 90 ) return 90
      if ( target < -90 ) return -90

      degRef.current = target
      return target
    } )
  }

  const mouseUp = () => {
    setDeg( 0 )
    degRef.current = 0
    onCommitValue( valueRef.current )
  }

  useEffect( () => {
    onChangeValueWithThrottle( value )
  }, [onChangeValueWithThrottle, value] )

  return (
    <div className={classname( ['test'] )} style={{ transform: `rotate(${deg}deg)`, ...( style?.wrapper || {} ) }}>
      <Progress className={classname( ['hi'] )} value={value} style={{ ...( style?.progress || {} ) }} />
      <div
        className={classname( ['drag1'] )}
        onMouseDown={( e ) => {
          mouseDown( e )
        }}
      />
      <div
        className={classname( ['drag2'] )}
        onMouseDown={( e ) => {
          mouseDown( e, false )
        }}
      />
    </div>
  )
}

Slider.example = () => {
  return <Slider sensitivity={0.2} defaultPercent={50} />
}

export { Slider }
