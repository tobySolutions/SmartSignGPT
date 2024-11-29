// app/auth/signup/route.js
import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Connect to database
    const db = await connectToDatabase()
    const users = db.collection('users')

    // Check if user exists
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    return NextResponse.json({
      message: 'User created successfully'
    })
  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json(
      { error: 'Sign up failed' },
      { status: 500 }
    )
  }
}