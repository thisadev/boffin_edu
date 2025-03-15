const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Adding test testimonials...');

    // Create a test user
    const testUser = await prisma.user.create({
      data: {
        email: 'test.student@example.com',
        firstName: 'Test',
        lastName: 'Student',
        password: await hash('password123', 10),
        role: 'student',
      },
    });
    console.log(`Created test user: ${testUser.email}`);

    // Create a test course if it doesn't exist
    let testCourse;
    const existingCourse = await prisma.course.findFirst();
    
    if (existingCourse) {
      testCourse = existingCourse;
      console.log(`Using existing course: ${testCourse.title}`);
    } else {
      testCourse = await prisma.course.create({
        data: {
          title: 'Test Data Science Course',
          shortDescription: 'A test course for data science',
          longDescription: 'This is a test course for data science students',
          slug: 'test-data-science-course',
          status: 'published',
          publishedAt: new Date(),
          regularPrice: 999.99,
          categoryId: 1, // Assuming category with ID 1 exists
        },
      });
      console.log(`Created test course: ${testCourse.title}`);
    }

    // Create a registration for the test user
    const testRegistration = await prisma.registration.create({
      data: {
        userId: testUser.id,
        courseId: testCourse.id,
        status: 'completed',
        registrationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        finalPrice: 999.99,
      },
    });
    console.log(`Created test registration for user ${testUser.email} and course ${testCourse.title}`);

    // Create a testimonial for the test registration
    const testimonial = await prisma.testimonial.create({
      data: {
        registrationId: testRegistration.id,
        content: "The Boffin Institute's Data Science course was exceptional! The instructors were knowledgeable and the curriculum was comprehensive. I've gained valuable skills that have already helped me advance in my career.",
        rating: 5,
        designation: "Data Analyst",
        workplace: "Tech Solutions Inc.",
        isActive: true,
        isFeatured: true,
      },
    });
    console.log(`Created test testimonial for user ${testUser.email}`);

    // Create a second testimonial
    const testimonial2 = await prisma.testimonial.create({
      data: {
        registrationId: testRegistration.id,
        content: "I highly recommend Boffin Institute's courses to anyone looking to break into the data science field. The hands-on projects and personalized feedback were invaluable to my learning experience.",
        rating: 4,
        designation: "Junior Data Scientist",
        workplace: "DataDriven Analytics",
        isActive: true,
        isFeatured: true,
      },
    });
    console.log(`Created second test testimonial for user ${testUser.email}`);

    console.log('Test testimonials added successfully!');
  } catch (e) {
    console.error('Error adding test testimonials:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
