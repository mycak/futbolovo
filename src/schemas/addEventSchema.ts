import { z } from "zod";
import { AgeCategoryCategoryEnum, EventCategoryEnum } from "@/types/common";
import { phoneRegex } from "@/constants/common";
import { TFunction } from "i18next";

export const addEventSchema = (t: TFunction<"translation", undefined>) =>
  z
    .object({
      dateRange: z.tuple([z.date().nullable(), z.date().nullable()]).optional(),
      category: z.nativeEnum(EventCategoryEnum, {
        errorMap: () => ({ message: t("fieldIsRequired") }),
      }),
      location: z.object({
        latitude: z.number().nullable().optional(),
        longitude: z.number().nullable().optional(),
        addressName: z.string().nullable().optional(),
      }),
      ageCategories: z.array(z.nativeEnum(AgeCategoryCategoryEnum)).optional(),

      date: z.date().nullable().optional(),

      name: z
        .string()
        .min(1, { message: t("fieldIsRequired") })
        .min(3, { message: t("validation.min3") }),

      price: z.number({ message: t("fieldIsRequired") }),

      description: z.string().min(1, { message: t("fieldIsRequired") }),

      phoneNumber: z
        .string()
        .min(1, { message: t("fieldIsRequired") })
        .regex(phoneRegex, t("validation.incorrectPhone")),

      email: z.string().min(1, { message: t("fieldIsRequired") }),
      image: z.string().nullable().optional(),
    })
    .refine(
      (data) => {
        const requiresAgeCategories = [
          EventCategoryEnum.CAMP,
          EventCategoryEnum.TOURNAMENT,
          EventCategoryEnum.SCHOOL,
          EventCategoryEnum.MATCH,
        ];
        return (
          !requiresAgeCategories.includes(data.category) ||
          (data.ageCategories && data.ageCategories.length > 0)
        );
      },
      {
        message: t("fieldIsRequired"),
        path: ["ageCategories"],
      }
    )
    .refine(
      (data) => {
        return (
          (data.category !== EventCategoryEnum.CAMP &&
            data.category !== EventCategoryEnum.MATCH) ||
          (!!data.dateRange && data.dateRange[0] && data.dateRange[1])
        );
      },
      {
        message: t("fieldIsRequired"),
        path: ["dateRange"],
      }
    )
    .refine(
      (data) => {
        return data.category !== EventCategoryEnum.TOURNAMENT || !!data.date;
      },
      {
        message: t("fieldIsRequired"),
        path: ["date"],
      }
    );

export type AddEventInputs = z.infer<ReturnType<typeof addEventSchema>>;
