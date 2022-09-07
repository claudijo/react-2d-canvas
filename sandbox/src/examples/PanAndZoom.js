import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import {
  Stage,
  Layer,
  ScaleMode,
  Rectangle,
} from 'react-2d-canvas';

function App() {
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragOriginX, setDragOriginX] = useState(0);
  const [dragOriginY, setDragOriginY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const preventOverscroll = event => event.preventDefault();
    window.addEventListener('wheel', preventOverscroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', preventOverscroll);
    }
  }, []);

  const onWheel = event => {
    const normalized = 1 + Math.abs(event.deltaY) / 1000;
    const scaleFactor = event.deltaY > 0 ? normalized : 1 / normalized;
    const originX = event.clientX - (event.clientX - offsetX) * scaleFactor;
    const originY = event.clientY - (event.clientY - offsetY) * scaleFactor;

    setOffsetX(originX);
    setOffsetY(originY);
    setScale(scale * scaleFactor);
  };

  const onMouseDown = event => {
    document.body.style.cursor = 'move';
    setIsDragging(true);
    setDragOriginX(event.clientX);
    setDragOriginY(event.clientY);
  };

  const onMouseUp = event => {
    document.body.style.cursor = 'default';
    setIsDragging(false);
  };

  const onMouseMove = event => {
    if (!isDragging) {
      return;
    }

    const dx = event.clientX - dragOriginX;
    const dy = event.clientY - dragOriginY;

    setDragOriginX(event.clientX);
    setDragOriginY(event.clientY)

    setOffsetX(offsetX + dx);
    setOffsetY(offsetY + dy);
  };

  const onMouseOut = event => {
    document.body.style.cursor = 'default';
    setIsDragging(false);
  };

  return (
    <Stage
      width={640}
      height={420}
      backgroundColor="#ddd"
      scaleMode={ScaleMode.SCALE_TO_FIT}
    >
      <Layer
        scaleX={scale}
        scaleY={scale}
        offsetX={offsetX}
        offsetY={offsetY}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        onMouseMove={onMouseMove}
      >
        {[...Array(6).keys()].map(column => (
          [...Array(6).keys()].map(row => (
            <Rectangle
              key={`[${column},${row}]`}
              x={column * 128}
              y={row * 84}
              width={64}
              height={42}
              borderColor="black"
              backgroundColor="red"
              borderWidth={4}
              onClick={event => console.log(`Click on ${column}x${row}`)}
            />
          ))
        ))}
      </Layer>
    </Stage>
  );
}

export default App;