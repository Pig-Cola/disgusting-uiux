import { Outlet, useHref, useNavigate } from 'react-router-dom'

import { NextUIProvider } from '@nextui-org/react'

const Custom = () => {
  const navigate = useNavigate()

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <Outlet />
    </NextUIProvider>
  )
}

export default Custom
