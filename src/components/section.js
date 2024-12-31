import React from 'react';
// import './css/section.css'


const Section = function ({children}) {
    return (
        <section className='section'>
        {children}
        </section>
    )
}

export default Section