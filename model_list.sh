# powershell script to list available models
$headers = @{"Authorization" = "Bearer YOUR_API_KEY_GOES_HERE"}
$response = Invoke-WebRequest -Uri "https://api.openai.com/v1/models" -Headers $headers
$jsonContent = $response.Content | ConvertFrom-Json
$modelsJson = $jsonContent.data | ConvertTo-Json -Depth 5
$modelsJson | Out-String -Width ([int]::MaxValue) > models.txt
