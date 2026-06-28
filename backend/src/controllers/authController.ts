import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { isGoalRealistic, effectiveGoal } from '../utils/calculations';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const profileSchema = z.object({
  age: z.number().int().min(13).max(100),
  sex: z.enum(['male', 'female']),
  height: z.number().min(100).max(250),
  currentWeight: z.number().min(30).max(300),
  goalWeight: z.number().min(30).max(300),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'athlete']),
  gymDaysPerWeek: z.number().int().min(0).max(7).default(0),
  dailyWalkKm: z.number().min(0).max(50).default(0),
  gymMinutesPerSession: z.number().int().min(15).max(180).default(55),
  goal: z.enum(['lose_weight', 'maintain_weight', 'gain_weight']),
  goalDate: z.string().optional(),
});

function generateToken(userId: string, isAdmin: boolean) {
  return jwt.sign(
    { userId, isAdmin },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '30d' }
  );
}

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        settings: { create: {} },
      },
    });

    const token = generateToken(user.id, user.isAdmin);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
      data: { userId: user.id, token, expiresAt },
    });

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileCompleted: user.profileCompleted,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.isAdmin);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
      data: { userId: user.id, token, expiresAt },
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileCompleted: user.profileCompleted,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.substring(7);
    if (token) {
      await prisma.session.deleteMany({ where: { token } });
    }
    return res.json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Logout failed' });
  }
};

export const completeProfile = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const userId = req.userId!;
    const data = profileSchema.parse(req.body);

    // Validate goal realism if goal date provided
    if (data.goalDate && data.goal !== 'maintain_weight') {
      const check = isGoalRealistic(
        data.currentWeight,
        data.goalWeight,
        new Date(data.goalDate)
      );
      if (!check.realistic) {
        return res.status(400).json({ error: check.message });
      }
    }

    // Align goal type with weight direction when goal weight differs from current
    const alignedGoal = data.goal === 'maintain_weight'
      ? 'maintain_weight'
      : effectiveGoal(data.currentWeight, data.goalWeight, data.goal);

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        age: data.age,
        sex: data.sex,
        height: data.height,
        currentWeight: data.currentWeight,
        goalWeight: data.goalWeight,
        activityLevel: data.activityLevel,
        gymDaysPerWeek: data.gymDaysPerWeek,
        dailyWalkKm: data.dailyWalkKm,
        gymMinutesPerSession: data.gymMinutesPerSession,
        goal: alignedGoal,
        goalDate: data.goalDate ? new Date(data.goalDate) : undefined,
        profileCompleted: true,
      },
    });

    // Log initial weight
    await prisma.weightLog.create({
      data: {
        userId,
        weight: data.currentWeight,
        note: 'Initial weight',
      },
    });

    return res.json({
      message: 'Profile completed',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Profile error:', error);
    return res.status(500).json({ error: 'Profile update failed' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const token = uuidv4();
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: token, resetTokenExpiry: expiry },
    });

    // In production, send email here
    console.log(`Password reset token for ${email}: ${token}`);

    return res.json({ message: 'If that email exists, a reset link has been sent.', token });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process request' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // Invalidate all sessions
    await prisma.session.deleteMany({ where: { userId: user.id } });

    return res.json({ message: 'Password reset successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Password reset failed' });
  }
};

export const getMe = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: { settings: true },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      age: user.age,
      sex: user.sex,
      height: user.height,
      currentWeight: user.currentWeight,
      goalWeight: user.goalWeight,
      activityLevel: user.activityLevel,
      gymDaysPerWeek: user.gymDaysPerWeek,
      dailyWalkKm: user.dailyWalkKm,
      gymMinutesPerSession: user.gymMinutesPerSession,
      goal: user.goal,
      goalDate: user.goalDate,
      profileCompleted: user.profileCompleted,
      isAdmin: user.isAdmin,
      settings: user.settings,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
};
