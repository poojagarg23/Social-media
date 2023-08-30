import React from "react";
import internet from "../../images/internet.png";
import question from "../../images/question.png";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import visible from "../../images/see-only.png";
import tag from "../../images/tag-message.png";
import created from "../../images/Group 8.png";
import tagrun from "../../images/tag.png";
import { Button } from "@mui/material";

export default function Aboutus() {
  return (
    <div>
      <div className="aboutUs" style={{ padding: "39px" }}>
        <h5>ABOUT US</h5>
        <p
          className="aboutus-para"
          style={{ borderBottom: "0.5px solid rgba(82, 79, 79, 0.2)" }}
        >
          Growing businesses is hard. This group is to help you along the
          journey.
        </p>
        <div className="display-button">
          <div>
            <img src={internet} />
            <span className="span-public">Public</span>
          </div>
          <div
            style={{
              background: "rgba(46, 125, 50, 0.15)",
              borderRadius: "50%",
            }}
          >
            <QuestionMarkIcon />
          </div>
        </div>
        <div className="display-button">
          <div>
            <img src={visible} />
            <span className="span-public">visible</span>
          </div>
          <div
            style={{
              background: "rgba(46, 125, 50, 0.15)",
              borderRadius: "50%",
            }}
          >
            <QuestionMarkIcon />
          </div>
        </div>
        <div className="display-button">
          <div>
            <img src={tag} />
            <span className="span-public">member</span>
          </div>
          <div>
            <p className="members">25,515 members</p>
          </div>
        </div>
        <div className="display-button">
          <div>
            <img src={created} />
            <span className="span-public">created</span>
          </div>
          <div>
            <p className="members">May 8, 2018</p>
          </div>
        </div>
        <div className="display-button">
          <div>
            <img src={tagrun} />
            <span className="span-public">tags</span>
          </div>
          {/* <div
            style={{
              background: "rgba(46, 125, 50, 0.15)",
              borderRadius: "50%",
            }}
          ></div> */}
        </div>
        <div className="display-button">
          <div>
            <h6>Moderated by</h6>
          </div>
          <div>
            <h6 className="moderate">Csallen, roisesherry, Channingallen</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
