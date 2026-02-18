import { ArrowRight, Users, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { featuredEvent } from "../mock";
import { statsAPI } from "../api";
import Spline from "@splinetool/react-spline";

export const Home = () => {
  const [stats, setStats] = useState({
    total_members: 0,
    total_events: 0,
    total_registrations: 0
  });

  useEffect(() => {
    // Fetch real stats from backend
    const fetchStats = async () => {
      try {
        const data = await statsAPI.getClubStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Use default values if API fails
        setStats({
          total_members: 0,
          total_events: 0,
          total_registrations: 0
        });
      }
    };
    
    fetchStats();
  }, []);
  return (
    <div className="dark-container">
      {/* Hero Section with Spline */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-16 -mt-20">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="display-huge text-white leading-tight">
              Welcome to <span className="text-brand-primary">Nexora</span> Club
            </h1>
            <p className="body-large text-text-secondary max-w-xl">
              Where Innovation Meets Execution. Join the most dynamic tech community 
              and transform your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/join">
                <button className="btn-primary w-full sm:w-auto">
                  Join Now
                  <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/events">
                <button className="btn-secondary w-full sm:w-auto">
                  Explore Events
                  <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right 3D Spline */}
          <div className="relative h-[500px] lg:h-[700px] overflow-visible flex items-center justify-center">
            <div className="w-full h-full max-w-[700px]">
              <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-bg-secondary border border-border-subtle p-8 text-center dark-transition hover:border-brand-primary">
              <Users className="mx-auto mb-4 text-brand-primary" size={48} />
              <h3 className="display-medium text-white mb-2">{stats.total_members}+</h3>
              <p className="body-medium text-text-muted">Active Members</p>
            </div>
            <div className="bg-bg-secondary border border-border-subtle p-8 text-center dark-transition hover:border-brand-primary">
              <Calendar className="mx-auto mb-4 text-brand-primary" size={48} />
              <h3 className="display-medium text-white mb-2">{stats.total_events}+</h3>
              <p className="body-medium text-text-muted">Events Organized</p>
            </div>
            <div className="bg-bg-secondary border border-border-subtle p-8 text-center dark-transition hover:border-brand-primary">
              <Award className="mx-auto mb-4 text-brand-primary" size={48} />
              <h3 className="display-medium text-white mb-2">{stats.total_registrations}+</h3>
              <p className="body-medium text-text-muted">Event Registrations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="display-large text-white mb-12 text-center">Featured Event</h2>
          <div className="bg-bg-secondary border border-border-subtle p-8 md:p-12 dark-transition hover:border-brand-primary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-brand-primary text-sm font-semibold uppercase tracking-wider">
                  {featuredEvent.category}
                </span>
                <h3 className="display-medium text-white mt-4 mb-4">
                  {featuredEvent.title}
                </h3>
                <p className="body-medium text-text-secondary mb-6">
                  {featuredEvent.description}
                </p>
                <div className="flex items-center gap-4 text-text-muted mb-8">
                  <Calendar size={20} className="text-brand-primary" />
                  <span className="body-medium">
                    {new Date(featuredEvent.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
                <Link to="/events">
                  <button className="btn-primary">
                    Register Now
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
              <div className="h-80 bg-bg-overlay flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
