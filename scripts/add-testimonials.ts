import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // First, check if we have any registrations in the database
    const registrations = await prisma.registration.findMany({
      include: {
        user: true,
        course: true,
      },
      take: 5, // Get up to 5 registrations
    });

    if (registrations.length === 0) {
      console.log('No registrations found. Please seed the database first.');
      return;
    }

    // Sample testimonial data
    const testimonialData = [
      {
        content: "The DASACA certification program completely transformed my career. The hands-on projects and expert guidance helped me land a data scientist role at a leading tech company. I can't recommend Boffin Institute enough!",
        rating: 5,
        designation: "Data Scientist",
        workplace: "TechCorp Solutions",
        profileImageUrl: "/images/testimonials/profile1.jpg",
        isActive: true,
        isFeatured: true,
      },
      {
        content: "As a business analyst looking to upskill, the Data Analytics Boot Camp was exactly what I needed. The curriculum was comprehensive and the instructors were incredibly knowledgeable and supportive.",
        rating: 5,
        designation: "Senior Business Analyst",
        workplace: "Global Finance Inc.",
        profileImageUrl: "/images/testimonials/profile2.jpg",
        isActive: true,
        isFeatured: true,
      },
      {
        content: "The Corporate Training program at Boffin Institute helped our entire team level up their data skills. The customized curriculum addressed our specific needs and the results were immediate.",
        rating: 4,
        designation: "Head of Analytics",
        workplace: "Retail Innovations Ltd",
        profileImageUrl: "/images/testimonials/profile3.jpg",
        isActive: true,
        isFeatured: false,
      },
      {
        content: "As a recent graduate, the DASACA program gave me the practical skills I needed to stand out in the job market. Within weeks of completing the course, I received multiple job offers!",
        rating: 5,
        designation: "Junior Data Analyst",
        workplace: "StartUp Tech",
        profileImageUrl: "/images/testimonials/profile4.jpg",
        isActive: true,
        isFeatured: false,
      },
      {
        content: "The instructors at Boffin Institute are world-class. They not only teach the technical concepts but also share real-world insights that you can't find in textbooks or online courses.",
        rating: 5,
        university: "University of Technology",
        profileImageUrl: "/images/testimonials/profile5.jpg",
        isActive: true,
        isFeatured: false,
      },
    ];

    // Create testimonials and link them to registrations
    for (let i = 0; i < Math.min(registrations.length, testimonialData.length); i++) {
      const registration = registrations[i];
      const testimonial = testimonialData[i];

      await prisma.testimonial.create({
        data: {
          registrationId: registration.id,
          content: testimonial.content,
          rating: testimonial.rating,
          designation: testimonial.designation,
          workplace: testimonial.workplace,
          university: testimonial.university,
          profileImageUrl: testimonial.profileImageUrl,
          isActive: testimonial.isActive,
          isFeatured: testimonial.isFeatured,
        },
      });

      console.log(`Created testimonial for ${registration.user.firstName} ${registration.user.lastName}`);
    }

    console.log('Sample testimonials added successfully!');
  } catch (error) {
    console.error('Error adding testimonials:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
