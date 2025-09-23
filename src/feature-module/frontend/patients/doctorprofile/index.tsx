 
import { Link, useLocation } from "react-router-dom";
import Header from "../../header";
import Footer from "../../footer";
import Content from "./content";
import Pagecontent from "./pagecontent";
import ImageWithBasePath from "../../../../components/imageWithBasePath";
import { useEffect, useMemo, useState } from "react";
import publicDoctorApi from "../../../../core/services/publicDoctorApi";

const DoctorProfile  = (props: any) => {
  const location = useLocation();
  const selectedDoctor = (location.state as any)?.selectedDoctor || null;
  const activeTabFromState: string | null = (location.state as any)?.activeTab || null;
  const doctorIdFromState: string | null = selectedDoctor?.id || null;
  const [doctor, setDoctor] = useState<any | null>(selectedDoctor || null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const id = doctorIdFromState;
    if (!id) return; // fallback: component children will render dummy content
    (async () => {
      try {
        const res = await publicDoctorApi.getById(id);
        setDoctor(res?.doctor || null);
        setReviews(Array.isArray(res?.reviews) ? res.reviews : []);
      } catch {}
    })();
  }, [doctorIdFromState]);

  // If navigated with state.activeTab === 'location', switch to the Locations tab after render
  useEffect(() => {
    if (activeTabFromState === 'location') {
      const tabTrigger = document.querySelector('a[href="#doc_locations"]') as HTMLAnchorElement | null;
      if (tabTrigger) {
        // Bootstrap tab trigger
        (tabTrigger as any).click?.();
        // Also adjust URL hash for consistency
        if (window.location.hash !== '#doc_locations') {
          window.location.hash = '#doc_locations';
        }
      }
    } else if (window.location.hash === '#doc_locations') {
      const tabTrigger = document.querySelector('a[href="#doc_locations"]') as HTMLAnchorElement | null;
      (tabTrigger as any)?.click?.();
    }
  }, [activeTabFromState]);

  // Normalize to the UI shape expected by Pagecontent (keep existing visual fields)
  const uiDoctor = useMemo(() => {
    if (!doctor) return selectedDoctor;
    const name = doctor.displayName || [doctor.firstName, doctor.lastName].filter(Boolean).join(' ').trim();
    const image = doctor.profileImage?.url || selectedDoctor?.image || 'assets/img/doctor-grid/doc3.png';
    const department = doctor.designation || selectedDoctor?.department || '';
    const specialty = doctor.designation || selectedDoctor?.specialty || '';
    const location = [doctor.address?.city, doctor.address?.country].filter(Boolean).join(', ') || selectedDoctor?.location || '';
    const rating = selectedDoctor?.rating ?? 4.0;
    const totalReviews = reviews?.length ?? (selectedDoctor?.totalReviews ?? 0);
    const servicesOffered = Array.isArray(doctor.servicesOffered) ? doctor.servicesOffered : (selectedDoctor?.servicesOffered || []);
    return {
      id: String(doctor._id || doctor.id || doctorIdFromState || selectedDoctor?.id || ''),
      name,
      image,
      department,
      specialty,
      rating,
      totalReviews,
      location,
      servicesOffered,
    };
  }, [doctor, selectedDoctor, reviews, doctorIdFromState]);
  return (
    <div>
      <Header {...props} />
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row align-items-center inner-banner">
              <div className="col-md-12 col-12 text-center">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/index">
                        <i className="isax isax-home-15" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Patient
                    </li>
                    <li className="breadcrumb-item active">Doctor Profile 1</li>
                  </ol>
                  <h2 className="breadcrumb-title">Doctor Profile</h2>
                </nav>
              </div>
            </div>
          </div>
          <div className="breadcrumb-bg">
            <ImageWithBasePath
              src="assets/img/bg/breadcrumb-bg-01.png"
              alt="img"
              className="breadcrumb-bg-01"
            />
            <ImageWithBasePath
              src="assets/img/bg/breadcrumb-bg-02.png"
              alt="img"
              className="breadcrumb-bg-02"
            />
            <ImageWithBasePath
              src="assets/img/bg/breadcrumb-icon.png"
              alt="img"
              className="breadcrumb-bg-03"
            />
            <ImageWithBasePath
              src="assets/img/bg/breadcrumb-icon.png"
              alt="img"
              className="breadcrumb-bg-04"
            />
          </div>
        </div>
        {/* /Breadcrumb */}
      </>


      <div className="content">
        <div className="container">
          <Pagecontent doctor={uiDoctor} />
          <Content doctor={doctor} />
        </div>
      </div>
      <Footer {...props} />
    </div>
  );
};

export default DoctorProfile;
