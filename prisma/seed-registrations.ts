import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding registration data...');

  // Create admin user if it doesn't exist
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@boffininstitute.com' },
    update: {},
    create: {
      email: 'admin@boffininstitute.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    },
  });

  // Create some sample users
  const johnPassword = await hash('password123', 10);
  const john = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      password: johnPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      role: 'student',
    },
  });

  const janePassword = await hash('password123', 10);
  const jane = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      email: 'jane.smith@example.com',
      password: janePassword,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+0987654321',
      address: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
      role: 'student',
    },
  });

  // Check if we have categories
  let scienceCategory = await prisma.courseCategory.findFirst({
    where: { name: 'Science' },
  });
  
  if (!scienceCategory) {
    scienceCategory = await prisma.courseCategory.create({
      data: {
        name: 'Science',
        description: 'Science courses including physics, chemistry, and biology',
        slug: 'science',
      },
    });
  }

  let technologyCategory = await prisma.courseCategory.findFirst({
    where: { name: 'Technology' },
  });
  
  if (!technologyCategory) {
    technologyCategory = await prisma.courseCategory.create({
      data: {
        name: 'Technology',
        description: 'Technology courses including programming and web development',
        slug: 'technology',
      },
    });
  }

  // Check if we have courses
  let physicsCourse = await prisma.course.findFirst({
    where: { slug: 'advanced-physics' },
  });
  
  if (!physicsCourse) {
    physicsCourse = await prisma.course.create({
      data: {
        title: 'Advanced Physics',
        shortDescription: 'An advanced course in physics covering quantum mechanics and relativity',
        slug: 'advanced-physics',
        regularPrice: 299.99,
        durationWeeks: 12,
        level: 'Advanced',
        categoryId: scienceCategory.id,
        learningOutcomes: ['Understand quantum mechanics', 'Apply relativity principles'],
        prerequisites: ['Basic physics knowledge'],
        language: 'English',
        status: 'published',
        galleryImages: [],
      },
    });
  }

  let webDevCourse = await prisma.course.findFirst({
    where: { slug: 'web-development-bootcamp' },
  });
  
  if (!webDevCourse) {
    webDevCourse = await prisma.course.create({
      data: {
        title: 'Web Development Bootcamp',
        shortDescription: 'A comprehensive bootcamp covering HTML, CSS, JavaScript, and React',
        slug: 'web-development-bootcamp',
        regularPrice: 499.99,
        durationWeeks: 16,
        level: 'Intermediate',
        categoryId: technologyCategory.id,
        learningOutcomes: ['Build responsive websites', 'Create React applications'],
        prerequisites: ['Basic computer knowledge'],
        language: 'English',
        status: 'published',
        galleryImages: [],
      },
    });
  }

  // Create sample registrations
  // First check if registration already exists
  const existingRegistration1 = await prisma.registration.findFirst({
    where: {
      userId: john.id,
      courseId: physicsCourse.id,
    },
  });

  if (!existingRegistration1) {
    await prisma.registration.create({
      data: {
        userId: john.id,
        courseId: physicsCourse.id,
        registrationDate: new Date('2025-02-10'),
        status: 'pending',
        finalPrice: 299.99,
        educationLevel: 'Bachelor\'s Degree',
        workExperience: '2 years in research',
        specialRequirements: 'Need access to lab equipment',
        hearAboutUs: 'From a friend',
      },
    });
  }

  const existingRegistration2 = await prisma.registration.findFirst({
    where: {
      userId: jane.id,
      courseId: webDevCourse.id,
    },
  });

  if (!existingRegistration2) {
    await prisma.registration.create({
      data: {
        userId: jane.id,
        courseId: webDevCourse.id,
        registrationDate: new Date('2025-01-15'),
        status: 'confirmed',
        finalPrice: 449.99, // Discounted price
        educationLevel: 'Master\'s Degree',
        workExperience: '5 years as software developer',
        approvedById: admin.id,
        approvalDate: new Date('2025-01-16'),
      },
    });
  }

  const existingRegistration3 = await prisma.registration.findFirst({
    where: {
      userId: jane.id,
      courseId: physicsCourse.id,
    },
  });

  if (!existingRegistration3) {
    await prisma.registration.create({
      data: {
        userId: jane.id,
        courseId: physicsCourse.id,
        registrationDate: new Date('2025-03-01'),
        status: 'pending',
        finalPrice: 299.99,
        educationLevel: 'Master\'s Degree',
        workExperience: '5 years as software developer',
        specialRequirements: 'Interested in quantum computing applications',
      },
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
