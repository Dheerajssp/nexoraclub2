"""
Backend API Tests for Nexora Club
Tests: Authentication, User Profile, Registrations, Events APIs
"""
import pytest
import requests
import os
import random
import string

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials - provided for testing
TEST_USER = {
    "email": "testuser123@test.com",
    "password": "testpass123"
}

def random_string(length=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))


class TestHealthCheck:
    """Health endpoint tests - run first"""
    
    def test_health_endpoint(self):
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "service" in data
        print("✓ Health endpoint working")


class TestAuthLogin:
    """Login API tests"""
    
    def test_login_success(self):
        """Test login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json=TEST_USER)
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert len(data["access_token"]) > 0
        print("✓ Login successful with valid credentials")
    
    def test_login_invalid_email(self):
        """Test login with invalid email"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "nonexistent@test.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        print("✓ Login correctly rejects invalid email")
    
    def test_login_invalid_password(self):
        """Test login with wrong password"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": TEST_USER["email"],
            "password": "wrongpassword123"
        })
        assert response.status_code == 401
        print("✓ Login correctly rejects wrong password")


class TestAuthRegister:
    """Registration API tests"""
    
    def test_register_duplicate_email(self):
        """Test registration with existing email"""
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "name": "Test User",
            "email": TEST_USER["email"],  # Already exists
            "phone": "+91 9876543210",
            "branch": "Computer Science",
            "year": "2nd Year",
            "interest_area": "Web Development",
            "password": "testpass123"
        })
        assert response.status_code == 400
        data = response.json()
        assert "already registered" in data["detail"].lower() or "email" in data["detail"].lower()
        print("✓ Registration correctly rejects duplicate email")


class TestUserProfile:
    """User profile API tests"""
    
    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json=TEST_USER)
        assert response.status_code == 200
        return response.json()["access_token"]
    
    def test_get_current_user_authenticated(self, auth_token):
        """Test getting user profile with valid token"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "id" in data
        assert "name" in data
        assert "email" in data
        assert data["email"] == TEST_USER["email"]
        assert "phone" in data
        assert "branch" in data
        assert "year" in data
        assert "interest_area" in data
        assert "role" in data
        print("✓ User profile retrieved successfully")
    
    def test_get_current_user_no_token(self):
        """Test getting user profile without token"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
        print("✓ User profile correctly requires authentication")
    
    def test_get_current_user_invalid_token(self):
        """Test getting user profile with invalid token"""
        headers = {"Authorization": "Bearer invalid_token_here"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        assert response.status_code == 401
        print("✓ User profile correctly rejects invalid token")


class TestEventsAPI:
    """Events API tests"""
    
    def test_get_all_events(self):
        """Test getting all events"""
        response = requests.get(f"{BASE_URL}/api/events")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        
        if len(data) > 0:
            event = data[0]
            assert "id" in event
            assert "title" in event
            assert "description" in event
            assert "date" in event
            assert "category" in event
        print(f"✓ Retrieved {len(data)} events")
    
    def test_get_events_by_type(self):
        """Test filtering events by type"""
        response = requests.get(f"{BASE_URL}/api/events?event_type=Hackathon")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Filtered events by type - got {len(data)} results")


class TestRegistrationsAPI:
    """Registrations API tests"""
    
    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json=TEST_USER)
        assert response.status_code == 200
        return response.json()["access_token"]
    
    def test_get_my_registrations_authenticated(self, auth_token):
        """Test getting user's registrations with valid token"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/registrations/my-registrations", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        
        if len(data) > 0:
            reg = data[0]
            assert "id" in reg
            assert "event_title" in reg
            assert "status" in reg
        print(f"✓ Retrieved {len(data)} registrations for user")
    
    def test_get_my_registrations_no_token(self):
        """Test getting registrations without token"""
        response = requests.get(f"{BASE_URL}/api/registrations/my-registrations")
        assert response.status_code == 401
        print("✓ Registrations correctly requires authentication")


class TestStatsAPI:
    """Stats API tests"""
    
    def test_get_stats(self):
        """Test getting club stats"""
        response = requests.get(f"{BASE_URL}/api/stats")
        assert response.status_code == 200
        data = response.json()
        assert "total_members" in data or "members" in str(data).lower()
        print("✓ Stats endpoint working")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
