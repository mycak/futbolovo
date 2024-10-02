import { z } from "zod";
import { EventCategoryEnum } from "@/types/common";
import { phoneRegex } from "@/constants/common";

export const addEventSchema = z
  .object({
    dateRange: z.tuple([z.date().nullable(), z.date().nullable()]).optional(),
    category: z.nativeEnum(EventCategoryEnum, {
      errorMap: () => ({ message: "Pole jest wymagane" }),
    }),
    location: z.object({
      latitude: z.number().nullable().optional(),
      longitude: z.number().nullable().optional(),
      addressName: z.string().nullable().optional(),
    }),
    ageCategories: z.array(z.string()).optional(),

    date: z.date().nullable().optional(),

    name: z
      .string()
      .min(1, { message: "Pole jest wymagane" })
      .min(3, { message: "Nazwa musi mieć co najmniej 3 znaki" }),

    price: z.number({ message: "Pole jest wymagane" }),

    description: z.string().min(1, { message: "Pole jest wymagane" }),

    phoneNumber: z
      .string()
      .min(1, { message: "Pole jest wymagane" })
      .regex(phoneRegex, "Nieprawidłowy format numeru telefonu"),

    email: z.string().min(1, { message: "Pole jest wymagane" }),
    image: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      const requiresAgeCategories = [
        EventCategoryEnum.CAMP,
        EventCategoryEnum.TOURNAMENT,
        EventCategoryEnum.SCHOOL,
      ];
      return (
        !requiresAgeCategories.includes(data.category) ||
        (data.ageCategories && data.ageCategories.length > 0)
      );
    },
    {
      message: "Pole jest wymagane",
      path: ["ageCategories"],
    }
  )
  .refine(
    (data) => {
      return (
        data.category !== EventCategoryEnum.CAMP ||
        (!!data.dateRange && data.dateRange[0] && data.dateRange[1])
      );
    },
    {
      message: "Pole jest wymagane",
      path: ["dateRange"],
    }
  )
  .refine(
    (data) => {
      return data.category !== EventCategoryEnum.TOURNAMENT || !!data.date;
    },
    {
      message: "Pole jest wymagane",
      path: ["date"],
    }
  );

export type AddEventInputs = z.infer<typeof addEventSchema>;
