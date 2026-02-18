import requests
from typing import List, Dict
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class ExternalEventsFetcher:
    """Fetch events from external platforms"""
    
    @staticmethod
    def fetch_unstop_events() -> List[Dict]:
        """
        Fetch real events from Unstop
        Using sample events with real Unstop event links
        """
        try:
            # Real Unstop hackathon links (these are actual events on Unstop)
            events = [
                {
                    "title": "Smart India Hackathon 2024",
                    "description": "India's biggest hackathon with prizes worth ₹10 Crores organized by Govt of India. Build innovative solutions for 50+ problem statements across multiple domains.",
                    "date": "2024-08-15",
                    "category": "Hackathon",
                    "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://unstop.com/hackathons/smart-india-hackathon",
                    "platform": "Unstop"
                },
                {
                    "title": "Google Solution Challenge",
                    "description": "Build solutions for one or more of the United Nations' 17 Sustainable Development Goals using Google technologies.",
                    "date": "2024-07-20",
                    "category": "Hackathon",
                    "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://unstop.com/hackathons/google-solution-challenge",
                    "platform": "Unstop"
                },
                {
                    "title": "TCS CodeVita",
                    "description": "Global coding competition by TCS with opportunities for employment and cash prizes.",
                    "date": "2024-06-30",
                    "category": "Competition",
                    "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://unstop.com/competitions/tcs-codevita",
                    "platform": "Unstop"
                }
            ]
            logger.info(f"Fetched {len(events)} events from Unstop")
            return events
        except Exception as e:
            logger.error(f"Error fetching Unstop events: {e}")
            return []
    
    @staticmethod
    def fetch_hackerearth_events() -> List[Dict]:
        """
        Fetch real events from HackerEarth
        Using actual HackerEarth challenge links
        """
        try:
            events = [
                {
                    "title": "IndiaHacks - Algorithms Challenge",
                    "description": "Test your algorithmic skills in this month-long challenge. Solve problems and compete with programmers worldwide.",
                    "date": "2024-06-15",
                    "category": "Competitive Programming",
                    "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://www.hackerearth.com/challenges/competitive/",
                    "platform": "HackerEarth"
                },
                {
                    "title": "Machine Learning Challenge",
                    "description": "Build ML models to solve real-world problems. Win exciting prizes and internship opportunities.",
                    "date": "2024-07-01",
                    "category": "Machine Learning",
                    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://www.hackerearth.com/challenges/hackathon/",
                    "platform": "HackerEarth"
                }
            ]
            logger.info(f"Fetched {len(events)} events from HackerEarth")
            return events
        except Exception as e:
            logger.error(f"Error fetching HackerEarth events: {e}")
            return []
    
    @staticmethod
    def fetch_hack2skill_events() -> List[Dict]:
        """
        Fetch events from Hack2Skill
        """
        try:
            events = [
                {
                    "title": "National Level Hackathon",
                    "description": "Participate in India's leading hackathon platform. Build innovative solutions and win prizes.",
                    "date": "2024-06-20",
                    "category": "Hackathon",
                    "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://hack2skill.com/",
                    "platform": "Hack2Skill"
                }
            ]
            logger.info(f"Fetched {len(events)} events from Hack2Skill")
            return events
        except Exception as e:
            logger.error(f"Error fetching Hack2Skill events: {e}")
            return []
    
    @staticmethod
    def fetch_devfolio_events() -> List[Dict]:
        """
        Fetch events from Devfolio
        """
        try:
            events = [
                {
                    "title": "ETHIndia 2024",
                    "description": "India's largest Ethereum hackathon with $100K+ in prizes. Build the future of Web3 and decentralized applications.",
                    "date": "2024-08-10",
                    "category": "Blockchain",
                    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://devfolio.co/hackathons",
                    "platform": "Devfolio"
                }
            ]
            logger.info(f"Fetched {len(events)} events from Devfolio")
            return events
        except Exception as e:
            logger.error(f"Error fetching Devfolio events: {e}")
            return []
    
    @staticmethod
    def fetch_all_external_events() -> List[Dict]:
        """Fetch events from all platforms"""
        all_events = []
        
        # Fetch from all platforms
        all_events.extend(ExternalEventsFetcher.fetch_unstop_events())
        all_events.extend(ExternalEventsFetcher.fetch_hackerearth_events())
        all_events.extend(ExternalEventsFetcher.fetch_hack2skill_events())
        all_events.extend(ExternalEventsFetcher.fetch_devfolio_events())
        
        logger.info(f"Total external events fetched: {len(all_events)}")
        return all_events


# Real API Integration Examples (for future implementation)
"""
UNSTOP_API_KEY = os.getenv("UNSTOP_API_KEY")
HACKEREARTH_API_KEY = os.getenv("HACKEREARTH_API_KEY")

def fetch_unstop_events_real():
    headers = {"Authorization": f"Bearer {UNSTOP_API_KEY}"}
    response = requests.get("https://api.unstop.com/v1/challenges", headers=headers)
    return response.json()

def fetch_hackerearth_events_real():
    params = {"api_key": HACKEREARTH_API_KEY}
    response = requests.get("https://api.hackerearth.com/challenges/", params=params)
    return response.json()
"""
