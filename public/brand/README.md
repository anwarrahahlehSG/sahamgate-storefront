# SahamGate brand assets

Referenced only through `shopConfig.brand.assets` (`lib/config/index.ts`).

| File             | Source                                                                                                             | Conversion                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `logo.svg`       | Official SahamGate logo supplied by the owner (84×84 JPEG, gold mark and "SAHAM GATE" on black)                    | None to the artwork: the original JPEG is embedded byte-for-byte in an SVG wrapper. No tracing or redrawing.              |
| `logo-dark.svg`  | Same file as `logo.svg`                                                                                            | The supplied logo is already gold on black, which is the dark-background version. No separate light variant exists yet.   |
| `favicon.ico`    | Same supplied logo                                                                                                 | Downscaled into a multi-size ICO (16, 32, 48, 64 px). The live sahamgate.com has no favicon (`/favicon.ico` returns 404). |
| `og-default.jpg` | Not added yet. Should be the live share image `https://www.sahamgate.com/cdn/shop/files/IMG_8141.jpg?v=1748546476` | Pending: that host is not yet reachable from the build environment.                                                       |

The live sahamgate.com header uses plain text ("Saham Gate"), not a logo file.

Replace `logo.svg` and `logo-dark.svg` with the vector original when available. The current files are a small raster and will look soft when displayed larger than 84 px.
