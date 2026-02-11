# Style Guide

Design and pedagogy rationale for the Agent Protocol Tech Tree.

---

## Visual Aesthetic

### Reference Point: 1-bit Macintosh

The look aims to evoke early Macintosh software — Susan Kare's Chicago
font era, HyperCard, MacPaint. Not a pixel-perfect recreation, but a
feel: high-contrast, no gradients, square corners, monospace type,
and the distinctive hover-to-invert interaction where a selected item
flips to white-on-black.

Concrete rules that maintain this:

- **No border-radius.** Every box, button, and badge is a sharp
  rectangle.
- **No gradients or shadows.** Depth is conveyed through borders and
  inversion, never through lighting effects.
- **No color.** The palette is grayscale only: `#fafafa` background,
  `#111` foreground, with `#666`, `#999`, `#ccc` for hierarchy. If
  color is introduced later (e.g., for era bands or category coding),
  it should be flat posterized tones — think 4-color CGA, not
  Material Design.
- **Thick borders.** Key structural elements (header, protocol boxes,
  animation stage, buttons) use 2–3px solid borders. Lighter 1px
  borders and dashed lines are for secondary structure (groups,
  section labels).
- **Monospace everywhere.** The entire app uses a monospace stack
  (`SF Mono`, `Monaco`, `Inconsolata`, `Fira Mono`, falling back to
  `Courier New`). This reinforces the "terminal / old computer" feel
  and keeps code snippets visually consistent with prose.

### Interaction Inversion

Hover and focus states on interactive elements invert to white-on-black.
This is the single most recognizable old-Mac interaction pattern. It
applies to:

- Tree node boxes (full background invert)
- The back button
- JSON preview snippets (text darkens on hover)

The inversion transition is deliberately fast (`0.1s`) — it should feel
snappy, not smooth.

### Icon Placeholders

Icons are currently placeholder boxes showing short text codes:

| Actor/Protocol | Code  | Intended future icon             |
|---------------|-------|----------------------------------|
| Inference API | `>_`  | Terminal prompt cursor            |
| Tool Calling  | `f(x)`| Function call notation            |
| Tool Schemas  | `{}`  | JSON/schema braces                |
| MCP           | `<>`  | Plug / connector                  |
| AGENTS.md     | `#`   | Markdown heading                  |
| llms.txt      | `//`  | Path / comment                    |
| Agent Skills  | `pkg` | Package                           |
| A2A           | `<>`  | Bidirectional / handshake         |
| UCP           | `$`   | Commerce / currency               |
| Agent Identity| `id`  | Fingerprint / credential          |

In the animation stage, actor icons use type codes (`APP`, `SRV`,
`AGT`, `LLM`, `SHOP`, `REG`, `WEB`, `REPO`, `SKILL`). These should
eventually become pixel-art-style icons — small (28×28 or 56×56),
1-bit black-and-white, hand-drawn feel. Think Susan Kare icon grid.

### Typography Scale

All sizes are in `rem` relative to a `15px` base. The scale is
intentionally compressed — this is a dense, information-rich interface,
not a marketing page.

| Element               | Size      | Weight | Transform    |
|-----------------------|-----------|--------|-------------|
| Tree title            | 1.6rem    | 900    | uppercase   |
| Detail tagline        | 1.5rem    | 800    | —           |
| Detail header h1      | 1.1rem    | 900    | uppercase   |
| Section body text     | 1rem      | —      | —           |
| Node title (tree)     | 0.85rem   | 800    | —           |
| Step title            | 0.75rem   | 800    | uppercase   |
| Section labels        | 0.65rem   | 800    | uppercase   |
| Node tagline          | 0.65rem   | —      | —           |
| Arrow labels          | 0.6rem    | 700    | uppercase   |
| JSON previews         | 0.55rem   | —      | —           |
| Era labels            | 0.65rem   | —      | uppercase   |
| Group labels          | 0.55rem   | —      | uppercase   |

`letter-spacing` increases with `text-transform: uppercase` (generally
`0.06em`–`0.14em`) for readability at small sizes. Body text uses
minimal spacing.

---

## Pedagogical Structure

### Why a Tech Tree

The Civilization tech tree is a widely recognized visual metaphor for
"things you have to build before you can build other things." It
immediately communicates:

