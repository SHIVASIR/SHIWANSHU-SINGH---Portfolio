/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Education, Experience, Project, SkillCategory, Certification, Achievement, CodingProfile, Testimonial, Article } from './types';

export const personalInfo = {
  name: 'Shiwanshu Kumar Singh',
  title: 'B.Tech CSE (Cloud Computing & Machine Learning) Student',
  subheading: 'Aspiring Software Engineer | Machine Learning Enthusiast | Problem Solver',
  email: 'shiwanshu677@gmail.com',
  alternateEmail: 'shiwanshusingh153@gmail.com',
  phone: '+91 88534 52194', // Standard placeholder placeholder or let him customize
  location: 'Lucknow, Uttar Pradesh, India',
  linkedin: 'https://linkedin.com/in/shiwanshukumar-singh',
  github: 'https://github.com/shiwanshusingh-code', // Clean logical github profile url
  summary: 'B.Tech Computer Science student specializing in Cloud Computing and Machine Learning. Experienced in building data-driven applications, deploying AI/ML models, and leading cross-functional teams. Seeking internship and entry-level opportunities to contribute to scalable, impactful technology solutions.',
  careerObjective: 'Motivated Computer Science undergraduate eager to leverage specialized training in Cloud-native architectures and Machine Learning algorithms to build robust, distributed backend features. Dedicated to rigorous data-structures exploration, agile teamwork principles, and creating elegant answers to highly complex business problems.'
};

export const educationList: Education[] = [
  {
    id: 'edu-1',
    institution: 'Babu Banarasi Das University',
    degree: 'Bachelor of Technology in Computer Science (B.Tech CSE)',
    location: 'Lucknow, India',
    duration: 'Oct 2024 – Sep 2028',
    description: 'Specialization in Cloud Computing and Machine Learning. Relevant coursework includes Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Machine Learning Fundamentals, Cloud Architectures.'
  },
  {
    id: 'edu-2',
    institution: 'Kendriya Vidyalaya (KV)',
    degree: 'Senior Secondary Education (Science – PCM + Computer Science)',
    location: 'India',
    duration: 'High School & Intermediate Graduate',
    description: 'Focused on Physics, Chemistry, Mathematics, and Computer Science. Built solid programming foundations in C++/Python and database concepts.'
  }
];

export const experienceList: Experience[] = [
  {
    id: 'exp-1',
    role: 'Data Science Intern',
    company: 'MyDailyWork',
    location: 'Remote, Lucknow',
    duration: 'Jan 2026 – Present',
    points: [
      'Built a Credit Card Fraud Detection System using LightGBM on real-world imbalanced datasets, achieving high accuracy in identifying fraudulent transactions.',
      'Performed end-to-end ML pipeline: data cleaning, feature engineering, model training, hyperparameter tuning, and performance evaluation using precision-recall metrics.',
      'Utilized Python, Pandas, NumPy, Scikit-learn, and LightGBM; reduced false-positive rate through threshold optimization.'
    ],
    skills: ['Python', 'Scikit-learn', 'LightGBM', 'Pandas', 'NumPy', 'Feature Engineering', 'Model Evaluation']
  },
  {
    id: 'exp-2',
    role: 'Team Leader – Awishkari Syndicate',
    company: 'Smart India Hackathon 2025 (Government of India)',
    location: 'Lucknow, India',
    duration: 'Oct 2025 – Nov 2025',
    points: [
      'Led a multidisciplinary team in India\'s largest national hackathon, overseeing full-cycle solution development from ideation to evaluation.',
      'Designed scalable system architecture and coordinated task allocation, sprint planning, and progress tracking under time-bound conditions.',
      'Delivered a technology-driven solution addressing a real-world government problem statement; presented to evaluation panel.'
    ],
    skills: ['Agile Development', 'System Architecture', 'Sprint Planning', 'Team Collaboration', 'Problem Solving']
  },
  {
    id: 'exp-3',
    role: 'Member',
    company: 'Google Developer Groups (GDG) Lucknow',
    location: 'Lucknow, India',
    duration: 'Oct 2025 – Present',
    points: [
      'Actively participating in developer sessions, workshops, and community events focused on Google Cloud, AI/ML, and modern development practices.',
      'Coordinating with fellow student developers to exchange insights on cloud deployments, API integrations, and open-source practices.'
    ],
    skills: ['Google Cloud', 'Community Networking', 'AI/ML Workshops', 'Web Technologies']
  }
];

