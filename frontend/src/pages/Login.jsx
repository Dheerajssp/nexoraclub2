import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { authAPI } from "../api";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login(loginData);
      localStorage.setItem("token", response.access_token);
      alert("✅ Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.detail || "Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="dark-container pt-32 pb-20">
      <div className="max-w-md mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="display-large text-white mb-4">
            {isLogin ? "Login" : "Register"}
          </h1>
          <p className="body-large text-text-secondary">
            {isLogin 
              ? "Welcome back! Login to access your dashboard"
              : "New here? Create your account"
            }
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
            className={`flex-1 py-4 font-semibold text-lg transition-all ${
              isLogin
                ? "bg-brand-primary text-black"
                : "bg-bg-secondary text-text-muted hover:bg-bg-overlay"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <LogIn size={20} />
              Login
            </div>
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
            className={`flex-1 py-4 font-semibold text-lg transition-all ${
              !isLogin
                ? "bg-brand-primary text-black"
                : "bg-bg-secondary text-text-muted hover:bg-bg-overlay"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus size={20} />
              Register
            </div>
          </button>
        </div>

        {isLogin ? (
          /* Login Form */
          <form onSubmit={handleSubmit} className="bg-bg-secondary border border-border-subtle p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-white body-medium mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={handleChange}
                  className="w-full bg-black border-border-medium text-white body-medium p-4"
                  placeholder="your.email@college.edu"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white body-medium mb-2 block">
                  Password *
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full bg-black border-border-medium text-white body-medium p-4"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500 p-4">
                  <p className="text-red-200 body-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-text-muted body-small text-center">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-brand-primary hover:underline"
                >
                  Register here
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* Register Redirect */
          <div className="bg-bg-secondary border border-border-subtle p-8 text-center">
            <p className="body-large text-text-secondary mb-6">
              To create a new account, please go to the registration page.
            </p>
            <Link to="/join">
              <button className="btn-primary">
                Go to Registration
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
