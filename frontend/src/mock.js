// Mock data for Nexora Club website

export const clubStats = {
  members: 250,
  events: 45,
  workshops: 30
};

export const featuredEvent = {
  id: 1,
  title: "HackNexora 2024",
  date: "2024-03-15",
  description: "24-hour hackathon featuring industry mentors, exciting challenges, and amazing prizes worth ₹2 Lakhs!",
  category: "Hackathon",
  registrationLink: "#"
};

export const upcomingEvents = [
  {
    id: 1,
    title: "HackNexora 2024",
    date: "2024-03-15",
    description: "24-hour hackathon with industry mentors and exciting prizes",
    category: "Hackathon",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
  },
  {
    id: 2,
    title: "Web Development Workshop",
    date: "2024-03-20",
    description: "Learn MERN stack from basics to deployment",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
  },
  {
    id: 3,
    title: "AI/ML Bootcamp",
    date: "2024-03-25",
    description: "Dive deep into Machine Learning algorithms and practical applications",
    category: "Bootcamp",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
  },
  {
    id: 4,
    title: "Competitive Programming Contest",
    date: "2024-04-01",
    description: "Test your problem-solving skills in our monthly coding competition",
    category: "Contest",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80"
  }
];

export const pastEvents = [
  {
    id: 1,
    title: "TechTalk: Cloud Computing",
    date: "2024-02-10",
    description: "Industry expert session on AWS and cloud architecture",
    attendees: 120,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
  },
  {
    id: 2,
    title: "Design Thinking Workshop",
    date: "2024-01-28",
    description: "UI/UX principles and Figma hands-on session",
    attendees: 85,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80"
  },
  {
    id: 3,
    title: "CodeSprint Winter 2024",
    date: "2024-01-15",
    description: "48-hour coding marathon with real-world problem statements",
    attendees: 200,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: 3,
    name: "Rahul Kumar",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "Events Head",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Marketing Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    id: 6,
    name: "Ananya Reddy",
    role: "Design Head",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    linkedin: "https://linkedin.com"
  }
];

export const resources = [
  {
    id: 1,
    title: "Coding Platforms",
    description: "Practice DSA and participate in coding competitions",
    links: [
      { name: "CodeChef", url: "https://www.codechef.com/", icon: "ExternalLink" },
      { name: "HackerRank", url: "https://www.hackerrank.com/", icon: "ExternalLink" },
      { name: "LeetCode", url: "https://leetcode.com/", icon: "ExternalLink" },
      { name: "Codeforces", url: "https://codeforces.com/", icon: "ExternalLink" }
    ],
    icon: "Code2"
  },
  {
    id: 2,
    title: "Learning Platforms",
    description: "Learn programming from basics to advanced",
    links: [
      { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/", icon: "ExternalLink" },
      { name: "TutorialsPoint", url: "https://www.tutorialspoint.com/", icon: "ExternalLink" },
      { name: "W3Schools", url: "https://www.w3schools.com/", icon: "ExternalLink" },
      { name: "JavaTpoint", url: "https://www.javatpoint.com/", icon: "ExternalLink" }
    ],
    icon: "BookOpen"
  },
  {
    id: 3,
    title: "Hackathon Platforms",
    description: "Find and participate in hackathons",
    links: [
      { name: "Unstop", url: "https://unstop.com/hackathons", icon: "ExternalLink" },
      { name: "HackerEarth", url: "https://www.hackerearth.com/challenges/", icon: "ExternalLink" },
      { name: "Hack2Skill", url: "https://hack2skill.com/", icon: "ExternalLink" },
      { name: "Devfolio", url: "https://devfolio.co/hackathons", icon: "ExternalLink" }
    ],
    icon: "Zap"
  },
  {
    id: 4,
    title: "YouTube Channels - DSA",
    description: "Best YouTube channels for learning DSA and placement prep",
    links: [
      { name: "Love Babbar", url: "https://www.youtube.com/@CodeHelp", icon: "Youtube" },
      { name: "Apna College (Shradha Didi)", url: "https://www.youtube.com/@ApnaCollegeOfficial", icon: "Youtube" },
      { name: "Striver (TakeUforward)", url: "https://www.youtube.com/@takeUforward", icon: "Youtube" },
      { name: "Aditya Verma", url: "https://www.youtube.com/@TheAdityaVerma", icon: "Youtube" }
    ],
    icon: "Play"
  },
  {
    id: 5,
    title: "YouTube Channels - Web Dev",
    description: "Learn web development from scratch",
    links: [
      { name: "CodeWithHarry", url: "https://www.youtube.com/@CodeWithHarry", icon: "Youtube" },
      { name: "Thapa Technical", url: "https://www.youtube.com/@ThapaTechnical", icon: "Youtube" },
      { name: "Hitesh Choudhary", url: "https://www.youtube.com/@HiteshChoudharydotcom", icon: "Youtube" },
      { name: "Traversy Media", url: "https://www.youtube.com/@TraversyMedia", icon: "Youtube" }
    ],
    icon: "Globe"
  },
  {
    id: 6,
    title: "YouTube Channels - General",
    description: "Programming tutorials and tech content",
    links: [
      { name: "EzSnippet", url: "https://www.youtube.com/@EzSnippet", icon: "Youtube" },
      { name: "freeCodeCamp", url: "https://www.youtube.com/@freecodecamp", icon: "Youtube" },
      { name: "Programming with Mosh", url: "https://www.youtube.com/@programmingwithmosh", icon: "Youtube" },
      { name: "Clever Programmer", url: "https://www.youtube.com/@CleverProgrammer", icon: "Youtube" }
    ],
    icon: "Video"
  }
];

export const interestAreas = [
  "Web Development",
  "AI/ML",
  "Competitive Programming",
  "UI/UX Design",
  "Mobile App Development",
  "Cybersecurity",
  "Cloud Computing",
  "Blockchain"
];

export const branches = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other"
];

export const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export const socialLinks = {
  instagram: "https://instagram.com/nexoraclub",
  linkedin: "https://linkedin.com/company/nexoraclub",
  email: "nexoraclub@college.edu",
  github: "https://github.com/nexoraclub"
};
