export type RegistrationStatus = 'coming-soon' | 'open' | 'full' | 'waitlist';

export const workshopDetails = {
  title: 'Introduction to CAD and 3D Design',
  audience: 'Students entering grades 6–8',
  experience: 'No prior CAD experience required',
  duration: 'Approximately 90 minutes',
  format: 'In-person, guided workshop',
  cost: 'Free',
  software: 'Autodesk Fusion',
  location: 'Sammamish Library meeting room',
  date: 'Date to be confirmed',
  time: 'Time to be confirmed',
  capacity: 'Approximately 8–12 students',
  registrationStatus: 'coming-soon' as RegistrationStatus,
  registrationUrl: '#registration',
  contactEmail: 'kineticlogiclabs@gmail.com',
};

export const faqItems = [
  ['Does my student need prior CAD experience?', 'No. The workshop is designed for complete beginners.'],
  ['What age group is the workshop for?', 'The initial workshop is intended for students entering grades 6–8.'],
  ['What software will be used?', 'Students will use Autodesk Fusion.'],
  ['Does each student need a laptop?', 'Yes. Each student should bring a compatible laptop with Fusion installed. A mouse is strongly recommended.'],
  ['Is the workshop free?', 'Yes. The introductory workshop is free, but registration is required because seating is limited.'],
  ['Will students receive a 3D-printed object?', 'The core outcome is a completed digital model. Printing availability may depend on workshop logistics and is not currently promised.'],
  ['Who is teaching the workshop?', 'The workshop is taught by Ziyao Xu, the student creator of Kinetic Logic Labs.'],
  ['Is this a library-sponsored event?', 'No. The workshop is independently organized and is not sponsored or endorsed by the King County Library System.'],
] as const;
