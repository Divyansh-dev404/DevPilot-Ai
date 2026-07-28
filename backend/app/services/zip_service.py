import os
import zipfile

class ZipExtractionService:
    @staticmethod
    def extract_safely(zip_path: str, extract_to: str) -> bool:
        if not os.path.exists(zip_path):
            raise FileNotFoundError(f"Archive {zip_path} not found.")

        os.makedirs(extract_to, exist_ok=True)
        resolved_target = os.path.abspath(extract_to)

        with zipfile.ZipFile(zip_path, 'r') as archive:
            for member in archive.infolist():
                member_path = os.path.abspath(os.path.join(extract_to, member.filename))
                # Zip-Slip path traversal defense check
                if not member_path.startswith(resolved_target):
                    raise PermissionError(f"Security Alert: Malicious Zip-Slip path traversal detected in {member.filename}")

            archive.extractall(extract_to)
        return True
