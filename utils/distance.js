export const getManhattanDistance = (pointA, pointB) => {
  return pointA.reduce((acc, _, index) => {
    acc += Math.abs(pointA[index]) + Math.abs(pointB[index])
    return acc;
  }, 0)
}