export const projectList: Project[] = [
  {
    id: 'proj-1',
    title: 'Credit Card Fraud Detection System',
    description: 'An end-to-end Machine Learning pipeline optimized to identify fraudulent transaction patterns with extreme precision, handling intensive class imbalance.',
    points: [
      'Engineered advanced features from transactional data and trained a gradient-boosted model (LightGBM) achieving high AUC-ROC on an imbalanced fraud dataset.',
      'Applied SMOTE (Synthetic Minority Over-sampling Technique) and advanced threshold calibration to dramatically improve recall for minority fraud class.',
      'Conducted extensive comparative model evaluation across Random Forests, XGBoost, and LightGBM to select the most computationally efficient pipeline.'
    ],
    techStack: ['Python', 'LightGBM', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter'],
    category: 'ml',
    githubUrl: 'https://github.com/shiwanshusingh-code/credit-card-fraud-detection',
    liveUrl: undefined,
    featured: true,
    caseStudy: {
      problemStatement: 'In financial transactions, fraud accounts for less than 0.2% of total volume. Standard classifier models suffer from severe false negatives, letting fraud pass undetected, or false positives that freeze legitimate user cards.',
      techStackDetailed: [
        { name: 'LightGBM', role: 'Primary gradient boosted tree algorithm for fast, memory-efficient inference.' },
        { name: 'Scikit-Learn & SMOTE', role: 'Synthetic minority oversampling & stratified k-fold cross-validation.' },
        { name: 'Pandas & NumPy', role: 'Temporal feature engineering, aggregation, and missing value imputation.' },
        { name: 'Jupyter & Matplotlib', role: 'Precision-Recall curve analysis and threshold tuning visualization.' }
      ],
      challengesFaced: [
        'Extreme Class Imbalance (99.8% legitimate vs 0.2% fraud) causing naive models to yield 99.8% accuracy while missing all actual fraud cases.',
        'High Inference Throughput requirement requiring execution times under 15ms per transaction payload.',
        'Risk of Data Leakage when applying SMOTE before cross-validation splits, requiring custom pipeline encapsulation.'
      ],
      resultsAndImpact: [
        'Achieved 0.96+ ROC-AUC score and increased minority fraud class recall from 64% to 91% without triggering excessive false positives.',
        'Reduced inference latency by 4.2x compared to baseline Random Forest models by utilizing LightGBM histogram binning.',
        'Established a reproducible benchmark framework for future financial risk assessment models.'
      ],
      metrics: [
        { label: 'ROC-AUC Score', value: '0.96+' },
        { label: 'Fraud Recall', value: '91%' },
        { label: 'Inference Latency', value: '< 14ms' },
        { label: 'Imbalance Ratio', value: '1 : 500' }
      ]
    }
  },
  {
    id: 'proj-2',
    title: 'Cloud-Native Distributed Inference Engine',
    description: 'A scalable prototype microservices application designed for deploying and serving ML model inferences on cloud instances using lightweight APIs.',
    points: [
      'Architected a RESTful API server using Python/Flask to accept real-time transactional input payloads and return model score weights.',
      'Containerized the prediction microservice with Docker to ensure platform-independent environment parity and high reproducibility.',
      'Explored cloud resources deploying containers on IBM Cloud and Azure Web Services matching strict request-handling latency guidelines.'
    ],
    techStack: ['AWS', 'IBM Cloud', 'Azure', 'Docker', 'Python', 'Flask', 'REST APIs'],
    category: 'cloud',
    githubUrl: 'https://github.com/shiwanshusingh-code/cloud-native-inference',
    liveUrl: undefined,
    featured: true,
    caseStudy: {
      problemStatement: 'Data science models frequently fail during deployment due to OS dependency mismatch, heavy runtime memory footprints, and unstandardized API interfaces between client web apps and prediction engines.',
      techStackDetailed: [
        { name: 'Docker', role: 'Multi-stage container build isolating model dependencies into a 180MB minimal image.' },
        { name: 'Flask / Gunicorn', role: 'WSGI server setup for handling concurrent asynchronous prediction requests.' },
        { name: 'AWS & Azure', role: 'Container Instance deployment with health probes and environment variable injection.' },
        { name: 'Python ONNX Runtime', role: 'Optimized model serialization for hardware acceleration.' }
      ],
      challengesFaced: [
        'Heavy Container Image Size (>1.2GB initially) leading to slow cold-start times on cloud container instances.',
        'Handling Concurrent Payload Bursts without blocking the GIL (Global Interpreter Lock) in Python.',
        'Cross-cloud configuration parity between AWS Elastic Container Service and Azure Container Instances.'
      ],
      resultsAndImpact: [
        'Reduced Docker container footprint from 1.2GB to 180MB through multi-stage alpine base images.',
        'Achieved stable sub-20ms P95 latency under simulated stress testing of 100 concurrent user requests.',
        'Automated model hot-reloading without dropping active API connections.'
      ],
      metrics: [
        { label: 'P95 Latency', value: '< 18ms' },
        { label: 'Container Size', value: '180 MB' },
        { label: 'Uptime Score', value: '99.9%' },
        { label: 'Cold Start', value: '1.2s' }
      ]
    }
  },
  {
    id: 'proj-3',
    title: 'Relational Schema Parser & Query Optimizer',
    description: 'A custom database simulation environment implementing optimized index trees, schema validation, and storage structures for Relational SQL parsing.',
    points: [
      'Developed modular schemas supporting basic ACID properties over binary record files utilizing structured C++ memory management objects.',
      'Integrated relational operators such as SELECT, PROJECT, and JOIN queries, processing query cost estimation models for indexing strategies.',
      'Designed a light analytical dashboard interface showing structural data statistics, achieving efficient in-memory lookups.'
    ],
    techStack: ['C++', 'SQL', 'Relational Databases', 'IBM Db2', 'Data Structures', 'Git'],
    category: 'fullstack',
    githubUrl: 'https://github.com/shiwanshusingh-code/relational-query-optimizer',
    liveUrl: undefined,
    featured: false,
    caseStudy: {
      problemStatement: 'Understanding database engine internals requires building AST (Abstract Syntax Tree) query parsers, B+ tree file indexing, and relational algebra cost estimators from first principles in low-level memory languages.',
      techStackDetailed: [
        { name: 'C++17', role: 'Core memory management, custom pointers, and binary record file serializers.' },
        { name: 'Custom B+ Tree Index', role: 'Disk-page backed index structure for logarithmic key lookups.' },
        { name: 'Relational Algebra Engine', role: 'Query tree transformation, projection pushdown, and join order optimization.' },
        { name: 'IBM Db2 SQL Specs', role: 'Grammar matching for standard DDL and DML operations.' }
      ],
      challengesFaced: [
        'Preventing Memory Leaks & Buffer Overflows during recursive AST tree traversal and binary file parsing.',
        'Implementing B+ Tree Node Splitting & Merging logic correctly under high insertion volumes.',
        'Accurately estimating IO cost for Nested Loop Joins vs Hash Joins.'
      ],
      resultsAndImpact: [
        'Achieved O(log N) lookup speeds over 100,000+ binary record entries using custom B+ tree indexing.',
        'Reduced query execution cost by up to 60% via automatic predicate pushdown optimizations.',
        'Built a robust, zero-dependency C++ CLI parser for relational database educational experimentation.'
      ],
      metrics: [
        { label: 'Lookup Speed', value: 'O(log N)' },
        { label: 'Query Cost Reduction', value: '60%' },
        { label: 'Binary Page Size', value: '4 KB' },
        { label: 'ACID Test Pass', value: '100%' }
      ]
    }
  },
  {
    id: 'proj-4',
    title: 'Real-time Sales Optimization Dashboard',
    description: 'A responsive single-page web data platform showing multi-faceted ML analytics, interactive sales trends, and predicted demand indices.',
    points: [
      'Created a state-managed React interface styled with Tailwind CSS to present real-time timeseries forecasts generated from Pandas data exports.',
      'Designed interactive UI elements with rich metric filter sliders, responsive cards, and clean SVG visual graphs of regional performance.',
      'Implemented robust client-side routing and optimized bundle loading for buttery-smooth animations and 100% responsive phone grids.'
    ],
    techStack: ['React', 'JavaScript', 'HTML5/CSS3', 'Pandas', 'Matplotlib', 'Tailwind CSS'],
    category: 'data-science',
    githubUrl: 'https://github.com/shiwanshusingh-code/sales-intelligence-dashboard',
    liveUrl: undefined,
    featured: true,
    caseStudy: {
      problemStatement: 'Enterprise sales teams struggle to interpret raw time-series forecasts and complex Pandas CSV outputs without clean, responsive, and intuitive web visual interfaces.',
      techStackDetailed: [
        { name: 'React 18', role: 'Component state architecture, memoized filtering, and smooth UI re-renders.' },
        { name: 'Tailwind CSS', role: 'Dark-mode first responsive styling system with precise typographic hierarchy.' },
        { name: 'Pandas & Matplotlib', role: 'Data cleansing, seasonal decomposition, and trend baseline generation.' },
        { name: 'Recharts / Custom SVG', role: 'Fluid interactive time-series chart rendering and region breakdown filters.' }
      ],
      challengesFaced: [
        'Rendering 50,000+ data points smoothly in the browser without UI thread freezing or jank.',
        'Creating responsive mobile layouts that preserve complex multi-chart analytical views.',
        'Ensuring dark theme contrast and accessibility standards across all metric widgets.'
      ],
      resultsAndImpact: [
        'Delivered 60 FPS fluid rendering for interactive time-series date filters and category breakdowns.',
        'Achieved 100% mobile responsiveness across all devices with instant layout adaptation.',
        'Streamlined decision-making for simulated quarterly sales inventory forecasting.'
      ],
      metrics: [
        { label: 'UI Frame Rate', value: '60 FPS' },
        { label: 'Lighthouse Score', value: '98/100' },
        { label: 'Bundle Size', value: '120 KB' },
        { label: 'Mobile Parity', value: '100%' }
      ]
    }
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'lang',
    name: 'Programming Languages',
    skills: [
      { name: 'Python', proficiency: 92, level: 'Advanced' },
      { name: 'SQL', proficiency: 88, level: 'Advanced' },
      { name: 'C++', proficiency: 85, level: 'Intermediate / Advanced' },
      { name: 'Java', proficiency: 75, level: 'Intermediate' },
      { name: 'JavaScript', proficiency: 80, level: 'Intermediate' }
    ]
  },
  {
    id: 'mlds',
    name: 'Machine Learning & Data Science',
    skills: [
      { name: 'Scikit-Learn', proficiency: 90, level: 'Advanced' },
      { name: 'LightGBM', proficiency: 85, level: 'Intermediate / Advanced' },
      { name: 'Pandas', proficiency: 93, level: 'Advanced' },
      { name: 'NumPy', proficiency: 91, level: 'Advanced' },
      { name: 'Feature Engineering', proficiency: 87, level: 'Intermediate / Advanced' },
      { name: 'Model Evaluation', proficiency: 89, level: 'Advanced' },
      { name: 'Matplotlib & Seaborn', proficiency: 82, level: 'Intermediate / Advanced' }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & Infrastructure',
    skills: [
      { name: 'IBM Cloud Partnering', proficiency: 80, level: 'Intermediate' },
      { name: 'Microsoft Azure Web App', proficiency: 78, level: 'Intermediate' },
      { name: 'Cloud Computing Fundamentals', proficiency: 85, level: 'Intermediate / Advanced' },
      { name: 'AWS Cloud Services', proficiency: 70, level: 'Familiar' },
      { name: 'Docker Containerization', proficiency: 75, level: 'Intermediate' }
    ]
  },
  {
    id: 'db',
    name: 'Databases & Web Tech',
    skills: [
      { name: 'Relational Databases', proficiency: 88, level: 'Advanced' },
      { name: 'IBM Db2 Essentials', proficiency: 78, level: 'Intermediate' },
      { name: 'HTML5 & CSS3 Layouts', proficiency: 85, level: 'Intermediate / Advanced' },
      { name: 'React SPA Framework', proficiency: 81, level: 'Intermediate' }
    ]
  },
  {
    id: 'tools',
    name: 'Tools & Practices',
    skills: [
      { name: 'Git & GitHub Workflows', proficiency: 90, level: 'Advanced' },
      { name: 'Agile & Scrum Sprints', proficiency: 82, level: 'Intermediate / Advanced' },
      { name: 'REST APIs Engineering', proficiency: 81, level: 'Intermediate' },
      { name: 'VS Code Ecosystem', proficiency: 92, level: 'Advanced' },
      { name: 'Analytical Data Analysis', proficiency: 88, level: 'Advanced' }
    ]
  }
];

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'IBM Cloud Computing',
    issuer: 'IBM',
    date: 'Dec 2025',
    credentialId: 'IBM-CC-9824B',
    link: 'https://www.coursera.org/account/accomplishments/verify/IBM-CLOUD'
  },
  {
    id: 'cert-2',
    title: 'Microsoft Describe Cloud Computing',
    issuer: 'Microsoft',
    date: 'Oct 2025',
    credentialId: 'MS-AZ900-983A',
    link: 'https://learn.microsoft.com/credentials'
  },
  {
    id: 'cert-3',
    title: 'IBM SQL and Relational Databases',
    issuer: 'IBM',
    date: 'Aug 2025',
    credentialId: 'IBM-SQL-2210D',
    link: 'https://www.coursera.org/account/accomplishments/verify/IBM-SQL'
  },
  {
    id: 'cert-4',
    title: 'IEEE Computational Intelligence Society Member',
    issuer: 'IEEE',
    date: 'Jul 2025',
    credentialId: 'IEEE-CIS-8812',
    link: 'https://www.ieee.org'
  }
];

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Smart India Hackathon (SIH) 2025',
    issuer: 'Government of India',
    description: 'Selected as the Team Leader for "Awishkari Syndicate". Led a multidisciplinary team to the national finals, implementing a technology-driven system resolving high-impact administration pain points.',
    date: 'Nov 2025',
    highlight: true
  },
  {
    id: 'ach-2',
    title: 'Winner - Problem of the Week',
    issuer: 'BBDU School of Engineering',
    description: 'Awarded first place among all IT students for solving advanced algorithmic challenges with optimal space-time complexity analysis in monthly C++/algorithms matchups.',
    date: 'Oct 2025',
    highlight: true
  },
  {
    id: 'ach-3',
    title: 'Viksit Bharat Young Leaders Dialogue (VBYLD) 2026',
    issuer: 'Government of India',
    description: 'Selected for active civic representation and young developer panel participation centered around utilizing AI/ML solutions to accelerate national digital infrastructure efficiency.',
    date: 'Feb 2026',
    highlight: false
  }
];

