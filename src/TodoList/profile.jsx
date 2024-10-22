import { useEffect, useState } from 'react';
import useAxios from '../utils/interceptor';



const Profile = () => {
  const [profile, setProfile] = useState(null); // Initialize as null for better checking
  const api = useAxios()

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/profile`);
      setProfile(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Return loading state while fetching profile
  if (!profile) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-14 border border-gray-300">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
      <div className="space-y-4">
        <div className="flex justify-between bg-gray-100 p-4 rounded-md">
          <span className="font-semibold text-gray-700">First Name:</span>
          <span className="text-gray-600">{profile.first_name}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-4 rounded-md">
          <span className="font-semibold text-gray-700">Last Name:</span>
          <span className="text-gray-600">{profile.last_name}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-4 rounded-md">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-600">{profile.email}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-4 rounded-md">
          <span className="font-semibold text-gray-700">Username:</span>
          <span className="text-gray-600">{profile.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
