# Impeccable Homepage Audit — Concept 16

## Scope and method

This audit reviews only the primary homepage concept, `16-cobalt-signal-report.html`, as a technical-editorial engineering portfolio. It was inspected at 1440 × 900 (desktop), 768 × 1024 (tablet), and 390 × 844 (mobile). No implementation code was changed.

Ranking uses **P0** for a failure of primary navigation or portfolio credibility, **P1** for a significant hierarchy, accessibility, or responsive issue, **P2** for a meaningful refinement, and **P3** for minor polish.

## 1. Structural problems

### P0 — Navigation is present visually but absent functionally

**Evidence:** the desktop and tablet header presents Projects, Research, Notebook, and About, but they are plain text rather than links or buttons. The page contains zero interactive controls. On mobile the navigation is hidden completely, with no menu or alternate route.

**Why it matters:** a technical portfolio needs a credible path from an overview to project evidence. Nonfunctional navigation is particularly damaging here because the compact technical label treatment implies a working journal index. It also fails keyboard accessibility and creates a strong “static concept mockup” signal.

**Recommendation:** make the journal navigation real semantic links, then provide a compact mobile menu or an always-visible index link. If project pages do not yet exist, use honest destinations such as “Selected work — in progress” rather than inert labels.

### P1 — The featured project is not connected to a complete evidence trail

**Evidence:** the page presents project metadata, a result statement, a rectangular image, and a three-row index; none of these lead to a case study, artifact, repository, or expanded record.

**Why it matters:** the design promises editorial engineering documentation but stops at a visually polished summary. The strongest engineering signal—the ability to inspect a model, technical rationale, tests, and revision history—is unavailable.

**Recommendation:** turn the featured project into a real case-study entry point and make the index rows destinations. At minimum, include an explicit “Read project record” link near the result and use the project image/caption as a link to the same record.

### P1 — Metadata and the result are not sufficiently differentiated

**Evidence:** “FEATURED PROJECT,” “TOOLS,” “FOCUS,” and “CURRENT STAGE” establish context, then the adjacent result reiterates the same project without introducing measured evidence. “Prototype Review” and “a working printed enclosure” are status descriptions, not outcomes that can be assessed.

**Why it matters:** this is the boundary between a legitimate engineering journal and a portfolio using technical labels decoratively. Metadata earns its space only when it helps a reader understand scope, method, evidence, or next action.

**Recommendation:** retain only the fields that change interpretation of the work. Replace vague values with project-specific facts: objective, software/version, material/process, iteration number, date, design constraint, or observed test result. Label the result as an observation or outcome and state what was verified.

## 2. Content and hierarchy problems

### P1 — The hero headline is memorable but generic

**Evidence:** “Observe. Model. Test.” describes a broad design/engineering process but does not identify the portfolio’s actual subject matter—CAD, fabrication, remote sensing, or student engineering research—until the smaller supporting line.

**Why it matters:** the first hierarchy level should situate a new visitor immediately. The current slogan could belong to many studios, agencies, or research groups; it does not establish Kinetic Logic Labs’ distinctive point of view.

**Recommendation:** preserve the strong three-beat rhythm as a secondary principle or eyebrow, but use a more specific primary statement that names the work: for example, functional CAD prototypes and spatial research documented through evidence.

### P1 — The first-viewport “result” is still an assertion, not an engineering result

**Evidence:** “A working printed enclosure with a hinged lid and dedicated storage volume” is plausible but does not state dimensions, material, fit criterion, print outcome, iteration, failure avoided, or performance observation.

**Why it matters:** the new result block is directionally correct—it prioritizes outcome—but without a verifiable claim it remains marketing-style project prose.

**Recommendation:** lead with one concrete result and one bounded qualifier, such as material, print process, number of components, or an observed functional behavior. Link the line to the related evidence in the case study.

### P2 — The featured project narrative repeats the same idea three times

**Evidence:** the metadata, result, headline, image caption, introductory paragraph, and fact rows all restate that the project is a compact hinged pencil case made in CAD and printed physically.

**Why it matters:** repeated framing lowers content density while creating an impression of depth. The page needs a clearer progression: question → constraints → method → result → next iteration.

**Recommendation:** assign each section one non-overlapping job. For example, metadata = scope; result = verified outcome; project body = design rationale; fact rows = technical evidence; index = next destinations.

### P2 — The journal index is good framing but weak as an editorial endpoint

**Evidence:** “More work in the journal” lists broad categories rather than named records. The terms “Functional objects and fabrication studies” and “Methods, iteration, and technical reflection” remain taxonomy labels.

**Why it matters:** a journal feels authored by individual entries, dates, and artifacts—not just topic buckets. The current index reads more like a website sitemap than an archive.

**Recommendation:** use actual entry names, short dates, and artifact types: “Pencil Case, Iteration 01 — CAD record,” “Remote Sensing — National event research note,” or “Hinge geometry test — methods note.”

## 3. Visual-system inconsistencies

### P1 — Small coral labels are likely below comfortable contrast on cobalt

