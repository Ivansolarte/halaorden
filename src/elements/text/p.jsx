import React from 'react'

export const P = ({ text, children = <></>, classe }) => {
  return (
    <p className={`block text-sm/6 font-medium text-gray-900 ${classe}`}>
      {text} {children}
    </p>
  )
}
