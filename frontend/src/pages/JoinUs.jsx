import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { interestAreas, branches, years } from "../mock";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    interestArea: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Simulate form submission
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        branch: "",
        year: "",
        interestArea: "",
        message: ""
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="dark-container pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-6 md:px-16">
          <div className="bg-bg-secondary border border-brand-primary p-12 text-center">
            <CheckCircle className="mx-auto mb-6 text-brand-primary" size={64} />
            <h2 className="display-medium text-white mb-4">Welcome to Nexora!</h2>
            <p className="body-large text-text-secondary">
              Your registration has been received. We'll get back to you soon with further details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark-container pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="display-large text-white mb-6">
            Join <span className="text-brand-primary">Nexora</span> Club
          </h1>
          <p className="body-large text-text-secondary">
            Take the first step towards becoming part of our innovative tech community.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-bg-secondary border border-border-subtle p-8 md:p-12">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-white body-medium mb-2 block">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black border-border-medium text-white body-medium p-4"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white body-medium mb-2 block">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black border-border-medium text-white body-medium p-4"
                placeholder="your.email@college.edu"
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-white body-medium mb-2 block">
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black border-border-medium text-white body-medium p-4"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {/* Branch */}
            <div>
              <Label htmlFor="branch" className="text-white body-medium mb-2 block">
                Branch *
              </Label>
              <Select
                value={formData.branch}
                onValueChange={(value) => handleSelectChange("branch", value)}
                required
              >
                <SelectTrigger className="w-full bg-black border-border-medium text-white body-medium p-4 h-auto">
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent className="bg-black border-border-medium text-white">
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch} className="body-medium">
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div>
              <Label htmlFor="year" className="text-white body-medium mb-2 block">
                Year of Study *
              </Label>
              <Select
                value={formData.year}
                onValueChange={(value) => handleSelectChange("year", value)}
                required
              >
                <SelectTrigger className="w-full bg-black border-border-medium text-white body-medium p-4 h-auto">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="bg-black border-border-medium text-white">
                  {years.map((year) => (
                    <SelectItem key={year} value={year} className="body-medium">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Interest Area */}
            <div>
              <Label htmlFor="interestArea" className="text-white body-medium mb-2 block">
                Interest Area *
              </Label>
              <Select
                value={formData.interestArea}
                onValueChange={(value) => handleSelectChange("interestArea", value)}
                required
              >
                <SelectTrigger className="w-full bg-black border-border-medium text-white body-medium p-4 h-auto">
                  <SelectValue placeholder="Select your area of interest" />
                </SelectTrigger>
                <SelectContent className="bg-black border-border-medium text-white">
                  {interestAreas.map((area) => (
                    <SelectItem key={area} value={area} className="body-medium">
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-white body-medium mb-2 block">
                Why do you want to join Nexora Club? (Optional)
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-black border-border-medium text-white body-medium p-4 min-h-32"
                placeholder="Tell us about your passion for technology..."
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
