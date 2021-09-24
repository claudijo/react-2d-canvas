# React 2D Canvas

Draw text and shapes on a HTML Canvas element using a declarative JSX syntax

## Property Inheritance
Child elements will be affected by the following properties of their parent elements:

`x` – Child's x-coordinate will be an offset of the parent x-coordinates

`y` – Same as above, but for the y-coordinate

`opacity` – Child's opacity will be multiplied by the parent's opacity

`rotation` – Child's rotation will be increased by the parent's rotation

## Example

![Example canvas](example-canvas.png)

*A cross with line segments at `x = 100` and `y = 100` has been added to the image above for reference.*

```js
import { Stage, ScaleMode, Layer, Rectangle, Image, Circle } from 'react-2d-canvas';
import logo from './images/logo192.png'

function App() {
  return (
    <Stage
      width={200}
      height={200}
      scaleMode={ScaleMode.SCALE_TO_FIT}
    >
      <Layer>
        <Rectangle
          x={150}
          y={150}
          width={80}
          height={80}
          backgroundColor="green"
        >
          <Image
            width={50}
            height={50}
            backgroundColor="red"
            borderColor="blue"
            borderWidth={8}
            src={logo}
            rotation={10 * Math.PI / 180}
          />
        </Rectangle>
        <Rectangle
          x={100}
          y={100}
          width={50}
          height={50}
          backgroundColor="violet"
          rotation={10 * Math.PI / 180}
          originX={1}
          originY={1}
          shadowColor="brown"
          shadowOffsetX={10}
          shadowOffsetY={10}
          shadowBlur={5}
        >
          <Circle
            radius={50}
            backgroundColor="gray"
            borderWidth={10}
            borderColor="cyan"
            scaleX={0.5}
            scaleY={0.5}
            originX={1}
            originY={1}
          />
        </Rectangle>
      </Layer>
    </Stage>
  );
}
```