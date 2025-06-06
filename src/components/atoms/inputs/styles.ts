import clsx from 'clsx';

const controlStyles = {
  base: 'border border-grass-50 rounded-sm bg-emerald-900 w-full hover:cursor-pointer',
  focus: 'ring-1 ring-primary-500',
  nonFocus: 'hover:border-grass-40',
  error: 'border-red-500',
};
const valueContainerStyles = 'p-1 gap-1';
const multiValueStyles =
  'bg-grass-30 rounded items-center py-0 pl-2 pr-1 gap-1.5 text-emerald-900';
const multiValueRemoveStyles =
  'border border-red-300 bg-red-50 border-gray-200 rounded-md text-red-800 hover:bg-red-50 hover:border-red-400 hover:text-red-400 ';
const singleValueStyles = 'ml-1';
const multiValueLabelStyles = 'py-0.5';
const clearIndicatorStyles = 'text-ivory-150 hover:text-red-700';
const indicatorSeparatorStyles = 'hidden';
const dropdownIndicatorStyles = 'px-1 text-grass-30 hover:text-grass-20';
const placeholderStyles = 'text-ivory-150 pl-2';
//Dropdown menu
const menuStyles =
  'p-1 mt-2 border border-grass-50 bg-emerald-600 rounded-sm max-w-80 w-full';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-ivory-100 text-sm';
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded-sm transition-all duration-300',
  focus: 'bg-emerald-500 active:bg-emerald-400',
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-grass-30",
};
const noOptionsMessageStyles =
  'text-ivory-100 text-sm p-2 bbg-emerald-500 border border-grass-50 rounded-sm';

export const generateClassNames = (error?: boolean) => ({
  control: ({ isFocused }: { isFocused: boolean }) =>
    clsx(
      error
        ? controlStyles.error
        : isFocused
        ? controlStyles.focus
        : controlStyles.nonFocus,
      controlStyles.base
    ),
  placeholder: () => placeholderStyles,
  valueContainer: () => valueContainerStyles,
  singleValue: () => singleValueStyles,
  multiValue: () => multiValueStyles,
  multiValueLabel: () => multiValueLabelStyles,
  multiValueRemove: () => multiValueRemoveStyles,
  clearIndicator: () => clearIndicatorStyles,
  indicatorSeparator: () => indicatorSeparatorStyles,
  dropdownIndicator: () => dropdownIndicatorStyles,
  menu: () => menuStyles,
  groupHeading: () => groupHeadingStyles,
  option: ({
    isFocused,
    isSelected,
  }: {
    isFocused: boolean;
    isSelected: boolean;
  }) =>
    clsx(
      isFocused && optionStyles.focus,
      isSelected && optionStyles.selected,
      optionStyles.base
    ),
  noOptionsMessage: () => noOptionsMessageStyles,
});

export const customStyles = ({
  disabled,
  error,
}: {
  disabled?: boolean;
  error?: boolean;
}) =>
  clsx(
    'h-[38px] border border-grass-50 rounded-sm bg-emerald-900 w-full p-1 pl-2 text-ivory-150 placeholder:text-ivory-150 hover:cursor-pointer hover:border-grass-40 active:outline-none focus:outline-none focus:border-grass-40',
    disabled && 'opacity-75',
    error && 'border-red-500 focus:border-red-400 hover:border-red-400'
  );
