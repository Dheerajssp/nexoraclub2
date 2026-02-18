import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Award, LogOut, TrendingUp } from "lucide-react";
import { authAPI, registrationsAPI } from "../api";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Fetch user profile
      const userData = await authAPI.getCurrentUser();
      setUser(userData);

      // Fetch user's event registrations
      const regs = await registrationsAPI.getMyRegistrations();
      setRegistrations(regs);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("✅ Logged out successfully!");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="dark-container pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
          <p className="body-large text-text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark-container pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="display-large text-white mb-4">
              My <span className="text-brand-primary">Dashboard</span>
            </h1>
            <p className="body-large text-text-secondary">
              Welcome back, {user?.name}!
            </p>
          </div>
          <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-bg-secondary border border-border-subtle p-6">
            <div className="flex items-center gap-4 mb-3">
              <Calendar className="text-brand-primary" size={32} />
              <h3 className="heading-2 text-white">{registrations.length}</h3>
            </div>
            <p className="body-medium text-text-muted">Events Registered</p>
          </div>
          
          <div className="bg-bg-secondary border border-border-subtle p-6">
            <div className="flex items-center gap-4 mb-3">
              <Award className="text-brand-primary" size={32} />
              <h3 className="heading-2 text-white">{registrations.filter(r => r.status === "completed").length}</h3>
            </div>
            <p className="body-medium text-text-muted">Events Completed</p>
          </div>

          <div className="bg-bg-secondary border border-border-subtle p-6">
            <div className="flex items-center gap-4 mb-3">
              <TrendingUp className="text-brand-primary" size={32} />
              <h3 className="heading-2 text-white">{user?.role === "admin" ? "Admin" : "Member"}</h3>
            </div>
            <p className="body-medium text-text-muted">Account Type</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-bg-secondary border border-border-subtle p-8 mb-12">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-bg-overlay">
              <User className="text-brand-primary" size={48} />
            </div>
            <div className="flex-1">
              <h2 className="heading-1 text-white mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="body-small text-text-muted mb-1">Full Name</p>
                  <p className="body-medium text-white">{user?.name}</p>
                </div>
                <div>
                  <p className="body-small text-text-muted mb-1">Email</p>
                  <p className="body-medium text-white">{user?.email}</p>
                </div>
                <div>
                  <p className="body-small text-text-muted mb-1">Phone</p>
                  <p className="body-medium text-white">{user?.phone}</p>
                </div>
                <div>
                  <p className="body-small text-text-muted mb-1">Branch</p>
                  <p className="body-medium text-white">{user?.branch}</p>
                </div>
                <div>
                  <p className="body-small text-text-muted mb-1">Year</p>
                  <p className="body-medium text-white">{user?.year}</p>
                </div>
                <div>
                  <p className="body-small text-text-muted mb-1">Interest Area</p>
                  <p className="body-medium text-white">{user?.interest_area}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Registrations */}
        <div>
          <h2 className="display-medium text-white mb-8">My Event Registrations</h2>
          
          {registrations.length === 0 ? (
            <div className="bg-bg-secondary border border-border-subtle p-12 text-center">
              <p className="body-large text-text-secondary mb-4">
                You haven't registered for any events yet.
              </p>
              <a href="/events">
                <button className="btn-primary">
                  Browse Events
                </button>
              </a>
            </div>
          ) : (
            <div className="bg-bg-secondary border border-border-subtle overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border-subtle">
                  <tr>
                    <th className="text-left p-4 text-white body-medium">Event Name</th>
                    <th className="text-left p-4 text-white body-medium">Registration Date</th>
                    <th className="text-left p-4 text-white body-medium">Status</th>
                    <th className="text-left p-4 text-white body-medium">Score/Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-border-subtle hover:bg-bg-overlay">
                      <td className="p-4 text-white body-medium">{reg.event_title}</td>
                      <td className="p-4 text-text-secondary body-small">
                        {new Date(reg.registration_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-semibold ${
                          reg.status === "confirmed" 
                            ? "bg-brand-primary text-black" 
                            : reg.status === "completed"
                            ? "bg-green-500 text-black"
                            : "bg-yellow-500 text-black"
                        }`}>
                          {reg.status}
                        </span>
                      </td>
                      <td className="p-4 text-text-secondary body-small">
                        {reg.score || reg.rank ? `Score: ${reg.score || "N/A"} | Rank: ${reg.rank || "N/A"}` : "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
