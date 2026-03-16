interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-foreground">{title}</h1>
      <p className="mb-8 text-muted-foreground">{description}</p>
      <div className="rounded-2xl border bg-card p-12 text-center">
        <p className="text-muted-foreground">Coming soon.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
