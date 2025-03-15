import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Clean up existing data - with checks to handle tables that might not exist yet
    console.log('Cleaning up existing data...');
    
    // Check and delete testimonials if they exist
    try {
      // Using a raw query to check if the table exists first
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'testimonials'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "testimonials" CASCADE;`;
        console.log('Deleted testimonials');
      } else {
        console.log('Testimonials table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking testimonials table, skipping...', e);
    }
    
    try {
      await prisma.registration.deleteMany({});
      console.log('Deleted registrations');
    } catch (e) {
      console.log('Registrations table does not exist yet, skipping...');
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'courseReviews'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "courseReviews" CASCADE;`;
        console.log('Deleted course reviews');
      } else {
        console.log('CourseReview table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking courseReviews table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'courseFaqs'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "courseFaqs" CASCADE;`;
        console.log('Deleted course FAQs');
      } else {
        console.log('CourseFaq table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking courseFaqs table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'learningObjectives'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "learningObjectives" CASCADE;`;
        console.log('Deleted learning objectives');
      } else {
        console.log('LearningObjective table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking learningObjectives table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'moduleTopics'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "moduleTopics" CASCADE;`;
        console.log('Deleted module topics');
      } else {
        console.log('ModuleTopic table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking moduleTopics table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'courseModules'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "courseModules" CASCADE;`;
        console.log('Deleted course modules');
      } else {
        console.log('CourseModule table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking courseModules table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'courseDiscounts'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "courseDiscounts" CASCADE;`;
        console.log('Deleted course discounts');
      } else {
        console.log('CourseDiscount table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking courseDiscounts table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'courseInstructors'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "courseInstructors" CASCADE;`;
        console.log('Deleted course instructors');
      } else {
        console.log('CourseInstructor table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking courseInstructors table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'courses'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "courses" CASCADE;`;
        console.log('Deleted courses');
      } else {
        console.log('Course table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking courses table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'courseCategories'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "courseCategories" CASCADE;`;
        console.log('Deleted course categories');
      } else {
        console.log('CourseCategory table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking courseCategories table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'instructors'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "instructors" CASCADE;`;
        console.log('Deleted instructors');
      } else {
        console.log('Instructor table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking instructors table, skipping...', e);
    }
    
    try {
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'users'
        );
      `;
      
      if (tableExists) {
        await prisma.$executeRaw`TRUNCATE TABLE "users" CASCADE;`;
        console.log('Deleted users');
      } else {
        console.log('User table does not exist yet, skipping...');
      }
    } catch (e) {
      console.log('Error checking users table, skipping...', e);
    }

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

    // Create some sample users for registrations and testimonials
    const user1 = await prisma.user.create({
      data: {
        email: 'sarah.johnson@example.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        password: await hash('password123', 10),
        role: 'student',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'michael.chen@example.com',
        firstName: 'Michael',
        lastName: 'Chen',
        password: await hash('password123', 10),
        role: 'student',
      },
    });

    const user3 = await prisma.user.create({
      data: {
        email: 'priya.patel@example.com',
        firstName: 'Priya',
        lastName: 'Patel',
        password: await hash('password123', 10),
        role: 'student',
      },
    });

    // Create registrations for the users
    const registration1 = await prisma.registration.create({
      data: {
        userId: user1.id,
        courseId: dataScienceCourse.id,
        status: 'completed',
        registrationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
        finalPrice: 1999.99,
      },
    });

    const registration2 = await prisma.registration.create({
      data: {
        userId: user2.id,
        courseId: webDevBootcamp.id,
        status: 'completed',
        registrationDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
        finalPrice: 1499.99,
      },
    });

    const registration3 = await prisma.registration.create({
      data: {
        userId: user3.id,
        courseId: leadershipCourse.id,
        status: 'completed',
        registrationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        finalPrice: 4999.99,
      },
    });

    // Create testimonials for the completed courses
    await prisma.testimonial.create({
      data: {
        registrationId: registration1.id,
        content: "The DASACA certification program completely transformed my career. The hands-on projects and expert guidance from instructors helped me master complex data science concepts. I've now secured a position as a Data Analyst at a leading tech company, with a significant salary increase!",
        rating: 5,
        designation: "Data Analyst",
        workplace: "TechCorp Solutions",
        isActive: true,
        isFeatured: true,
      },
    });

    await prisma.testimonial.create({
      data: {
        registrationId: registration2.id,
        content: "The Web Development Bootcamp exceeded all my expectations. The curriculum was comprehensive and up-to-date with the latest industry standards. Within weeks of completing the program, I was able to build my own portfolio and land a job as a Frontend Developer.",
        rating: 5,
        designation: "Frontend Developer",
        workplace: "Digital Innovations",
        isActive: true,
        isFeatured: true,
      },
    });

    await prisma.testimonial.create({
      data: {
        registrationId: registration3.id,
        content: "The Executive Leadership program provided invaluable insights into strategic management and leadership. The coaching sessions were particularly helpful in addressing my specific challenges. I've already implemented several strategies learned from the course, resulting in improved team performance and business outcomes.",
        rating: 4,
        designation: "Senior Manager",
        workplace: "Global Enterprises",
        isActive: true,
        isFeatured: false,
      },
    });

    console.log('Database seeded successfully!');
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
