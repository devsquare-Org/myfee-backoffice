import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

export default function CustomFormLabel({
  error,
  children,
  className,
  ...props
}: {
  error?: FieldError | undefined;
} & React.ComponentProps<typeof FormLabel>) {
  if (error) {
    return (
      <p className={cn("text-destructive text-xs font-medium", className)}>
        {error.message}
      </p>
    );
  }

  return (
    <FormLabel {...props} className={className}>
      {children}
    </FormLabel>
  );
}
