$isoInput = "WIN11.ISO"
$workingDir = "ISO-WORK"
$virtioDir = "virtio"
$isoOutput = "ISO-OUT/Win11-Custom.iso"
$mountPath = "$workingDir/mount"

New-Item -ItemType Directory -Force -Path $workingDir, "ISO-OUT" | Out-Null

# Mount original ISO
Mount-DiskImage -ImagePath $isoInput
$drive = (Get-Volume -FileSystemLabel "CCCOMA_X64FRE*" | Select -First 1).DriveLetter + ":"
robocopy "$drive\" "$workingDir\Source" /E
Dismount-DiskImage -ImagePath $isoInput

# Inject autounattend.xml
Copy-Item autounattend.xml "$workingDir\Source\"

# Inject VirtIO ke install.wim
$installWim = "$workingDir\Source\sources\install.wim"
dism /Mount-WIM /WimFile:$installWim /index:1 /MountDir:$mountPath

Write-Host "Injecting VirtIO drivers..."
dism /Add-Driver /Driver:$virtioDir /Recurse /ForceUnsigned /MountDir:$mountPath

dism /Unmount-WIM /MountDir:$mountPath /Commit

# Build ISO
$bootsect = "$workingDir\Source\boot\etfsboot.com"
oscdimg -b$bootsect -u2 -h -m -lWIN11AUTO "$workingDir\Source" "$isoOutput"

Write-Host "Build complete: $isoOutput"
