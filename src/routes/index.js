import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    { path: "/auth",
    element: <MainLayout/>,
    children: [
      {element: <LoginPage />, path: "login"},
      {element: <RegisterPage />, path: "register"},
      {element: <ResetPasswordPage />, path: "reset-password"},
      {element: <NewPasswordPage />, path: "new-password"},
      {element: <VerifyPage />, path: "verify"}

    ]

    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        { path: "message", element: <Message /> },
        { path: "chats", element: <Chats /> },
        { path: "contact", element: <Contact /> },
        { path: "profile", element: <ProfilePage /> },



        
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const Message = Loadable(
  lazy(() => import("../components/Conversation/Message"))
);

const Chats = Loadable(lazy(() => import("../pages/dashboard/Chats")));

const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);

const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);

const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);

const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword")),
);



const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);

const Contact = Loadable(lazy(() => import("../components/Contact")));


const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);

const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);

const VerifyPage = Loadable(
  lazy(() => import("../pages/auth/Verify")),
);

const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);



const Page404 = Loadable(lazy(() => import("../pages/Page404")));
