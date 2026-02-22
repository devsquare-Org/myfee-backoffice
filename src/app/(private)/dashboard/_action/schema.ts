import * as z from "zod";

export const dashboardDataParams = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
