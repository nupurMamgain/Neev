// Features.jsx
import React from "react";

const Cards = [
  { title: "Offline Access", desc: "Download study materials and quizzes to learn anytime, even without an internet connection.", icon: "📶" },
  { title: "AI Learning Assistant", desc: "Get personalized help and explanations 24/7 from our intelligent chatbot to solve doubts instantly.", icon: "🤖" },
  { title: "Multilingual Support", desc: "Learn in the language you're most comfortable with, including English, Hindi, and Punjabi.", icon: "🌐" }
];

const Features = () => {
  return (
    <div className="relative w-full py-24">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg.jpeg')" }}></div>
      <div className="absolute inset-0 bg-black/30"></div>

      <section className="relative z-10 max-w-7xl mx-auto px-10 py-16 bg-white/50 backdrop-blur-2xl rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-darkText">Designed for Uninterrupted Learning</h2>
        <p className="text-center text-lightText mt-3 text-lg">Our platform is built to overcome the challenges of rural education.</p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {Cards.map((c, i) => (
            <div key={i} className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-xl hover:scale-105 transition duration-300">
              <div className="text-5xl mb-4">{c.icon}</div>
              <h3 className="text-2xl font-semibold text-darkText">{c.title}</h3>
              <p className="text-lightText mt-3">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
