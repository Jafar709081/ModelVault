"""
ModelVault — FastAPI Backend
Connects to Supabase for project storage.

Run with:
  uvicorn main:app --reload --port 8000

Install dependencies:
  pip install -r requirements.txt
"""

from fastapi import FastAPI, HTTPException, Query, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from supabase import create_client, Client
import os
from typing import Optional
import uuid

# ──────────────────────────────────────────────
# App setup
# ──────────────────────────────────────────────
app = FastAPI(
    title="ModelVault API",
    description="Backend API for ModelVault — student engineering project showcase",
    version="1.0.0",
)

# CORS — allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://modelvault.onspace.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
# Supabase client
# ──────────────────────────────────────────────
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-anon-key")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

PROJECTS_TABLE = "projects"
STORAGE_BUCKET = "project-images"


# ──────────────────────────────────────────────
# Schemas
# ──────────────────────────────────────────────
class ProjectCreate(BaseModel):
    title: str
    description: str
    tags: list[str]
    cost: str
    semester: str
    student_name: str
    student_email: str


class ProjectResponse(BaseModel):
    id: str
    title: str
    description: str
    tags: list[str]
    cost: str
    semester: str
    student_name: str
    image_url: Optional[str] = None
    created_at: Optional[str] = None


# ──────────────────────────────────────────────
# Routes
# ──────────────────────────────────────────────

@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint."""
    return {"message": "ModelVault API is running 🚀", "version": "1.0.0"}


@app.get("/projects", response_model=list[ProjectResponse], tags=["Projects"])
async def get_all_projects(
    limit: int = Query(default=50, le=100),
    offset: int = Query(default=0),
):
    """
    Fetch all projects from Supabase.
    Supports pagination via limit and offset.
    """
    try:
        response = (
            supabase.table(PROJECTS_TABLE)
            .select("*")
            .order("created_at", desc=True)
            .range(offset, offset + limit - 1)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch projects: {str(e)}")


@app.get("/projects/search", response_model=list[ProjectResponse], tags=["Projects"])
async def search_projects(
    q: str = Query(..., min_length=1, description="Search query — project name or tag"),
    limit: int = Query(default=20, le=50),
):
    """
    Search projects by name or tag using Supabase full-text search.
    Example: GET /projects/search?q=gas+leak
    """
    try:
        # Search in title and description using ilike
        response = (
            supabase.table(PROJECTS_TABLE)
            .select("*")
            .or_(f"title.ilike.%{q}%,description.ilike.%{q}%")
            .limit(limit)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")


@app.get("/projects/{project_id}", response_model=ProjectResponse, tags=["Projects"])
async def get_project(project_id: str):
    """Fetch a single project by ID."""
    try:
        response = (
            supabase.table(PROJECTS_TABLE)
            .select("*")
            .eq("id", project_id)
            .single()
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="Project not found")
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/projects", response_model=ProjectResponse, status_code=201, tags=["Projects"])
async def create_project(
    title: str = Form(...),
    description: str = Form(...),
    tags: str = Form(...),          # comma-separated: "IoT,Arduino,Sem3"
    cost: str = Form(...),
    semester: str = Form(...),
    student_name: str = Form(...),
    student_email: str = Form(...),
    image: Optional[UploadFile] = File(default=None),
):
    """
    Upload a new project.
    Accepts multipart form data so an image can be attached.
    """
    image_url = None

    # Upload image to Supabase Storage if provided
    if image and image.filename:
        try:
            file_ext = image.filename.split(".")[-1]
            file_name = f"{uuid.uuid4()}.{file_ext}"
            file_bytes = await image.read()

            supabase.storage.from_(STORAGE_BUCKET).upload(
                path=file_name,
                file=file_bytes,
                file_options={"content-type": image.content_type},
            )

            image_url = supabase.storage.from_(STORAGE_BUCKET).get_public_url(file_name)
        except Exception as e:
            # Non-fatal — store project without image
            print(f"[WARN] Image upload failed: {e}")

    # Parse tags
    tag_list = [t.strip() for t in tags.split(",") if t.strip()]

    # Insert into Supabase
    try:
        payload = {
            "id": str(uuid.uuid4()),
            "title": title,
            "description": description,
            "tags": tag_list,
            "cost": cost,
            "semester": semester,
            "student_name": student_name,
            "student_email": student_email,
            "image_url": image_url,
        }

        response = supabase.table(PROJECTS_TABLE).insert(payload).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create project: {str(e)}")


@app.delete("/projects/{project_id}", tags=["Projects"])
async def delete_project(project_id: str):
    """Delete a project by ID."""
    try:
        supabase.table(PROJECTS_TABLE).delete().eq("id", project_id).execute()
        return {"message": f"Project {project_id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/categories", tags=["Meta"])
async def get_categories():
    """Return all unique categories derived from project tags."""
    return {
        "categories": [
            {"name": "IoT", "icon": "📡"},
            {"name": "Robotics", "icon": "🤖"},
            {"name": "Home Automation", "icon": "🏠"},
            {"name": "Agriculture Tech", "icon": "🌾"},
            {"name": "Smart Sensors", "icon": "📊"},
            {"name": "Renewable Energy", "icon": "☀️"},
            {"name": "Medical Devices", "icon": "🏥"},
            {"name": "Security Systems", "icon": "🔐"},
        ]
    }
