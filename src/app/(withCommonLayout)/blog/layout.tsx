import Container from "@/src/components/shared/container";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
