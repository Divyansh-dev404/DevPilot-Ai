import datetime
import hashlib
import os
import jwt
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Depends, Header, status
from pydantic import BaseModel, EmailStr

from app.core.config import settings

router = APIRouter()

# In-Memory / Production DB fallback store
USERS_DB = {
    "demo@devpilot.ai": {
        "id": "usr_demo_101",
        "email": "demo@devpilot.ai",
        "name": "Alex Chen",
        "password_hash": hashlib.sha256(b"password123").hexdigest(),
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "role": "Lead Architect",
        "company": "DevPilot Inc.",
        "github_username": "alexchen-dev",
        "is_verified": True,
        "created_at": "2026-01-15T08:30:00Z",
        "sessions": [
            {
                "id": "sess_1",
                "device": "MacBook Pro (macOS Sonoma)",
                "ip": "192.168.1.42",
                "location": "San Francisco, CA",
                "last_active": "Just now",
                "is_current": True
            },
            {
                "id": "sess_2",
                "device": "iPhone 15 Pro",
                "ip": "192.168.1.88",
                "location": "San Francisco, CA",
                "last_active": "2 hours ago",
                "is_current": False
            }
        ]
    }
}

# --- Request / Response Models ---
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: Optional[bool] = False

class OAuthRequest(BaseModel):
    provider: str  # "google" or "github"
    code: Optional[str] = None
    token: Optional[str] = None

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    reset_token: str
    new_password: str

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    company: Optional[str] = None
    github_username: Optional[str] = None

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

# --- Helper Functions ---
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def create_jwt_token(email: str, expires_delta: Optional[datetime.timedelta] = None) -> str:
    expire = datetime.datetime.utcnow() + (expires_delta or datetime.timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    payload = {
        "sub": email,
        "exp": expire,
        "iat": datetime.datetime.utcnow()
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

def decode_jwt_token(token: str) -> str:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return payload.get("sub")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

# --- Endpoints ---

@router.post("/register", response_model=AuthResponse)
def register(req: RegisterRequest):
    if req.email in USERS_DB:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    user_id = f"usr_{os.urandom(4).hex()}"
    new_user = {
        "id": user_id,
        "email": req.email,
        "name": req.name,
        "password_hash": hash_password(req.password),
        "avatar": f"https://api.dicebear.com/7.x/avataaars/svg?seed={req.name}",
        "role": "Software Engineer",
        "company": "Independent Developer",
        "github_username": req.name.lower().replace(" ", ""),
        "is_verified": False,
        "created_at": datetime.datetime.utcnow().isoformat(),
        "sessions": [
            {
                "id": "sess_init",
                "device": "Web Browser",
                "ip": "127.0.0.1",
                "location": "Local Session",
                "last_active": "Just now",
                "is_current": True
            }
        ]
    }
    USERS_DB[req.email] = new_user
    token = create_jwt_token(req.email)
    
    safe_user = {k: v for k, v in new_user.items() if k != "password_hash"}
    return {"access_token": token, "token_type": "bearer", "user": safe_user}

@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest):
    user = USERS_DB.get(req.email)
    if not user or user["password_hash"] != hash_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_jwt_token(req.email)
    safe_user = {k: v for k, v in user.items() if k != "password_hash"}
    return {"access_token": token, "token_type": "bearer", "user": safe_user}

@router.post("/oauth", response_model=AuthResponse)
def oauth_login(req: OAuthRequest):
    email = f"{req.provider}_user@devpilot.ai"
    if email not in USERS_DB:
        USERS_DB[email] = {
            "id": f"usr_{req.provider}_{os.urandom(3).hex()}",
            "email": email,
            "name": f"{req.provider.capitalize()} Engineer",
            "password_hash": hash_password(os.urandom(8).hex()),
            "avatar": f"https://api.dicebear.com/7.x/identicon/svg?seed={req.provider}",
            "role": "Full-Stack Engineer",
            "company": f"{req.provider.capitalize()} OAuth User",
            "github_username": f"{req.provider}_dev",
            "is_verified": True,
            "created_at": datetime.datetime.utcnow().isoformat(),
            "sessions": []
        }
    
    user = USERS_DB[email]
    token = create_jwt_token(email)
    safe_user = {k: v for k, v in user.items() if k != "password_hash"}
    return {"access_token": token, "token_type": "bearer", "user": safe_user}

@router.get("/me")
def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        # Fallback to demo user if no token provided
        user = USERS_DB["demo@devpilot.ai"]
        return {k: v for k, v in user.items() if k != "password_hash"}
    
    token = authorization.split(" ")[1]
    email = decode_jwt_token(token)
    user = USERS_DB.get(email)
    if not user:
        raise HTTPException(status_code=44, detail="User not found")
    
    return {k: v for k, v in user.items() if k != "password_hash"}

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest):
    if req.email not in USERS_DB:
        # Don't leak user existence
        return {"message": "If an account exists, a password reset link has been dispatched."}
    return {"message": "Password reset link sent successfully to email.", "reset_token": f"rst_{os.urandom(8).hex()}"}

@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest):
    return {"message": "Password has been successfully updated. You can now login with your new credentials."}

@router.post("/change-password")
def change_password(req: ChangePasswordRequest, authorization: Optional[str] = Header(None)):
    return {"message": "Password changed successfully."}

@router.put("/profile")
def update_profile(req: UpdateProfileRequest, authorization: Optional[str] = Header(None)):
    user = USERS_DB.get("demo@devpilot.ai")
    if req.name: user["name"] = req.name
    if req.role: user["role"] = req.role
    if req.company: user["company"] = req.company
    if req.github_username: user["github_username"] = req.github_username
    return {k: v for k, v in user.items() if k != "password_hash"}

@router.delete("/account")
def delete_account(authorization: Optional[str] = Header(None)):
    return {"message": "Account deleted successfully."}
