import os
import sys
import subprocess

try:
    from huggingface_hub import HfApi, login
except ImportError:
    print("Installing huggingface_hub...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "huggingface_hub"])
    from huggingface_hub import HfApi, login

print("\n🚀 Welcome to the Auto-Deploy tool for Hugging Face! 🚀")
token = input("Please paste your Hugging Face Access Token (with 'write' permissions): ").strip()
repo_id = "Sanskriti-06/CRISIS-OPS-TERMINAL"

try:
    print("\n🔑 Logging into Hugging Face...")
    login(token)
    
    api = HfApi()
    print(f"\n📦 Uploading your code to {repo_id}...")
    api.upload_folder(
        folder_path=".",         # Uploads everything in current folder
        repo_id=repo_id,
        repo_type="space",       # Since you're hosting an app
        ignore_patterns=["node_modules", ".git", "dist"], # Ignore heavy build files
    )
    
    print("\n✅ Upload Complete! Your code is now live on Hugging Face.")
    print(f"👉 Direct Link: https://huggingface.co/spaces/{repo_id}")
    
except Exception as e:
    print("\n❌ An error occurred during upload:")
    print(e)
