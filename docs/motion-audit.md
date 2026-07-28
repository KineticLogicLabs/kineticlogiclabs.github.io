# Kinetic Logic Labs Motion Audit

## Scope and current architecture

The production portfolio is a Vite 6 and React 19 single-page application. Navigation uses a small hash router implemented in `App.tsx`; the supported routes are Home, About, Projects, Repository, and Contact. The shared header and footer remain mounted while page content changes.

The active production surface does not currently use an animation library. The `motion` package and several older animated components remain installed in the repository, but none are imported by the current `App.tsx`. Those legacy files include scroll-driven and spring-based behavior that should not be reintroduced into the approved technical-editorial portfolio.

## Current motion behavior

Route changes replace the main page immediately and call `window.scrollTo(0, 0)`. Browser back and forward work through `hashchange`, but there is no visual continuity between outgoing and incoming content.

Desktop navigation has an immediate color and active-rule change. The logo is a functional home link, but it has no clear press feedback. The mobile navigation uses native `details` and `summary`, so it is semantic and keyboard operable, but opening and closing are visually abrupt. Escape does not close the menu, focus is not explicitly returned to the summary, and selecting a route does not explicitly close the disclosure.

Major sections, result bands, project media, and index groups appear immediately. This keeps content available without JavaScript, but the transition between the cobalt introduction and ivory documentation area has no visual handoff. Images reserve space through fixed responsive heights, although they do not communicate loading state and all repository media is loaded eagerly.

Links, buttons, project rows, and media links have inconsistent feedback. Some use underline or color changes, while others change without a shared duration or easing system. Focus indicators are visible and high contrast, but there is no `prefers-reduced-motion` policy.

## Findings

### Missing interaction feedback

- Route changes need a short fade and minimal vertical shift while keeping the persistent header stationary.
- Navigation, logo, text links, repository rows, image links, and the contact action need a consistent hover, focus, and press vocabulary.
- The mobile menu needs an explicit open state, Escape support, focus restoration, and automatic closure after route selection.
- Major media and section groups need a restrained, one-time reveal to establish hierarchy without fragmenting paragraphs or metadata.
- Images need a reserved aspect ratio, lazy loading below the fold, and a non-blocking loaded state.

### Inconsistent timing and easing

The production stylesheet does not define motion tokens. Interaction changes are currently immediate, while unused legacy components contain durations ranging from 150 ms to 1,000 ms, springs, automatic carousels, continuous animation frames, and scroll-controlled behavior. Reusing those values would make the current site feel inconsistent and overly demonstrative.

### Unnecessary motion to avoid

The unused legacy system contains autoplaying media, spring transitions, scrolling observers, programmatic smooth scrolling, image scaling up to 10%, cipher text, and scroll-scrubbing logic. None is appropriate for the approved portfolio direction. The new pass should remain CSS- and platform-led, with one small IntersectionObserver utility.

### Accessibility concerns

- No reduced-motion media query currently suppresses transforms or route transitions.
- The native mobile disclosure does not close on Escape or return focus deliberately.
- A disclosure animation must not hide content from assistive technology or make navigation depend on hover.
- Loaded-state styling must leave images visible when JavaScript is unavailable.

### Performance risks

The current active page is lightweight, but the repository still includes an unused animation dependency and animation-heavy legacy components. The production implementation should avoid importing them. Only opacity and transform should animate; layout properties should not be driven per frame. Below-the-fold images should use native lazy loading and decoding hints. Intersection observers should disconnect after the first reveal.

## Implementation plan

1. Define shared duration, easing, and reveal-distance tokens in CSS.
2. Add a lightweight route stage that applies an exit class, updates the hash-driven page without delaying navigation, then performs a short entrance.
3. Replace the mobile `details` disclosure with a controlled semantic button and navigation panel so Escape, focus restoration, route selection, and ARIA state are reliable.
4. Add one-time IntersectionObserver reveals to major sections and media groups only. Content remains visible by default and is enhanced after JavaScript initializes.
5. Normalize hover, focus, and active feedback for navigation, buttons, project rows, and clickable images.
6. Add intrinsic dimensions, lazy loading, asynchronous decoding, and loaded-state opacity for project media.
7. Add a comprehensive `prefers-reduced-motion` override that removes entrance movement and route motion while retaining immediate state feedback.
8. Validate all five routes, back/forward navigation, Escape behavior, keyboard focus, overflow, and major responsive layouts at the six required viewport sizes.
