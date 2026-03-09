import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import { RootLayout } from "./components/RootLayout";
import { AdminPage } from "./pages/AdminPage";
import { AgriculturePage } from "./pages/AgriculturePage";
import { ComputerPage } from "./pages/ComputerPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";

const rootRoute = createRootRoute({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const computerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/computer",
  component: ComputerPage,
});

const agricultureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agriculture",
  component: AgriculturePage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  computerRoute,
  agricultureRoute,
  contactRoute,
  adminRoute,
]);
