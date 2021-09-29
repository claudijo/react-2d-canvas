# React 2D Canvas

Draw text and shapes on a HTML Canvas element using a declarative JSX syntax

## Property Inheritance
Child elements will be affected by the following properties of their parent elements:

`x` – Child's x-coordinate will be an offset of the parent's x-coordinate

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
## API
All components exported separately from the main package.

### Stage
The `<Stage>` component is the main container component that can has one or several `<Layer>` child components. It handles the dimensions and scaling of the child `<Layer>` components.

Property | Description
--- | ---
`scaleMode` | Controlling how the child `<Layer>` components scale. Available options are `ScaleMode.SCALE_TO_FIT` or `ScaleMode.SCALE_TO_COVER`
`width` | Setting the width of the child `<Layer>` components.
`height` | Setting the height of the child `<Layer>` components.
`backgroundColor` | Setting the background color for the `<Stage>` component. Accepts a CSS color value.

### Layer
Each `<Layer>` component holds an HTML Canvas element. Using multiple sibling `<Layer>` components can be a way of optimizing canvas redrawing when animating content, see for instance [Use multiple layered canvases for complex scenes](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#use_multiple_layered_canvases_for_complex_scenes).

The `<Layer>` compoents accept a number of even handler properties that are attached to the underlying canvas element. Typically, you would not attach the event handlers to the `<Layer>` element, and instead attach them to   

Property | Description
--- | ---
`onClick` | Click event handler that will be attached to the underlying Canvas element. 
`onMouseMove` | Mouse move event handler that will be attached to the underlying Canvas element. 
`onMouseDown` | Mouse down event handler that will be attached to the underlying Canvas element. 
`onMouseUp` | Mouse up event handler that will be attached to the underlying Canvas element. 
`onDoubleClick` | Double click event handler that will be attached to the underlying Canvas element. 
`onContextMenu` | Context menu event handler that will be attached to the underlying Canvas element. 
`onMouseOut` | Mouse out event handler that will be attached to the underlying Canvas element. 
`onMouseOver` | Moouse over event handler that will be attached to the underlying Canvas element. 
