# LESSONS.md

Running log of corrections. Each entry prevents a future mistake.
Read before starting work. Append (don't edit) when something goes wrong.

- Headings get `text-wrap: balance`; body copy gets `text-wrap: pretty`.
- Wire text wrapping into base typography or a shared mixin. Do not re-apply it per component.
- Raster images must ship with `srcset` + `sizes`. The page scales fluidly above the `wide` breakpoint (clamp on root font-size, container max grows to 1600px), so single-resolution images will look soft on large displays.
