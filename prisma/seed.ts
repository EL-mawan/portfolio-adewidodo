import { db } from '../src/lib/db'
import { hashPassword } from '../src/lib/auth'

async function main() {
  // Create default admin user
  const hashedPassword = await hashPassword('hse123456')
  
  const admin = await db.user.upsert({
    where: { email: 'adewidodo@hse.com' },
    update: {},
    create: {
      email: 'adewidodo@hse.com',
      name: 'Ade Widodo',
      password: hashedPassword,
      role: 'admin'
    }
  })

  console.log('Created admin user:', admin)

  // Create default homepage content
  const homepageContent = await db.homepageContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      heroTitle: 'Ade Widodo',
      heroSubtitle: 'Full Stack Developer & UI/UX Designer',
      heroCtaText: 'Get In Touch',
      heroCtaUrl: '/contact'
    }
  })

  console.log('Created homepage content:', homepageContent)

  // Create default about content
  const aboutContent = await db.aboutContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      fullName: 'Ade Widodo',
      profession: 'Full Stack Developer & UI/UX Designer',
      bio: 'Passionate developer with expertise in modern web technologies and a keen eye for design.',
      story: 'I started my journey in web development over 5 years ago, and since then, I have been honing my skills in creating beautiful, functional, and user-friendly applications.',
      strengths: 'Problem Solving, Creative Design, Technical Leadership, Team Collaboration'
    }
  })

  console.log('Created about content:', aboutContent)

  // Create sample skills
  const skills = [
    { name: 'React/Next.js', category: 'Frontend', level: 90 },
    { name: 'TypeScript', category: 'Frontend', level: 85 },
    { name: 'Node.js', category: 'Backend', level: 80 },
    { name: 'Prisma', category: 'Backend', level: 75 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
    { name: 'Figma', category: 'Design', level: 70 },
    { name: 'PostgreSQL', category: 'Backend', level: 70 },
    { name: 'Docker', category: 'DevOps', level: 65 }
  ]

  for (let i = 0; i < skills.length; i++) {
    await db.skill.upsert({
      where: { id: `skill-${i + 1}` },
      update: {},
      create: {
        id: `skill-${i + 1}`,
        ...skills[i]
      }
    })
  }

  console.log('Created sample skills')

  // Create sample experience
  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      location: 'Jakarta, Indonesia',
      startDate: new Date('2022-01-01'),
      current: true,
      description: 'Leading development of scalable web applications using modern technologies.'
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'Bandung, Indonesia',
      startDate: new Date('2020-06-01'),
      endDate: new Date('2021-12-31'),
      current: false,
      description: 'Developed responsive and interactive user interfaces for various client projects.'
    }
  ]

  for (const exp of experiences) {
    await db.experience.create({
      data: exp
    })
  }

  console.log('Created sample experiences')

  // Create sample education
  const education = [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'University of Indonesia',
      location: 'Jakarta, Indonesia',
      startDate: new Date('2016-09-01'),
      endDate: new Date('2020-06-30'),
      current: false,
      gpa: '3.8',
      description: 'Focused on Software Engineering and Web Technologies'
    }
  ]

  for (const edu of education) {
    await db.education.create({
      data: edu
    })
  }

  console.log('Created sample education')

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })