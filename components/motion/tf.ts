/**
 * One `transform` string for motion. Animating `transform` as a whole lets motion
 * hand the animation to WAAPI so the compositor runs it; separate x/y/rotate/scale
 * values are recomputed in JS every frame and visibly lag behind scrolling on iOS.
 * Every call emits the same function list, so any two values interpolate cleanly.
 *
 * The translate is 3D so the element keeps its GPU layer once the animation ends.
 * With a 2D transform the browser drops the layer at the last frame and repaints
 * the element into the page, which shows as a one-frame white flash. Pass
 * `flat` for things there are many of (per-word heading reveals), where a layer
 * each costs too much memory on iPhone.
 */
export function tf({
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
  flat = false,
}: {
  x?: number | string;
  y?: number | string;
  rotate?: number;
  scale?: number;
  flat?: boolean;
}) {
  const len = (v: number | string) => (typeof v === "number" ? `${v}px` : v);
  const move = flat ? `translate(${len(x)}, ${len(y)})` : `translate3d(${len(x)}, ${len(y)}, 0)`;
  return `${move} rotate(${rotate}deg) scale(${scale})`;
}
