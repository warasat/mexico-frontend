import React, { useEffect } from 'react'
import Header from './header'
import HomeBanner from './homeBanner'
import AOS from 'aos';
import 'aos/dist/aos.css';
// import SectionList from './sectionList';
import SectionSpeciality from './sectionSpeciality';
import SectionDoctor from './sectionDoctor';
import SectionService from './sectionService';
import SectionBook from './sectionBook';
import SectionTestimonial from './sectionTestimonial';
import SectionFaq from './sectionFaq';

import Footer from './footer';


const GeneralHomeOne: React.FC = () => {

  AOS.init();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className='main-wrapper'>
      <Header />
      <HomeBanner />
      {/* <SectionList /> */}
      <SectionSpeciality />
      <SectionDoctor />
      <SectionService />
      <SectionBook />
      <SectionTestimonial />
      <SectionFaq />
      
      <Footer />
    </div>
  )
}

export default GeneralHomeOne
