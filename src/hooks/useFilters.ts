import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { MapFilters } from '@/types/common';
import { filtersInitialState } from '@/stores/eventsStore';
import { paths } from '@/constants/paths';
import { EventCategoryEnum } from '@prisma/client';
import { areObjectsEqual } from '@/utils/common';
import { useEventsStore } from '@/stores';

export const useFilters = () => {
  const setFilters = useEventsStore((state) => state.setFilters);
  const filters = useEventsStore((state) => state.filters);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lng } = useParams();

  // Parse URL query params on component mount
  useEffect(() => {
    if (!searchParams) return;

    const queryFilters: Partial<MapFilters> = {};

    // Parse categories
    const categories = searchParams.get('categories');
    if (categories) {
      queryFilters.categories = categories.split(',') as EventCategoryEnum[];
    }

    // Parse ageCategories
    const ageCategories = searchParams.get('ageCategories');
    if (ageCategories) {
      // Using the same type as the filters.ageCategories
      queryFilters.ageCategories = ageCategories.split(
        ','
      ) as MapFilters['ageCategories'];
    }

    // Parse coords
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    if (latitude && longitude) {
      queryFilters.coords = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
    }

    // Parse dates
    const startDate = searchParams.get('startDate');
    if (startDate) {
      queryFilters.startDate = new Date(startDate);
    }

    const endDate = searchParams.get('endDate');
    if (endDate) {
      queryFilters.endDate = new Date(endDate);
    }

    // Parse search
    const search = searchParams.get('search');
    if (search) {
      queryFilters.search = search;
    }

    // Parse female
    const female = searchParams.get('female');
    if (female) {
      queryFilters.female = female === 'true';
    }

    // Only update if there are actual query params
    if (Object.keys(queryFilters).length > 0) {
      setFilters({ ...filtersInitialState, ...queryFilters });
    }
  }, [searchParams, setFilters]);

  // Update URL helper function - called on search button click
  const updateUrlWithFilters = (currentFilters: MapFilters) => {
    if (areObjectsEqual(currentFilters, filtersInitialState)) {
      // Clear URL params if filters are reset
      router.push(paths.Map);
      return;
    }

    const params = new URLSearchParams();

    // Add categories to URL
    if (currentFilters.categories && currentFilters.categories.length > 0) {
      params.append('categories', currentFilters.categories.join(','));
    }

    // Add ageCategories to URL
    if (
      currentFilters.ageCategories &&
      currentFilters.ageCategories.length > 0
    ) {
      params.append('ageCategories', currentFilters.ageCategories.join(','));
    }

    // Add coords to URL
    if (currentFilters.coords?.latitude && currentFilters.coords?.longitude) {
      params.append('latitude', currentFilters.coords.latitude.toString());
      params.append('longitude', currentFilters.coords.longitude.toString());
    }

    // Add dates to URL
    if (currentFilters.startDate) {
      params.append('startDate', currentFilters.startDate.toISOString());
    }

    if (currentFilters.endDate) {
      params.append('endDate', currentFilters.endDate.toISOString());
    }

    // Add search to URL
    if (currentFilters.search) {
      params.append('search', currentFilters.search);
    }

    // Add female to URL
    if (currentFilters.female) {
      params.append('female', currentFilters.female.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `${paths.Map}?${queryString}` : paths.Map;

    router.push(url);
  };

  const onResetFilters = () => {
    setFilters(filtersInitialState);
    router.push(paths.Map);
  };

  return {
    filters,
    setFilters,
    updateUrlWithFilters,
    onResetFilters,
    lng,
    isResetButtonDisabled: areObjectsEqual(filters, filtersInitialState),
  };
};
