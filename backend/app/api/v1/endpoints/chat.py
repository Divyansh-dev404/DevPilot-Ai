from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.rag_engine import RAGEngine

router = APIRouter()

class ChatRequest(BaseModel):
    repository_id: str
    message: str

@router.post("/chat")
async def chat_endpoint(req: ChatRequest):
    rag = RAGEngine(repo_id=req.repository_id)
    result = await rag.generate_response(req.message)
    return {
        "content": result["response"],
        "context_chunks": result["context_chunks"]
    }
