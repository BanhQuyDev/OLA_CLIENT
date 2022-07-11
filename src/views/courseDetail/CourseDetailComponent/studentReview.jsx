import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import './studentReview.css'

// eslint-disable-next-line
const useStyles = makeStyles((theme) => ({

  containerStyle: {
    paddingBottom: "50px",
    paddingTop: "50px",
    fontFamily: '"Raleway", sans-serif',
    textAlign: "center !important",

    // backgroundColor: "yellow"      
  },
}))

function StudentReview(props) {
  return (
    <>
      <div className="reviews-container">
        <div className="review">
          <span className="icon-container">5 <i className="fas fa-star"></i></span>
          <div className="progress">
            <div className="progress-done" style={{width: props.countReview['0'] ? props.countReview['0'] : 0}} data-done="0"></div>
          </div>
          <span className="percent">0%</span>
        </div>
        <div className="review">
          <span className="icon-container">4 <i className="fas fa-star"></i></span>
          <div className="progress">
            <div className="progress-done" data-done="0"></div>
          </div>
          <span className="percent">0%</span>
        </div>
        <div className="review">
          <span className="icon-container">3 <i className="fas fa-star"></i></span>
          <div className="progress">
            <div className="progress-done" data-done="0"></div>
          </div>
          <span className="percent">0%</span>
        </div>
        <div className="review">
          <span className="icon-container">2 <i className="fas fa-star"></i></span>
          <div className="progress">
            <div className="progress-done" data-done="0"></div>
          </div>
          <span className="percent">0%</span>
        </div>
        <div className="review">
          <span className="icon-container">1 <i className="fas fa-star"></i></span>
          <div className="progress">
            <div className="progress-done" data-done="0"></div>
          </div>
          <span className="percent">0%</span>
        </div>
      </div>
    </>

  );
}

export default StudentReview;
