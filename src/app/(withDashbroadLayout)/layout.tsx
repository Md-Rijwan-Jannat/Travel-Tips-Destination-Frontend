import React from "react";
import FeedNavbar from "./_component/ui/navbar";
import MenuBar from "./_component/ui/menuBar";
import PremiumPosts from "./_component/module/premiumPost";
import Container from "@/src/components/shared/container";
import { currentUser } from "@/src/service/currentUser";

type TUserProps = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
};

export default async function WithDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await currentUser()) as TUserProps;

  console.log("layout user", user);

  return (
    <div className="flex min-h-screen bg-background">
      <FeedNavbar />

      <Container>
        <div className="flex w-full">
          {/* Sidebar Menu */}
          <aside className="hidden lg:block lg:sticky mt-20 lg:top-20 h-screen w-1/4 lg:w-1/5">
            <MenuBar className="space-y-3" />
          </aside>

          {/* Main Section */}
          <main
            className={`flex-1 w-full ${
              user?.role === "ADMIN" ? "lg:w-full" : "lg:w-3/5"
            } md:px-4 overflow-hidden mt-20 mb-20 lg:mb-5`}
          >
            {children}
          </main>

          {/* Premium Posts Section (hidden for ADMIN) */}
          {user?.email && user?.role === "USER" && (
            <aside className="hidden lg:block lg:sticky lg:top-20 mt-20 h-screen w-1/4">
              <PremiumPosts />
            </aside>
          )}

          {/* Bottom Menu for Mobile Devices */}
          <div className="fixed bottom-0 left-0 right-0 lg:hidden border-t border-default-200">
            <MenuBar className="flex w-full justify-between bg-default-50 py-2 px-2" />
          </div>
        </div>
      </Container>
    </div>
  );
}
