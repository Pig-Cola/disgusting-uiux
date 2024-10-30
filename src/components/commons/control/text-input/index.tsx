import { Input, InputProps } from '@nextui-org/input'

type props = {
  value?: InputProps['value']
  onValueChange?: ( value: string ) => void
  isTabAble?: boolean
}

const TextInput = function ( {
  rest: { tabIndex, ...rest } = {},
  value,
  isTabAble: isTabAble = false,
  onValueChange = () => {},
}: props & {
  rest?: Omit<InputProps, keyof props>
} ) {
  return (
    <Input
      type="text"
      value={value}
      tabIndex={isTabAble ? tabIndex : -1}
      onValueChange={( v ) => onValueChange( v )}
      {...rest}
    />
  )
}

export default TextInput
