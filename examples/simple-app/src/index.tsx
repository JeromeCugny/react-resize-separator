import React from "react"
import { createRoot } from "react-dom/client"
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/scss/bootstrap.scss"
import "react-resize-separator/scss"
import { HorizontalResizeHandle } from "react-resize-separator"

function Table() {

  return (
    <React.Fragment>
      <h1>Table cols</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>col&nbsp;1</th>
            <th>
              <HorizontalResizeHandle id="table-head-sep-1" className="resize-separator-vertical-absolute" />
              col&nbsp;2
            </th>
            <th id="table-col-3">
              <label>col&nbsp;3</label>
              <HorizontalResizeHandle id="table-head-sep-2" className="resize-separator-vertical-absolute" attachedElementId="table-col-3" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>value&nbsp;1</td>
            <td>value&nbsp;2</td>
            <td>value&nbsp;3</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

function App() {
  return (
    <div>
      <Table />
    </div>
  )
}

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(<App />)
