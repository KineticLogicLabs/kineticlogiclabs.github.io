/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Program, SyllabusWeek, StudentProject } from './types';

export const programs: Program[] = [
  {
    id: 'kll-101',
    code: 'KLL-101',
    title: '3D CAD Design and Modeling with Fusion',
    tagline: 'Parametric CAD, volumetric assembly, mesh topology, and spatial geometry.',
    description: 'Master solid and surface parametric modeling within Fusion. Learn sketch constraints, volumetric solid assemblies, joint motion configuration, and precision digital fabrication export pipelines.',
    duration: '12 Weeks',
    level: 'Beginner to Advanced',
    curriculumSummary: [
      'Parametric Sketching & Geometric Constraints',
      'Solid Assembly Modeling & Volumetric Joints',
      'Surface T-Spline Form Creation',
      'Rendering, Stress Testing, & Fabrication Export'
    ],
    features: [
      'Weekly architectural critique cycles',
      '1-on-1 expert mesh feedback'
    ]
  },
  {
    id: 'kll-102',
    code: 'KLL-102',
    title: 'One-Day Introduction to CAD and Fusion',
    tagline: 'A fast-paced, immersive single-day bootcamp to learn the essentials of Fusion 3D designing.',
    description: 'Get comfortable with standard sketch environments, basic modeling, and the key mechanics of Fusion. Perfect for absolute beginners wanting a hands-on introduction.',
    duration: '1 Day',
    level: 'Beginner',
    curriculumSummary: [
      'UI Navigation & 2D Sketch Constraints',
      'Extruding, Revolving & Basic Solid Features',
      'Simple Component Assemblies & Joints',
      'Preparing Models for Slicing & 3D Printing'
    ],
    features: [
      'All tools and software setup provided',
      'Take-home reference cheat sheet'
    ]
  }
];

export const syllabusWeeks: SyllabusWeek[] = [
  {
    week: 'Weeks 01–04',
    title: 'Mathematical Rigor',
    theme: 'Linear Space & Homogeneous Transformation',
    details: 'Vector mechanics, 3D coordinate transformations, and projection matrices.'
  },
  {
    week: 'Weeks 05–08',
    title: 'Procedural Topology',
    theme: 'Parametric Meshes & Curve Synthesis',
    details: 'Generating analytical math shapes (Torus Knot, Mobius Strip, Klein Bottle).'
  },
  {
    week: 'Weeks 09–12',
    title: 'Computational Lighting',
    theme: 'Subdivision Surfaces & Vertex Shader Shading',
    details: 'Implementing subdivision algorithms and face normal lighting calculations.'
  },
  {
    week: 'Weeks 13–16',
    title: 'Dynamic Deformations',
    theme: 'Kinetic Waves, Modulators & 3D Fabrication',
    details: 'Real-time vertex displacement loops and laser-cutting export pipelines.'
  }
];

export const studentProjects: StudentProject[] = [
  {
    id: 'proj-1',
    title: 'Mechanical Joint Linkage Assemble',
    author: 'Isolde Vance',
    programId: 'kll-101',
    description: 'Parametric joint movement and gear mechanism design.',
    geometryType: 'TORUS_KNOT',
    date: 'Spring 2026'
  },
  {
    id: 'proj-2',
    title: 'Gyroid Infill Volume Optimizer',
    author: 'Aravind Nair',
    programId: 'kll-101',
    description: 'High-strength additive manufacturing infills with minimal weight ratios.',
    geometryType: 'KINETIC_GRID',
    date: 'Summer 2026'
  }
];

export const labNotebookEntries = [
  {
    date: 'June 20, 2026',
    category: 'Procedural Modeling',
    title: 'On Parametric Subdivision of Mobius Bands',
    author: 'Dr. Evelyn Carter',
    summary: 'Documenting boundary normal continuity when applying subdivision schemes to one-sided manifolds.'
  },
  {
    date: 'May 12, 2026',
    category: 'Kinetic Dynamics',
    title: 'Energy Conservation in High-Frequency Verlet Lattices',
    author: 'Prof. Julian Vance',
    summary: 'Evaluating drift errors in Euler integration vs Verlet integration for spring dampers.'
  },
  {
    date: 'April 05, 2026',
    category: 'Spatial Computation',
    title: 'Orthographic Projection Math for Compact Display Terminals',
    author: 'Staff Research',
    summary: 'Optimizing 3D projection formulas to work inside single-thread canvas frameworks.'
  }
];
