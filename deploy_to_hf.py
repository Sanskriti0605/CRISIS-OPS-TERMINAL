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
    
    # Upload everything to the root of the space
    api.upload_folder(
        folder_path=".",         
        repo_id=repo_id,
        repo_type="space",       
        path_in_repo="",         # Force root placement
        ignore_patterns=["node_modules", ".git", "dist", "__pycache__", ".ipynb_checkpoints"],
    )
    
    # Also specifically ensure README.md is uploaded with root path to overwrite any Gradio default
    if os.path.exists("README.md"):
        api.upload_file(
            path_or_fileobj="README.md",
            path_in_repo="README.md",
            repo_id=repo_id,
            repo_type="space",
        )
    
    print("\n✅ Upload Complete! Your code is now live on the root of your Hugging Face space.")
    print(f"👉 Link: https://huggingface.co/spaces/{repo_id}")
    print("\n⏳ Building... Please wait 2-3 minutes for the 'Running' status on Hugging Face.")
    
except Exception as e:
    print("\n❌ An error occurred during upload:")
    print(e)
