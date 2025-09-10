import { NextRequest, NextResponse } from 'next/server'
import { Academic } from '@/types'
import { writeFile, readFile, exists } from 'fs/promises'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'data', 'academics.json')

async function ensureDataFile() {
  const dir = join(process.cwd(), 'data')
  try {
    await writeFile(dir, '')
  } catch (e) {
    // Directory already exists
  }
  
  try {
    await readFile(DATA_FILE)
  } catch (e) {
    await writeFile(DATA_FILE, JSON.stringify([]))
  }
}

async function getAcademics(): Promise<Academic[]> {
  await ensureDataFile()
  const data = await readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

async function saveAcademics(academics: Academic[]) {
  await ensureDataFile()
  await writeFile(DATA_FILE, JSON.stringify(academics, null, 2))
}

export async function GET() {
  try {
    const academics = await getAcademics()
    return NextResponse.json(academics)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get academics' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const academic: Academic = await request.json()
    const academics = await getAcademics()
    academics.push(academic)
    await saveAcademics(academics)
    return NextResponse.json(academic)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create academic' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const academic: Academic = await request.json()
    const academics = await getAcademics()
    const index = academics.findIndex(a => a.id === academic.id)
    
    if (index !== -1) {
      academics[index] = academic
      await saveAcademics(academics)
      return NextResponse.json(academic)
    }
    
    return NextResponse.json({ error: 'Academic not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update academic' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const academics = await getAcademics()
    const filteredAcademics = academics.filter(a => a.id !== id)
    
    if (filteredAcademics.length === academics.length) {
      return NextResponse.json({ error: 'Academic not found' }, { status: 404 })
    }
    
    await saveAcademics(filteredAcademics)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete academic' }, { status: 500 })
  }
}