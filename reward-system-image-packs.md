# Reward System Image Packs

Use one pack per theme. Keep every PNG transparent, centered, and isolated. Do not include text, numbers, UI, borders, watermarks, or mock poster paths in any generated image.

Background JPGs should be full-bleed A4-ish poster backgrounds at `1200x2000`, with soft detail around the edges and calmer open space through the middle for the SVG road, circles, labels, and user text.

## Shopify Asset Workflow

The generated source packs can stay in numbered folders, but Shopify theme assets should use a flat, lowercase naming scheme because the theme `assets/` directory is flat:

- `reward-system-theme-{theme}-background.jpg`
- `reward-system-theme-{theme}-reward.png`
- `reward-system-theme-{theme}-mini-reward.png`
- `reward-system-theme-{theme}-sticker.png`
- `reward-system-theme-{theme}-path-texture.png`

Current themes use these slugs: `castle`, `princess`, `garden`, `space`, `ocean`, `candy`, `dino`.

To replace art for an existing theme, keep the same production filename and overwrite the file in `assets/`. No JavaScript change is needed. To add a new theme, add a matching theme object in `assets/reward-system.js`, add its asset URLs to the JSON map in `sections/reward-system.liquid`, and follow the same filename pattern.

## Pack 01: Castle Quest

- `background01-themeCastle.jpg` - `1200x2000` - Warm medieval reward-map background, sunny castle courtyard, parchment-gold ground, soft blue sky, distant stone walls and towers near the edges, whimsical children's board-game style, open central space, no text, no numbers, no path.
- `reward01-themeCastle.png` - `300x300` - Transparent PNG, cute treasure chest overflowing with gold coins and small jewels, warm medieval fantasy style, front view, no text.
- `miniReward01-themeCastle.png` - `220x220` - Transparent PNG, shiny gold coin stack with one star sparkle, kid-friendly illustration, no text.
- `sticker01-themeCastle.png` - `512x512` - Transparent PNG, circular reward sticker badge artwork for kids, golden castle shield with a bright star and tiny gem sparkles, centered inside a perfect circle, bold cheerful board-game style, no text, no numbers, no cut line, no mockup, transparent outside the circular badge.
- `pathTexture01-themeCastle.png` - `800x220` - Transparent seamless scatter texture tile for overlaying on a curved golden path: small irregular tan cobblestone chips, tiny crown-shaped flecks, soft parchment speckles, sparse and randomized across the full canvas, tileable on all edges, no continuous road strip, no borders, no lane lines, no circles, no numbers, no text.

## Pack 02: Princess Garden

- `background02-themePrincess.jpg` - `1200x2000` - Pastel princess garden background, lavender sky, rose bushes, distant castle silhouettes near edges, soft golden ground, magical sparkles, open central space, no text, no numbers, no path.
- `reward02-themePrincess.png` - `300x300` - Transparent PNG, polished golden crown with pink and purple gems, friendly toy-like illustration, no text.
- `miniReward02-themePrincess.png` - `220x220` - Transparent PNG, single faceted heart gem with tiny sparkles, pink and lavender, no text.
- `sticker02-themePrincess.png` - `512x512` - Transparent PNG, circular reward sticker badge artwork for kids, faceted heart jewel with a tiny crown and magical sparkle dust, pastel pink lavender and gold, centered inside a perfect circle, bold cheerful board-game style, no text, no numbers, no cut line, no mockup, transparent outside the circular badge.
- `pathTexture02-themePrincess.png` - `800x220` - Transparent seamless scatter texture tile for overlaying on a curved pastel path: tiny pearl dots, small heart sparkles, soft gold glitter flecks, very light magical dust, sparse and randomized across the full canvas, tileable on all edges, no continuous ribbon strip, no borders, no lane lines, no circles, no numbers, no text.

## Pack 03: Playful Garden

- `background03-themeGarden.jpg` - `1200x2000` - Bright garden play-map background, cream paper sky, soft grass shapes, flowers and leaves around edges, open middle, gentle preschool illustration style, no text, no numbers, no path.
- `reward03-themeGarden.png` - `300x300` - Transparent PNG, cheerful wrapped gift with leaf ribbon and sparkles, no text.
- `miniReward03-themeGarden.png` - `220x220` - Transparent PNG, small wrapped present with star sparkles, no text.
- `sticker03-themeGarden.png` - `512x512` - Transparent PNG, circular reward sticker badge artwork for kids, happy flower medal with leaves, tiny petals and star sparkles, fresh garden greens and warm yellow, centered inside a perfect circle, bold cheerful board-game style, no text, no numbers, no cut line, no mockup, transparent outside the circular badge.
- `pathTexture03-themeGarden.png` - `800x220` - Transparent seamless scatter texture tile for overlaying on a curved garden path: tiny leaf marks, soft grass strokes, small flower petal flecks, pale trail speckles, sparse and randomized across the full canvas, tileable on all edges, no continuous trail strip, no borders, no lane lines, no circles, no numbers, no text.

