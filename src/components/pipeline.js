import "./css/pipeline.css"
import React from 'react';

const Pipeline = function (props) {
    return (
        <h2 className='pipeline-forme' style={props.style}>{props.text}</h2>
    )

}

export default Pipeline