import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";
import GeneralHomeOne from "../feature-module/frontend/home/home-1/generalHomeOne";
import Aboutus from "../feature-module/frontend/pages/aboutus/aboutus";
import Contactus from "../feature-module/frontend/pages/contactus/contactus";
import Error404 from "../feature-module/frontend/pages/error/Error404";
import Error500 from "../feature-module/frontend/pages/error/Error500";
import SpecialtyDoctors from "../feature-module/frontend/pages/speciality/speciality";
import ProtectedRoute from "../core/components/ProtectedRoute";

// Patient Module
import SearchDoctor from "../feature-module/frontend/pages/searchdoctor/search-doctor1";
import DoctorProfile from "../feature-module/frontend/patients/doctorprofile";
import BookingPage from "../feature-module/frontend/patients/booking/bookingPage";
import PatientAppointments from "../feature-module/frontend/patients/appointments";
import Profile from "../feature-module/frontend/patients/dashboard/profile";
import PatientSignup from "../feature-module/frontend/pages/patient-signup";
// Removed separate PatientLogin; route redirects to signup

// Doctor Module
import DoctorRegister from "../feature-module/frontend/doctors/register";
// Removed separate DoctorLogin; route redirects to register
import DoctorDashboard from "../feature-module/frontend/doctors/dashboard";
import ProfileSetting from "../feature-module/frontend/doctors/profilesetting";
import Appointments from "../feature-module/frontend/doctors/appointments";
import MyPatient from "../feature-module/frontend/doctors/mypatient";
import AvailableTimings from "../feature-module/frontend/doctors/availableTimings";

// Admin Module
import AdminDashboard from "../feature-module/admin/dashboard/index";
import AdminAppointments from "../feature-module/admin/appointments";
import AdminDoctors from "../feature-module/admin/doctors";
import AdminPatients from "../feature-module/admin/patients";
import AdminReviews from "../feature-module/admin/reviews";
import AdminLogin from "../feature-module/admin/login";




const route = all_routes
export const publicRoutes = [
  {
    path: "/react/template/",
    name: "Root",
    element: <Navigate to={route.generalHomeOne} />,
    route: Route,
  },
  {
    path: route.generalHomeOne,
    element: <GeneralHomeOne />,
    route: Route,
  },
  {
    path: route.aboutUs,
    element: <Aboutus />,
    route: Route,
  },
  {
    path: route.contactUs,
    element: <Contactus />,
    route: Route,
  },
  {
    path: route.error404,
    element: <Error404 />,
    route: Route,
  },
  {
    path: route.error500,
    element: <Error500 />,
    route: Route,
  },
  
  // Patient Module Routes (Protected)
  {
    path: route.searchDoctor,
    element: <SearchDoctor />,
    route: Route,
  },
  {
    path: route.specialtyDoctors,
    element: <SpecialtyDoctors />,
    route: Route,
  },
  {
    path: route.doctorProfile,
    element: <ProtectedRoute requiredUserType="patient"><DoctorProfile /></ProtectedRoute>,
    route: Route,
  },
  {
    path: route.booking,
    element: <ProtectedRoute requiredUserType="patient"><BookingPage /></ProtectedRoute>,
    route: Route,
  },
  {
    path: route.patientAppointments,
    element: <ProtectedRoute requiredUserType="patient"><PatientAppointments /></ProtectedRoute>,
    route: Route,
  },
  {
    path: route.patientProfile,
    element: <ProtectedRoute requiredUserType="patient"><Profile /></ProtectedRoute>,
    route: Route,
  },
  {
    path: route.patientSignup,
    element: <PatientSignup />,
    route: Route,
    meta_title: "Patient Signup",
  },
  {
    path: route.patientLogin,
    element: <Navigate to={route.patientSignup} replace />,
    route: Route,
    meta_title: "Patient Login",
  },

  // Doctor Module Routes (Protected)
  {
    path: route.doctorDashboard,
    element: <ProtectedRoute requiredUserType="doctor"><DoctorDashboard /></ProtectedRoute>,
    route: Route,
  },
  {
    path: route.appointments,
    element: <ProtectedRoute requiredUserType="doctor"><Appointments /></ProtectedRoute>,
    route: Route,
  },
  {
    path: route.doctorRegister,
    element: <DoctorRegister />,
    route: Route,
    meta_title: "Doctor Register",
  },
  {
    path: route.doctorLogin,
    element: <Navigate to={route.doctorRegister} replace />,
    route: Route,
    meta_title: "Doctor Login",
  },
  {
    path: route.profileSetting,
    element: <ProtectedRoute requiredUserType="doctor"><ProfileSetting /></ProtectedRoute>,
    route: Route,
    meta_title: "Profile Settings",
  },
  {
    path: route.myPateint,
    element: <ProtectedRoute requiredUserType="doctor"><MyPatient /></ProtectedRoute>,
    route: Route,
    meta_title: "My Patient",
  },
  {
    path: route.availableTimings,
    element: <ProtectedRoute requiredUserType="doctor"><AvailableTimings /></ProtectedRoute>,
    route: Route,
    meta_title: "Available Timings",
  },
];



export const adminRoutes = [
  {
    id: "1",
    path: route.adminDashboard,
    element: <ProtectedRoute requiredUserType="admin"><AdminDashboard /></ProtectedRoute>,
  },
  {
    id: "2",
    path: route.adminAppointmentList,
    element: <ProtectedRoute requiredUserType="admin"><AdminAppointments /></ProtectedRoute>,
  },
  {
    id: "3",
    path: route.adminDoctorList,
    element: <ProtectedRoute requiredUserType="admin"><AdminDoctors /></ProtectedRoute>,
  },
  {
    id: "4",
    path: route.adminPatientList,
    element: <ProtectedRoute requiredUserType="admin"><AdminPatients /></ProtectedRoute>,
  },
  {
    id: "5",
    path: route.adminReviews,
    element: <ProtectedRoute requiredUserType="admin"><AdminReviews /></ProtectedRoute>,
  },
  {
    id: "6",
    path: route.adminLogin,
    element: <AdminLogin />,
  },
]