## Pack 04: Space Quest

- `background04-themeSpace.jpg` - `1200x2000` - Soft children's space-map background, pale blue cosmos, friendly planets and moons around edges, tiny stars, open central space, no text, no numbers, no path.
- `reward04-themeSpace.png` - `300x300` - Transparent PNG, cute rocket ship with warm orange flame and star sparkles, no text.
- `miniReward04-themeSpace.png` - `220x220` - Transparent PNG, small yellow star badge or mini supply pod, no text.
- `sticker04-themeSpace.png` - `512x512` - Transparent PNG, circular reward sticker badge artwork for kids, smiling star medal with tiny rocket trail and planet sparkles, blue violet and sunny yellow, centered inside a perfect circle, bold cheerful board-game style, no text, no numbers, no cut line, no mockup, transparent outside the circular badge.
- `pathTexture04-themeSpace.png` - `800x220` - Transparent seamless scatter texture tile for overlaying on a curved space path: tiny stars, comet dust dots, small planet-ring flecks, soft cosmic speckles, sparse and randomized across the full canvas, tileable on all edges, no continuous galaxy strip, no borders, no lane lines, no circles, no numbers, no text.

## Pack 05: Ocean Adventure

- `background05-themeOcean.jpg` - `1200x2000` - Gentle ocean adventure background, turquoise water, sandy bottom band, coral and shells near edges, soft sunlight rays, open central space, no text, no numbers, no path.
- `reward05-themeOcean.png` - `300x300` - Transparent PNG, treasure pearl shell with small sea gems, no text.
- `miniReward05-themeOcean.png` - `220x220` - Transparent PNG, cute shell token with tiny bubbles, no text.
- `sticker05-themeOcean.png` - `512x512` - Transparent PNG, circular reward sticker badge artwork for kids, pearl shell medal with bubbles, coral flecks and tiny sea-star sparkles, aqua turquoise and soft pink, centered inside a perfect circle, bold cheerful board-game style, no text, no numbers, no cut line, no mockup, transparent outside the circular badge.
- `pathTexture05-themeOcean.png` - `800x220` - Transparent seamless scatter texture tile for overlaying on a curved ocean path: tiny bubbles, shell chips, soft foam dots, small coral flecks, sparse and randomized across the full canvas, tileable on all edges, no continuous river strip, no borders, no lane lines, no circles, no numbers, no text.

## Pack 06: Candy Parade

- `background06-themeCandy.jpg` - `1200x2000` - Candy kingdom background, pastel pink sky, gumdrop hills and candy canes around edges, soft cream center, joyful board-game illustration, no text, no numbers, no path.
- `reward06-themeCandy.png` - `300x300` - Transparent PNG, big wrapped candy prize box with teal ribbon, no text.
- `miniReward06-themeCandy.png` - `220x220` - Transparent PNG, small wrapped candy with sparkles, no text.
- `sticker06-themeCandy.png` - `512x512` - Transparent PNG, circular reward sticker badge artwork for kids, wrapped candy medal with sprinkles, sugar crystals and tiny stars, pink teal and butter yellow, centered inside a perfect circle, bold cheerful board-game style, no text, no numbers, no cut line, no mockup, transparent outside the circular badge.
- `pathTexture06-themeCandy.png` - `800x220` - Transparent seamless scatter texture tile for overlaying on a curved candy path: colorful sprinkles, sugar crystals, tiny candy confetti dots, soft frosting speckles, sparse and randomized across the full canvas, tileable on all edges, no continuous candy strip, no borders, no lane lines, no circles, no numbers, no text.

## Pack 07: Dino Trail

- `background07-themeDino.jpg` - `1200x2000` - Friendly prehistoric valley background, warm cream sky, green jungle edges, rounded volcano and hills far away, playful child-safe dinosaur theme, open central space, no text, no numbers, no path.
- `reward07-themeDino.png` - `300x300` - Transparent PNG, colorful dinosaur egg nest with sparkles, no text.
- `miniReward07-themeDino.png` - `220x220` - Transparent PNG, small fossil badge or leaf token, no text.
- `sticker07-themeDino.png` - `512x512` - Transparent PNG, circular reward sticker badge artwork for kids, friendly dinosaur egg medal with a tiny footprint, fern leaves and golden sparkles, jungle green warm sand and orange, centered inside a perfect circle, bold cheerful board-game style, no text, no numbers, no cut line, no mockup, transparent outside the circular badge.
- `pathTexture07-themeDino.png` - `800x220` - Transparent seamless scatter texture tile for overlaying on a curved prehistoric path: tiny fossil chips, soft dino footprint marks, small leaf flecks, sandy stone speckles, sparse and randomized across the full canvas, tileable on all edges, no continuous trail strip, no borders, no lane lines, no circles, no numbers, no text.
