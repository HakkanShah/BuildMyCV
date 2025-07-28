import type { CVData } from './types';

export const defaultCvData: CVData = {
  personal: {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    phone: '123-456-7890',
    website: 'alexdoe.dev',
    location: 'San Francisco, CA',
    summary:
      'Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing user-centered applications from initial concept to final, polished deliverable.',
    photo: '',
  },
  education: [
    {
      id: 'edu-1',
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      startDate: '2015',
      endDate: '2019',
      details: 'Graduated with honors, GPA: 3.8/4.0',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Solutions Inc.',
      role: 'Senior Software Engineer',
      startDate: '2021',
      endDate: 'Present',
      description:
        '- Lead development of a new microservices-based architecture, improving system scalability by 40%.\n- Mentor junior engineers and conduct code reviews to maintain high-quality code standards.',
    },
    {
      id: 'exp-2',
      company: 'Innovate LLC',
      role: 'Software Engineer',
      startDate: '2019',
      endDate: '2021',
      description:
        '- Developed and maintained features for a large-scale e-commerce platform using React and Node.js.\n- Collaborated with product managers and designers to translate requirements into technical solutions.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Portfolio Website',
      date: '2023',
      description:
        'Personal portfolio website built with Next.js and Tailwind CSS to showcase projects and skills. Deployed on Vercel.',
      url: 'portfolio.example.com',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL', 'Docker', 'CI/CD'],
};
