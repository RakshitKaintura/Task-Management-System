'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { CheckCircle, Zap, Layout, ArrowRight, Code2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: 'Smart Task Management',
      description: 'Organize your work with intuitive Kanban boards and lists.',
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: 'AI-Powered Breakdowns',
      description: 'Let Gemini AI automatically break down complex tasks into actionable steps.',
    },
    {
      icon: <Layout className="h-6 w-6 text-primary" />,
      title: 'Beautiful Dashboards',
      description: 'Gain insights into your productivity with interactive charts and analytics.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      {/* Navbar */}
      <header className="px-6 lg:px-14 h-16 flex items-center justify-between border-b bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground h-4 w-4">
              <path d="M12 2v20" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          TaskFlow <span className="text-primary">AI</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Login
          </Link>
          <Link 
            href="/register" 
            className={buttonVariants({ variant: 'default' })}
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-48 flex items-center justify-center relative overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          <motion.div 
            className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              TaskFlow AI is now in public beta
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-4xl">
              Manage your tasks with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">AI Intelligence</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              The smart task management system that helps you break down complex work, organize your days, and track your productivity seamlessly.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link 
                href="/register" 
                className={buttonVariants({ size: 'lg', className: 'rounded-full h-12 px-8 text-base' })}
              >
                  Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="https://github.com" 
                target="_blank"
                className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full h-12 px-8 text-base' })}
              >
                  <Code2 className="mr-2 h-4 w-4" /> View Source
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-muted/30 border-y">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything you need to succeed</h2>
              <p className="text-muted-foreground md:text-lg max-w-[800px]">
                Built with modern technologies to provide a fast, secure, and beautiful experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all"
                >
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 md:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-8 bg-primary text-primary-foreground p-10 md:p-16 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 text-primary-foreground/10">
                <Zap className="w-64 h-64" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-5xl relative z-10">
                Ready to transform your workflow?
              </h2>
              <p className="text-primary-foreground/80 md:text-xl max-w-[600px] relative z-10">
                Join thousands of users who are already organizing their life with TaskFlow AI.
              </p>
              <Link 
                href="/register"
                className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'rounded-full h-12 px-8 text-base font-semibold relative z-10' })}
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 border-t bg-background flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026 TaskFlow AI. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
