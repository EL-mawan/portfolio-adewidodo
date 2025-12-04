'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'


const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' },
]

export function Footer() {
  const [settings, setSettings] = useState<any>({})
  const [aboutData, setAboutData] = useState<any>({})

  useEffect(() => {
    // Fetch settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error)

    // Fetch about content for profession
    fetch('/api/about')
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(console.error)
  }, [])

  const socialLinks = [
    { name: 'GitHub', href: settings.githubUrl || '#', icon: Github },
    { name: 'LinkedIn', href: settings.linkedinUrl || '#', icon: Linkedin },
    { name: 'Email', href: `mailto:${settings.email || 'adewidodo@hse.com'}`, icon: Mail },
  ]

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {settings.footerUrl ? (
                <Link href={settings.footerUrl} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                    Ade Widodo
                  </h3>
                </Link>
              ) : (
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
                  Ade Widodo
                </h3>
              )}
              <p className="text-muted-foreground mb-4">
                {aboutData.profession || 'Full Stack Developer & UI/UX Designer'}
              </p>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">adewidodo@hse.com</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+62 812-3456-7890</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Jakarta, Indonesia</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Ade Widodo. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}