import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { Project } from '@/types'

const DATA_FILE = join(process.cwd(), 'data', 'projects.json')

// Initialize data directory and file if it doesn't exist
async function ensureDataFile() {
  try {
    await mkdir(join(process.cwd(), 'data'), { recursive: true })
    try {
      await readFile(DATA_FILE, 'utf-8')
    } catch {
      // File doesn't exist, create it with initial data
      const initialData = [
        {
          id: "p1",
          title: "Astra Coffee — Brand System",
          category: "branding",
          cover: "https://images.unsplash.com/photo-1512580770426-cbed71c40e94?q=80&w=1600&auto=format&fit=crop",
          brief: "End-to-end brand identity for a specialty coffee roastery: logotype, palette, packaging, and storefront system.",
          images: [
            "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1530023367847-a683933f4175?q=80&w=1600&auto=format&fit=crop",
          ],
        },
        {
          id: "p2",
          title: "Monolith Lamp — 3D Product Visual",
          category: "3d",
          cover: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?q=80&w=1600&auto=format&fit=crop",
          brief: "Photoreal 3D render exploring brushed metal, soft emissive lighting, and cinematic shadows for a concept lamp.",
          images: [
            "https://images.unsplash.com/photo-1553925585-b929523b47fb?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1574701148212-8518049c7d7b?q=80&w=1600&auto=format&fit=crop",
          ],
        },
        {
          id: "p3",
          title: "Harbor & Co. — Packaging Suite",
          category: "branding",
          cover: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?q=80&w=1600&auto=format&fit=crop",
          brief: "Premium packaging direction with tactile papers, gilded foils, and modular label grid for a boutique grocer.",
          images: [
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1513617339633-75ae9a3b342a?q=80&w=1600&auto=format&fit=crop",
          ],
        },
        {
          id: "p4",
          title: "Nebula Chair — 3D Concept",
          category: "3d",
          cover: "https://images.unsplash.com/photo-1552919973-030017b86647?q=80&w=1600&auto=format&fit=crop",
          brief: "Parametric seat form with velvet microfibers; studio renders and close-up material studies for a concept chair.",
          images: [
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1549492423-400259a2e574?q=80&w=1600&auto=format&fit=crop",
          ],
        },
      ]
      await writeFile(DATA_FILE, JSON.stringify(initialData, null, 2))
    }
  } catch (error) {
    console.error('Error ensuring data file:', error)
  }
}

// Read projects from file
async function getProjects(): Promise<Project[]> {
  await ensureDataFile()
  const data = await readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

// Write projects to file
async function saveProjects(projects: Project[]) {
  await ensureDataFile()
  await writeFile(DATA_FILE, JSON.stringify(projects, null, 2))
}

// GET all projects
export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error getting projects:', error)
    return NextResponse.json({ error: 'Failed to get projects' }, { status: 500 })
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    const projects = await getProjects()
    const newProject = await request.json()
    
    // Generate ID if not provided
    if (!newProject.id) {
      newProject.id = Date.now().toString()
    }
    
    projects.push(newProject)
    await saveProjects(projects)
    
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

// PUT update project
export async function PUT(request: NextRequest) {
  try {
    const projects = await getProjects()
    const updatedProject = await request.json()
    const { id } = updatedProject
    
    const index = projects.findIndex((p: Project) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    
    projects[index] = updatedProject
    await saveProjects(projects)
    
    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

// DELETE project
export async function DELETE(request: NextRequest) {
  try {
    const projects = await getProjects()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
    }
    
    const filteredProjects = projects.filter((p: Project) => p.id !== id)
    await saveProjects(filteredProjects)
    
    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}