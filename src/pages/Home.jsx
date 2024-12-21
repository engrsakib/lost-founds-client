import React, { useContext } from 'react';
import Slider from '../components/Slider';
import { Helmet } from 'react-helmet';
import Types from '../components/Types';
import Mission from '../components/Mission';
import ActiveDon from '../components/ActiveDon';
import { AuthContext } from '../provider/AuthProvider';
import FAQ from '../components/FAQ';

const Home = () => {
  const{user} = useContext(AuthContext)
    return (
      <>
        {/* slider section */}
        <section className="mt-3">
          <Slider></Slider>
        </section>
        {/* type writer start*/}
        <section>
        <Types></Types>
        {/* our mission */}
        <Mission></Mission>
        {/* active donations */}
        <ActiveDon></ActiveDon>
        <FAQ></FAQ>
        </section>
        {/* type writer end*/}
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </>
    );
};

export default Home;