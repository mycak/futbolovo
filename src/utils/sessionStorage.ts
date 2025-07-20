/**
 * Utility functions for managing sessionStorage cleanup
 */

const IMAGE_STORAGE_KEYS = {
  MAIN_IMAGE: 'filename_image',
  ADDITIONAL_IMAGES: 'filename_images',
} as const;

const MAX_ADDITIONAL_IMAGES = 2;

/**
 * Clears all image filename storage from sessionStorage
 * This should be called when:
 * - Event is successfully submitted
 * - User starts a new add event process
 * - User leaves the add event flow entirely
 */
export const clearImageFilenameStorage = (): void => {
  if (typeof window === 'undefined') return;

  // Clear main image filename
  sessionStorage.removeItem(IMAGE_STORAGE_KEYS.MAIN_IMAGE);

  // Clear additional images filenames
  for (let i = 0; i <= MAX_ADDITIONAL_IMAGES; i++) {
    sessionStorage.removeItem(`${IMAGE_STORAGE_KEYS.ADDITIONAL_IMAGES}.${i}`);
  }
};

/**
 * Clears a specific image filename from storage
 * @param fieldName - The field name (e.g., 'image', 'images.1', 'images.2')
 */
export const clearSpecificImageFilename = (fieldName: string): void => {
  if (typeof window === 'undefined') return;

  sessionStorage.removeItem(`filename_${fieldName}`);
};
