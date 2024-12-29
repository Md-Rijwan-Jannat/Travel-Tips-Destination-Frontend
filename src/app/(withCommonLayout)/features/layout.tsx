import Container from "@/src/components/shared/container";

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
