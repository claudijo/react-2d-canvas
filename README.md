# React 2D Canvas

Draw text, images, and shapes on an HTML Canvas element using a declarative JSX syntax. The library is light weight and builds on top of custom web components from the  Web Components standard. 

React 2D Canvas was created with simple and resource efficient 2D canvas games in mind.


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

All components and the `ScaleMode` name space are exported individually from the main package.

```js
import { Stage, ScaleMode, Layer, Rectangle /* etc */ } from 'react-2d-canvas';
```

### \<Stage>

The `<Stage>` component is the outermost container and should have one or several `<Layer>` child components.
The `<Stage>` component handles the dimensions and scaling of the child `<Layer>` components.

```jsx
import { Stage, ScaleMode } from 'react-2d-canvas';

<Stage width={600} height={400} scaleMode={ScaleMode.SCALE_TO_FIT}>
  {/*...*/}
</Stage>
```

Properties | &nbsp;
--- | ---
`scaleMode` | Controlling how the child `<Layer>` components scale. Available options are `ScaleMode.SCALE_TO_FIT` or `ScaleMode.SCALE_TO_COVER`
`width` | Setting the width of the child `<Layer>` components.
`height` | Setting the height of the child `<Layer>` components.
`backgroundColor` | Setting the background color for the `<Stage>` component. Accepts a CSS color value.

### \<Layer>

```js
import {
  Stage,
  ScaleMode,
  Layer
} from 'react-2d-canvas';

<Stage
  width={600}
  height={400}
  scaleMode={ScaleMode.SCALE_TO_FIT}
>
  <Layer>
    {/* Static background comoponents */}
  </Layer>
  <Layer>
    {/* Game play action and animation components */}
  </Layer>
  <Layer>
    {/* UI and interactive components */}
  </Layer>
</Stage>
```

Each `<Layer>` component holds an HTML Canvas element. Using multiple sibling `<Layer>` components can be a way of
optimizing canvas redrawing when animating content. See for
instance [Use multiple layered canvases for complex scenes](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas#use_multiple_layered_canvases_for_complex_scenes)
for a detailed explanation of this optimization strategy.

The follwoing event handlers passed to the `<Layer>` component will be forwarded to the underlying HTML `<canvas>`
element. Note that event handlers are typically not passed to the `<Layer>` component. Instead, attach them directly on
the different child components, such as `<Rectangle>`, `<Circle>` etc.

* onClick,
* onMouseMove,
* onMouseDown,
* onMouseUp,
* onDoubleClick,
* onContextMenu,
* onMouseOut,
* onMouseOver,

### Shapes

Shape components, such as `<Rectangle>`, `<Circle>`, and `<Label>` are available to represent different graphical elements and user interface controls.

All shape components have the following attributes:

Properties | Description | Default value
--- | --- | ---
`x` | X-coordinate | `0`
`y` | Y-coordinate | `0`
`backgroundColor` | Background color  expressed as a CSS color string | &nbsp;
`borderColor` | Border color expressed as a CSS color string
`borderWidth` | Border width in pixels | `1`
`opacity` | Opacity in the range of `0` to `1` | `1`
`originX` | Origin on the x-axis in relation to the width of the shape, in the range of `0` to `1`.<br /><br />A value of `0` will left align the shape, `0.5` will center align, and `1` will right align the shape. Also affects the rotation origin.  | `0.5`
`originY` | Same as `originX`, but related to the y-axis.  | `0.5`
`rotation` | Rotation in radians. The rotation origin is controlled by the values of `orignX` and `originY` | `0`
`scaleX` | Scaling factor in horizontal direction.  | `1`
`scaleY` | Scaling factor in the vertical direction. | `1`
`shadowColor` | Shadow color expressed as a CSS color string. | &nbsp;
`shadowBlur` | Level of shadow blur. | `0`
`shadowOffsetX` | Distance that shadows will be offset horizontally. | `0`
`shadowOffsetY` | Distance that shadows will be offset vertically. | `0`
`borderDash` | String of comma separated numbers that define the border dash pattern. | &nbsp; 


### Nesting and Inheritance

Shape components can be nested. Child components will be affected by the following attributes of their parent component:

Properties affected by ancestor | &nbsp;
--- | ---
`x` | Child's x-coordinate will be an offset of the parent's x-coordinate
`y` | Same as above, but for the y-coordinate
`opacity` | Child's opacity will be multiplied by the parent's opacity
`rotation` | Child's rotation will be increased by the parent's rotation

Nesting components makes it possible to update the relative position, opacity and rotation of a group of child
components, by just changing the corresponding property on their common ancestor.

### \<Rectangle>

```js
import {
  Stage,
  ScaleMode,
  Layer,
  Rectangle
} from 'react-2d-canvas';

<Stage
  width={600}
  height={400}
  scaleMode={ScaleMode.SCALE_TO_FIT}
>
  <Layer>
    <Rectangle
      x={100}
      y={100}
      backgroundColor="#666"
    />
  </Layer>
</Stage>
```