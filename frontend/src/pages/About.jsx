import { Target, Lightbulb, Users, ExternalLink, School } from "lucide-react";

export const About = () => {
  return (
    <div className="dark-container pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="display-large text-white mb-6">
            About <span className="text-brand-primary">Nexora</span> Club
          </h1>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            A student-driven tech community at R.D. Engineering College, passionate about innovation and continuous learning.
          </p>
        </div>

        {/* College Information */}
        <div className="mb-16 bg-bg-secondary border border-brand-primary p-8 md:p-12">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-brand-primary">
              <School className="text-black" size={32} />
            </div>
            <div className="flex-1">
              <h2 className="heading-1 text-white mb-4">Our Institution</h2>
              <h3 className="heading-2 text-brand-primary mb-3">
                R.D. Engineering College (RDEC)
              </h3>
              <p className="body-medium text-text-secondary leading-relaxed mb-4">
                Top Engineering College in Ghaziabad, Delhi NCR, Uttar Pradesh. 
                RDEC is committed to providing quality technical education and fostering innovation among students.
              </p>
              <a
                href="https://rdec.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-primary hover:underline body-medium"
              >
                Visit College Website
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="mb-16 bg-bg-secondary border border-border-subtle p-8 md:p-12">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-bg-overlay">
              <Target className="text-brand-primary" size={32} />
            </div>
            <div>
              <h2 className="heading-1 text-white mb-4">Our Vision</h2>
              <p className="body-medium text-text-secondary leading-relaxed">
                To create a thriving ecosystem where students can explore, learn, and innovate 
                in the field of technology. We envision becoming the leading tech community 
                that bridges the gap between academic knowledge and industry requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-16 bg-bg-secondary border border-border-subtle p-8 md:p-12">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-bg-overlay">
              <Lightbulb className="text-brand-primary" size={32} />
            </div>
            <div>
              <h2 className="heading-1 text-white mb-4">Our Mission</h2>
              <p className="body-medium text-text-secondary leading-relaxed mb-4">
                We are committed to:
              </p>
              <ul className="space-y-3 body-medium text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>Organizing regular workshops, hackathons, and tech talks to enhance technical skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>Providing mentorship and guidance for competitive programming and placements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>Creating opportunities for hands-on project development and collaboration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary mt-1">•</span>
                  <span>Building connections with industry professionals and alumni</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Join */}
        <div className="mb-16">
          <h2 className="display-medium text-white mb-12 text-center">Why Join Nexora Club?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-bg-secondary border border-border-subtle p-8 dark-transition hover:border-brand-primary">
              <h3 className="heading-2 text-white mb-4">Skill Development</h3>
              <p className="body-medium text-text-secondary">
                Access to comprehensive learning resources, workshops, and hands-on projects 
                to build industry-relevant skills.
              </p>
            </div>
            <div className="bg-bg-secondary border border-border-subtle p-8 dark-transition hover:border-brand-primary">
              <h3 className="heading-2 text-white mb-4">Networking</h3>
              <p className="body-medium text-text-secondary">
                Connect with like-minded peers, seniors, alumni, and industry professionals 
                to expand your network.
              </p>
            </div>
            <div className="bg-bg-secondary border border-border-subtle p-8 dark-transition hover:border-brand-primary">
              <h3 className="heading-2 text-white mb-4">Competitions</h3>
              <p className="body-medium text-text-secondary">
                Participate in hackathons, coding contests, and tech challenges to test 
                your skills and win exciting prizes.
              </p>
            </div>
            <div className="bg-bg-secondary border border-border-subtle p-8 dark-transition hover:border-brand-primary">
              <h3 className="heading-2 text-white mb-4">Career Growth</h3>
              <p className="body-medium text-text-secondary">
                Get placement preparation support, resume reviews, and mock interviews 
                from experienced mentors.
              </p>
            </div>
          </div>
        </div>

        {/* Faculty Coordinator */}
        <div className="bg-bg-secondary border border-border-subtle p-8 md:p-12">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-bg-overlay">
              <Users className="text-brand-primary" size={32} />
            </div>
            <div>
              <h2 className="heading-1 text-white mb-4">Faculty Coordinator</h2>
              <p className="body-medium text-text-secondary mb-2">
                <span className="font-semibold text-white">Dr. Rajesh Kumar</span>
              </p>
              <p className="body-medium text-text-muted">
                Professor, Department of Computer Science & Engineering
              </p>
              <p className="body-medium text-text-muted">
                R.D. Engineering College, Ghaziabad
              </p>
              <p className="body-small text-text-muted mt-3">
                Email: nexoraclub@rdec.ac.in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
