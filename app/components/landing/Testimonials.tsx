'use client';

import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "RunAgent cut our AI deployment time by 90%. We went from spending days configuring infrastructure to deploying in minutes.",
      author: "Sawradip Saha",
      role: "Founding Engineer, FlowGenX AI"
    },
    {
      quote: "The seamless integration with multiple frameworks lets our team use the right tool for each use case without worrying about deployment.",
      author: "Radeen Mostafa",
      role: "AI Engineer, MagicMind"
    },
    {
      quote: "As an ML engineer, I want to focus on building great agents, not DevOps. RunAgent lets me deploy my LangGraph flows with zero hassle.",
      author: "SK Nahin",
      role: "Machine Learning Engineer, Verbex"
    }
  ];

  const logos = [
    "Google", "Microsoft", "Amazon", "Meta", "Accenture", "IBM"
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by <span className="text-runagent-purple">Leading Teams</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-runagent-light-blue p-6 rounded-lg border border-gray-700"
            >
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-runagent-muted text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <p className="text-center text-runagent-muted mb-8">TO BE TRUSTED BY INNOVATORS WORLDWIDE</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {logos.map((logo, index) => (
              <div key={index} className="text-gray-400 text-xl font-bold opacity-70">{logo}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 