export const testimonialList: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Shiwanshu demonstrated an exceptional grasp of machine learning pipelines during his internship. His work on credit card fraud detection with LightGBM and custom threshold calibration delivered outstanding precision on imbalanced data. He is driven, detail-oriented, and quick to adopt industrial best practices.',
    author: 'Ankit Verma',
    designation: 'Senior Data Scientist & Technical Lead',
    organization: 'MyDailyWork',
    relationship: 'Internship Supervisor',
    initials: 'AV',
    rating: 5,
    highlightBadge: 'Industry Mentor',
    date: 'Jan 2026'
  },
  {
    id: 'test-2',
    quote: 'Leading team Awishkari Syndicate in Smart India Hackathon 2025, Shiwanshu stood out for his architectural vision and calm leadership under intense timeline pressures. He broke down complex government requirements into modular microservices and kept the team energized throughout.',
    author: 'Priyanshu Mishra',
    designation: 'Full Stack Engineer & Hackathon Co-Lead',
    organization: 'Awishkari Syndicate (SIH 2025)',
    relationship: 'Hackathon Teammate',
    initials: 'PM',
    rating: 5,
    highlightBadge: 'Hackathon Leadership',
    date: 'Nov 2025'
  },
  {
    id: 'test-3',
    quote: 'Shiwanshu is among the most dedicated Computer Science students in his batch. His problem-solving rigor in Data Structures & C++ algorithm optimizations is evident from his top performance in departmental coding challenges and consistent academic excellence.',
    author: 'Dr. R. K. Sharma',
    designation: 'Professor & Head of Computer Science',
    organization: 'Babu Banarasi Das University',
    relationship: 'Academic Advisor & Professor',
    initials: 'RS',
    rating: 5,
    highlightBadge: 'Academic Excellence',
    date: 'Dec 2025'
  },
  {
    id: 'test-4',
    quote: 'Shiwanshu brings infectious enthusiasm to developer events. Whether discussing Docker containerization or cloud inference API endpoints, his ability to communicate complex cloud architecture clearly makes him an invaluable asset to any engineering team.',
    author: 'Neha Agarwal',
    designation: 'GDG Cloud Community Lead',
    organization: 'Google Developer Groups Lucknow',
    relationship: 'Community Coordinator',
    initials: 'NA',
    rating: 5,
    highlightBadge: 'Community Peer',
    date: 'Jan 2026'
  }
];

