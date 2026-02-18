import { Code2, Globe, Zap, BookOpen, ExternalLink, Play, Video, Youtube } from "lucide-react";
import { resources } from "../mock";

const iconMap = {
  Code2: Code2,
  Globe: Globe,
  Zap: Zap,
  BookOpen: BookOpen,
  Play: Play,
  Video: Video,
  Youtube: Youtube
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
            Curated collection of best platforms, websites, and YouTube channels for coding, DSA, web development, and hackathons.
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
                    <div className="space-y-3">
                      {resource.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-brand-primary hover:text-white transition-colors group"
                        >
                          <ExternalLink size={16} className="flex-shrink-0" />
                          <span className="body-medium group-hover:underline">{link.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Access Section */}
        <div className="bg-bg-secondary border border-border-subtle p-12">
          <h2 className="display-medium text-white mb-8 text-center">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="https://unstop.com/hackathons"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Unstop
            </a>
            <a
              href="https://www.hackerearth.com/challenges/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              HackerEarth
            </a>
            <a
              href="https://www.geeksforgeeks.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              GeeksforGeeks
            </a>
            <a
              href="https://www.codechef.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              CodeChef
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
