// app/auth/signout/route.js
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    cookies().delete('token')
    return NextResponse.json({
      message: 'Sign out successful'
    })
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.json(
      { error: 'Sign out failed' },
      { status: 500 }
    )
  }
}