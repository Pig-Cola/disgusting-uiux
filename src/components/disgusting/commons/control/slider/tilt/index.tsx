import { useEffect, useMemo, useRef, useState } from 'react'

import { Progress } from '@/components/ui/progress'

import { makeClassNameByModuleCSS } from '@/lib/moduleCSS-helper'
import styles from './index.module.scss'

const { classname } = makeClassNameByModuleCSS( styles )

type props = {
  /**
   * `default`: 0.3
   * `range`: 0.1 ~ 1
   */
  sensitivity?: number
  /**
   * `default`: 50
   * `range`: 0 ~ 100
   */
  defaultPercent?: number
  style?: { [x in 'wrapper' | 'progress']?: React.CSSProperties }
  onChangeValue?: ( value: number ) => void
  onCommitValue?: ( value: number ) => void
}

const TiltSlider = ( {
  sensitivity = 0.3,
  defaultPercent = 50,
  style,
  onChangeValue = () => {},
  onCommitValue = () => {},
}: props ) => {
  const [value, setValue] = useState( defaultPercent )
  const [deg, setDeg] = useState( 0 )
  const degRef = useRef( deg )
  const valueRef = useRef( value )

  const mouseDown = ( e: React.MouseEvent<HTMLDivElement, MouseEvent>, isFront = true ) => {
    // console.log( 'prev', e.pageY )

    const timerFunction = () => {
      setValue( ( s ) => {
        const v = s + degRef.current * Math.abs( Math.tan( ( degRef.current * Math.PI ) / 270 ) / 20 )
        const newValue = v > 100 ? 100 : v < 0 ? 0 : v
        valueRef.current = newValue
        return newValue
      } )
    }
    const timer = setInterval( timerFunction, 5 )

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
    onChangeValue( value )
  }, [onChangeValue, value] )

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

function TiltSliderExample( { sensitivity = 0.2, defaultPercent = 50 } ) {
  const [value, setValue] = useState( 50 )
  const [commitValue, setCommitValue] = useState( value )

  const memoValue = useMemo( () => Math.floor( value ), [value] )
  const memoCommitValue = useMemo( () => Math.floor( commitValue ), [commitValue] )

  return (
    <>
      <p>
        value: {memoValue}, commitValue: {memoCommitValue}
      </p>
      <TiltSlider
        sensitivity={sensitivity}
        defaultPercent={defaultPercent}
        onChangeValue={setValue}
        onCommitValue={setCommitValue}
      />
    </>
  )
}

export { TiltSlider, TiltSliderExample }
