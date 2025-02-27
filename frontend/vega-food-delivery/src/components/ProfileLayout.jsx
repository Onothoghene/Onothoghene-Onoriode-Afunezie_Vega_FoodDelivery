import React from "react";
import SideBar from "./SideBar";

const ProfileLayout = ({ children }) => {
    return (
        <div className="container mt-5">
            <div className="row mt-2">
                <SideBar />
                <div className="col-md-9">{children}</div>
            </div>
        </div>
    );
};

export default ProfileLayout;
