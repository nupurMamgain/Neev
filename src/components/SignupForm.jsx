//STUDENT SIGN IN//
import React, { useState } from 'react'; // 👈 useState hook को इंपोर्ट किया
import { UserPlus } from 'lucide-react'; 

const SignupForm = () => {
    // 1. Language Tabs के लिए State और Constants
    const tabs = ['Hindi', 'English','ਪੰਜਾਬੀ '];
    const [activeTab, setActiveTab] = useState('English'); // Default tab set to English
    
    // Gradient Class for active tab
    // Note: Tailwind doesn't support arbitrary gradients in utility classes directly. 
    // This is a placeholder for a Tailwind utility class defined in your CSS/config for a gradient effect.
    // Assuming 'bg-blue-600' or similar solid color is okay if no custom gradient is defined.
    // Using a solid blue color for simplicity to make the component runnable.
    const primaryGradient = 'bg-blue-600'; 
    
    // You would add form state and submission logic here in a real app
   /*const handleSubmit = (e) => {
        e.preventDefault();

        
        console.log("Form submitted! Active language:", activeTab);
    };*/

    return (
        // Left Section: Signup Form
        <div className="w-full lg:w-3/5 p-12 space-y-6">
            
            {/* Header/Icon Section */}
            <div className="flex flex-col items-center">
                {/* Icon Circle (blue, light blue background) */}
                <div className="p-3 mb-2 rounded-full bg-blue-100 text-blue-600">
                    <UserPlus className="w-8 h-8" /> 
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Create Student's Account</h2>
                <p className="text-sm text-gray-500">Join thousands of students with NEEV</p>
            </div>

            {/* 🌍 Language Tabs - Added Here */}
            <div className="flex bg-gray-100 rounded-lg p-1"> {/* Removed mb-6 to control spacing via space-y-6 */}
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200
                            ${activeTab === tab
                                ? primaryGradient + ' text-white shadow-md'
                                : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {/* --- End of Language Tabs --- */}

            {/* Form Fields Section */}
            <form method='POST'  className="space-y-4"  >
               
                {/* Full Name */}
                <input 
                  type="text" 
                  placeholder="Full Name *" 
                  name='username'
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-sm"
                  required
                />
                
                {/* Email Address */}
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  name='email'
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-sm"
                  required
                />
                
                {/* Password and Confirm Password */}
                <div className="flex space-x-4">
                  <input 
                    type="password"
                    name='password' 
                    placeholder="Create a password *" 
                    className="text-black w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-sm"
                    required
                  />
                  {/* <input 
                    type="password"
                    name='password2' 
                    placeholder="Confirm password *" 
                    className="text-black w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-sm"
                    required
                  /> */}
                </div>

                {/* Select Class and Phone Number */}
                <div className="flex space-x-4">
                  {/* Select Your Class Dropdown */}
                  <div className="relative w-1/2">
                    <select 
  name='classes' 
  className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none text-gray-400 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500" 
  required
  defaultValue=""  // ✅ Add this line
>
  <option value="" disabled>Select your class *</option> {/* ✅ Remove 'selected' from here */}
  <option value="1">Class 1</option>
  <option value="2">Class 2</option>
  <option value="3">Class 3</option>
  <option value="4">Class 4</option>
  <option value="5">Class 5</option>
  <option value="6">Class 6</option>
  <option value="7">Class 7</option>
  <option value="8">Class 8</option>
  <option value="9">Class 9</option>
  <option value="10">Class 10</option>
  <option value="11">Class 11</option>
  <option value="12">Class 12</option>
</select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                  
                  {/* Phone Number */}
                  {/* <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    name='Ph_num'
                    className="text-black w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-sm"
                  /> */}
                </div>
                
                {/* Register Button */}
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-150 shadow-md"
                >
                  Register
                </button>
            </form>

            {/* Already have an account link */}
            <div className="text-center pt-2">
                <span className="text-sm text-gray-600">
                    Already have an account? 
                    <a href="#" className="text-blue-600 font-medium ml-1">Sign In</a>
                </span>
            </div>
            <div className="text-center pt-0.5">
                <span className="text-sm text-gray-600">
                    Sign In as Teacher. 
                    <a href="#" className="text-blue-600 font-medium ml-1">Sign In</a>
                </span>
            </div>
        </div>
    );
};

export default SignupForm;