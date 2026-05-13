export interface Education {
  institution: string;
  degree: string;
  period: string;
  cgpa: string;
  courses: string[];
}

export interface SkillCategory {
  [key: string]: string[];
}

export interface Project {
  name: string;
  subtitle: string;
  github: string;
  description: string;
  bullets: string[];
  stack: string[];
  color: string;
}

export interface Certification {
  title: string;
  issuer: string;
  icon: string;
  color: string;
  period?: string;
  description?: string;
}

export interface LeetCodeStats {
  solved: number;
  topics: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  leetcode: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  summary: string;
  education: Education[];
  skills: SkillCategory;
  projects: Project[];
  certifications: Certification[];
  leetcodeStats: LeetCodeStats;
}

export const resumeData: ResumeData = {
  name: 'Mukul Kumar',
  title: 'Computer Science Student | Backend Developer | Problem Solver',
  email: 'mukulxyadav@gmail.com',
  phone: '8307426434',
  github: 'https://github.com/mukulxyadav',
  leetcode: 'https://leetcode.com/u/mukulxyadav/',
  linkedin: 'https://www.linkedin.com/in/mukul-kumar-867177320/',
  twitter: 'https://x.com/Mukulxyadav',
  instagram: 'https://www.instagram.com/mukulxyadav/',

  summary:
    'Second-year B.Tech Computer Science student with strong foundations in C, C++, Java, and Python. Skilled in data structures, problem-solving, and backend development with hands-on experience building database-driven applications. Solved 74+ LeetCode problems through consistent algorithm practice.',

  education: [
    {
      institution: 'SRM Institute of Science and Technology',
      degree: 'B.Tech in Computer Science and Engineering',
      period: 'Aug 2024 - Present',
      cgpa: '9.16 / 10.0',
      courses: ['Data Structures', 'Object Oriented Programming', 'Database Management Systems'],
    },
  ],

  skills: {
    Languages: ['C', 'C++', 'Java', 'Python'],
    Frontend: ['HTML', 'CSS'],
    Backend: ['Core Java', 'Basic Python'],
    Database: ['MySQL'],
    Tools: ['Git', 'GitHub', 'VS Code'],
  },

  projects: [
    {
      name: 'ShiftTokens',
      subtitle: 'Token Management System',
      github: 'https://github.com/mukul/shifttokens',
      description:
        'A token-based system to securely manage and transfer digital assets between users, inspired by blockchain concepts.',
      bullets: [
        'Designed and developed a token-based system to securely manage and transfer digital assets between users.',
        'Implemented backend logic using Java and integrated MySQL for efficient data storage and retrieval.',
        'Built core functionalities including token transactions and structured database operations.',
        'Developed a scalable system inspired by blockchain concepts for secure and transparent asset handling.',
      ],
      stack: ['Java', 'MySQL', 'Backend'],
      color: '#6C63FF',
    },
    {
      name: 'SmartLibrary',
      subtitle: 'Library Management System',
      github: 'https://github.com/mukul/smartlibrary',
      description:
        'A comprehensive library management system featuring automated book tracking, user management, and fine calculation.',
      bullets: [
        'Developed a robust library management system using Java and MySQL to handle large volumes of book data.',
        'Created an intuitive user interface for managing book check-outs, returns, and reservations.',
        'Implemented an automated fine calculation engine and notification system for overdue books.',
        'Optimized database queries to ensure fast search and retrieval of book records.',
      ],
      stack: ['Java', 'MySQL', 'JDBC'],
      color: '#22D3EE',
    },
  ],

  certifications: [
    {
      title: 'Programming in Java',
      issuer: 'NPTEL',
      icon: '🎓',
      color: '#6C63FF',
    },
    {
      title: 'Object Oriented Programming and Design',
      issuer: 'NPTEL',
      icon: '🎓',
      color: '#6C63FF',
    },
    {
      title: 'Database Management Systems',
      issuer: 'NPTEL',
      icon: '🎓',
      color: '#6C63FF',
    },
    {
      title: 'Design and Analysis of Algorithms (DAA)',
      issuer: 'NPTEL',
      icon: '🎓',
      color: '#6C63FF',
    },
    {
      title: 'Data Structures and Algorithms',
      issuer: 'GeeksforGeeks',
      period: 'Feb 2026 - Mar 2026',
      description: 'Completed an 81-hour intensive course covering sorting, searching, recursion, and advanced data structures.',
      icon: '💻',
      color: '#00D4FF',
    },
    {
      title: 'POKEVERSE Ideathon 2026',
      issuer: 'Competitive Ideathon',
      description: 'Participated in a competitive ideathon focused on innovative problem-solving and product development.',
      icon: '🏆',
      color: '#FF6584',
    },
  ],

  leetcodeStats: {
    solved: 74,
    topics: ['Arrays', 'Strings', 'Recursion', 'Basic Data Structures'],
  },
};

export const chatbotKnowledge = [
  {
    triggers: ['project', 'shifttokens', 'token', 'blockchain'],
    response:
      'Mukul built ShiftTokens, a token management system inspired by blockchain. It uses Core Java for backend logic and MySQL for data storage, supporting secure digital asset transfers between users.',
  },
  {
    triggers: ['skills', 'language', 'programming', 'tech'],
    response:
      'Mukul works with C, C++, Java, and Python. He has backend experience in Core Java, database experience with MySQL, and daily tooling experience with Git/GitHub and VS Code.',
  },
  {
    triggers: ['education', 'college', 'srm', 'university', 'cgpa'],
    response:
      'Mukul is a second-year B.Tech CSE student at SRM Institute of Science and Technology (since August 2024) with a CGPA of 9.16/10.',
  },
  {
    triggers: ['leetcode', 'coding', 'competitive', 'problems'],
    response:
      'Mukul has solved 74+ LeetCode problems spanning arrays, strings, recursion, and foundational data-structure topics.',
  },
  {
    triggers: ['certificate', 'nptel', 'gfg', 'geeks', 'achievement'],
    response:
      'Mukul holds 4 NPTEL certifications, completed an 81-hour GeeksforGeeks DSA program, and participated in the POKEVERSE Ideathon 2026.',
  },
  {
    triggers: ['contact', 'email', 'reach', 'hire', 'connect'],
    response:
      'You can reach Mukul at mukulxyadav@gmail.com or call 8307426434. You can also find him on GitHub and LinkedIn.',
  },
  {
    triggers: ['hello', 'hi', 'hey', 'greet'],
    response: "Hey there! I'm MukulBot, your guide to Mukul Kumar's portfolio.",
  },
  {
    triggers: ['who', 'about', 'introduce', 'mukul'],
    response:
      'Mukul Kumar is a second-year CSE student at SRM with a strong backend focus, a 9.16 CGPA, and practical project experience in Java and MySQL.',
  },
];
