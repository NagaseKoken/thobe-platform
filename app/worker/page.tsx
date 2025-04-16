"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ShoppingBagIcon, 
  ClipboardIcon,
  UserCircleIcon,
  CameraIcon,
  PencilSquareIcon,
  BuildingStorefrontIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  UserIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import Navbar from '@/components/reusable/Navbar';
import Footer from '@/components/reusable/Footer';

const initialProfile = {
  name: 'Ahmed Al-Farsi',
  email: 'ahmed.alfarsi@example.com',
  phone: '+966 50 123 4567',
  gender: 'Male',
  age: 32,
  role: 'Senior Tailor',
  storeName: 'Elegant Stitches',
  workingHours: 'Sunday-Thursday: 9AM-6PM, Friday: 2PM-8PM',
  profileImage: null 
};

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Dashboard</h2>
      <nav className="space-y-4">

        <Link href="/worker" className="flex items-center px-3 py-2 rounded-md bg-orange-50 text-orange-600 font-medium">
          <UserIcon className="w-5 h-5 mr-3" />
          Profile
        </Link>

        <Link href="/worker/orders" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
          <ShoppingBagIcon className="w-5 h-5 mr-3" /> Orders
        </Link>
        <Link href="/worker/fabrics-products" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50">
          <ClipboardIcon className="w-5 h-5 mr-3" /> Fabrics & Products
        </Link>
      </nav>
    </div>
  </aside>
);


const WorkerProfilePage: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(initialProfile);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    if (isEditing) {
      setProfile(editedProfile);
      setIsEditing(false);
    } else {
      setEditedProfile(profile);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setImagePreview(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar /><div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <button
              onClick={handleEditToggle}
              className={`inline-flex items-center px-4 py-2 rounded-md font-medium ${isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            >
              {isEditing ? ( <>Save Changes</> ) : (
                <>
                  <PencilSquareIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="h-48 w-48 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow">
                        {imagePreview || profile.profileImage ? (
                          <img 
                            alt="Profile" 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200">
                            <UserCircleIcon className="h-32 w-32 text-gray-400" />
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <button 
                          onClick={triggerFileInput}
                          className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600"
                        >
                          <CameraIcon className="h-5 w-5" />
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </button>
                      )}
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">{profile.name}</h2>
                    <p className="text-gray-500">{profile.role}</p>
                  </div>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        <span className="flex items-center">
                          <IdentificationIcon className="w-4 h-4 mr-1" /> Full Name
                        </span>
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editedProfile.name}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-800">{profile.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        <span className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 mr-1" /> Email Address
                        </span>
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedProfile.email}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-800">{profile.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        <span className="flex items-center">
                          <PhoneIcon className="w-4 h-4 mr-1" /> Phone Number
                        </span>
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editedProfile.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-800">{profile.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        <span className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-1" /> Gender
                        </span>
                      </label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={editedProfile.gender}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      ) : (
                        <p className="text-gray-800">{profile.gender}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        <span className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" /> Age
                        </span>
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          name="age"
                          min="16"
                          max="100"
                          value={editedProfile.age}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-800">{profile.age}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        <span className="flex items-center">
                          <IdentificationIcon className="w-4 h-4 mr-1" /> Role
                        </span>
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="role"
                          value={editedProfile.role}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-800">{profile.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Store Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      <span className="flex items-center">
                        <BuildingStorefrontIcon className="w-4 h-4 mr-1" /> Tailor Store Name
                      </span>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="storeName"
                        value={editedProfile.storeName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.storeName}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      <span className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" /> Working Hours
                      </span>
                    </label>
                    {isEditing ? (
                      <textarea
                        name="workingHours"
                        value={editedProfile.workingHours}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-800">{profile.workingHours}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default WorkerProfilePage;