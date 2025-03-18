import React from 'react';
// import './css/section.css'


const Section = function ({children}, props) {
    const { className } = props;
    return (
        <section className={className}>
        {children}
        </section>
    )
}

export default Section