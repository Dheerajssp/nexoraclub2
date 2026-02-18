import { Instagram, Linkedin, Mail, Github } from "lucide-react";
import { socialLinks } from "../mock";

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-border-subtle mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-brand-primary">Nexora</span> Club
            </h3>
            <p className="text-text-muted text-base leading-relaxed">
              Where Innovation Meets Execution. Join us in building the future of technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-text-muted hover:text-brand-primary transition-colors">Home</a></li>
              <li><a href="/about" className="text-text-muted hover:text-brand-primary transition-colors">About</a></li>
              <li><a href="/events" className="text-text-muted hover:text-brand-primary transition-colors">Events</a></li>
              <li><a href="/team" className="text-text-muted hover:text-brand-primary transition-colors">Team</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-bg-overlay hover:bg-brand-primary hover:text-black transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-bg-overlay hover:bg-brand-primary hover:text-black transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-bg-overlay hover:bg-brand-primary hover:text-black transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${socialLinks.email}`}
                className="p-3 bg-bg-overlay hover:bg-brand-primary hover:text-black transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-12 pt-8 text-center">
          <p className="text-text-muted text-sm">
            © 2024 Nexora Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
