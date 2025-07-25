import Image from "next/image";
import React from "react";

export default function Profile() {
  return (
    <div>
      <div className="panel-profile">
        <div className="image_field">
          <Image
            className="panel_image"
            alt="The profile image if the user"
            src="/images/apple.png"
            width={100}
            height={100}
          />
          <div className="image_text_group">
            <h2 className="image_text">Edit Profile Photo</h2>
            <button className="image_edit">Upload Photo</button>
          </div>
        </div>
        <div className="input_field">
          <h1 className="panel_name">Peter Mwansa</h1>
          <button>Edit Name</button>
        </div>
        <div className="input_field">
          <h1 className="panel_name">mwansa@mail.com</h1>
          <button>Edit Email</button>
        </div>
      </div>
    </div>
  );
}
