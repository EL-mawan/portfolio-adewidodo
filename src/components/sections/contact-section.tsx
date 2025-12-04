'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
import { TiltCard } from '@/components/ui/tilt-card'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactSection() {
  const [settings, setSettings] = useState<any>({})
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error)
  }, [])

  const socialLinks = [
    { name: 'GitHub', href: settings.githubUrl || '#', icon: Github },
    { name: 'LinkedIn', href: settings.linkedinUrl || '#', icon: Linkedin },
    { name: 'Twitter', href: settings.twitterUrl || '#', icon: Twitter },
  ]

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: settings.email || 'adewidodo@hse.com',
      href: `mailto:${settings.email || 'adewidodo@hse.com'}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: settings.phone || '+62 812-3456-7890',
      href: `tel:${settings.phone?.replace(/\s+/g, '') || '+6281234567890'}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: settings.location || 'Jakarta, Indonesia',
      href: '#'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Message sent successfully!',
          description: 'Thank you for reaching out. I\'ll get back to you soon.',
        })
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        const error = await response.json()
        toast({
          title: 'Error',
          description: error.error || 'Failed to send message. Please try again.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get In <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'd love to hear from you! Whether you have a project in mind or just want to chat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TiltCard>
              <Card className="border-0 shadow-2xl bg-linear-to-br from-background via-background to-muted/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full resize-none"
                        placeholder="Tell me about your project or just say hello..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <TiltCard key={info.label}>
                    <Card className="border-0 shadow-lg bg-linear-to-br from-background via-background to-muted/10 hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <motion.div
                            className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <IconComponent className="w-6 h-6 text-primary" />
                          </motion.div>
                          <div>
                            <p className="text-sm text-muted-foreground">{info.label}</p>
                            {info.href.startsWith('#') ? (
                              <p className="font-medium">{info.value}</p>
                            ) : (
                              <a
                                href={info.href}
                                className="font-medium text-primary hover:underline"
                                target={info.label === 'Email' ? '_blank' : undefined}
                                rel={info.label === 'Email' ? 'noopener noreferrer' : undefined}
                              >
                                {info.value}
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <TiltCard key={social.name}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full h-16 group"
                        asChild
                      >
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3"
                        >
                          <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span>{social.name}</span>
                        </a>
                      </Button>
                    </TiltCard>
                  )
                })}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
