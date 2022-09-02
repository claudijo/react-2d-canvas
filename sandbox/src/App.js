import {
  Stage,
  Layer,
  ScaleMode,
  RoundedRectangle,
  Circle,
  Label
} from 'react-2d-canvas';
import './App.css';

function App() {
  return (
    <Stage
      width={640}
      height={420}
      backgroundColor="#2d002b"
      scaleMode={ScaleMode.SCALE_TO_FIT}
    >
      {/*Static background layer*/}
      <Layer>
        {[...Array(100).keys()].map(index => (
          <Circle
            key={index}
            x={Math.floor(Math.random() * 620) + 20}
            y={Math.floor(Math.random() * 400) + 20}
            radius={Math.floor(Math.random() * 2) + 1}
            backgroundColor="#fff"
            shadowColor="#fff"
            shadowOffsetX={2}
            shadowOffsetY={2}
            shadowBlur={10}
            opacity={Math.random()}
          />
        ))}
      </Layer>
      {/*Game action layer*/}
      <Layer>
        <Label
          x={360}
          y={50}
          color="#08f7fe"
          fontSize={40}
          fontFamily="Retro Gaming"
          shadowColor="#08f7fe"
          shadowBlur={8}
        >
          28.100.000
        </Label>
        {[...Array(4).keys()].map(column => (
          [...Array(2).keys()].map(row => (
            <RoundedRectangle
              key={`[${column},${row}]`}
              x={100 + column * 110 + (row % 2 ? 50 : 0)}
              y={100 + row * 50}
              radius={4}
              width={100}
              height={40}
              borderColor={row % 2 ? '#08f7fe' : '#f5d300'}
              backgroundColor={row % 2 ? '#fe53bb' : '#09fbd3'}
              borderWidth={6}
              shadowColor={row % 2 ? '#08f7fe' : '#f5d300'}
              shadowBlur={10}
            />
          ))
        ))}
        {[...Array(5).keys()].map(index => (
          <Circle
            key={index}
            x={280 - 15 * index}
            y={280 - 15 * index}
            radius={22}
            borderColor="#08f7fe"
            borderWidth={6}
            backgroundColor="#7122fa"
            shadowColor="#08f7fe"
            shadowBlur={10}
            scaleY={0.8}
            opacity={0.2 * index + 0.2}
            rotation={45 * Math.PI / 180}
          />
        ))}
        {[...Array(5).keys()].map(index => (
          <RoundedRectangle
            key={index}
            x={280 - 6 * index}
            y={370}
            width={160}
            height={50}
            radius={4}
            borderColor="#fe53bb"
            borderWidth={6}
            backgroundColor="#08f7fe"
            shadowColor="#fe53bb"
            shadowBlur={10}
            opacity={0.2 * index + 0.2}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default App;