1. **There is a progression.** You can't understand MCP without first
   understanding that models can call tools.
2. **Branches are real choices.** MCP, instruction surfaces, and A2A
   are parallel developments that stem from the same foundation, not
   a linear sequence.
3. **It's explorable.** You can read left-to-right for the full story,
   or click into any node that catches your eye.

### What's Included (and Excluded)

The tree is curated for pedagogical clarity, not completeness.

**Included — the established, pedagogically useful stack:**

| Layer | Protocols | Why |
|-------|-----------|-----|
| 0 | Inference API | The foundation — without a stable model API, nothing else works |
| 1 | Tool Calling | The capability that makes agents possible |
| 2 | Tool Schemas | Portability layer — describe a tool once, use it everywhere |
| 3 | MCP | The N×M problem solved for tool connectivity |
| 3 | AGENTS.md, llms.txt, Agent Skills | Context/knowledge packaging — three complementary conventions |
| 3 | A2A | Agent-to-agent coordination across vendors |
| 4 | UCP | Domain protocol for commerce |
| 4 | Agent Identity | Domain protocol for verified agents on the web |

**Excluded:**

- **Layer 0 web primitives** (HTTP, OAuth, JSON) — prerequisite to
  everything, but not agent-specific. Including them would dilute the
  tree's focus.
- **ChatGPT Plugins** — replaced by MCP in practice. Mentioned in Tool
  Schemas content as historical context.
- **ACP (IBM/BeeAI)** — similar goal to A2A but less adopted. Omitted
  to avoid confusion with the identically-acronymed OpenAI/Stripe
  commerce protocol.
- **ANP, agent:// URI, agents.json** — speculative / early-stage.
  Interesting but not yet established enough to teach as part of the
  stack.
- **HCP** — research-stage, name collision issues.
- **AP2, MCP Apps** — extensions that can be mentioned in parent
  protocol detail pages but don't warrant their own tree nodes yet.

### Detail Page Structure

Every detail page follows the same five-section template. The order is
intentional:

1. **What it solves** — Lead with the problem. The reader should
   understand *why this exists* before learning how it works. Written
   in plain language; no jargon that hasn't been introduced yet.

2. **How it works** — Static scene diagrams showing protocol flows.
   This is the core teaching tool. See "Scene Pedagogy" below.

3. **Why it's an open protocol** — The interoperability argument. This
   answers "why should I care that it's a standard?" in one or two
   sentences. Positioned after the scenes so the reader has
   concrete understanding of what "interoperable" means in this
   context.

4. **Where it came from** — Brief origin story. Grounds the protocol
   in history so it feels real, not abstract.

5. **Who maintains it** — Governance and adoption. Tells the reader
   whether this is a one-company proposal or a community standard.

### Scene Pedagogy

The "How it works" section displays static scene diagrams: each scene
is a card with step text on the left and an animation stage (actors +
message arrows) on the right, stacked vertically.

**The key pedagogical move is the swap scene.** Every protocol's
scenes follow the same arc:

1. **Show the basic flow** — two actors exchanging messages in the
   protocol.
2. **Show the interoperability moment** — one actor is swapped out for
   a different implementation, and the same protocol still works.
   This is marked with the sparkle badge (✦ INTEROPERABLE).

This pattern makes the abstract concept of "interoperability" concrete
and visceral. The reader *sees* OpenAI get replaced by Anthropic and
the message format stay the same. They *see* a different MCP client
connect to the same server.

**Actors are consistent across protocols.** The same icon types
(APP, SRV, AGT, etc.) appear wherever that role appears. "Your App"
always looks like an APP box. This builds recognition: by the time the
reader reaches A2A, they already know what an AGT box means.

**Messages have two layers:**

- **Preview** — a one-line code snippet visible by default. Enough to
  see the shape of the protocol ("oh, it's JSON-RPC") without
  overwhelming non-technical readers.
- **Full detail** — the real message payload, shown on click. Uses
  actual protocol examples from specs and documentation. This is the
  "code-level" view for technical readers.

The `[+]` expand hint is deliberately subtle — it doesn't compete
with the visual flow, but signals to curious readers that there's
more to see.

---

## Data Architecture

### YAML as Single Source of Truth

All content lives in `data.yaml`. The rendering code (`app.js`) is a
generic engine that reads the YAML and displays it. This separation
means:

