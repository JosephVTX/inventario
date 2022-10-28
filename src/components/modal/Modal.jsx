import React from 'react'
import { createPortal } from 'react-dom'

export const Modal = ({children}) => {

  const portalNode = document.createElement('div')

  React.useEffect(() => {

    document.body.appendChild(portalNode)

    return () => {

        portalNode.remove()

    }
    }, [portalNode])


  return createPortal(children, portalNode)
}
