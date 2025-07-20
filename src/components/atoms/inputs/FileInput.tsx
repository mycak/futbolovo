'use client';
import { useState, useEffect } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { customStyles } from './styles';
import clsx from 'clsx';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CldImage,
} from 'next-cloudinary';
import { cloudinaryWidgetConfig } from '@/configs/cloudinary';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';

interface FileInputProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
  info?: string;
  showPreview?: boolean;
  isEditMode?: boolean;
}

const FileInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  error,
  info,
  showPreview = true,
  isEditMode = false,
}: FileInputProps<T>) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUniqueId, setFileUniqueId] = useState<string>(
    `id-${Date.now()}-${Math.random()}`
  );

  const { lng } = useParams();
  const { t } = useTranslation(lng as string);

  // Simple storage for filenames across component re-renders
  const filenameStorageKey = `filename_${name}`;

  useEffect(() => {
    // Try to restore filename from sessionStorage when component mounts
    const storedFilename = sessionStorage.getItem(filenameStorageKey);
    if (storedFilename && !fileName) {
      setFileName(storedFilename);
    }
  }, [filenameStorageKey, fileName]);

  // Check if this is an existing image (not a new upload ID)
  const isExistingImage = (value: string) => {
    return value && !value.startsWith('id-');
  };

  // Add effect to watch for external value changes and clean up accordingly
  const handleValueChange = (
    newValue: string | null,
    onChange: (value: string | null) => void
  ) => {
    if (!newValue) {
      // If value is being cleared, also clear the stored filename
      // But only clear sessionStorage for new uploads, not existing images
      setFileName(null);
      sessionStorage.removeItem(filenameStorageKey);
    }
    onChange(newValue);
  };

  return (
    <div
      className={clsx(
        'flex flex-col relative max-w-80 w-full',
        info && 'mb-6 md:mb-0'
      )}
    >
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              {(showPreview || isEditMode) && value && (
                <div className='mb-3'>
                  <div className='text-grass-20 text-sm mb-2 flex items-center gap-2'>
                    {isExistingImage(value)
                      ? t('existingImage')
                      : t('currentImage')}
                    {isExistingImage(value) && (
                      <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs'>
                        {t('saved')}
                      </span>
                    )}
                  </div>
                  <div className='relative'>
                    <CldImage
                      width={200}
                      height={150}
                      src={value}
                      alt='Uploaded image'
                      className='rounded-lg border border-grass-20 object-cover'
                      style={{
                        width: '200px',
                        height: '150px',
                      }}
                    />
                    <button
                      type='button'
                      className='absolute top-1 right-1 bg-red-500  text-white rounded-full w-6 h-6 flex items-center justify-center text-2xl hover:bg-red-600 transition-colors cursor-pointer'
                      onClick={() => {
                        handleValueChange(null, onChange);
                      }}
                      title={t('remove')}
                    >
                      <i className={`fa-solid fa-xmark fa-xs text-ivory-150`} />
                    </button>
                  </div>
                </div>
              )}
              <CldUploadWidget
                uploadPreset='futbolovo-beta-v1'
                options={cloudinaryWidgetConfig(fileUniqueId, lng as string)}
                onError={(error) => console.error('Upload error:', error)}
                onSuccess={(results) => {
                  const uploadedFileName = (
                    results?.info as CloudinaryUploadWidgetInfo
                  )?.original_filename;
                  setFileName(uploadedFileName);
                  // Store filename in sessionStorage for persistence
                  if (uploadedFileName) {
                    sessionStorage.setItem(
                      filenameStorageKey,
                      uploadedFileName
                    );
                  }
                  onChange(fileUniqueId);
                  setFileUniqueId(`id-${Date.now()}-${Math.random()}`);
                }}
              >
                {({ open }) => (
                  <>
                    <label
                      className='text-grass-20 relative'
                      htmlFor='upload-photo'
                    >
                      {label}

                      <input
                        type='button'
                        id='upload-photo'
                        className='opacity-0 absolute top-6 left-0 w-full h-[38px] cursor-pointer'
                        placeholder={placeholder}
                        onClick={() => open()}
                      />
                      <p
                        className={clsx(
                          customStyles({ error: !!error }),
                          'mt-0! pt-[7px] truncate'
                        )}
                      >
                        {value
                          ? isEditMode
                            ? t('changeImage')
                            : fileName || t('imageUploaded')
                          : fileName || t('chooseFile')}
                      </p>
                    </label>

                    {(fileName || value) && !showPreview && (
                      <button
                        type='button'
                        className='absolute top-14 right-0 mt-2 text-red-500 hover:underline text-sm cursor-pointer'
                        onClick={() => {
                          handleValueChange(null, onChange);
                        }}
                      >
                        {t('clear')}
                      </button>
                    )}

                    {error && (
                      <span className='absolute text-red-500 text-xs top-16 right-0'>
                        {error}
                      </span>
                    )}
                    {info && (
                      <span className='absolute text-grass-50 text-xs top-16 right-0'>
                        {info}
                      </span>
                    )}
                  </>
                )}
              </CldUploadWidget>
            </>
          );
        }}
      />
    </div>
  );
};

export default FileInput;
