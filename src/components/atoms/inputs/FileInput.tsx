'use client';
import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { customStyles } from './styles';
import clsx from 'clsx';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
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
}

const FileInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  error,
  info,
}: FileInputProps<T>) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUniqueId, setFileUniqueId] = useState<string>(
    `id-${Date.now()}-${Math.random()}`
  );

  const { lng } = useParams();
  const { t } = useTranslation(lng as string);

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
        render={({ field: { onChange } }) => (
          <CldUploadWidget
            uploadPreset='futbolovo-beta-v1'
            options={cloudinaryWidgetConfig(fileUniqueId, lng as string)}
            onError={(error) => console.error('Upload error:', error)}
            onSuccess={(results) => {
              const uploadedFileName = (
                results?.info as CloudinaryUploadWidgetInfo
              )?.original_filename;
              setFileName(uploadedFileName);
              onChange(fileUniqueId);
              //Reset fileUniqueId in case of new upload
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
                    {fileName?.length ? fileName : t('chooseFile')}
                  </p>
                </label>

                {fileName && (
                  <button
                    type='button'
                    className='absolute top-14 right-0 mt-2 text-red-500 hover:underline text-sm'
                    onClick={() => {
                      setFileName(null);
                      onChange(null);
                      //TODO: Add delete image from cloudinary
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
        )}
      />
    </div>
  );
};

export default FileInput;
