export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'DASACA' | 'BootCamp' | 'Corporate';
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  discountPrice?: number;
  image: string;
  features: string[];
  syllabus: {
    title: string;
    topics: string[];
  }[];
  instructors: {
    name: string;
    bio: string;
    image: string;
  }[];
  slug: string;
}

export interface CourseCategory {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
}

export const courseCategories: CourseCategory[] = [
  {
    id: 'dasaca',
    title: 'DASACA™ Certification',
    description: 'Professional certification programs for data science and analytics professionals.',
    slug: 'dasaca-certification',
    image: '/images/categories/dasaca.jpg'
  },
  {
    id: 'bootcamp',
    title: 'Data Analytics Boot Camp',
    description: 'Intensive, hands-on training programs to quickly build practical skills.',
    slug: 'data-analytics-boot-camp',
    image: '/images/categories/bootcamp.jpg'
  },
  {
    id: 'corporate',
    title: 'Customized Corporate Training Programs',
    description: 'Tailored training solutions for organizations to upskill their workforce.',
    slug: 'corporate-training',
    image: '/images/categories/corporate.jpg'
  }
];

export const courses: Course[] = [
  // DASACA Certification Courses
  {
    id: 'dasaca-foundation',
    title: 'DASACA™ Foundation',
    description: 'Build a solid foundation in data science and analytics with our entry-level certification.',
    category: 'DASACA',
    duration: '8 weeks',
    level: 'Beginner',
    price: 1499,
    discountPrice: 1299,
    image: '/images/courses/dasaca-foundation.jpg',
    features: [
      'Introduction to data science concepts',
      'Basic statistical analysis',
      'Data visualization fundamentals',
      'Introduction to Python programming',
      'Hands-on projects with real-world data',
      'Industry-recognized certification'
    ],
    syllabus: [
      {
        title: 'Introduction to Data Science',
        topics: ['What is data science?', 'The data science process', 'Types of data', 'Data science tools and technologies']
      },
      {
        title: 'Statistical Foundations',
        topics: ['Descriptive statistics', 'Probability distributions', 'Hypothesis testing', 'Correlation and regression']
      },
      {
        title: 'Python for Data Analysis',
        topics: ['Python basics', 'NumPy and Pandas', 'Data manipulation', 'Data cleaning']
      },
      {
        title: 'Data Visualization',
        topics: ['Visualization principles', 'Matplotlib and Seaborn', 'Creating effective visualizations', 'Dashboard creation']
      }
    ],
    instructors: [
      {
        name: 'Dr. Sarah Johnson',
        bio: 'Data Science Lead with 10+ years of experience in analytics and machine learning.',
        image: '/images/instructors/sarah.jpg'
      }
    ],
    slug: 'dasaca-foundation'
  },
  {
    id: 'dasaca-professional',
    title: 'DASACA™ Professional',
    description: 'Advance your data science career with our comprehensive professional certification.',
    category: 'DASACA',
    duration: '12 weeks',
    level: 'Intermediate',
    price: 2499,
    discountPrice: 2199,
    image: '/images/courses/dasaca-professional.jpg',
    features: [
      'Advanced statistical methods',
      'Machine learning algorithms',
      'Deep learning introduction',
      'Data engineering principles',
      'Real-world capstone project',
      'Career coaching and placement assistance'
    ],
    syllabus: [
      {
        title: 'Advanced Statistics',
        topics: ['Multivariate analysis', 'Time series analysis', 'Bayesian statistics', 'Experimental design']
      },
      {
        title: 'Machine Learning',
        topics: ['Supervised learning', 'Unsupervised learning', 'Model evaluation', 'Feature engineering']
      },
      {
        title: 'Data Engineering',
        topics: ['Data pipelines', 'Big data technologies', 'Cloud computing', 'Data warehousing']
      },
      {
        title: 'Applied Data Science',
        topics: ['Industry applications', 'Case studies', 'Ethical considerations', 'Capstone project']
      }
    ],
    instructors: [
      {
        name: 'Prof. Michael Chen',
        bio: 'Former Lead Data Scientist at Google with PhD in Computer Science.',
        image: '/images/instructors/michael.jpg'
      }
    ],
    slug: 'dasaca-professional'
  },
  {
    id: 'dasaca-expert',
    title: 'DASACA™ Expert',
    description: 'Master advanced data science techniques and become a certified expert in the field.',
    category: 'DASACA',
    duration: '16 weeks',
    level: 'Advanced',
    price: 3999,
    discountPrice: 3499,
    image: '/images/courses/dasaca-expert.jpg',
    features: [
      'Advanced machine learning techniques',
      'Deep learning specialization',
      'Natural language processing',
      'Computer vision applications',
      'Advanced data engineering',
      'Leadership in data science teams'
    ],
    syllabus: [
      {
        title: 'Advanced Machine Learning',
        topics: ['Ensemble methods', 'Reinforcement learning', 'Advanced optimization', 'Model deployment']
      },
      {
        title: 'Deep Learning',
        topics: ['Neural network architectures', 'CNNs and RNNs', 'Transformers', 'GANs and autoencoders']
      },
      {
        title: 'Specialized Applications',
        topics: ['NLP techniques', 'Computer vision', 'Recommender systems', 'Time series forecasting']
      },
      {
        title: 'Leadership and Management',
        topics: ['Leading data teams', 'Project management', 'Stakeholder communication', 'Ethics and governance']
      }
    ],
    instructors: [
      {
        name: 'Dr. Priya Sharma',
        bio: 'AI Research Scientist with over 15 years of experience in machine learning and deep learning.',
        image: '/images/instructors/priya.jpg'
      }
    ],
    slug: 'dasaca-expert'
  },
  
  // Boot Camp Courses
  {
    id: 'python-data-analytics',
    title: 'Python for Data Analytics',
    description: 'Intensive boot camp to master Python for data analysis and visualization.',
    category: 'BootCamp',
    duration: '4 weeks',
    level: 'Beginner',
    price: 999,
    discountPrice: 799,
    image: '/images/courses/python-analytics.jpg',
    features: [
      'Python programming fundamentals',
      'Data analysis with Pandas',
      'Data visualization with Matplotlib and Seaborn',
      'Exploratory data analysis techniques',
      'Weekly hands-on projects',
      'Job-ready portfolio'
    ],
    syllabus: [
      {
        title: 'Python Fundamentals',
        topics: ['Python syntax', 'Data structures', 'Functions and modules', 'Object-oriented programming']
      },
      {
        title: 'Data Analysis with Pandas',
        topics: ['DataFrame operations', 'Data cleaning', 'Data transformation', 'Grouping and aggregation']
      },
      {
        title: 'Data Visualization',
        topics: ['Matplotlib basics', 'Seaborn for statistical visualization', 'Interactive visualizations', 'Dashboard creation']
      },
      {
        title: 'Applied Data Analysis',
        topics: ['Exploratory data analysis', 'Statistical analysis', 'Case studies', 'Final project']
      }
    ],
    instructors: [
      {
        name: 'Alex Rodriguez',
        bio: 'Data Analyst with expertise in Python and visualization techniques.',
        image: '/images/instructors/alex.jpg'
      }
    ],
    slug: 'python-data-analytics'
  },
  {
    id: 'machine-learning-bootcamp',
    title: 'Machine Learning Boot Camp',
    description: 'Fast-track your machine learning skills with this intensive, project-based boot camp.',
    category: 'BootCamp',
    duration: '6 weeks',
    level: 'Intermediate',
    price: 1499,
    discountPrice: 1299,
    image: '/images/courses/ml-bootcamp.jpg',
    features: [
      'Supervised and unsupervised learning',
      'Model evaluation and validation',
      'Feature engineering techniques',
      'Model deployment and MLOps',
      'Industry case studies',
      'Capstone project with real-world data'
    ],
    syllabus: [
      {
        title: 'Machine Learning Foundations',
        topics: ['Types of machine learning', 'The ML workflow', 'Data preparation', 'Model selection']
      },
      {
        title: 'Supervised Learning',
        topics: ['Regression models', 'Classification models', 'Ensemble methods', 'Model evaluation']
      },
      {
        title: 'Unsupervised Learning',
        topics: ['Clustering techniques', 'Dimensionality reduction', 'Anomaly detection', 'Association rules']
      },
      {
        title: 'Applied Machine Learning',
        topics: ['Feature engineering', 'Hyperparameter tuning', 'Model deployment', 'Capstone project']
      }
    ],
    instructors: [
      {
        name: 'Dr. James Wilson',
        bio: 'Machine Learning Engineer with experience at leading tech companies.',
        image: '/images/instructors/james.jpg'
      }
    ],
    slug: 'machine-learning-bootcamp'
  },
  {
    id: 'data-visualization-bootcamp',
    title: 'Data Visualization Boot Camp',
    description: 'Learn to create compelling data visualizations and interactive dashboards.',
    category: 'BootCamp',
    duration: '3 weeks',
    level: 'All Levels',
    price: 899,
    discountPrice: 699,
    image: '/images/courses/viz-bootcamp.jpg',
    features: [
      'Visualization principles and best practices',
      'Tools: Tableau, Power BI, and D3.js',
      'Interactive dashboard creation',
      'Storytelling with data',
      'Portfolio-building projects',
      'Visualization critique and improvement'
    ],
    syllabus: [
      {
        title: 'Visualization Fundamentals',
        topics: ['Visual perception', 'Chart selection', 'Color theory', 'Accessibility considerations']
      },
      {
        title: 'Visualization Tools',
        topics: ['Tableau fundamentals', 'Power BI essentials', 'Introduction to D3.js', 'Python visualization libraries']
      },
      {
        title: 'Dashboard Design',
        topics: ['Dashboard planning', 'Interactive elements', 'Performance optimization', 'User experience design']
      },
      {
        title: 'Data Storytelling',
        topics: ['Narrative structures', 'Audience analysis', 'Presentation techniques', 'Final portfolio project']
      }
    ],
    instructors: [
      {
        name: 'Emma Thompson',
        bio: 'Data Visualization Specialist with background in design and analytics.',
        image: '/images/instructors/emma.jpg'
      }
    ],
    slug: 'data-visualization-bootcamp'
  },
  
  // Corporate Training Courses
  {
    id: 'data-literacy-for-business',
    title: 'Data Literacy for Business Leaders',
    description: 'Empower business leaders with the skills to understand and leverage data for decision-making.',
    category: 'Corporate',
    duration: 'Customizable',
    level: 'All Levels',
    price: 5999,
    image: '/images/courses/data-literacy.jpg',
    features: [
      'Customized for your organization',
      'Data-driven decision making',
      'Understanding analytics reports',
      'Key performance indicators',
      'Data visualization interpretation',
      'Ethical considerations in data use'
    ],
    syllabus: [
      {
        title: 'Data Fundamentals for Leaders',
        topics: ['Types of business data', 'Data collection methods', 'Data quality assessment', 'Data governance']
      },
      {
        title: 'Analytics for Decision Making',
        topics: ['KPI development', 'Descriptive vs. predictive analytics', 'Interpreting statistical results', 'Data-driven strategy']
      },
      {
        title: 'Visualization Literacy',
        topics: ['Reading different chart types', 'Dashboard interpretation', 'Identifying misleading visualizations', 'Asking the right questions']
      },
      {
        title: 'Building a Data Culture',
        topics: ['Promoting data-driven decisions', 'Data ethics and privacy', 'Change management', 'Continuous improvement']
      }
    ],
    instructors: [
      {
        name: 'David Chang',
        bio: 'Former CIO with extensive experience in data strategy and business intelligence.',
        image: '/images/instructors/david.jpg'
      }
    ],
    slug: 'data-literacy-for-business'
  },
  {
    id: 'ai-for-enterprise',
    title: 'AI for Enterprise Applications',
    description: 'Comprehensive training program on implementing AI solutions in enterprise environments.',
    category: 'Corporate',
    duration: 'Customizable',
    level: 'Intermediate',
    price: 9999,
    image: '/images/courses/ai-enterprise.jpg',
    features: [
      'Tailored to your industry and needs',
      'AI use case identification',
      'Implementation strategies',
      'ROI measurement',
      'Change management',
      'Ethical AI frameworks'
    ],
    syllabus: [
      {
        title: 'AI Strategy',
        topics: ['AI opportunity assessment', 'Use case prioritization', 'Build vs. buy decisions', 'Implementation roadmap']
      },
      {
        title: 'AI Technologies',
        topics: ['Machine learning applications', 'Natural language processing', 'Computer vision', 'Robotic process automation']
      },
      {
        title: 'Implementation and Integration',
        topics: ['AI project management', 'Integration with existing systems', 'Change management', 'Measuring success']
      },
      {
        title: 'Responsible AI',
        topics: ['Ethical considerations', 'Bias detection and mitigation', 'Transparency and explainability', 'Governance frameworks']
      }
    ],
    instructors: [
      {
        name: 'Dr. Lisa Wong',
        bio: 'AI Strategy Consultant with experience implementing enterprise AI solutions across industries.',
        image: '/images/instructors/lisa.jpg'
      }
    ],
    slug: 'ai-for-enterprise'
  },
  {
    id: 'data-team-upskilling',
    title: 'Data Team Upskilling Program',
    description: 'Comprehensive training to transform your existing technical teams into data science professionals.',
    category: 'Corporate',
    duration: 'Customizable',
    level: 'All Levels',
    price: 7999,
    image: '/images/courses/team-upskilling.jpg',
    features: [
      'Skills assessment and gap analysis',
      'Customized learning paths',
      'Hands-on workshops',
      'Real project implementation',
      'Progress tracking and certification',
      'Ongoing mentorship'
    ],
    syllabus: [
      {
        title: 'Technical Foundations',
        topics: ['Programming skills (Python/R)', 'Database and SQL', 'Cloud platforms', 'Version control and collaboration']
      },
      {
        title: 'Data Science Toolkit',
        topics: ['Statistical analysis', 'Machine learning fundamentals', 'Data visualization', 'Big data technologies']
      },
      {
        title: 'Specialized Skills',
        topics: ['Deep learning', 'Natural language processing', 'Time series analysis', 'Computer vision']
      },
      {
        title: 'Applied Data Science',
        topics: ['Industry-specific applications', 'Project management', 'Communication skills', 'Ethical considerations']
      }
    ],
    instructors: [
      {
        name: 'Robert Martinez',
        bio: 'Corporate Training Director with experience transforming technical teams across Fortune 500 companies.',
        image: '/images/instructors/robert.jpg'
      }
    ],
    slug: 'data-team-upskilling'
  }
];

export const getCoursesByCategory = (categoryId: string): Course[] => {
  return courses.filter(course => {
    if (categoryId === 'dasaca') return course.category === 'DASACA';
    if (categoryId === 'bootcamp') return course.category === 'BootCamp';
    if (categoryId === 'corporate') return course.category === 'Corporate';
    return true;
  });
};

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getCategoryBySlug = (slug: string): CourseCategory | undefined => {
  return courseCategories.find(category => category.slug === slug);
};
