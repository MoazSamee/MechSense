"use client"

import type React from "react"
import { useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { Key, Mail, Phone, Plus, Save, Shield, Trash, User } from "lucide-react"
import { mockUserProfile } from "../../data/mockData"
import type { UserProfile } from "../../types/vehicle"

const ProfileSettings: React.FC = () => {
  // State for user profile
  const [profile, setProfile] = useState<UserProfile>({ ...mockUserProfile })
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  })

  // Save settings
  const saveSettings = () => {
    // In a real app, this would save to the backend
    alert("Profile settings saved successfully!")
  }

  // Handle profile input change
  const handleProfileChange = (field: keyof UserProfile, value: any) => {
    setProfile({
      ...profile,
      [field]: value,
    })
  }

  // Handle notification preferences change
  const handleNotificationPrefChange = (field: keyof typeof profile.notificationPreferences) => {
    setProfile({
      ...profile,
      notificationPreferences: {
        ...profile.notificationPreferences,
        [field]: !profile.notificationPreferences[field],
      },
    })
  }

  // Start adding a new emergency contact
  const startAddingContact = () => {
    setIsAddingContact(true)
    setNewContact({
      name: "",
      phone: "",
      relationship: "",
    })
  }

  // Cancel adding a new emergency contact
  const cancelAddingContact = () => {
    setIsAddingContact(false)
  }

  // Save new emergency contact
  const saveNewContact = () => {
    if (!newContact.name || !newContact.phone) {
      alert("Name and phone number are required.")
      return
    }

    setProfile({
      ...profile,
      emergencyContacts: [...profile.emergencyContacts, newContact],
    })
    setIsAddingContact(false)
  }

  // Delete emergency contact
  const deleteContact = (index: number) => {
    const updatedContacts = [...profile.emergencyContacts]
    updatedContacts.splice(index, 1)
    setProfile({
      ...profile,
      emergencyContacts: updatedContacts,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
        <Button variant="primary" size="sm" leftIcon={<Save size={16} />} onClick={saveSettings}>
          Save Changes
        </Button>
      </div>

      {/* Personal Information */}
      <Card title="Personal Information">
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <User className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={profile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={profile.phone || ""}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Language
              </label>
              <select
                id="language"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={profile.preferredLanguage}
                onChange={(e) => handleProfileChange("preferredLanguage", e.target.value)}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card title="Emergency Contacts">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Emergency contacts will be notified in case of vehicle emergencies or accidents.
          </p>

          <div className="space-y-4">
            {profile.emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-md font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.relationship}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                </div>
                <Button variant="danger" size="sm" leftIcon={<Trash size={16} />} onClick={() => deleteContact(index)}>
                  Remove
                </Button>
              </div>
            ))}

            {profile.emergencyContacts.length === 0 && !isAddingContact && (
              <div className="text-center py-6">
                <Phone className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-800">No Emergency Contacts</h3>
                <p className="text-gray-500 mt-1">
                  Add emergency contacts who should be notified in case of an emergency.
                </p>
              </div>
            )}

            {isAddingContact ? (
              <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Add Emergency Contact</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactRelationship" className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      id="contactRelationship"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                      placeholder="Spouse, Parent, Friend, etc."
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={cancelAddingContact}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" onClick={saveNewContact}>
                      Add Contact
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={startAddingContact}>
                Add Emergency Contact
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Account Security */}
      <Card title="Account Security">
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium mb-2">Password</h3>
            <p className="text-sm text-gray-500 mb-4">
              It's a good idea to use a strong password that you don't use elsewhere.
            </p>
            <Button variant="outline" size="sm" leftIcon={<Key size={16} />}>
              Change Password
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-md font-medium mb-2">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-500 mb-4">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <Button variant="outline" size="sm" leftIcon={<Shield size={16} />}>
              Enable Two-Factor Authentication
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-md font-medium mb-2">Connected Accounts</h3>
            <p className="text-sm text-gray-500 mb-4">Connect your account to other services for enhanced features.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" size="sm">
                Connect Google Account
              </Button>
              <Button variant="outline" size="sm">
                Connect Apple Account
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Communication Preferences */}
      <Card title="Communication Preferences">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">Choose how you want to receive communications from MechSense.</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-gray-500">Receive notifications via email</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={profile.notificationPreferences.email}
                  onChange={() => handleNotificationPrefChange("email")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="font-medium">SMS Notifications</div>
                  <div className="text-sm text-gray-500">Receive notifications via text message</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={profile.notificationPreferences.sms}
                  onChange={() => handleNotificationPrefChange("sms")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="font-medium">Marketing Emails</div>
                  <div className="text-sm text-gray-500">Receive promotional emails and updates</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Privacy */}
      <Card title="Data Privacy">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Manage your data privacy settings and control how your information is used.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="font-medium">Data Collection</div>
                  <div className="text-sm text-gray-500">Allow collection of usage data to improve services</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="font-medium">Location Tracking</div>
                  <div className="text-sm text-gray-500">Allow tracking of vehicle location</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <Button variant="outline" size="sm">
              Download My Data
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="md" leftIcon={<Save size={16} />} onClick={saveSettings}>
          Save All Changes
        </Button>
      </div>
    </div>
  )
}

export default ProfileSettings
