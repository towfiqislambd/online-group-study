import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './components/Root';
import ErrorPage from './components/ErrorPage';
import PrivateRoutes from './components/PrivateRoutes';
import AuthProvider from './auth/AuthProvider';
import Register from './auth/Register';
import Login from './auth/Login';
import Home from './pages/Home';
import Assignments from './pages/Assignments';
import PendingAssignments from './pages/PendingAssignments';
import CreateAssignments from './pages/CreateAssignments';
import MyAttemptedAssignments from './pages/MyAttemptedAssignments';
import UpdateAssignment from './pages/UpdateAssignment';
import AssignmentDetails from './pages/AssignmentDetails';
import AboutUs from './components/AboutUs';
import Support from './components/Support';
import Contact from './components/Contact';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
      {
        path: "/support",
        element: <Support></Support>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/assignments",
        element: <Assignments></Assignments>
      },
      {
        path: "/all-assignments/:id",
        element: <PrivateRoutes><UpdateAssignment></UpdateAssignment></PrivateRoutes>
      },
      {
        path: "/assignmentDetails/:id",
        element: <PrivateRoutes><AssignmentDetails></AssignmentDetails></PrivateRoutes>
      },
      {
        path: "/pending-assignments",
        element: <PrivateRoutes><PendingAssignments></PendingAssignments></PrivateRoutes>
      },
      {
        path: "/create-assignment",
        element: <PrivateRoutes><CreateAssignments></CreateAssignments></PrivateRoutes>
      },
      {
        path: "/my-Submitted-assignments",
        element: <PrivateRoutes><MyAttemptedAssignments></MyAttemptedAssignments></PrivateRoutes>
      },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
