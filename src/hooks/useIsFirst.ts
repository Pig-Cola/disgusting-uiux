import { useEffect, useState } from 'react'

const useIsFirst = () => {
  const [isFirst, setFirst] = useState( false )
  useEffect( () => {
    setFirst( true )
  }, [] )
  return { isFirst }
}
export default useIsFirst