**Evidence:** coral is applied to 10 px mono text against deep cobalt for the eyebrow, result label, and section labels. At that size, the color reads subdued rather than functional, especially on a high-density screen.

**Why it matters:** the palette is distinctive and coral is appropriately restrained, but accessibility cannot depend on restraint alone. Small labels carry structural meaning and must remain legible.

**Recommendation:** increase the lightness of the coral for text on cobalt, increase the small-label size/weight, or reserve coral for rules and markers while rendering labels in ivory. Verify all normal-size text against WCAG AA contrast.

### P2 — The type system mixes expressive display and utility type effectively, but the result block becomes overly theatrical at tablet

**Evidence:** desktop uses the large serif hierarchy well. At 768 px, the result title is constrained to a narrow middle column and expands into a nine-line display treatment, visually outweighing the hero and the project image.

**Why it matters:** editorial typography should control reading pace; here, a grid constraint accidentally produces drama and excess vertical weight.

**Recommendation:** introduce a tablet-specific result layout before 768 px—either two columns with the label above the content, or a single-column result. Keep the serif result heading below the hero’s visual weight.

### P2 — The ivory section is calmer, but the shift lacks a connective editorial device

**Evidence:** the blue hero ends at the result block, then the ivory project record begins with a large image and separate coral rule. The transition is clean but reads as two adjacent art directions rather than one continuous journal issue.

**Why it matters:** the requested blue-to-ivory transition is a strong choice; it needs one shared device to feel intentional rather than a page break.

**Recommendation:** carry a single journal element across both fields: a shared figure number, a page/issue folio, aligned content measure, or a continuous rule aligned to the blue metadata grid.

### P3 — The visual identity is strong, but a few labels remain concept-like rather than publication-like

**Evidence:** “JOURNAL / 2026.02,” “CURRENT INDEX,” and “RESULT / 01” create a coherent system, but without dates, authorship, or record links they can feel like UI dressing.

**Recommendation:** keep the labels, but attach them to real editorial metadata: publication date, project date, record ID, author, or revision number.

## 4. Responsive problems

### P0 — Mobile removes navigation without providing an accessible alternative

**Evidence:** at 390 px, the nav is hidden; only the wordmark and journal issue remain. There is no menu button, index link, or skip path.

**Recommendation:** add a real compact menu or a persistent “Index” link at mobile. Ensure keyboard focus, an accessible name, and visible focus treatment.

### P1 — Tablet result grid creates a severe reading-measure failure

**Evidence:** at 768 px the result block keeps its three-column desktop grid. The headline’s available width collapses and it consumes roughly 372 px of vertical height, while the label and summary occupy distant columns.

**Recommendation:** switch the result to one column at the tablet breakpoint, or use a two-column layout with the label above the headline and summary. Test at 768 px, 820 px, and 1024 px.

### P2 — Tablet metadata is dense at the exact point the page becomes more editorial

**Evidence:** the four metadata cells fit at 768 px, but “Fusion 360 · FDM Print” and “Hinged Assembly Design” break into lines and turn the strip into a compact data table.

**Recommendation:** either reduce metadata to three fields, stack key/value pairs at tablet, or shorten values using precise abbreviations only where they remain clear.

### P2 — Mobile has sound content order and no horizontal overflow, but the first screen remains text-heavy

**Evidence:** at 390 px, the metadata correctly becomes a two-by-two grid and the result appears within the first viewport. However, the image/evidence arrives only after a large text sequence.

**Recommendation:** keep the result in the first viewport, but add a small project thumbnail or a compact evidence cue adjacent to it. This would make the technical claim feel grounded before the reader scrolls into the project record.

## 5. Minor polish issues

### P3 — Provide a caption that explains the image’s evidentiary value

**Evidence:** the caption identifies the object, CAD, and FDM fabrication but does not say what the photograph proves or what project stage it depicts.

**Recommendation:** write an evidence-oriented caption, e.g. identify the iteration, visible component state, and what was being evaluated.

### P3 — The blue hero has an unused amount of right-side negative space at desktop

**Evidence:** the hero text uses a 900 px maximum width within a 1140 px content frame, leaving a broad unused right edge while the first evidence image begins below the fold.

**Recommendation:** preserve the restrained editorial layout, but use the surplus space for a small issue marker, project thumbnail, or concise status table—only if it adds real evidence. Otherwise tighten the hero measure slightly so the opening feels more intentional.

### P3 — Surface the project’s revision state more precisely

**Evidence:** “Prototype Review” communicates currentness but not which version is represented or what review entails.

**Recommendation:** use a bounded status such as “Iteration 01 / printed” or “Revision 02 / hinge fit under review,” with the project date.

## Priority order

1. Make navigation and all index destinations functional, including a mobile alternative.
2. Repair the tablet result layout and test the metadata strip at intermediate widths.
3. Replace generic result language with concrete, evidence-linked project information.
4. Tighten the content progression to remove repetition and make each section earn its label.
5. Verify contrast for coral labels and add real publication/project metadata.
