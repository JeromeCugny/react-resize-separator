# react-resize-separator
A simple React component designed to act as a separator being able to resize an attached element.

Checkout the [demo in StackBlitz](https://stackblitz.com/github/JeromeCugny/react-resize-separator-demo?file=src%2FApp.tsx) or just look at the
[demo Application](https://kkvigbvqy.github.stackblitz.io).

## Installation

Install it from npm and include it in your React App.

```
npm install --save-dev react-resize-separator
```

## Usage

> Some CSS classes are provided but no style is enforced. You are free to make the component look however you want.  

You can put it somewhere in your DOM and let `react-resize-separator` controls the previous element (parent when no sibling):
```tsx
import React from 'react'
import { HorizontalResizeHandle } from 'react-resize-separator'

function MyArticle() {
  return (
    <div style={{ display: 'flex', height: '20vh' }}>
      <div style={{ width: '30vw', flex: '0 0 auto', backgroundColor: 'red' }}>
        <p>Content A.</p>
      </div>
      <HorizontalResizeHandle
        id="separator"
        className="resize-separator-vertical"
      />
      <div style={{ flex: 'auto', backgroundColor: 'blue' }}>
        <p>Content B.</p>
      </div>
    </div>
  )
}
```

Or specify which element to control:
```tsx
import React from 'react'
import { HorizontalResizeHandle } from 'react-resize-separator'

function MyArticle() {
  return (
    <div style={{ display: 'flex', height: '20vh' }}>
      <div id="div-a" style={{ 
        width: '30vw', flex: '0 0 auto', position: 'relative',
        backgroundColor: 'red'
        }}>
        <p>Content A.</p>
        <HorizontalResizeHandle
          id="separator"
          attachedElementId="div-a"
          className="resize-separator-vertical-absolute"
        />
      </div>
      <div style={{ flex: 'auto', backgroundColor: 'blue' }}>
        <p>Content B.</p>
      </div>
    </div>
  )
}
```

Or use the hook to control yourself the resizing:
```tsx
import React from 'react'
import { HorizontalResizeHandle } from 'react-resize-separator'

function MyArticle() {
  const [myWidth, setMyWidth] = React.useState<number>(200)

  return (
    <div style={{ display: 'flex', height: '20vh' }}>
      <div style={{ width: `${myWidth}px`, flex: '0 0 auto', backgroundColor: 'red' }}>
        <p>Content A.</p>
      </div>
      <HorizontalResizeHandle
        id="separator"
        className="resize-separator-vertical"
        onMouseResize={(e, elem, newPxWidth) => setMyWidth(newPxWidth)}
      />
      <div style={{ flex: 'auto', backgroundColor: 'blue' }}>
        <p>Content B.</p>
      </div>
    </div>
  )
}
```
__Note:__ by default, `react-resize-separator` resizes using `vw` or `vh` (depending on which handle you use).

`HorizontalResizeHandle` inside a `display: 'flex'` is not the only use case.  
And `react-resize-separator` also provides `VerticalResizeHandle`.

Checkout the [demo in StackBlitz](https://stackblitz.com/github/JeromeCugny/react-resize-separator-demo?file=src%2FApp.tsx) for more examples.