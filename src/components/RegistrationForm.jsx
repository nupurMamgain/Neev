import React from 'react';
import Header from '../components/Header';
import FormField from '../components/FormField';

function RegistrationForm() {
    // Custom gradient for the button: light purple to magenta/dark purple
    const gradientStyle = {
        background: 'linear-gradient(to right, #6366f1, #c026d3)', // Using Indigo-500 to Violet-600/700 Tailwind colors
    };
    
    // Icon placeholders using context-appropriate symbols. Replace with actual icons.
    const icons = {
        person: '👤',
        email: '📧',
        phone: '📞',
        plus: '+',
        institute: '🏛️',
    }

    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 sm:p-10">
            
            <Header />

            <form>
                {/* --- Section 1: Personal Details --- */}
                <FormField 
                    label="Full Name" 
                    placeholder="e.g., Anjali Khanna" 
                    icon={icons.person}
                />
                <FormField 
                    label="Email Address" 
                    placeholder="you@example.com" 
                    icon={icons.email}
                    type="email"
                />
                <FormField 
                    label="Phone Number" 
                    placeholder="+91 98765 43210" 
                    icon={icons.phone}
                    type="tel"
                />

                {/* --- Section 2: Professional Details --- */}
                <FormField 
                    label="Primary Subject" 
                    placeholder="e.g., Mathematics" 
                    icon={icons.plus}
                />
                <FormField 
                    label="Current Institute" 
                    placeholder="e.g., Delhi Public School" 
                    icon={icons.institute}
                />
                
                {/* Teaching Experience (Select Field) */}
                <FormField 
                    label="Teaching Experience" 
                    placeholder="Select teaching experience" 
                    icon={null} // No icon inside the field
                    isSelect={true}
                />

                {/* --- Section 3: Verification --- */}
                <FormField 
                    isFile={true}
                />
                
                {/* --- Action Button --- */}
                <button 
                    type="submit"
                    className="w-full text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-150"
                    style={gradientStyle}
                >
                    Create Account
                </button>
            </form>

            {/* --- Footer Link --- */}
            <div className="mt-8 text-center text-sm">
                Already have an account? <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Sign in</a>
            </div>
        </div>
    );
}

export default RegistrationForm;