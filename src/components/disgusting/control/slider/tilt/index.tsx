import { useEffect, useMemo, useRef, useState } from 'react'

import { Progress } from '@/components/ui/progress'

import { makeClassNameByModuleCSS } from '@/lib/moduleCSS-helper'
import styles from './index.module.scss'

const { classname } = makeClassNameByModuleCSS( styles )

type props = {
  /**
   * `default`: 0.3
   * `range`: 0.1 ~ 1
   * 기울기 민감도
   */
  sensitivity?: number
  /**
   * `default`: 50
   * `range`: 0 ~ 100
   * 초기 값
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
    /* 
    드래그된 selection이 있다면, mouseDown시 selection을 해제해 줘야 mouseMove event때에 문제가 발생하지 않는다
    */
    /**
     * 기울기 가중치에 따른 값 증가 계산산
     */
    const timerFunction = () => {
      setValue( ( s ) => {
        const v = s + degRef.current * Math.abs( Math.tan( ( degRef.current * Math.PI ) / 270 ) / 20 )
        const newValue = v > 100 ? 100 : v < 0 ? 0 : v
        valueRef.current = newValue
        return newValue
      } )
    }
    const timer = setInterval( timerFunction, 5 )

    // selection이 있다면 해제함
    const selection = getSelection()
    let range: Range | undefined
    if ( selection.getComposedRanges().length ) {
      range = selection.getRangeAt( 0 )
      selection.removeAllRanges()
    }

    // onMouseMove
    const listener1 = ( ee: unknown ) => {
      mouseMove( ee as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>, isFront, e )
    }
    // onMouseUp
    const listener2 = () => {
      clearInterval( timer )
      timerFunction() // mouseUp시 최종 값 즉각 계산산
      mouseUp()
      // 만약 해제된 selection이 있었다면 다시 선택함
      if ( range ) {
        selection.addRange( range )
      }
      document.removeEventListener( 'mousemove', listener1 )
      document.removeEventListener( 'mouseup', listener2 )
    }

    /* 
      - document에 event를 추가한 이유
        mouseMove와 mouseUp 이벤트는 처음 mouseDown이 발생한 요소에서 벗어난 뒤 발생할 수 있기 때문
    */
    document.addEventListener( 'mousemove', listener1 )
    document.addEventListener( 'mouseup', listener2 )
  }

  const mouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isFront: boolean,
    prevE: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ( !prevE ) return

    /*
      setDeg 함수 안에서 degRef값을 변하는 이유 && deg를 state와 ref 둘다 사용해서 관리하는 이유

      1. deg값을 상태(state)만을 사용하여 관리하게 되면, 값을 계산할 때에 deg값이 최신 상태로 반영되어 있음을 확신 할 수 없음.
      2. 그로인해 값의 변동폭이 현재 기울기를 적용받지 못함.
      3. 상태의 변화에 반응하는 useEffect + Ref 를 사용하더라도 ref의 즉각 업데이트를 기대할 수 없음.
      4. flushSync 사용하여 기울기를 강제 업데이트 하는 경우에는 값이 동기적으로 업데이트 되지만,
        기울기 상태에 따른 회전이 즉각 반영되지 않고 퍼포먼스 이슈가 발생함.
      5. 위 문제들을 해결하기 위해 계산은 Ref에, style은 state에 위임하게 함.
    */
    setDeg( () => {
      const target = ( prevE.pageY - e.pageY ) * ( isFront ? 1 : -1 ) * sensitivity

      if ( target > 90 ) return 90
      if ( target < -90 ) return -90

      // 이 때에 Ref의 current 값은 동기적으로 변경됨
      degRef.current = target
      // 반환값으로의 상태 변경 시점은 react의 스케쥴링에 의해 결정됨
      return target
    } )
  }

  const mouseUp = () => {
    setDeg( 0 )
    degRef.current = 0
    // 최종으로 fix된 값으로 호출
    onCommitValue( valueRef.current )
  }

  useEffect( () => {
    // 값이 변경될 때 마다 호출
    onChangeValue( value )
  }, [onChangeValue, value] )

  return (
    <div className={classname( ['tilt-slider'] )} style={{ transform: `rotate(${deg}deg)`, ...( style?.wrapper || {} ) }}>
      <Progress className={classname( ['progress'] )} value={value} style={{ ...( style?.progress || {} ) }} />
      <div
        className={classname( ['drag-area', 'drag1'] )}
        onMouseDown={( e ) => {
          mouseDown( e )
        }}
      />
      <div
        className={classname( ['drag-area', 'drag2'] )}
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
