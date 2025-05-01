import React, { useState, useEffect } from "react";
import "./Profile.css";
import defaultAvatar from "../../assets/avatar.jpg"; // Default avatar

function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [cutTextarea, setCutTextarea] = useState(false);
  const [bio, setBio] = useState(""); // <- current bio state
  const [TextArea, setTextArea] = useState(""); // textarea content

  // Load profile image and bio on mount
  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) setProfileImage(storedImage);

    const storedBio = JSON.parse(localStorage.getItem("bio"));
    if (storedBio) {
      setBio(storedBio);
      setTextArea(storedBio); // prefill textarea
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
        localStorage.setItem("profileImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const showBioBox = () => setCutTextarea(true);
  const hideBioBox = () => setCutTextarea(false);

  const UpdateBio = () => {
    localStorage.setItem("bio", JSON.stringify(TextArea));
    setBio(TextArea);         // Update visible bio instantly
    setCutTextarea(false);    // Close the textarea
  };

  return (
    <>
      <section className="profileContainer">
        <div className="ProfileBox">
          <div className="settingHeadingBox">
            <h1 className="settingHeading">Account Settings</h1>
          </div>

 <div className="heroBox">
          <section className="heroSection">
            <div className="imgContainer">
              <div className="profileImgBox">
                <img
                  src={profileImage || defaultAvatar}
                  alt="Profile"
                  loading="lazy"
                  className="profileImg"
                />
                <div className="editIcon profileEditIcon">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="fileInput"
                  />
                  <label htmlFor="fileInput">
                  <i class="fa-solid fa-camera"></i>
                  </label>
                </div>
              </div>

              <div className="userNameBox">
                <p className="username">
                  {JSON.parse(localStorage.getItem("username"))}
                </p>
                <p className="userEmail">
                  {JSON.parse(localStorage.getItem("email"))}
                </p>
              </div>
            </div>
          </section>

          <div className="bioContainer">
            <div className="BioBox">
              <p className="bio">{bio || "No bio added yet."}</p>
            </div>

            <div className="editBox" onClick={showBioBox}>
              <div className="editIcon">
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
            </div>
          </div>

          {/* Bio update box (textarea) */}
          {cutTextarea && (
            <div className="changeBioBox">
              <textarea
                name="bio"
                cols="30"
                rows="5"
                className="changeBio"
                placeholder="Update Bio"
                value={TextArea}
                onChange={(e) => setTextArea(e.target.value)}
              ></textarea>
              <i
                className="fa-solid fa-xmark"
                id="cross"
                onClick={hideBioBox}
              ></i>
              <button className="bioUpdate" onClick={UpdateBio}>
                Done
              </button>
            </div>
          )}
        </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
