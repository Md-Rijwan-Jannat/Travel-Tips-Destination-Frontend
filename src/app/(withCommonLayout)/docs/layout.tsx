import Container from "@/src/components/shared/container";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
