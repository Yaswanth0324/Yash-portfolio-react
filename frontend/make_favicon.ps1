Add-Type -AssemblyName System.Drawing

$src = 'c:\PortFolio\frontend\src\assets\Yaswanth.png'
$dst = 'c:\PortFolio\frontend\public\favicon.png'

$orig = [System.Drawing.Image]::FromFile($src)
$size = 128
$bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::Transparent)

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(0, 0, $size, $size)
$g.SetClip($path)
$g.DrawImage($orig, 0, 0, $size, $size)

$g.Dispose()
$orig.Dispose()

$bmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Host "Circular favicon saved to $dst"
