import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ExternalLink, RefreshCw, X } from "lucide-react";
import { eventsAPI } from "../api";
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

export const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleSyncExternal = async () => {
    setSyncing(true);
    try {
      const result = await eventsAPI.syncExternal();
      alert(`✅ Synced successfully!\nNew: ${result.new_events}, Updated: ${result.updated_events}`);
      fetchEvents();
    } catch (error) {
      alert("❌ Sync failed: " + (error.response?.data?.detail || "Error"));
    } finally {
      setSyncing(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await eventsAPI.create({
        ...formData,
        is_external: false
      });
      alert("✅ Event created successfully!");
      setShowAddModal(false);
      setFormData({
        title: "",
        description: "",
        date: "",
        category: "",
        image: ""
      });
      fetchEvents();
    } catch (error) {
      alert("❌ Failed to create event: " + (error.response?.data?.detail || "Error"));
    }
  };

  const nexoraEvents = events.filter(e => !e.is_external);
  const externalEvents = events.filter(e => e.is_external);

  return (
    <div className="dark-container pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="display-large text-white mb-4">
              Admin <span className="text-brand-primary">Dashboard</span>
            </h1>
            <p className="body-large text-text-secondary">
              Manage Nexora Club events and sync external platforms
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSyncExternal}
              disabled={syncing}
              className="btn-secondary flex items-center gap-2"
            >
              <RefreshCw size={20} className={syncing ? "animate-spin" : ""} />
              {syncing ? "Syncing..." : "Sync External"}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add Event
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-bg-secondary border border-border-subtle p-6">
            <h3 className="heading-2 text-white mb-2">{nexoraEvents.length}</h3>
            <p className="body-medium text-text-muted">Nexora Events</p>
          </div>
          <div className="bg-bg-secondary border border-border-subtle p-6">
            <h3 className="heading-2 text-white mb-2">{externalEvents.length}</h3>
            <p className="body-medium text-text-muted">External Events</p>
          </div>
          <div className="bg-bg-secondary border border-border-subtle p-6">
            <h3 className="heading-2 text-white mb-2">{events.length}</h3>
            <p className="body-medium text-text-muted">Total Events</p>
          </div>
        </div>

        {/* Nexora Events Table */}
        <div className="mb-12">
          <h2 className="display-medium text-white mb-6">Your Nexora Events</h2>
          <div className="bg-bg-secondary border border-border-subtle overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border-subtle">
                <tr>
                  <th className="text-left p-4 text-white body-medium">Event</th>
                  <th className="text-left p-4 text-white body-medium">Date</th>
                  <th className="text-left p-4 text-white body-medium">Category</th>
                  <th className="text-left p-4 text-white body-medium">Registered</th>
                  <th className="text-right p-4 text-white body-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {nexoraEvents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-text-muted">
                      No Nexora events yet. Click "Add Event" to create one.
                    </td>
                  </tr>
                ) : (
                  nexoraEvents.map((event) => (
                    <tr key={event.id} className="border-b border-border-subtle hover:bg-bg-overlay">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={event.image} alt={event.title} className="w-16 h-16 object-cover" />
                          <span className="text-white body-medium">{event.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-text-secondary body-small">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-brand-primary body-small">{event.category}</td>
                      <td className="p-4 text-text-secondary body-small">{event.registrations_count}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-brand-primary hover:bg-bg-overlay">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-red-500 hover:bg-bg-overlay">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* External Events Table */}
        <div>
          <h2 className="display-medium text-white mb-6">External Platform Events</h2>
          <div className="bg-bg-secondary border border-border-subtle overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border-subtle">
                <tr>
                  <th className="text-left p-4 text-white body-medium">Event</th>
                  <th className="text-left p-4 text-white body-medium">Platform</th>
                  <th className="text-left p-4 text-white body-medium">Date</th>
                  <th className="text-left p-4 text-white body-medium">Link</th>
                </tr>
              </thead>
              <tbody>
                {externalEvents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-text-muted">
                      No external events. Click "Sync External" to fetch from platforms.
                    </td>
                  </tr>
                ) : (
                  externalEvents.map((event) => (
                    <tr key={event.id} className="border-b border-border-subtle hover:bg-bg-overlay">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={event.image} alt={event.title} className="w-16 h-16 object-cover" />
                          <span className="text-white body-medium">{event.title}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-brand-primary text-black text-xs font-semibold">
                          {event.platform}
                        </span>
                      </td>
                      <td className="p-4 text-text-secondary body-small">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <a
                          href={event.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-primary hover:underline flex items-center gap-1"
                        >
                          View <ExternalLink size={14} />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-bg-secondary border border-border-subtle max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="display-medium text-white">Add New Event</h2>
                <button onClick={() => setShowAddModal(false)} className="text-text-muted hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-white body-medium mb-2 block">Event Title *</Label>
                  <Input
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-black border-border-medium text-white p-4"
                    placeholder="e.g., Tech Fest 2024"
                  />
                </div>

                <div>
                  <Label className="text-white body-medium mb-2 block">Description *</Label>
                  <Textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-black border-border-medium text-white p-4 min-h-32"
                    placeholder="Describe your event..."
                  />
                </div>

                <div>
                  <Label className="text-white body-medium mb-2 block">Date *</Label>
                  <Input
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-black border-border-medium text-white p-4"
                  />
                </div>

                <div>
                  <Label className="text-white body-medium mb-2 block">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger className="w-full bg-black border-border-medium text-white p-4 h-auto">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-border-medium text-white">
                      <SelectItem value="Hackathon">Hackathon</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Competition">Competition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white body-medium mb-2 block">Image URL *</Label>
                  <Input
                    name="image"
                    type="url"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full bg-black border-border-medium text-white p-4"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-text-muted body-small mt-1">Use Unsplash or any image hosting service</p>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex-1">
                    Create Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
