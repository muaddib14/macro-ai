'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Linkedin, Github, Shield, Users, Target } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Officer',
      bio: 'Former quantitative researcher at Bridgewater Associates with 12+ years in macro strategy and machine learning.',
      expertise: ['Machine Learning', 'Macro Economics', 'Risk Management']
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Research',
      bio: 'Ex-Numerai senior researcher specializing in prediction markets and alternative data analysis.',
      expertise: ['Prediction Markets', 'Alternative Data', 'Statistical Modeling']
    },
    {
      name: 'Dr. James Liu',
      role: 'Chief Technology Officer',
      bio: 'Former tech lead at Renaissance Technologies with expertise in high-frequency trading systems.',
      expertise: ['System Architecture', 'Real-time Processing', 'Financial Technology']
    }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Transparency',
      description: 'All our models and methodologies are open and explainable, ensuring users understand the rationale behind every recommendation.'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Accuracy',
      description: 'We continuously validate our predictions against real-world outcomes and maintain rigorous backtesting standards.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community',
      description: 'We believe in collaborative development and welcome feedback from traders, researchers, and institutions.'
    }
  ];

  const contact = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'contact@macrocycle.ai',
      href: 'mailto:contact@macrocycle.ai'
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: 'Website',
      value: 'macrocycle.ai',
      href: 'https://macrocycle.ai'
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: 'LinkedIn',
      value: '/company/macrocycle-ai',
      href: 'https://linkedin.com/company/macrocycle-ai'
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      value: '/macrocycle-ai',
      href: 'https://github.com/macrocycle-ai'
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-[#FFFFFF] mb-6">
            About MacroCycle AI
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed">
            We&apos;re building the world&apos;s most advanced AI-powered macro trading system, 
            combining quantitative rigor with cutting-edge machine learning to navigate 
            global financial markets.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card glow>
            <CardHeader>
              <CardTitle className="text-3xl text-center">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-[#A1A1AA] text-center leading-relaxed max-w-4xl mx-auto">
                To democratize institutional-grade macro analysis by combining human expertise 
                with artificial intelligence, making sophisticated trading strategies accessible 
                to individual investors and institutions alike. We believe that the future of 
                finance lies in the seamless integration of human intuition and machine intelligence.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] text-center mb-8">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-[#FFA500] rounded-lg text-[#000000]">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-orbitron font-semibold text-[#FFFFFF] mb-4">
                      {value.title}
                    </h3>
                    <p className="text-[#A1A1AA] leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] text-center mb-8">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardHeader>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-orbitron font-bold text-[#000000]">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <p className="text-[#FFA500] font-medium">{member.role}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#A1A1AA] mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div>
                      <h4 className="text-sm font-medium text-[#FFFFFF] mb-2">Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-[#18181B] text-[#A1A1AA] rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Founded:</span>
                    <span className="text-[#FFFFFF]">2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Headquarters:</span>
                    <span className="text-[#FFFFFF]">San Francisco, CA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Employees:</span>
                    <span className="text-[#FFFFFF]">15+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Stage:</span>
                    <span className="text-[#FFA500]">Series A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A1A1AA]">Funding:</span>
                    <span className="text-[#FFFFFF]">$12M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contact.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 bg-[#18181B] rounded-lg hover:bg-[#27272A] transition-colors"
                    >
                      <div className="text-[#FFA500]">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm text-[#A1A1AA]">{item.label}</div>
                        <div className="text-[#FFFFFF] font-medium">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Legal & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-[#A1A1AA] leading-relaxed">
                <p>
                  <strong>Regulatory Status:</strong> MacroCycle AI is a technology provider 
                  and does not provide investment advice. Our platform is designed for research 
                  and educational purposes.
                </p>
                <p>
                  <strong>Risk Disclosure:</strong> All trading involves risk of loss. Past 
                  performance is not indicative of future results. Users are responsible for 
                  their own investment decisions.
                </p>
                <p>
                  <strong>Data Privacy:</strong> We are committed to protecting user privacy 
                  and comply with all applicable data protection regulations including GDPR and CCPA.
                </p>
                <p>
                  <strong>Terms of Service:</strong> By using our platform, users agree to our 
                  terms of service and acknowledge that our analysis is for informational purposes only.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-orbitron font-bold text-[#FFFFFF] mb-4">
            Join the Future of Macro Trading
          </h2>
          <p className="text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
            Whether you&apos;re an individual trader, institutional investor, or developer 
            looking to integrate our API, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="px-8">
              Get in Touch
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              View Careers
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}