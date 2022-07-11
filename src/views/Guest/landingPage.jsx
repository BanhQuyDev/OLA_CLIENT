import React from 'react';
import Banner from 'src/views/mainPage/banner/banner';
import MainSection from 'src/views/mainPage/mainSectionWrap/mainSection';
import Header from '../../utilities/header'
import Footer from '../../utilities/footer'


let landingPage = () => {
    return (
        <div>
            <Header />
            <Banner />
            <MainSection />
            <Footer />
        </div>

    )
}


export default landingPage
