import { Calendar, Users, ArrowRight } from "lucide-react";
import { upcomingEvents, pastEvents } from "../mock";

export const Events = () => {
  const handleRegister = (eventId) => {
    console.log(`Registering for event ${eventId}`);
    alert("Registration feature coming soon! You'll be notified once it's live.");
  };

  return (
    <div className="dark-container pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="display-large text-white mb-6">
            Our <span className="text-brand-primary">Events</span>
          </h1>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Explore our upcoming workshops, hackathons, and tech talks. Join us in learning and innovation!
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-24">
          <h2 className="display-medium text-white mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-bg-secondary border border-border-subtle overflow-hidden dark-transition hover:border-brand-primary"
              >
                <div className="h-56 bg-bg-overlay overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover dark-transition hover:scale-105"
                  />
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
                  <p className="body-medium text-text-secondary mb-6">
                    {event.description}
                  </p>
                  <button
                    onClick={() => handleRegister(event.id)}
                    className="btn-primary w-full"
                  >
                    Register Now
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
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
