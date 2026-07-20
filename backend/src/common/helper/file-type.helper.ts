export function getFileType(mimetype: string): 'image' | 'video' | 'document' | 'other' {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype.includes('pdf') || mimetype.includes('word') || mimetype.includes('text')) return 'document';
  return 'other';
}
