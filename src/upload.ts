const uploadImage = async (file: File): Promise<{ success: true; data: Record<string, any> } | { success: false; status: number }> => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('type', 'notcompress');

  const res = await window._fetch('https://playentry.org/rest/picture', {
    body: formData,
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) return { success: false, status: res.status };

  const data = await res.json();
  return { success: true, data: data };
};

export default uploadImage;
