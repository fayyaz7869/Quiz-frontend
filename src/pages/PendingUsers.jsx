import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Endpoint from "../api/EndPoint";
import { AuthContext } from "../context/AuthContext";
import { toastError, toastSuccess } from "../utils/toast";

export default function PendingUsers() {
  const { token } = useContext(AuthContext);

  const [pendingUsers, setPendingUsers] = useState([]);

  // Fetch pending users
  const loadUsers = async () => {
    try {
      const res = await axios.get(Endpoint.PENDING_USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingUsers(res.data);
    } catch (error) {
      console.log(error);
      toastError("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Approve User
  const approveUser = async (id, role) => {
    try {
      await axios.patch(
        `${Endpoint.APPROVE_USER}/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toastSuccess("User approved!");
      loadUsers();
    } catch (error) {
      toastError("Error approving user");
    }
  };

  // Reject / Delete User
  const rejectUser = async (id) => {
    try {
      await axios.patch(
        `${Endpoint.REJECT_USER}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toastSuccess("User rejected!");
      loadUsers();
    } catch (error) {
      toastError("Error rejecting user");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Pending User Approvals</h2>
      <p className="text-muted">Approve or reject new registrations</p>

      {pendingUsers.length === 0 ? (
        <p className="text-muted mt-3">No pending users</p>
      ) : (
        <table className="table table-striped mt-4 shadow">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Requested Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge bg-info text-dark">
                    {user.role}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => approveUser(user._id, user.role)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => rejectUser(user._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}
