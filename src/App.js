import React, { Component } from "react";
import "./App.css"; // Make sure to create a CSS file for styling

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: Array(3)
        .fill()
        .map(() => Array(3).fill("white")),
      clickOrder: [],
    };
  }

  handleClick = (row, col) => {
    const newMatrix = this.state.matrix.map((r, rowIndex) =>
      r.map((color, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return "green";
        }
        return color;
      })
    );

    const newClickOrder = [...this.state.clickOrder, { row, col }];

    this.setState({ matrix: newMatrix, clickOrder: newClickOrder }, () => {
      if (newClickOrder.length === 9) {
        setTimeout(() => {
          const finalMatrix = newMatrix.map((row) => row.map(() => "white"));
          newClickOrder.forEach((click, index) => {
            setTimeout(() => {
              finalMatrix[click.row][click.col] = "orange";
              this.setState({ matrix: [...finalMatrix] });
            }, index * 500);
          });
        }, 500);
      }
    });
  };

  render() {
    return (
      <div className="matrix">
        <h1 className="heading">
          Click the boxes and get them in clicked Sequences
        </h1>
        {this.state.matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((color, colIndex) => (
              <div
                key={colIndex}
                className="box"
                style={{ backgroundColor: color }}
                onClick={() => this.handleClick(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