- **Content edits don't require code changes.** Adding a protocol,
  tweaking a description, or adjusting animation scenes is a YAML
  edit.
- **The tree structure is data.** Node positions, dependencies, and
  groupings are declared, not computed. This keeps the layout explicit
  and auditable.
- **Animation sequences are data.** Each scene declares its visible
  actors, messages, and sparkle state. The JS renderer is a simple
  state machine that reads this data.

### YAML Schema

```yaml
protocols:
  - id: string           # URL-safe identifier, used in hash routing
    title: string         # Display name
    icon_alt: string      # Short placeholder text for icon box
    tagline: string       # One-line description
    tree:
      col: int            # Horizontal position (era)
      row: int            # Vertical position within era
      depends_on: [id]    # Prerequisite protocol IDs
    detail:
      what_it_solves: string
      why_open: string
      where_from: string
      who_maintains: string
    animation:
      actors:
        - id: string      # Unique within this protocol
          label: string   # Display name
          type: string    # One of: app, model, server, agent,
                          #   file, repo, website, registry,
                          #   merchant, skill
      scenes:
        - title: string
          description: string
          actors_visible: [actor_id]  # Ordered left-to-right
          sparkle: bool               # Optional; triggers badge
          messages:
            - from: actor_id
              to: actor_id
              label: string           # Arrow label (uppercase)
              json_preview: string    # One-line code preview
              json_full: string       # Optional; full payload
```

### What YAML Can't (Yet) Capture

The animation rendering logic — how actors are positioned, how arrows
are drawn, how transitions happen — lives in JS. This is intentional:
the YAML describes *what* to show, the JS decides *how* to show it.

If animations need more fine-grained control in the future (e.g.,
custom actor positions, multi-step transitions within a scene,
annotations), the YAML schema can be extended with optional fields
rather than moving logic into the data.

---

## Accessibility

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- Scroll behavior switches from `smooth` to `auto`

Scene diagrams are fully static and require no motion accommodations.

### Keyboard Navigation

- Tree nodes are focusable (`tabindex="0"`) and activated with
  Enter or Space
- JSON expand buttons have `role="button"`, `tabindex="0"`, and
  respond to Enter
- The back button is a native `<button>` element

### Screen Reader Considerations

- Tree nodes have `aria-label` combining title and tagline
- Icon boxes are `aria-hidden="true"` (they're decorative placeholders)
- Section labels are plain text headings (not `<h2>`/`<h3>` — this
  could be improved)

---

## Layout Geometry

### Tree Grid

The tree uses a CSS grid with fixed cell dimensions:

- Cell: 260px × 100px
- Box: 204px × 80px (centered in cell)
- SVG connections use right-angle (Manhattan) routing with arrowhead
  markers
- Midpoint of each connection is at the horizontal center between
  source and target cells

Group outlines (dashed rectangles) are absolutely positioned over the
grid with 10px padding around member nodes.

### Detail Page

- Max content width: 900px, centered
- Body text max width: 640px (for readable line length)
- Scene cards: text panel (240px fixed) on left, stage on right
- On narrow screens (`< 900px`), scene cards stack vertically

---

## Extending the Design

### Adding a Protocol

1. Add an entry to `data.yaml` following the schema above
2. Choose a `col`/`row` position and update `depends_on`
3. Write all five detail sections
4. Define actors and 3–4 scenes (basic flow + sparkle swap)
5. Add it to a `group` if appropriate
6. Update `eras` if adding a new column

### Replacing Icon Placeholders

When real icons are ready:

1. Replace the text in `.node-icon` / `.actor-icon` / `.header-icon`
   with `<img>` tags
2. Icons should be 1-bit (black on transparent), sized to the
   container (28×28 for tree nodes, 56×56 for animation actors,
   32×32 for detail headers)
3. The pixel-art style should be consistent: uniform stroke weight,
   no anti-aliasing, minimal detail — icons should read at small
   sizes
4. Consider providing a single sprite sheet or inline SVGs to avoid
   network requests

### Adding Animation Control to YAML

If scenes need more expressiveness, consider adding:

- `actor_positions: {id: percentage}` — override default even spacing
- `note: string` — annotation text displayed on the stage
- `delay: number` — suggested pause before advancing (for auto-play)
- `highlight: [actor_id]` — visually emphasize specific actors
