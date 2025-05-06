"use server"

import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    // Hash the password
    const hashedPassword = await hash(userData.password, 10);

    // Create user
    const user = await db.user.create({
      data: {
        id: uuidv4(),
        name: userData.name,
        email: userData.email,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: userData.role,
      },
    });

    // Create account
    await db.account.create({
      data: {
        id: uuidv4(),
        userId: user.id,
        accountId: uuidv4(),
        providerId: "credentials",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create session
    await db.session.create({
      data: {
        id: uuidv4(),
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        token: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create user" };
  }
};