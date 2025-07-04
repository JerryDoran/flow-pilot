export async function uploadCover(cover: File | string) {
  if (typeof cover === 'string') {
    return cover; // Return the URL directly if it's a string
  }
  try {
    const formData = new FormData();
    formData.append('file', cover);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload cover');
    }

    const data = await response.json();
    return data?.data?.url as string | undefined; // Assuming the API returns the URL of the uploaded cover
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload cover');
  }
}
