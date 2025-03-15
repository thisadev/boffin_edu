import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.registration.deleteMany({});
  await prisma.courseReview.deleteMany({});
  await prisma.courseFaq.deleteMany({});
  await prisma.learningObjective.deleteMany({});
  await prisma.moduleTopic.deleteMany({});
  await prisma.courseModule.deleteMany({});
  await prisma.courseDiscount.deleteMany({});
  await prisma.courseInstructor.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.courseCategory.deleteMany({});
  await prisma.instructor.deleteMany({});
  await prisma.user.deleteMany({});

  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@boffininstitute.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // Create categories
  const dasacaCategory = await prisma.courseCategory.create({
    data: {
      name: 'DASACA',
      description: 'Data Science and Analytics Certification Academy',
      slug: 'dasaca',
      imageUrl: '/images/categories/dasaca.jpg',
      isActive: true,
    },
  });

  const bootcampCategory = await prisma.courseCategory.create({
    data: {
      name: 'BootCamp',
      description: 'Intensive bootcamp programs for rapid skill development',
      slug: 'bootcamp',
      imageUrl: '/images/categories/bootcamp.jpg',
      isActive: true,
    },
  });

  const corporateCategory = await prisma.courseCategory.create({
    data: {
      name: 'Corporate',
      description: 'Customized training solutions for businesses',
      slug: 'corporate',
      imageUrl: '/images/categories/corporate.jpg',
      isActive: true,
    },
  });

  // Create an instructor
  const instructor = await prisma.instructor.create({
    data: {
      name: 'Dr. Jane Smith',
      bio: 'Expert in data science with over 10 years of industry experience',
      profileImageUrl: '/images/instructors/jane-smith.jpg',
      expertise: ['Data Science', 'Machine Learning', 'Python'],
      email: 'jane.smith@example.com',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/janesmith',
        twitter: 'https://twitter.com/janesmith',
      },
    },
  });

  // Create DASACA course
  const dataScienceCourse = await prisma.course.create({
    data: {
      categoryId: dasacaCategory.id,
      title: 'Data Science Fundamentals',
      shortDescription: 'Master the core concepts of data science and analytics',
      longDescription: 'This comprehensive course covers all the essential concepts of data science, from data collection and cleaning to advanced analytics and visualization techniques.',
      learningOutcomes: [
        'Understand the data science workflow',
        'Master data cleaning and preprocessing techniques',
        'Apply statistical methods to analyze data',
        'Create compelling data visualizations',
        'Build predictive models using machine learning',
      ],
      prerequisites: ['Basic knowledge of mathematics', 'Familiarity with programming concepts'],
      targetAudience: 'Aspiring data scientists, analysts, and professionals looking to enhance their data skills',
      slug: 'data-science-fundamentals',
      featuredImageUrl: '/images/courses/data-science.jpg',
      galleryImages: ['/images/courses/data-science-1.jpg', '/images/courses/data-science-2.jpg'],
      level: 'Intermediate',
      deliveryMode: 'Online',
      language: 'English',
      durationWeeks: 12,
      durationHours: 120,
      regularPrice: 1499.99,
      salePrice: 1299.99,
      certificationIncluded: true,
      certificationDetails: 'Receive an industry-recognized certification upon successful completion',
      status: 'published',
      publishedAt: new Date(),
      modules: {
        create: [
          {
            title: 'Introduction to Data Science',
            description: 'Learn the fundamentals of data science and its applications',
            orderIndex: 1,
            durationHours: 10.5,
            topics: {
              create: [
                {
                  title: 'What is Data Science?',
                  description: 'Understanding the field of data science and its importance',
                  orderIndex: 1,
                  durationMinutes: 45,
                  learningObjectives: {
                    create: [
                      {
                        description: 'Define data science and its key components',
                        orderIndex: 1,
                      },
                      {
                        description: 'Explain the role of a data scientist in various industries',
                        orderIndex: 2,
                      },
                    ],
                  },
                },
                {
                  title: 'The Data Science Process',
                  description: 'Overview of the end-to-end data science workflow',
                  orderIndex: 2,
                  durationMinutes: 60,
                  learningObjectives: {
                    create: [
                      {
                        description: 'Identify the key stages in the data science process',
                        orderIndex: 1,
                      },
                      {
                        description: 'Understand how to approach a data science project',
                        orderIndex: 2,
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Data Collection and Cleaning',
            description: 'Learn techniques for gathering and preprocessing data',
            orderIndex: 2,
            durationHours: 15.0,
            topics: {
              create: [
                {
                  title: 'Data Sources and Collection Methods',
                  description: 'Exploring various sources of data and collection techniques',
                  orderIndex: 1,
                  durationMinutes: 60,
                  learningObjectives: {
                    create: [
                      {
                        description: 'Identify different types of data sources',
                        orderIndex: 1,
                      },
                      {
                        description: 'Apply appropriate methods for collecting data',
                        orderIndex: 2,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      faqs: {
        create: [
          {
            question: 'Do I need programming experience for this course?',
            answer: 'While some programming knowledge is helpful, we provide introductory materials for beginners.',
            orderIndex: 1,
          },
          {
            question: 'What software will I need for this course?',
            answer: 'You will need Python, Jupyter Notebooks, and some specialized libraries which will be covered in the course setup.',
            orderIndex: 2,
          },
        ],
      },
    },
  });

  // Create BootCamp course
  const webDevBootcamp = await prisma.course.create({
    data: {
      categoryId: bootcampCategory.id,
      title: 'Full-Stack Web Development Bootcamp',
      shortDescription: 'Become a professional web developer in 14 weeks',
      longDescription: 'This intensive bootcamp will transform you from a beginner to a job-ready full-stack developer through hands-on projects and real-world applications.',
      learningOutcomes: [
        'Build responsive websites using HTML, CSS, and JavaScript',
        'Develop backend applications with Node.js and Express',
        'Work with databases including MongoDB and PostgreSQL',
        'Create full-stack applications with React',
        'Deploy applications to production environments',
      ],
      prerequisites: ['Basic computer skills', 'Determination to learn'],
      targetAudience: 'Career changers, college graduates, and anyone looking to enter the tech industry',
      slug: 'full-stack-web-development-bootcamp',
      featuredImageUrl: '/images/courses/web-dev.jpg',
      galleryImages: ['/images/courses/web-dev-1.jpg', '/images/courses/web-dev-2.jpg'],
      level: 'Beginner to Intermediate',
      deliveryMode: 'Hybrid',
      language: 'English',
      durationWeeks: 14,
      durationHours: 560,
      regularPrice: 9999.99,
      salePrice: 8999.99,
      certificationIncluded: true,
      certificationDetails: 'Industry-recognized certification with job placement assistance',
      status: 'published',
      publishedAt: new Date(),
      modules: {
        create: [
          {
            title: 'Frontend Fundamentals',
            description: 'Learn the core technologies of web development',
            orderIndex: 1,
            durationHours: 120.0,
            topics: {
              create: [
                {
                  title: 'HTML & CSS Basics',
                  description: 'Building the structure and style of web pages',
                  orderIndex: 1,
                  durationMinutes: 1200,
                  learningObjectives: {
                    create: [
                      {
                        description: 'Create structured HTML documents',
                        orderIndex: 1,
                      },
                      {
                        description: 'Style web pages using CSS',
                        orderIndex: 2,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      faqs: {
        create: [
          {
            question: 'Is this bootcamp suitable for complete beginners?',
            answer: 'Yes, this bootcamp is designed to take you from zero to job-ready, regardless of your prior experience.',
            orderIndex: 1,
          },
          {
            question: 'What kind of job can I get after completing this bootcamp?',
            answer: 'Graduates typically find roles as Junior Web Developers, Frontend Developers, or Full-Stack Developers.',
            orderIndex: 2,
          },
        ],
      },
    },
  });

  // Create Corporate course
  const leadershipCourse = await prisma.course.create({
    data: {
      categoryId: corporateCategory.id,
      title: 'Executive Leadership Development',
      shortDescription: 'Enhance leadership skills for senior management',
      longDescription: 'This program is designed for executives and senior managers looking to enhance their leadership capabilities and drive organizational success.',
      learningOutcomes: [
        'Develop strategic thinking and decision-making skills',
        'Enhance team leadership and management capabilities',
        'Improve communication and influence across the organization',
        'Build resilience and adaptability in changing environments',
        'Create and implement effective organizational strategies',
      ],
      prerequisites: ['Management experience', 'Current leadership role'],
      targetAudience: 'Executives, senior managers, and high-potential leaders',
      slug: 'executive-leadership-development',
      featuredImageUrl: '/images/courses/leadership.jpg',
      galleryImages: ['/images/courses/leadership-1.jpg', '/images/courses/leadership-2.jpg'],
      level: 'Advanced',
      deliveryMode: 'In-person',
      language: 'English',
      durationWeeks: 6,
      durationHours: 48,
      regularPrice: 4999.99,
      status: 'published',
      publishedAt: new Date(),
      modules: {
        create: [
          {
            title: 'Strategic Leadership',
            description: 'Developing vision and strategic direction',
            orderIndex: 1,
            durationHours: 8.0,
            topics: {
              create: [
                {
                  title: 'Strategic Thinking and Planning',
                  description: 'Approaches to developing organizational strategy',
                  orderIndex: 1,
                  durationMinutes: 180,
                  learningObjectives: {
                    create: [
                      {
                        description: 'Apply strategic thinking frameworks',
                        orderIndex: 1,
                      },
                      {
                        description: 'Develop and communicate strategic plans',
                        orderIndex: 2,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      faqs: {
        create: [
          {
            question: 'Can this program be customized for our organization?',
            answer: 'Yes, we offer customized versions of this program tailored to your organization\'s specific needs and challenges.',
            orderIndex: 1,
          },
          {
            question: 'Is executive coaching included in this program?',
            answer: 'Yes, each participant receives four one-on-one executive coaching sessions as part of the program.',
            orderIndex: 2,
          },
        ],
      },
    },
  });

  // Link instructors to courses
  await prisma.courseInstructor.create({
    data: {
      courseId: dataScienceCourse.id,
      instructorId: instructor.id,
    },
  });

  await prisma.courseInstructor.create({
    data: {
      courseId: webDevBootcamp.id,
      instructorId: instructor.id,
    },
  });

  await prisma.courseInstructor.create({
    data: {
      courseId: leadershipCourse.id,
      instructorId: instructor.id,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
