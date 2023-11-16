import React from "react"
import { convertPxToVw } from "../misc/utils"

export default function HorizontalResizeHandle(props: {
  id: string, className?: string,
  onMouseResize?: (event: MouseEvent, elementToResize: HTMLElement, newPxWidth: number) => void,
  onDoubleClick?: (event: MouseEvent, elementToResize: HTMLElement) => void,
}) {
  const { id, className, onMouseResize, onDoubleClick } = props
  const [isResizing, setIsResizing] = React.useState<boolean>(false)

  const selfHTML = document.getElementById(id)
  const prevHTML = (selfHTML?.previousElementSibling || selfHTML?.parentElement) as HTMLElement

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
    if (onDoubleClick) onDoubleClick(e.nativeEvent, prevHTML)
    else if (prevHTML) {
      prevHTML.style.width = "fit-content"
    }
  }

  const HandleMouseUp = () => {
    if (isResizing) setIsResizing(false)
  }

  React.useEffect(() => {
    if (isResizing) {
      const callHandleMouseMove = (e: MouseEvent) => HandleMouseMove(e, prevHTML)

      window.addEventListener("mouseup", HandleMouseUp)
      window.addEventListener("mousemove", callHandleMouseMove)
      return () => {
        window.removeEventListener("mouseup", HandleMouseUp)
        window.removeEventListener("mousemove", callHandleMouseMove)
      }
    }
  }, [isResizing, prevHTML])

  return (
    <div id={id} className={className || ""}
      onMouseDown={() => setIsResizing(true)}
      onDoubleClick={HandleDoubleClick}
    >
    </div>
  )
}