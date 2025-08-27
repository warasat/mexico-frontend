export const all_routes = {
  // Authentication Routes
  login: "/login",    
  loginEmail: "/pages/login-email",  
  loginPhone: "/pages/login-phone",   
  doctorSignup: "/pages/doctor-signup",   
  patientSignup: "/pages/patient-signup",   
  signupSuccess: "/signup-success",   
  forgotPassword: "/forgot-password",   
  forgotPassword2: "/forgot-password2",   
  loginEmailOtp: "/login-email-otp",   
  signup: "/signup",   
  register: "/register",   
  emailOtp: "/email-otp",   

  // Home Page
  generalHomeOne: "/index",

  // General Pages
  aboutUs: "/pages/aboutus",
  contactUs: "/pages/contactus",
  error404: "/pages/error-404",
  error500: "/pages/error-500",

  // Patient Module Routes
  patientDashboard: "/patient/dashboard",
  searchDoctor: "/patient/search-doctor1",
  doctorProfile: "/patient/doctor-profile",
  booking: "/booking",
  specialtyDoctors: "/specialty-doctors",
  patientAppointments: "/patient/patient-appointments",
  patientProfile: "/patient/profile",
  patientRegisterStep1: "/patient/patientregisterstep-1",
  patientRegisterStep2: "/patient/patientregisterstep-2",
  patientRegisterStep3: "/patient/patientregisterstep-3",
  patientRegisterStep4: "/patient/patientregisterstep-4",
  patientRegisterStep5: "/patient/patientregisterstep-5",

  // Doctor Module Routes
  doctorDashboard: "/doctor/doctor-dashboard",
  appointments: "/doctor/appointments",
  doctorRegister: "/doctor/doctor-register",
  profileSetting: "/doctor/profile-setting",
  myPateint: "/doctor/my-patients",
  availableTimings: "/doctor/available-timings",
  addPrescription: "/doctor/add-prescription",

  // Admin Module Routes
  adminDashboard: "/admin",
  adminAppointmentList: "/admin/appointment-list",
  adminDoctorList: "/admin/doctor-list",
  adminPatientList: "/admin/patient-list",
  adminReviews: "/admin/reviews",
  adminLogin: "/admin/login",
}