import { Linkedin } from "lucide-react";
import { teamMembers } from "../mock";

export const Team = () => {
  return (
    <div className="dark-container pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="display-large text-white mb-6">
            Meet Our <span className="text-brand-primary">Team</span>
          </h1>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            The passionate individuals driving Nexora Club forward with dedication and innovation.
          </p>
        </div>

        {/* Leadership */}
        <section className="mb-20">
          <h2 className="display-medium text-white mb-12 text-center">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="bg-bg-secondary border border-border-subtle overflow-hidden dark-transition hover:border-brand-primary group"
              >
                <div className="h-80 bg-bg-overlay overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover dark-transition group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="heading-2 text-white mb-2">{member.name}</h3>
                  <p className="body-medium text-brand-primary mb-4">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors"
                  >
                    <Linkedin size={20} />
                    <span className="body-small">Connect</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Team */}
        <section>
          <h2 className="display-medium text-white mb-12 text-center">Core Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.slice(3).map((member) => (
              <div
                key={member.id}
                className="bg-bg-secondary border border-border-subtle overflow-hidden dark-transition hover:border-brand-primary group"
              >
                <div className="h-64 bg-bg-overlay overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover dark-transition group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="heading-3 text-white mb-2">{member.name}</h3>
                  <p className="body-medium text-brand-primary mb-4">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-text-muted hover:text-brand-primary transition-colors"
                  >
                    <Linkedin size={20} />
                    <span className="body-small">Connect</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Team CTA */}
        <div className="mt-20 bg-bg-secondary border border-border-subtle p-12 text-center">
          <h2 className="display-medium text-white mb-6">Want to Join Our Team?</h2>
          <p className="body-large text-text-secondary mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our core team. 
            If you're driven, innovative, and ready to make an impact, we'd love to hear from you!
          </p>
          <a href="/join">
            <button className="btn-primary">
              Apply Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
