import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const { userCredentials, setUserCredentials } = useContext(AppContext);
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    // Fetch users with pagination
    const getUsers = useCallback(async () => {
        try {
            const response = await fetch(
                process.env.REACT_APP_WEBAPI_URL + "/users?_page=" + currentPage + "&_limit=" + pageSize,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${userCredentials.accessToken}`,
                    },
                }
            );

            const totalCount = response.headers.get("X-Total-Count");
            const pages = Math.ceil(totalCount / pageSize);
            setTotalPages(pages);

            const data = await response.json();

            if (response.ok) {
                setUsers(data);
            } else if (response.status === 401) {
                // Unauthorized response
                setUserCredentials(null);
                navigate("/auth/login");
            } else {
                alert(`Unable to read the data: ${data}`);
            }
        } catch (error) {
            alert("Unable to connect to the server");
        }
    }, [currentPage, pageSize, userCredentials, navigate, setUserCredentials]);

    // Trigger getUsers when the currentPage changes
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    // Generate pagination buttons
    const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
        <li className={i === currentPage ? "page-item active" : "page-item"} key={i}>
            <button
                className="page-link"
                onClick={(event) => {
                    event.preventDefault();
                    setCurrentPage(i);
                }}
            >
                {i}
            </button>
        </li>
    ));

    return (
        <div className="container my-4">
            <h2 className="text-center mb-5">List of Users</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.role === "admin" ? (
                                    <span className="badge text-bg-warning">Admin</span>
                                ) : (
                                    <span className="badge text-bg-success">Client</span>
                                )}
                            </td>
                            <td>
                                <Link
                                    className="btn btn-primary btn-sm"
                                    to={`/admin/users/details/${user.id}`}
                                    role="button"
                                >
                                    Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ul className="pagination">{paginationButtons}</ul>
        </div>
    );
}