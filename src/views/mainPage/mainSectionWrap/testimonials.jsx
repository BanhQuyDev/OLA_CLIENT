import React, { Component } from "react";

export class Testimonials extends Component {
    TestimonialsData = [{
        "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
        "name": "John Doe"
    },
    {
        "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
        "name": "Johnathan Doe"
    },
    {
        "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
        "name": "John Doe"
    },
    {
        "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
        "name": "Johnathan Doe"
    },
    {
        "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
        "name": "John Doe"
    },
    {
        "img": "img/06.jpg",
        "text": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.\"",
        "name": "Johnathan Doe"
    }
    ]
    render() {
        return (
            <div id="testimonials">
                <div className="container">
                    <div className="section-title text-center">
                        <h2 
                        style={{
                            // fontFamily: "Montserrat",
                            background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                        >What our students say</h2>
                    </div>
                    <div className="row">
                        {
                            this.TestimonialsData.map((d, i) => (
                                <div key={`${d.name}-${i}`} className="col-md-4">
                                    <div className="testimonial">
                                        <br />
                                        <br />
                                        <div className="testimonial-content">
                                            <p>"{d.text}"</p>
                                            <div style={{ fontWeight: 'bold' }}> - {d.name} </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Testimonials;
