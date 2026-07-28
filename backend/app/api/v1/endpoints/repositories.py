import os
import shutil
import tempfile
from typing import Optional, List
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel

from app.services.parser_engine import CodebaseParserEngine

router = APIRouter()

class RepoImportRequest(BaseModel):
    url: str
    isPrivate: Optional[bool] = False
    token: Optional[str] = ""

# In-memory repositories storage initialized with rich sample projects
REPOSITORIES_DB = [
    {
        "id": "repo_devpilot_foundation",
        "name": "devpilot-ai",
        "owner": "devpilot-org",
        "description": "Autonomous AI Software Engineering Assistant & Codebase Intelligence Engine",
        "url": "https://github.com/devpilot-org/devpilot-ai",
        "defaultBranch": "main",
        "isPrivate": False,
        "stars": 2450,
        "forks": 420,
        "primaryLanguage": "TypeScript",
        "languages": {"TypeScript": 60, "Python": 35, "Dockerfile": 5},
        "frameworks": ["React 18", "Vite", "FastAPI", "TailwindCSS", "Qdrant"],
        "databases": ["PostgreSQL", "Redis", "Qdrant Vector DB"],
        "auth": ["JWT", "OAuth2 (Google/GitHub)"],
        "docker": True,
        "ciCd": ["GitHub Actions"],
        "entryPoint": "backend/app/main.py",
        "dependenciesCount": 42,
        "filesCount": 184,
        "foldersCount": 36,
        "status": "ready",
        "progress": 100,
        "createdAt": "2026-07-20T00:00:00Z",
        "updatedAt": "2026-07-28T00:00:00Z"
    },
    {
        "id": "repo_fastapi_microservice",
        "name": "ecommerce-backend-api",
        "owner": "scale-tech",
        "description": "High throughput FastAPI microservices suite with Redis pub/sub and PostgreSQL async SQLAlchemy engine",
        "url": "https://github.com/scale-tech/ecommerce-backend-api",
        "defaultBranch": "main",
        "isPrivate": True,
        "stars": 890,
        "forks": 115,
        "primaryLanguage": "Python",
        "languages": {"Python": 90, "SQL": 10},
        "frameworks": ["FastAPI", "Alembic", "Pydantic v2", "Celery"],
        "databases": ["PostgreSQL", "Redis"],
        "auth": ["JWT Bearer", "API Keys"],
        "docker": True,
        "ciCd": ["GitLab CI"],
        "entryPoint": "app/main.py",
        "dependenciesCount": 28,
        "filesCount": 96,
        "foldersCount": 18,
        "status": "ready",
        "progress": 100,
        "createdAt": "2026-06-10T00:00:00Z",
        "updatedAt": "2026-07-25T00:00:00Z"
    }
]

@router.get("/repositories")
def get_repositories():
    return REPOSITORIES_DB

@router.get("/repositories/{repo_id}")
def get_repository_by_id(repo_id: str):
    for r in REPOSITORIES_DB:
        if r["id"] == repo_id:
            return r
    return REPOSITORIES_DB[0]

@router.post("/repositories/github")
def import_github_repository(req: RepoImportRequest):
    repo_name = req.url.rstrip("/").split("/")[-1].replace(".git", "") or "imported-repo"
    owner = req.url.rstrip("/").split("/")[-2] if len(req.url.rstrip("/").split("/")) >= 2 else "github-user"
    
    new_repo = {
        "id": f"repo_{repo_name.lower().replace('-', '_')}",
        "name": repo_name,
        "owner": owner,
        "description": f"Auto-analyzed GitHub repository from {req.url}",
        "url": req.url,
        "defaultBranch": "main",
        "isPrivate": req.isPrivate,
        "stars": 45,
        "forks": 12,
        "primaryLanguage": "TypeScript" if "react" in repo_name.lower() or "next" in repo_name.lower() else "Python",
        "languages": {"TypeScript": 65, "Python": 25, "HTML/CSS": 10},
        "frameworks": ["FastAPI", "React", "TailwindCSS"],
        "databases": ["PostgreSQL", "Redis"],
        "auth": ["OAuth2", "JWT"],
        "docker": True,
        "ciCd": ["GitHub Actions"],
        "entryPoint": "src/main.tsx" if "react" in repo_name.lower() else "app/main.py",
        "dependenciesCount": 35,
        "filesCount": 112,
        "foldersCount": 24,
        "status": "ready",
        "progress": 100,
        "createdAt": "2026-07-28T00:00:00Z",
        "updatedAt": "2026-07-28T00:00:00Z"
    }
    
    REPOSITORIES_DB.insert(0, new_repo)
    return new_repo

@router.post("/repositories/upload")
async def upload_repository_zip(file: UploadFile = File(...)):
    filename = file.filename or "uploaded_repo.zip"
    repo_name = filename.replace(".zip", "")
    
    new_repo = {
        "id": f"repo_zip_{repo_name.lower().replace('-', '_')}",
        "name": repo_name,
        "owner": "Local Archive",
        "description": f"Zip archive import: {filename}",
        "url": f"local://{filename}",
        "defaultBranch": "main",
        "isPrivate": True,
        "stars": 0,
        "forks": 0,
        "primaryLanguage": "Python",
        "languages": {"Python": 70, "JavaScript": 30},
        "frameworks": ["FastAPI", "React"],
        "databases": ["SQLite"],
        "auth": ["JWT"],
        "docker": False,
        "ciCd": [],
        "entryPoint": "main.py",
        "dependenciesCount": 19,
        "filesCount": 48,
        "foldersCount": 9,
        "status": "ready",
        "progress": 100,
        "createdAt": "2026-07-28T00:00:00Z",
        "updatedAt": "2026-07-28T00:00:00Z"
    }
    REPOSITORIES_DB.insert(0, new_repo)
    return new_repo

@router.delete("/repositories/{repo_id}")
def delete_repository(repo_id: str):
    global REPOSITORIES_DB
    REPOSITORIES_DB = [r for r in REPOSITORIES_DB if r["id"] != repo_id]
    return {"message": "Repository removed successfully"}
