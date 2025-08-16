import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().refine(
    (val) => /@(gmail|outlook)\.com$/i.test(val),
    {
      message: "Só são aceitos emails do Gmail ou Outlook."
    }
  ),
  message: z.string().min(2),
});