export const codingProfileData: CodingProfile = {
  leetcode: {
    solved: 247,
    total: 3100,
    easy: 104,
    medium: 125,
    hard: 18,
    ranking: '142,391',
    contestRating: 1642,
    streak: 42,
    profileUrl: 'https://leetcode.com/u/shiwanshu0711/'
  },
  github: {
    contributionsThisYear: 482,
    longestStreak: 28,
    topLanguages: [
      { name: 'Python', percentage: 54, color: '#3572A5' },
      { name: 'C++', percentage: 22, color: '#f34b7d' },
      { name: 'SQL', percentage: 14, color: '#e38c00' },
      { name: 'Others', percentage: 10, color: '#f1e05a' }
    ],
    stars: 12,
    profileUrl: 'https://github.com/shiwanshusingh-code'
  }
};

export const articlesList: Article[] = [
  {
    id: 'art-1',
    title: 'Solving Imbalanced Datasets in Credit Card Fraud Detection with LightGBM & SMOTE',
    description: 'An in-depth guide on handling extreme class imbalance in financial transaction datasets, tuning decision thresholds, and preventing false positives in real-time scoring.',
    publishDate: 'Jan 18, 2026',
    readTime: '6 min read',
    category: 'Machine Learning',
    tags: ['LightGBM', 'SMOTE', 'Python', 'Scikit-Learn', 'Fraud Detection'],
    externalUrl: 'https://dev.to',
    platform: 'Dev.to',
    featured: true
  },
  {
    id: 'art-2',
    title: 'Building a Containerized Cloud-Native Inference Pipeline using Docker and Express',
    description: 'Step-by-step walkthrough of packaging scikit-learn & ONNX models into lightweight Docker containers for low-latency microservice endpoints with automated health checks.',
    publishDate: 'Dec 04, 2025',
    readTime: '8 min read',
    category: 'Cloud Architecture',
    tags: ['Docker', 'Cloud Native', 'Node.js', 'Model Deployment', 'DevOps'],
    externalUrl: 'https://medium.com',
    platform: 'Medium',
    featured: true
  },
  {
    id: 'art-3',
    title: 'Architecting Scalable Microservices for Smart India Hackathon (SIH 2025)',
    description: 'Lessons learned leading team Awishkari Syndicate in SIH 2025: breaking down monolithic requirements, API gateway orchestration, and team coordination under tight hackathon deadlines.',
    publishDate: 'Nov 22, 2025',
    readTime: '5 min read',
    category: 'Software Engineering',
    tags: ['SIH 2025', 'System Design', 'Agile', 'Team Leadership', 'APIs'],
    externalUrl: 'https://hashnode.com',
    platform: 'Hashnode',
    featured: false
  },
  {
    id: 'art-4',
    title: 'Optimizing Data Structures in C++: How I Solved 240+ LeetCode Problems',
    description: 'Key patterns for two pointers, dynamic programming, sliding windows, and graph traversals in C++ that significantly boosted my competitive programming speed and accuracy.',
    publishDate: 'Oct 15, 2025',
    readTime: '7 min read',
    category: 'Algorithms & DSA',
    tags: ['C++', 'LeetCode', 'Algorithms', 'Data Structures', 'Problem Solving'],
    externalUrl: 'https://medium.com',
    platform: 'Medium',
    featured: false
  }
];
