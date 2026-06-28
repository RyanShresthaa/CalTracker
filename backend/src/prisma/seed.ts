import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const adminPassword = await bcrypt.hash('admin123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@calorietracker.com' },
    update: {},
    create: {
      email: 'admin@calorietracker.com',
      password: adminPassword,
      name: 'Admin',
      isAdmin: true,
      profileCompleted: true,
      age: 30,
      sex: 'male',
      height: 175,
      currentWeight: 75,
      goalWeight: 72,
      activityLevel: 'moderately_active',
      goal: 'maintain_weight',
      settings: { create: {} },
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

  const demoPassword = await bcrypt.hash('demo123456', 12);
  const demo = await prisma.user.upsert({
    where: { email: 'demo@calorietracker.com' },
    update: {},
    create: {
      email: 'demo@calorietracker.com',
      password: demoPassword,
      name: 'Demo User',
      profileCompleted: true,
      age: 28,
      sex: 'male',
      height: 175,
      currentWeight: 71,
      goalWeight: 65,
      activityLevel: 'moderately_active',
      goal: 'lose_weight',
      settings: { create: { waterGoal: 2500 } },
    },
  });
  console.log(`✅ Demo user: ${demo.email}`);

  console.log('✅ Database seeded successfully!');
  console.log('');
  console.log('📋 Login credentials:');
  console.log('  Admin: admin@calorietracker.com / admin123456');
  console.log('  Demo:  demo@calorietracker.com / demo123456');
  console.log('');
  console.log('🍎 Foods are loaded live from USDA FoodData Central + Open Food Facts when you search.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
