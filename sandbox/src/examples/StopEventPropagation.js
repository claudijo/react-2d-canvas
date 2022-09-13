import React from 'react';
import '../styles/App.css';

import {
  Stage,
  Layer,
  Rectangle,
  ScaleMode,
} from 'react-2d-canvas';

function App() {
  const onRectangleOneClick = event => {
    event.stopPropagation();
    alert('Red rectangle clicked. Event is stopped from propagating')
  }

  const onRectangleTwoClick = event => {
    alert('Blue rectangle clicked. Event will propagate to layer')
  }

  const onLayerClick = event => {
    alert('Layer clicked')
  };

  return (
    <Stage
      width={640}
      height={420}
      scaleMode={ScaleMode.SCALE_TO_FIT}
      backgroundColor="gray"
    >
      <Layer
        onClick={onLayerClick}
      >
        <Rectangle
          x={220}
          y={210}
          width={100}
          height={100}
          backgroundColor="red"
          onClick={onRectangleOneClick}
        />

        <Rectangle
          x={420}
          y={210}
          width={100}
          height={100}
          backgroundColor="blue"
          onClick={onRectangleTwoClick}
        />
      </Layer>
    </Stage>
  );
}

export default App;