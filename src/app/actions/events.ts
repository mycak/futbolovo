'use server';

import { prisma } from '@/configs/prisma';
import { MapFilters } from '@/types/common';
import { EventCategoryEnum, Prisma } from '@prisma/client';
import { setHours, setMinutes } from 'date-fns';

export async function getEvents(filters: MapFilters) {
  // Build the where clause based on filters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereClause: any = {
    isPublished: true,
  };

  // Categories filter
  if (filters.categories?.length) {
    whereClause.category = { in: filters.categories };
  }

  // Search filter
  if (filters.search?.length) {
    const search = filters.search;
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Age categories filter
  if (filters.ageCategories?.length) {
    whereClause.ageCategories = { hasSome: filters.ageCategories };
    whereClause.category = {
      in: [
        EventCategoryEnum.CAMP,
        EventCategoryEnum.TOURNAMENT,
        EventCategoryEnum.MATCH,
      ],
    };
  }

  // Dates filter
  if (filters.startDate && filters.endDate) {
    const startDate = setMinutes(setHours(new Date(filters.startDate), 2), 0);
    const endDate = setMinutes(setHours(new Date(filters.endDate), 24), 0);

    whereClause.NOT = [
      {
        category: EventCategoryEnum.TOURNAMENT,
        date: {
          lt: startDate,
        },
      },
      {
        category: EventCategoryEnum.TOURNAMENT,
        date: {
          gt: endDate,
        },
      },
      {
        category: { in: [EventCategoryEnum.CAMP, EventCategoryEnum.MATCH] },
        startDate: {
          gt: endDate,
        },
        endDate: {
          gt: endDate,
        },
      },
      {
        category: { in: [EventCategoryEnum.CAMP, EventCategoryEnum.MATCH] },
        startDate: {
          lt: startDate,
        },
        endDate: {
          lt: startDate,
        },
      },
    ];
  }

  // Fetch events with applied filters
  const events = await prisma.event.findMany({
    where: whereClause,
    cacheStrategy: { ttl: 60 * 60 * 24 }, // 1 day
  });

  return events;
}

export async function getEventById(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    cacheStrategy: { ttl: 60 * 60 * 7 }, // 7 days
  });

  return event;
}

export async function getEventsByUser(userId: string, userEmail: string) {
  const events = await prisma.event.findMany({
    where: {
      OR: [{ authorId: userId }, { email: userEmail }],
    },
    cacheStrategy: { ttl: 60 * 60 * 24 }, // 1 day
  });

  return events;
}

export async function addEvent(eventData: Prisma.EventCreateInput) {
  const newEvent = await prisma.event.create({
    data: eventData,
  });

  return newEvent;
}
