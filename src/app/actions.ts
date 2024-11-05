'use server';

import { prisma } from '@/configs/prisma';
import { MapFilters } from '@/types/common';
import { EventCategoryEnum, Prisma } from '@prisma/client';

export async function getEvents(filters: MapFilters) {
  // Build the where clause based on filters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereClause: any = {
    isPublished: true,
  };

  // Categories filter
  if (filters.categories) {
    whereClause.category = { in: filters.categories };
  }

  // Search filter
  if (filters.search) {
    const search = filters.search;
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      {
        location: {
          addressName: { contains: search, mode: 'insensitive' },
        },
      },
    ];
  }

  // Age categories filter
  if (filters.ageCategories) {
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
    const { startDate, endDate } = filters;
    whereClause.AND = [
      {
        OR: [
          {
            category: EventCategoryEnum.TOURNAMENT,
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
          {
            category: { in: [EventCategoryEnum.CAMP, EventCategoryEnum.MATCH] },
            OR: [
              {
                startDate: { gte: startDate, lte: endDate },
              },
              {
                endDate: { gte: startDate, lte: endDate },
              },
            ],
          },
        ],
      },
    ];
  }

  // Fetch events with applied filters
  const events = await prisma.event.findMany({
    where: whereClause,
  });

  return events;
}

export async function getEventById(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  return event;
}

export async function addEvent(eventData: Prisma.EventCreateInput) {
  const newEvent = await prisma.event.create({
    data: eventData,
  });

  return newEvent;
}
