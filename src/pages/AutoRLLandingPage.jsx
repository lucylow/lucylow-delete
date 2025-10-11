import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  Eye, 
  Brain, 
  TrendingUp, 
  Rocket, 
  Shield, 
  Smartphone, 
  Trophy,
  Lightbulb,
  Settings,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Play,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

export default function AutoRLLandingPage() {
  const [selectedApp, setSelectedApp] = useState('banking');
  const [isAnimating, setIsAnimating] = useState(false);

  const appConfigs = {
    banking: {
      title: 'Banking App',
      icon: '🏦',
      message: 'AutoRL is managing your banking transactions...',
      content: [
        { icon: '🏠', text: 'Home', color: 'bg-blue-500' },
        { icon: '👤', text: 'Jane Doe', color: 'bg-gray-400' },
        { icon: '💰', text: '$ 2,450.00', color: 'bg-green-500' },
        { icon: '📊', text: 'Transactions', color: 'bg-blue-600' },
        { icon: '⚙️', text: 'Settings', color: 'bg-gray-500' }
      ],
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    calendar: {
      title: 'Calendar App',
      icon: '📅',
      message: 'AutoRL is scheduling your appointments...',
      content: [
        { icon: '📅', text: 'Today', color: 'bg-blue-500' },
        { icon: '👥', text: 'Team Meeting', color: 'bg-purple-500' },
        { icon: '☕', text: 'Coffee Break', color: 'bg-orange-500' },
        { icon: '💼', text: 'Client Call', color: 'bg-green-500' },
        { icon: '➕', text: 'Add Event', color: 'bg-blue-600' }
      ],
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    ecommerce: {
      title: 'E-Commerce App',
      icon: '🛒',
      message: 'AutoRL is shopping for you...',
      content: [
        { icon: '🏠', text: 'Home', color: 'bg-blue-500' },
        { icon: '🛍️', text: 'Cart (3)', color: 'bg-red-500' },
        { icon: '💳', text: 'Checkout', color: 'bg-green-500' },
        { icon: '📦', text: 'Orders', color: 'bg-purple-500' },
        { icon: '⭐', text: 'Wishlist', color: 'bg-yellow-500' }
      ],
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  };

  const handleAppChange = (app) => {
    if (app === selectedApp) return; // Prevent unnecessary re-renders
    
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedApp(app);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with circuit-like patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          </div>
          {/* Circuit lines */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
              <path d="M100,200 Q300,100 500,200 T900,200" stroke="url(#gradient)" strokeWidth="2" fill="none"/>
              <path d="M200,400 Q400,300 600,400 T1000,400" stroke="url(#gradient)" strokeWidth="2" fill="none"/>
              <path d="M50,600 Q250,500 450,600 T850,600" stroke="url(#gradient)" strokeWidth="2" fill="none"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 mb-6 animate-float">
              <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">AI-Powered Automation</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Future of Mobile
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Automation is Here
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            AutoRL learns to use any app like a human. Train it once, and it adapts and evolves 
            to automate your most complex mobile workflows.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/app/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg rounded-full">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          <p className="text-gray-300 text-sm">
            No credit card required • Free 14-day trial
          </p>
        </div>
      </section>

      {/* Experience AutoRL Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Experience AutoRL in Action
              </h2>
            </div>
            <p className="text-xl text-gray-600 mb-12">
              Watch AutoRL intelligently navigate multiple mobile apps — Banking, Calendar, and E-Commerce — 
              with live, animated UI feedback.
            </p>
            
            {/* App Selection Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => handleAppChange('banking')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedApp === 'banking' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏦</span>
                  Banking
                </div>
              </button>
              <button 
                onClick={() => handleAppChange('calendar')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedApp === 'calendar' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  Calendar
                </div>
              </button>
              <button 
                onClick={() => handleAppChange('ecommerce')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedApp === 'ecommerce' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛒</span>
                  E-Commerce
                </div>
              </button>
            </div>
            
            {/* Interactive Phone Mockup */}
            <div className="relative max-w-sm mx-auto">
              <div className="bg-black rounded-[3rem] p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className={`rounded-[2.5rem] p-6 h-96 flex flex-col transition-all duration-500 ${
                  isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                } ${appConfigs[selectedApp].bgColor}`}>
                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-4 text-xs text-gray-600">
                    <span>9:41</span>
                    <span className="text-lg">{appConfigs[selectedApp].icon}</span>
                    <span>100%</span>
                  </div>
                  
                  {/* App Header */}
                  <div className={`rounded-lg p-4 mb-4 border ${appConfigs[selectedApp].borderColor}`}>
                    <p className="text-sm text-gray-700 font-medium">
                      {appConfigs[selectedApp].title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {appConfigs[selectedApp].message}
                    </p>
                  </div>
                  
                  {/* App Content */}
                  <div className="flex-1 space-y-3">
                    {appConfigs[selectedApp].content.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className={`w-6 h-6 ${item.color} rounded flex items-center justify-center text-xs`}>
                          {item.icon}
                        </div>
                        <span className="text-gray-600 text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* AutoRL Indicator */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-blue-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>AutoRL Active</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Action Indicators */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Discover how AutoRL combines cutting-edge AI to deliver seamless automation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-in-left">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 animate-glow">
                  <Eye className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visual Perception</h3>
                <p className="text-gray-600">
                  Understands any app screen using advanced OCR and object detection, 
                  just like a human would.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 animate-glow">
                  <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Planning</h3>
                <p className="text-gray-600">
                  Uses LLMs to convert your instructions into a precise, 
                  step-by-step action plan.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-in-right">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6 animate-glow">
                  <TrendingUp className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Reinforcement Learning</h3>
                <p className="text-gray-600">
                  Learns from every success and failure, constantly improving 
                  its performance over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Production Readiness Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Settings className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Production Readiness
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              Built with modularity, reliability, and scalability — ready for deployment today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Modular Architecture</h3>
                <p className="text-gray-600">
                  Each agent module (Vision, Planner, Executor) is independently deployable 
                  and horizontally scalable for cloud environments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cloud-Native</h3>
                <p className="text-gray-600">
                  Containerized for AWS, Azure, and GCP with CI/CD pipelines and 
                  secure API endpoints for real-time inference.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Security & Compliance</h3>
                <p className="text-gray-600">
                  Implements encryption-in-transit, secure sandboxing, and role-based 
                  access control to ensure enterprise-grade safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specification Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-cyan-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Technical Specification
              </h2>
            </div>
            <p className="text-xl text-blue-300">
              Inside AutoRL's hybrid LLM + Reinforcement Learning pipeline — the future of mobile automation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Vision Layer</h3>
                <p className="text-blue-300">
                  Uses real-time OCR + CNNs to interpret UI hierarchies and screen 
                  elements across iOS & Android.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Planning Layer</h3>
                <p className="text-blue-300">
                  LLM agent generates structured task sequences from user intents 
                  using token-level RL fine-tuning.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Execution Layer</h3>
                <p className="text-blue-300">
                  Automates UI events with adaptive retries, temporal logic control, 
                  and reward-based performance feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Rocket className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Innovation at Its Core
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              AutoRL redefines automation by combining perception, reasoning, and continuous learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Adaptive Learning</h3>
                <p className="text-gray-600">
                  Unlike static bots, AutoRL continuously retrains on user interactions, 
                  adapting to new app layouts automatically.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-blue-600"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Hybrid Reasoning</h3>
                <p className="text-gray-600">
                  Merges computer vision with LLM-based reasoning — enabling semantic 
                  understanding of complex mobile UIs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Self-Improving Agents</h3>
                <p className="text-gray-600">
                  Every completed workflow contributes to policy optimization, 
                  improving speed and accuracy over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Judging Criteria Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Judging Criteria Alignment
              </h2>
            </div>
            <p className="text-xl text-blue-200">
              Designed to exceed evaluation metrics across innovation, execution, impact, and readiness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
                <p className="text-blue-200 text-sm">
                  Hybrid RL + LLM architecture — first app-agnostic learning engine 
                  capable of generalizing across mobile ecosystems.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Settings className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Technical Execution</h3>
                <p className="text-blue-200 text-sm">
                  Functional, front-end simulated demo with modular RL design, 
                  vision planning, and execution logic.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Impact</h3>
                <p className="text-blue-200 text-sm">
                  Transforms automation by replacing brittle scripts with adaptive 
                  intelligence — saving thousands of hours globally.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Rocket className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Production Readiness</h3>
                <p className="text-blue-200 text-sm">
                  Fully containerized and cloud deployable; engineered for scaling 
                  across millions of device sessions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Automate Your Workflow?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the revolution and let AutoRL handle the repetitive tasks. Start your free trial today.
            </p>
            <Link to="/app/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">AutoRL</h3>
              <p className="text-gray-400 mb-4">Train. Adapt. Evolve.</p>
              <div className="flex gap-4">
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <Github className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/app/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/app/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/app/api" className="hover:text-white">API</Link></li>
                <li><Link to="/app/docs" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/app/about" className="hover:text-white">About</Link></li>
                <li><Link to="/app/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/app/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/app/press" className="hover:text-white">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/app/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/app/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/app/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/app/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AutoRL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
