import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../AppContext";

export default function UserDetails() {
    const [user, setUser] = useState({});
    const params = useParams();
    const { userCredentials, setUserCredentials } = useContext(AppContext);
    const navigate = useNavigate();

    // Wrap the function in useCallback to stabilize its reference
    const getUserDetails = useCallback(async () => {
        try {
            const response = await fetch(process.env.REACT_APP_WEBAPI_URL + "/users/" + params.id, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + userCredentials.accessToken,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data);
            } else if (response.status === 401) {
                // Unauthorized response
                setUserCredentials(null);
                navigate("/auth/login"); // Redirect to the login page
            } else {
                alert("Unable to read the user details: " + data);
            }
        } catch (error) {
            alert("Unable to connect to the server");
        }
    }, [params.id, userCredentials, navigate, setUserCredentials]);

    // Add getUserDetails to the dependency array
    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);

    return (
        <div className="container my-4">
            <h2 className="mb-3">User Details</h2>
            <hr />

            <div className="row mb-3">
                <div className="col-4">ID</div>
                <div className="col-8">{user.id}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">First Name</div>
                <div className="col-8">{user.firstname}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Last Name</div>
                <div className="col-8">{user.lastname}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Email</div>
                <div className="col-8">{user.email}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Phone</div>
                <div className="col-8">{user.phone}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Address</div>
                <div className="col-8">{user.address}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Role</div>
                <div className="col-8">
                    {!user.id ? (
                        ""
                    ) : user.role === "admin" ? (
                        <span className="badge text-bg-warning">Admin</span>
                    ) : (
                        <span className="badge text-bg-success">Client</span>
                    )}
                </div>
            </div>

            <hr />

            <Link className="btn btn-secondary btn-sm" to="/admin/users" role="button">
                Back
            </Link>
        </div>
    );
}