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
        Fetch events from Unstop (Dare2Compete)
        Note: This is a mock implementation. Real API requires authentication.
        """
        try:
            # Mock data for demonstration
            # In production, you would use Unstop's actual API
            events = [
                {
                    "title": "Smart India Hackathon 2024",
                    "description": "India's biggest hackathon with prizes worth ₹10 Crores. Build innovative solutions for real-world problems.",
                    "date": "2024-04-15",
                    "category": "Hackathon",
                    "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://unstop.com/hackathons",
                    "platform": "Unstop"
                },
                {
                    "title": "Google Summer of Code 2024",
                    "description": "Work with open source organizations and get paid by Google. A global program focused on bringing students into open source development.",
                    "date": "2024-05-01",
                    "category": "Open Source",
                    "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://summerofcode.withgoogle.com/",
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
        Fetch events from HackerEarth
        Note: This is a mock implementation. Real API requires authentication.
        """
        try:
            # Mock data for demonstration
            events = [
                {
                    "title": "CodeArena Monthly Challenge",
                    "description": "Monthly competitive programming challenge with cash prizes and global rankings.",
                    "date": "2024-04-10",
                    "category": "Competitive Programming",
                    "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://www.hackerearth.com/challenges/",
                    "platform": "HackerEarth"
                },
                {
                    "title": "HackerEarth ML Challenge",
                    "description": "Machine Learning competition with real-world datasets and exciting prizes.",
                    "date": "2024-04-20",
                    "category": "Machine Learning",
                    "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://www.hackerearth.com/challenges/",
                    "platform": "HackerEarth"
                }
            ]
            logger.info(f"Fetched {len(events)} events from HackerEarth")
            return events
        except Exception as e:
            logger.error(f"Error fetching HackerEarth events: {e}")
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
                    "description": "India's largest Ethereum hackathon with $100K in prizes. Build the future of Web3.",
                    "date": "2024-05-10",
                    "category": "Blockchain",
                    "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
                    "is_external": True,
                    "external_url": "https://devfolio.co/",
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
