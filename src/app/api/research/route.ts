import { NextRequest, NextResponse } from 'next/server'
import { Research } from '@/types'
import { writeFile, readFile, exists } from 'fs/promises'
import { join } from 'path'

const DATA_FILE = join(process.cwd(), 'data', 'research.json')

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

async function getResearch(): Promise<Research[]> {
  await ensureDataFile()
  const data = await readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

async function saveResearch(research: Research[]) {
  await ensureDataFile()
  await writeFile(DATA_FILE, JSON.stringify(research, null, 2))
}

export async function GET() {
  try {
    const research = await getResearch()
    return NextResponse.json(research)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get research' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const researchItem: Research = await request.json()
    const research = await getResearch()
    research.push(researchItem)
    await saveResearch(research)
    return NextResponse.json(researchItem)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create research' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const researchItem: Research = await request.json()
    const research = await getResearch()
    const index = research.findIndex(r => r.id === researchItem.id)
    
    if (index !== -1) {
      research[index] = researchItem
      await saveResearch(research)
      return NextResponse.json(researchItem)
    }
    
    return NextResponse.json({ error: 'Research not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update research' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const research = await getResearch()
    const filteredResearch = research.filter(r => r.id !== id)
    
    if (filteredResearch.length === research.length) {
      return NextResponse.json({ error: 'Research not found' }, { status: 404 })
    }
    
    await saveResearch(filteredResearch)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete research' }, { status: 500 })
  }
}