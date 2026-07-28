from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class RepoImportRequest(BaseModel):
    url: str
    isPrivate: bool = False
    token: str = ""

@router.get("/repositories")
async def get_repositories():
    return [
        {
            "id": "repo_devpilot_foundation",
            "name": "devpilot-ai",
            "owner": "devpilot-org",
            "description": "Autonomous AI Software Engineering Assistant Platform",
            "url": "https://github.com/devpilot-org/devpilot-ai",
            "defaultBranch": "main",
            "isPrivate": False,
            "stars": 1280,
            "forks": 340,
            "primaryLanguage": "TypeScript",
            "languages": {"TypeScript": 65, "Python": 30, "Dockerfile": 5},
            "frameworks": ["React 18", "FastAPI", "TailwindCSS"],
            "databases": ["PostgreSQL", "Redis", "Qdrant"],
            "dependenciesCount": 42,
            "filesCount": 184,
            "foldersCount": 36,
            "status": "ready",
            "progress": 100,
            "createdAt": "2026-07-20T00:00:00Z",
            "updatedAt": "2026-07-24T00:00:00Z"
        }
    ]

@router.post("/repositories/github")
async def import_github_repository(req: RepoImportRequest):
    return {
        "id": "repo_imported_" + req.url.split('/')[-1],
        "name": req.url.split('/')[-1],
        "owner": "imported-owner",
        "description": "Imported repository " + req.url,
        "primaryLanguage": "Python",
        "languages": {"Python": 80, "TypeScript": 20},
        "frameworks": ["FastAPI"],
        "databases": ["PostgreSQL"],
        "filesCount": 92,
        "status": "ready",
        "progress": 100
    }
