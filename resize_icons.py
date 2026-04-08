import os
from PIL import Image, ImageOps

source_path = r'C:\Users\Donal\.gemini\antigravity\brain\07926519-9e15-4160-b5a6-485c7825232e\healthshield_icon_core_1775203302008.png'
pwa_dir = r'd:\antigravity-awesome-skills\apps\web-app\public'

def resize_icon(size_tuple, filename):
    img = Image.open(source_path)
    img = img.resize(size_tuple, Image.Resampling.LANCZOS)
    img.save(os.path.join(pwa_dir, filename))
    print(f"[CREATED] {filename}")

def create_maskable_icon(size_tuple, filename):
    # Maskable icons need 10% padding to prevent clipping by different OS mask shapes
    img = Image.open(source_path)
    # Add whitespace/safe zone padding
    padding = int(img.width * 0.1)
    img_padded = ImageOps.expand(img, border=padding, fill=(15, 23, 42)) # Slate 900 background
    img_padded = img_padded.resize(size_tuple, Image.Resampling.LANCZOS)
    img_padded.save(os.path.join(pwa_dir, filename))
    print(f"[CREATED] {filename} (Maskable)")

# Main Resizing Tasks
resize_icon((192, 192), 'icon-192.png')
resize_icon((512, 512), 'icon-512.png')
resize_icon((32, 32), 'favicon.png')
create_maskable_icon((512, 512), 'maskable-icon.png')
