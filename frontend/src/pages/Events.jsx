import { Calendar, Users, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { pastEvents } from "../mock";
import { eventsAPI, registrationsAPI } from "../api";

export const Events = () => {
  const [internalEvents, setInternalEvents] = useState([]);
  const [externalEvents, setExternalEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(null);
  const [activeTab, setActiveTab] = useState("nexora"); // nexora or external

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // Fetch internal (Nexora) events
      const internal = await eventsAPI.getByType("internal");
      setInternalEvents(internal);
      
      // Fetch external platform events
      const external = await eventsAPI.getByType("external");
      setExternalEvents(external);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleRegister = async (eventId, isExternal, externalUrl) => {
    if (isExternal && externalUrl) {
      // Redirect to external platform
      window.open(externalUrl, "_blank");
      return;
    }

    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Please register/login first to register for events! Redirecting to Join Us page...");
      window.location.href = "/join";
      return;
    }

    setRegistering(eventId);
    
    try {
      await registrationsAPI.register(eventId);
      alert("✅ Successfully registered for the event! You'll receive confirmation via email.");
      fetchEvents();
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Registration failed";
      alert("❌ " + errorMsg);
    } finally {
      setRegistering(null);
    }
  };

  const EventCard = ({ event, showPlatform = false }) => (
    <div className="bg-bg-secondary border border-border-subtle overflow-hidden dark-transition hover:border-brand-primary">
      <div className="h-56 bg-bg-overlay overflow-hidden relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover dark-transition hover:scale-105"
        />
        {showPlatform && event.platform && (
          <div className="absolute top-4 right-4 bg-brand-primary text-black px-3 py-1 text-sm font-semibold flex items-center gap-2">
            <ExternalLink size={14} />
            {event.platform}
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-brand-primary text-sm font-semibold uppercase tracking-wider">
            {event.category}
          </span>
          <div className="flex items-center gap-2 text-text-muted body-small">
            <Calendar size={16} className="text-brand-primary" />
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </div>
        </div>
        <h3 className="heading-2 text-white mb-3">{event.title}</h3>
        <p className="body-medium text-text-secondary mb-4 line-clamp-2">
          {event.description}
        </p>
        {!event.is_external && (
          <div className="flex items-center gap-2 text-brand-primary body-small mb-6">
            <Users size={16} />
            <span>{event.registrations_count} registered</span>
          </div>
        )}
        <button
          onClick={() => handleRegister(event.id, event.is_external, event.external_url)}
          className="btn-primary w-full"
          disabled={registering === event.id}
        >
          {registering === event.id ? "Processing..." : event.is_external ? "Register on Platform" : "Register Now"}
          {event.is_external ? <ExternalLink size={20} /> : <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="dark-container pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="display-large text-white mb-6">
            Explore <span className="text-brand-primary">Events</span>
          </h1>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Join hackathons, workshops, and competitions from Nexora Club and top platforms worldwide!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("nexora")}
            className={`px-8 py-4 font-semibold text-lg transition-all ${
              activeTab === "nexora"
                ? "bg-brand-primary text-black"
                : "bg-bg-secondary text-text-muted hover:bg-bg-overlay"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              Nexora Events ({internalEvents.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("external")}
            className={`px-8 py-4 font-semibold text-lg transition-all ${
              activeTab === "external"
                ? "bg-brand-primary text-black"
                : "bg-bg-secondary text-text-muted hover:bg-bg-overlay"
            }`}
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={20} />
              External Events ({externalEvents.length})
            </div>
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="body-large text-text-secondary">Loading events...</p>
          </div>
        ) : (
          <>
            {/* Nexora Events */}
            {activeTab === "nexora" && (
              <section className="mb-24">
                <h2 className="display-medium text-white mb-8">
                  Events Organized by <span className="text-brand-primary">Nexora Club</span>
                </h2>
                {internalEvents.length === 0 ? (
                  <div className="bg-bg-secondary border border-border-subtle p-12 text-center">
                    <p className="body-large text-text-secondary mb-4">
                      No events organized yet.
                    </p>
                    <p className="body-medium text-text-muted">
                      Stay tuned for upcoming Nexora events!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {internalEvents.map((event) => (
                      <EventCard key={event.id} event={event} showPlatform={false} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* External Events */}
            {activeTab === "external" && (
              <section>
                <h2 className="display-medium text-white mb-8">
                  Events from <span className="text-brand-primary">Top Platforms</span>
                </h2>
                {externalEvents.length === 0 ? (
                  <div className="bg-bg-secondary border border-border-subtle p-12 text-center">
                    <p className="body-large text-text-secondary">
                      No external events available at the moment.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {externalEvents.map((event) => (
                      <EventCard key={event.id} event={event} showPlatform={true} />
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}

        {/* Past Events */}
        <section className="mt-24">
          <h2 className="display-medium text-white mb-12">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-bg-secondary border border-border-subtle overflow-hidden dark-transition hover:border-brand-primary"
              >
                <div className="h-48 bg-bg-overlay overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover dark-transition hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-text-muted body-small mb-3">
                    <Calendar size={16} className="text-brand-primary" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                  <h3 className="heading-3 text-white mb-3">{event.title}</h3>
                  <p className="body-small text-text-secondary mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-brand-primary body-small">
                    <Users size={16} />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
