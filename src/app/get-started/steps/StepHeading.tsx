import { Separator } from "@/app/components/ui/separator";

export const StepHeading: React.FC<{
  title: string;
  description: string;
}> = ({ description, title }) => {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <Separator />
    </section>
  );
};
