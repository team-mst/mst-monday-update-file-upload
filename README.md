# github action to upload a file on monday.com

This action uploads a file to an update of a pulse on monday.com.

## Inputs

### `monday-api-key`

**Required** monday.com API Key (Admin > API > API v2 Token > Personal API Token [Copy]). This parameter should be stored in the GitHub secrets.

### `monday-update-id`

**Required** Update ID for which a file needs to be attached.

### `monday-file-path`

**Required** Path of a file which needs to be uploaded.

## Outputs

### `monday-response`

Response from monday.com in case the file is successfully uploaded.

## Example usage
```yaml
- name: Send update to monday.com pulse
  uses: team-mst/mst-monday-update-file-upload@v1
  with:
    monday-api-key: ${{ secrets.MONDAY_API_KEY }}
    monday-update-id: 123
    monday-file-path: "test-file.zip"
```