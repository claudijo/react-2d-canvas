import React, { useEffect, useRef, useState } from 'react';
import '../styles/App.css';

import {
  Stage,
  Layer,
  ScaleMode,
  Rectangle,
  Label, TextField,
} from 'react-2d-canvas';

function App() {
  const textFieldElem = useRef(null);
  const [textFieldY, setTextFieldY] = useState(0);

  useEffect(() => {
    setTextFieldY(textFieldElem.current.height * -0.5)
  }, []);

  return (
    <Stage
      width={640}
      height={420}
      backgroundColor="#eee"
      scaleMode={ScaleMode.SCALE_TO_FIT}
    >
      <Layer>
        <Rectangle
          x={320}
          y={40}
          width={480}
          height={30}
          backgroundColor="green"
        >
          <Label
            color="#111"
            fontSize={20}
            align="center"
            baseline="middle"
            backgroundColor="#ccc"
          >
            Label with background color centered in parent
          </Label>
        </Rectangle>

        <Label
          x={320}
          y={100}
          color="#111"
          fontSize={20}
          maxWidth={120}
        >
          Cropped label
        </Label>

        <TextField
          x={320}
          y={140}
          color="#111"
          fontSize={20}
          width={150}
          backgroundColor="#ccc"
        >
          Text field with multiple lines and background color
        </TextField>

        <Rectangle
          x={320}
          y={300}
          width={160}
          height={130}
          backgroundColor="yellow"
        >
          <TextField
            y={textFieldY}
            ref={textFieldElem}
            color="#111"
            fontSize={20}
            width={150}
            align="center"
            baseLine="top"
          >
            Text field with multiple lines, centered in parent
          </TextField>
        </Rectangle>
      </Layer>
    </Stage>
  );
}

export default App;