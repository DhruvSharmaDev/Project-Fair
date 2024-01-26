import React, { useEffect, useRef, useState } from "react";
import styles from "./Account.module.css";
import InputControl from "../InputControl/InputControl";
import { Camera, LogOut } from "react-feather";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, updateUserDatabase, uploadImage } from "../../Firebase";
const Account = ({ userDetails, isAuthenticated }) => {
  const [progress, setProgress] = useState(0);
  const [userProfileValues, setUserProfileValues] = useState({
    name: userDetails.name,
    designation: userDetails.designation || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
    profileImage:
      userDetails.profileImage ||
      "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=600",
  });
  const [showSaveDetailsButton, setShowSaveDetailsButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profileImageUploadedStarted, setProfileImageUploadedStarted] =
  useState(false);
  const [saveButtonDisable, setSaveButtonDisable] = useState(false);

  const imagepicker = useRef();

  const handleLogOut = async () => {
    await signOut(auth);
  };
  // function for image selection usinf reference hook
  const handleCameraClick = () => {
    imagepicker.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
     setProfileImageUploadedStarted(true);
     uploadImage(
      file,
      (progress) => {
        setProgress(progress);
      },
      (url) => {
        userProfileValues.profileImage = url;
        updateImageUrlToDatabase(url);

        setProfileImageUploadedStarted(false);
        setProgress(0);
      },
      (error) => {
        setProfileImageUploadedStarted(false);
      }
    );
  };
  const updateImageUrlToDatabase = async (url) => {
    await updateUserDatabase(
      { ...userProfileValues, ProfileImage: url },
      userDetails.uid
    );
  };
  const handleInputChange = (event, property) => {
    setShowSaveDetailsButton(true);
    setUserProfileValues((prev) => ({
      ...prev,
      [property]: event.target.value,
    }));
  };
  const saveDetailsToDatabase = async () => {
    if (!userProfileValues.name) {
      setErrorMessage("Name is Required");
      return;
    }
    setSaveButtonDisable(true);
    await updateUserDatabase({ ...userProfileValues }, userDetails.uid);
    setSaveButtonDisable(false);
    setShowSaveDetailsButton(false);
  };

  return isAuthenticated ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.heading}>
          Welcome <span>{userProfileValues.name}</span>
        </p>
        <div className={styles.logout} onClick={handleLogOut}>
          <LogOut /> Logout
        </div>
      </div>
      <input
        ref={imagepicker}
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <div className={styles.section}>
        <div className={styles.title}> Your Profile</div>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img src={userProfileValues.profileImage} alt="Profile Image" />
              <div
                className={styles.camera}
                onClick={handleCameraClick}
                onChange={(event) => {
                  handleInputChange(event, "profileImage");
                }}
              >
                <Camera />
              </div>
            </div>
            {profileImageUploadedStarted ? (
              <p className={styles.progress}>
                {progress === 100
                  ? "Uploading The Image "
                  : `${progress.toFixed(2)}%Uploaded`}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.row}>
              <InputControl
                label="Name"
                placeholder="Enter Your Name"
                value={userProfileValues.name}
                onChange={(event) => {
                  handleInputChange(event, "name");
                }}
              />
              <InputControl
                label="Title"
                placeholder="eg. Full Stack Developer"
                value={userProfileValues.designation}
                onChange={(event) => {
                  handleInputChange(event, "designation");
                }}
              />
            </div>
            <div className={styles.row}>
              <InputControl
                label="Github"
                placeholder="Enter your Github link"
                value={userProfileValues.github}
                onChange={(event) => {
                  handleInputChange(event, "github");
                }}
              />
              <InputControl
                label="LinkedIn"
                placeholder="Enter Your Linkedin link"
                value={userProfileValues.linkedin}
                onChange={(event) => {
                  handleInputChange(event, "linkedin");
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.error}>{errorMessage}</p>
        </div>
        {showSaveDetailsButton && (
          <div
            className={styles.saveButton}
            onClick={saveDetailsToDatabase}
            disabled={saveButtonDisable}
          >
            Save Details
          </div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
export default Account;
