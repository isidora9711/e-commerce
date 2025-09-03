import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
          molestias voluptatem cum dolorem sequi eos laboriosam corporis neque
          sapiente, excepturi numquam, nemo distinctio eius quasi impedit quos
          error iste accusantium?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quas
          quibusdam ut minus sed distinctio, molestias ratione totam unde
          exercitationem doloribus modi doloremque reiciendis tenetur,
          architecto quisquam veniam rem ad.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
