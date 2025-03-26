import { Slider } from '@/components/ui/slider'

type props = Omit<Parameters<typeof Slider>[0], 'inverted'>

const ReversedSlider = ( { style, ...props }: props ) => {
  return <Slider {...props} inverted style={{ transform: 'scaleX(-1)', ...style }} />
}

export { ReversedSlider }
