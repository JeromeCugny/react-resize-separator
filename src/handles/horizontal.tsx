import React from "react"
import { convertPxToVw } from "../misc/utils"

export interface HorizontalResizeHandleProps {
  id: string, className?: string,
  attachedElementId?: string,
  onMouseResize?: (event: MouseEvent, elementToResize: HTMLElement, newPxWidth: number) => void,
  onDoubleClick?: (event: MouseEvent, elementToResize: HTMLElement) => void,
}

export const HorizontalResizeHandle: React.FC<HorizontalResizeHandleProps> = (props) => {
  const { id, className, attachedElementId, onMouseResize, onDoubleClick } = props
  const [isResizing, setIsResizing] = React.useState<boolean>(false)

  let targetedHTML: HTMLElement | null = null
  if (attachedElementId) targetedHTML = document.getElementById(attachedElementId)
  else {
    const selfHTML = document.getElementById(id)
    targetedHTML = (selfHTML?.previousElementSibling || selfHTML?.parentElement) as HTMLElement
  }

  const HandleMouseMove = (e: MouseEvent, element: HTMLElement) => {
    const prevRect = element?.getBoundingClientRect()
    if (isResizing && prevRect) {
      const newWidth = e.clientX - prevRect.left
      if (onMouseResize) onMouseResize(e, element, newWidth)
      else if (newWidth >= 0) {
        element.style.width = `${convertPxToVw(newWidth)}vw`
      }
    }
  }

  const HandleDoubleClick = (e: React.MouseEvent) => {
    if (targetedHTML) {
      if (onDoubleClick) onDoubleClick(e.nativeEvent, targetedHTML)
      else targetedHTML.style.width = "fit-content"
    }
  }

  const HandleMouseUp = () => {
    if (isResizing) setIsResizing(false)
  }

  React.useEffect(() => {
    if (isResizing) {
      const callHandleMouseMove = (e: MouseEvent) => HandleMouseMove(e, targetedHTML!)

      window.addEventListener("mouseup", HandleMouseUp)
      window.addEventListener("mousemove", callHandleMouseMove)
      return () => {
        window.removeEventListener("mouseup", HandleMouseUp)
        window.removeEventListener("mousemove", callHandleMouseMove)
      }
    }
  }, [isResizing, targetedHTML])

  return (
    <div id={id} className={className || ""}
      onMouseDown={() => setIsResizing(true)}
      onDoubleClick={HandleDoubleClick}
    >
    </div>
  )
}