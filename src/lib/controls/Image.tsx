import { useEffect, useState } from 'react'
import * as React from 'react'
import { type StackProps, VStack } from './Container'

interface ImageProps extends StackProps {
  src: string
  alt: string
  containerWidth?: string
  containerHeight?: string
  preview?: string
}

export const Image = (props: ImageProps) => {
  const [showPreview, setShowPreview] = useState(props.preview !== undefined)

  useEffect(() => {
    if (props.preview) {
      setShowPreview(true)
      setTimeout(() => {
        setShowPreview(false)
      }, 100)
    }
  }, [props.src])

  if ('visible' in props && !props.visible) return <></>

  return (
    <VStack {...props}
            width={props.containerWidth ?? props.width}
            height={props.containerHeight ?? props.height}>
      <img width={props.width}
           height={props.height}
           src={showPreview ? props.preview : props.src} alt={props.alt}/>
    </VStack>
  )
}
