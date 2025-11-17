#!/usr/bin/env pwsh
param()

Write-Verbose "Looking for rc.exe using vswhere..."
$rcPath = $null
try {
    # choose single requires based on host architecture (avoid picking wrong arch)
    $procArch = [System.Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture.ToString().ToLower()
    if ($procArch -like '*arm*') {
        $requires = 'Microsoft.VisualStudio.Component.VC.Tools.arm64'
    } else {
        $requires = 'Microsoft.VisualStudio.Component.VC.Tools.x86.x64'
    }
    try {
        $vswhereOut = & vswhere -latest -products * -requires $requires -find "**\rc.exe" 2>$null
    } catch {
        $vswhereOut = $null
    }
    if (-not $vswhereOut) {
        # fallback to no -requires
        try { $vswhereOut = & vswhere -latest -products * -find "**\rc.exe" 2>$null } catch { $vswhereOut = $null }
    }
    if ($vswhereOut) {
        $first = $vswhereOut | Where-Object { $_ -and ($_ -ne '') } | Select-Object -First 1
        if ($first -and (Test-Path $first)) { $rcPath = $first }
    }
} catch {
    # ignore
}

if ($rcPath) {
    Write-Output $rcPath
    exit 0
}

Write-Verbose "vswhere didn't return rc.exe, trying VS install -> winsdk.bat..."
try {
    # find an installationPath using the selected requires
    $vsInstall = $null
    try {
        $out = & vswhere -latest -products * -requires $requires -property installationPath 2>$null
    } catch {
        $out = $null
    }
    if (-not $out) {
        try { $out = & vswhere -latest -products * -property installationPath 2>$null } catch { $out = $null }
    }
    if ($out) { $vsInstall = ($out -join "") }
} catch {
    $vsInstall = $null
}

if ($vsInstall) {
    $winsdk = Join-Path $vsInstall 'Common7\Tools\vsdevcmd\core\winsdk.bat'
    if (Test-Path $winsdk) {
        # run the batch file inside cmd.exe and capture environment variables
        $envOutput = & cmd.exe /c "call `"$winsdk`" && set" 2>$null
        $windowsSdkDir = $null
        foreach ($line in $envOutput) {
            if ($line -match '^WindowsSdkDir=(.+)$') { $windowsSdkDir = $Matches[1]; break }
            if ($line -match '^WindowsSDKVersion=(.+)$') { $windowsSdkVersion = $Matches[1] }
        }

        if ($windowsSdkDir) {
            try {
                $found = Get-ChildItem -Path $windowsSdkDir -Recurse -Filter rc.exe -ErrorAction SilentlyContinue | Select-Object -First 1
                if ($found) { $rcPath = $found.FullName }
            } catch {
                # ignore
            }
        }
    }
}

if (-not $rcPath) {
    Write-Verbose "Searching common Windows Kits locations..."
    $programFilesX86 = ${env:ProgramFiles(x86)}
    if (-not $programFilesX86) { $programFilesX86 = ${env:ProgramFiles} }
    $candidateBase = Join-Path $programFilesX86 'Windows Kits\10\bin'
    if (Test-Path $candidateBase) {
        try {
            $found = Get-ChildItem -Path $candidateBase -Recurse -Filter rc.exe -ErrorAction SilentlyContinue | Select-Object -First 1
            if ($found) { $rcPath = $found.FullName }
        } catch {
            # ignore
        }
    }
}

if (-not $rcPath) {
    $cmdRc = Get-Command rc.exe -ErrorAction SilentlyContinue
    if ($cmdRc) { $rcPath = $cmdRc.Source }
}

if ($rcPath) {
    Write-Output $rcPath
    exit 0
}

Write-Error "rc.exe not found"
exit 1
