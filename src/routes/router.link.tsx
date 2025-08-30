import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";
import GeneralHomeOne from "../feature-module/frontend/home/home-1/generalHomeOne";
import Aboutus from "../feature-module/frontend/pages/aboutus/aboutus";
import Contactus from "../feature-module/frontend/pages/contactus/contactus";
import Error404 from "../feature-module/frontend/pages/error/Error404";
import Error500 from "../feature-module/frontend/pages/error/Error500";
import SpecialtyDoctors from "../feature-module/frontend/pages/speciality/speciality";

// Patient Module
import Dashboard from "../feature-module/frontend/patients/dashboard";
import SearchDoctor from "../feature-module/frontend/pages/searchdoctor/search-doctor1";
import DoctorProfile from "../feature-module/frontend/patients/doctorprofile";
import BookingWizard from "../feature-module/frontend/patients/booking/bookingWizard";
import PatientAppointments from "../feature-module/frontend/patients/appointments";
import Profile from "../feature-module/frontend/patients/dashboard/profile";
import PatientSignup from "../feature-module/frontend/pages/patient-signup";
import PatientLogin from "../feature-module/frontend/patients/login";

// Doctor Module
import DoctorRegister from "../feature-module/frontend/doctors/register";
import DoctorLogin from "../feature-module/frontend/doctors/login";
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
  
  // Patient Module Routes
  {
    path: route.patientDashboard,
    element: <Dashboard />,
    route: Route,
  },
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
    element: <DoctorProfile />,
    route: Route,
  },
  {
    path: route.booking,
    element: <BookingWizard />,
    route: Route,
  },
  {
    path: route.patientAppointments,
    element: <PatientAppointments />,
    route: Route,
  },
  {
    path: route.patientProfile,
    element: <Profile />,
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
    element: <PatientLogin />,
    route: Route,
    meta_title: "Patient Login",
  },

  // Doctor Module Routes
  {
    path: route.doctorDashboard,
    element: <DoctorDashboard />,
    route: Route,
  },
  {
    path: route.appointments,
    element: <Appointments />,
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
    element: <DoctorLogin />,
    route: Route,
    meta_title: "Doctor Login",
  },
  {
    path: route.profileSetting,
    element: <ProfileSetting />,
    route: Route,
    meta_title: "Profile Settings",
  },
  {
    path: route.myPateint,
    element: <MyPatient />,
    route: Route,
    meta_title: "My Patient",
  },
  {
    path: route.availableTimings,
    element: <AvailableTimings />,
    route: Route,
    meta_title: "Available Timings",
  },
];



export const adminRoutes = [
  {
    id: "1",
    path: route.adminDashboard,
    element: <AdminDashboard />,
  },
  {
    id: "2",
    path: route.adminAppointmentList,
    element: <AdminAppointments />,
  },
  {
    id: "3",
    path: route.adminDoctorList,
    element: <AdminDoctors />,
  },
  {
    id: "4",
    path: route.adminPatientList,
    element: <AdminPatients />,
  },
  {
    id: "5",
    path: route.adminReviews,
    element: <AdminReviews />,
  },
  {
    id: "6",
    path: route.adminLogin,
    element: <AdminLogin />,
  },
]


