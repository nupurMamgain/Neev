import React from "react";

const Features = () => {
  const features = [
    { 
      title: "Offline Access", 
      desc: "Download study materials and quizzes to learn anytime, even without internet.",
      icon: "📥"
    },
    { 
      title: "AI Learning Assistant", 
      desc: "Get personalized help and explanations 24/7 from our intelligent assistant.",
      icon: "🤖"
    },
    { 
      title: "Multilingual Support", 
      desc: "Learn in Hindi, English, or Punjabi - whichever you're most comfortable with.",
      icon: "🌐"
    },
    { 
      title: "Smart Quizzes", 
      desc: "AI-generated quizzes that adapt to your learning level.",
      icon: "📝"
    },
    { 
      title: "Progress Tracking", 
      desc: "Monitor your learning journey with detailed analytics and badges.",
      icon: "📊"
    },
    { 
      title: "Video Lessons", 
      desc: "High-quality one-shot videos explaining complex topics simply.",
      icon: "🎬"
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Designed for Uninterrupted Learning
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform is built to overcome the challenges of rural education.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
