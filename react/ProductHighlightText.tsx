import React, { FC, useMemo, ReactNode } from 'react'
import { IOMessageWithMarkers } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'

import { useHighlight } from './ProductHighlights'

interface Props {
  message: string
  markers?: string[]
  blockClass?: string
  link?: LinkValues
}

interface MessageValues {
  highlightName: ReactNode
}

interface LinkValues {
  href?: string
}

const CSS_HANDLES = ['productHighlightText'] as const

const ProductHighlightText: FC<Props> = ({ message = '', markers = [], link }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const value = useHighlight()

  const values = useMemo(() => {
    const result: MessageValues = {
      highlightName: '',
    }

    if (!value) {
      return result
    }

    result.highlightName = (
      <span
        key="highlightName"
        data-highlight-name={value.highlight.name}
        data-highlight-id={value.highlight.id}
        data-highlight-type={value.type}
        className={handles.productHighlightText}
      >
        {
          link ? (
            <Link
              to={link.href + `${value.highlight.id}`}
            >
              {value.highlight.name}
            </Link>
          ) : (
            <>
              {value.highlight.name}
            </>
          )
        }
        
      </span>
    )

    return result
  }, [value, handles.productHighlightText])

  if (!value || !message) {
    return null
  }

  return (
    <IOMessageWithMarkers
      handleBase="productHighlightText"
      message={message}
      markers={markers}
      values={values}
    />
  )
}

export default ProductHighlightText
