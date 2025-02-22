import { CloudinaryUploadWidgetOptions } from 'next-cloudinary';

export const cloudinaryWidgetConfig = (
  fileName: string,
  lng: string
): CloudinaryUploadWidgetOptions => ({
  sources: ['local'],
  multiple: false,
  maxImageFileSize: 4194304,
  // croppingDefaultSelectionRatio: 21 / 29,
  singleUploadAutoClose: false,
  // croppingShowDimensions: true,
  // showSkipCropButton: false,
  publicId: fileName,
  language: lng,
  styles: {
    palette: {
      window: '#48bb78',
      windowBorder: '#fbf5df',
      tabIcon: '#fbf5df',
      menuIcons: '#fbf5df',
      textDark: '#303030',
      textLight: '#fbf5df',
      link: '#fbf5df',
      action: '#FF620C',
      inactiveTabIcon: '#fbf5df',
      error: '#F44235',
      inProgress: '#365a08',
      complete: '#fbf5df',
      sourceBg: '#9ae6b4',
    },
    frame: {
      background: '#101828',
    },
    fonts: {
      "'Protest Guerrilla', latin":
        'https://fonts.googleapis.com/css?family=Protest+Guerrilla',
    },
  },
  text: {
    pl: {
      or: 'lub',
      menu: {
        files: 'Moje pliki',
      },
      local: {
        dd_title_single: 'Upuść plik tutaj!',
        browse: 'Przeglądaj',
      },
      dropbox: {
        menu: {
          browse: 'Przeglądaj',
        },
      },
      crop: {
        title: 'Przytnij obraz',
        crop_btn: 'Przytnij',
        reset_btn: 'Resetuj',
        close_prompt: 'Jesteś pewny, że chcesz zamknąć bez zapisywania?',
        close_btn: 'Tak',
      },
      queue: {
        title: 'Uploadowany plik',
        done: 'Zakończono',
        abort_all: 'Anuluj',
        statuses: {
          uploaded: 'Załadowano',
        },
      },
    },
  },
});
