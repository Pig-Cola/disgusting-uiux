import { useEffect, useState } from 'react'

type props = {
  value?: React.InputHTMLAttributes<HTMLInputElement>['value']
  onValueChange?: ( value: string ) => void
  isTabAble?: boolean
}

const TextInput = function ( {
  rest: { tabIndex, ...rest } = {},
  value,
  isTabAble: isTabAble = false,
  onValueChange = () => {},
}: props & {
  rest?: Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof props>
} ) {
  const [_value, _setValue] = useState( value?.toString() || '' )

  // 내부 value 변경 -> 외부 전달
  useEffect( () => {
    onValueChange( _value )
  }, [_value, onValueChange] )
  // 외부 value 변경 -> 내부 전달
  useEffect( () => {
    _setValue( value?.toString() || '' )
  }, [value] )

  return (
    <input
      type="text"
      value={_value}
      onInput={( e ) => {
        const tempOnInput = rest?.onInput || ( () => {} )
        tempOnInput( e )
        const target = e.target as HTMLInputElement
        _setValue( target.value )
      }}
      tabIndex={!isTabAble ? -1 : tabIndex}
      {...rest}
    />
  )
}

export default TextInput
