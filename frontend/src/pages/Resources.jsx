import { Code2, Globe, Zap, BookOpen, ExternalLink } from "lucide-react";
import { resources } from "../mock";

const iconMap = {
  Code2: Code2,
  Globe: Globe,
  Zap: Zap,
  BookOpen: BookOpen
};

export const Resources = () => {
  return (
    <div className="dark-container pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="display-large text-white mb-6">
            Learning <span className="text-brand-primary">Resources</span>
          </h1>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Curated resources to help you excel in your tech journey. From DSA to interviews, we've got you covered.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {resources.map((resource) => {
            const Icon = iconMap[resource.icon];
            return (
              <div
                key={resource.id}
                className="bg-bg-secondary border border-border-subtle p-8 dark-transition hover:border-brand-primary"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-bg-overlay flex-shrink-0">
                    <Icon className="text-brand-primary" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-2 text-white mb-3">{resource.title}</h3>
                    <p className="body-medium text-text-secondary mb-6">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {resource.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-bg-overlay text-text-secondary body-small border border-border-subtle"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <button className="btn-secondary inline-flex items-center gap-2">
                      Access Resource
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <section className="bg-bg-secondary border border-border-subtle p-12">
          <h2 className="display-medium text-white mb-8 text-center">More Coming Soon</h2>
          <p className="body-large text-text-secondary text-center max-w-3xl mx-auto mb-8">
            We're constantly updating our resource library with new guides, tutorials, and learning paths. 
            Have a suggestion? Let us know!
          </p>
          <div className="text-center">
            <a href={`mailto:nexoraclub@college.edu`}>
              <button className="btn-primary">
                Suggest a Resource
              </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
