# 💽 hilaltechnologic – Windows Custom ISO Builder with BunnyCDN Upload 🚀

Build, slipstream, and auto-deploy your own Windows ISO — powered by GitHub Actions + BunnyCDN Storage.

> 👨‍💻 Made for power users, VPS warriors, and automation lovers. One push = new ISO with direct download link.

---

## 📦 What It Does

- ✅ Auto-download base Windows ISO (10/11/Tiny11/etc.)
- 🧠 Injects `autounattend.xml` for hands-free installation
- ⚙️ Slipstreams VirtIO drivers (for KVM/QEMU/VPS compatibility)
- 🔐 Enables Administrator + auto-RDP
- 🔄 Rebuilds bootable ISO
- 🚀 Uploads final `.iso` to BunnyCDN with direct public link

---

## 🧰 Requirements (Already Set)

- BunnyCDN Storage Zone (e.g. `cuaniso`)
- GitHub Secrets:
  - `BUNNY_STORAGE_NAME`
  - `BUNNY_STORAGE_USER`
  - `BUNNY_STORAGE_PASS`
  - `BUNNY_STORAGE_HOST` (usually `storage.bunnycdn.com`)

---

## 🚀 Quick Start

1. **Fork or clone** this repo  
2. Put your base ISO in the root (e.g., `Win10.iso`) or auto-download via script
3. Edit `autounattend.xml` if needed
4. Push to `main` → GitHub Actions will:
   - Run `build.ps1`
   - Create new ISO
   - Upload to BunnyCDN Storage
5. ✅ Grab your direct ISO link:
