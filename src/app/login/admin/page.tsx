'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Award, 
  Code, 
  GraduationCap, 
  Mail, 
  Settings,
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  ExternalLink,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUpload } from '@/components/ui/image-upload'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AboutContent, HomepageContent, SkillsContent, MessagesContent, SettingsContent } from './components/admin-sections'
import { useTriggerUpdate } from '@/contexts/realtime-context'


interface DashboardStats {
  totalExperiences: number
  totalSkills: number
  totalCertifications: number
  totalEducation: number
  totalMessages: number
  totalGallery: number
  unreadMessages: number
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', value: 'dashboard' },
  { icon: Home, label: 'Homepage', value: 'homepage' },
  { icon: User, label: 'About', value: 'about' },
  { icon: Briefcase, label: 'Experience', value: 'experience' },
  { icon: Award, label: 'Certifications', value: 'certification' },
  { icon: Code, label: 'Skills', value: 'skills' },
  { icon: GraduationCap, label: 'Education', value: 'education' },
  { icon: ImageIcon, label: 'Gallery', value: 'gallery' },
  { icon: Mail, label: 'Messages', value: 'messages' },
  { icon: Settings, label: 'Settings', value: 'settings' },
]

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [stats, setStats] = useState<DashboardStats>({
    totalExperiences: 0,
    totalSkills: 0,
    totalCertifications: 0,
    totalEducation: 0,
    totalMessages: 0,
    totalGallery: 0,
    unreadMessages: 0
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const [currentTime, setCurrentTime] = useState<string>('')
  const router = useRouter()
  const { toast } = useToast()

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (!res.ok) {
        toast({
          title: '❌ Tidak Terautentikasi',
          description: 'Sesi Anda telah berakhir. Silakan login kembali.',
          variant: 'destructive',
          duration: 3000,
        })
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000)
        return
      }
      setIsAuthChecking(false)
    } catch (error) {
      toast({
        title: '❌ Error',
        description: 'Gagal memverifikasi autentikasi.',
        variant: 'destructive',
      })
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    }
  }

  useEffect(() => {
    if (!isAuthChecking) {
      fetchStats()
      // Set time only on client side to avoid hydration mismatch
      setCurrentTime(new Date().toLocaleString())
    }
  }, [isAuthChecking])

  // Prevent accidental page leave - show confirmation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Show browser's default confirmation dialog
      e.preventDefault()
      e.returnValue = '' // Required for Chrome
      return '' // Required for some browsers
    }

    // Add event listener when component mounts
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const fetchStats = async () => {
    try {
      const [experiences, skills, certifications, education, messages, gallery] = await Promise.all([
        fetch('/api/experience').then(res => res.json()),
        fetch('/api/skills').then(res => res.json()),
        fetch('/api/certification').then(res => res.json()),
        fetch('/api/education').then(res => res.json()),
        fetch('/api/contact').then(res => res.json()),
        fetch('/api/gallery').then(res => res.json())
      ])

      setStats({
        totalExperiences: Array.isArray(experiences) ? experiences.length : 0,
        totalSkills: Array.isArray(skills) ? skills.length : 0,
        totalCertifications: Array.isArray(certifications) ? certifications.length : 0,
        totalEducation: Array.isArray(education) ? education.length : 0,
        totalMessages: Array.isArray(messages) ? messages.length : 0,
        totalGallery: Array.isArray(gallery) ? gallery.length : 0,
        unreadMessages: Array.isArray(messages) ? messages.filter((m: any) => !m.read).length : 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      toast({
        title: 'Error',
        description: 'Failed to load dashboard statistics',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      toast({
        title: '✅ Logout Berhasil',
        description: 'Anda telah berhasil keluar. Sampai jumpa!',
        duration: 3000,
      })
      
      // Hard redirect to login page
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    } catch (error) {
      toast({
        title: '❌ Logout Gagal',
        description: 'Gagal logout. Silakan coba lagi.',
        variant: 'destructive',
        duration: 4000,
      })
    }
  }

  const statCards = [
    {
      title: 'Experiences',
      value: stats.totalExperiences,
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500',
      section: 'experience'
    },
    {
      title: 'Skills',
      value: stats.totalSkills,
      icon: Code,
      color: 'from-green-500 to-emerald-500',
      section: 'skills'
    },
    {
      title: 'Certifications',
      value: stats.totalCertifications,
      icon: Award,
      color: 'from-orange-500 to-red-500',
      section: 'certification'
    },
    {
      title: 'Education',
      value: stats.totalEducation,
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-500',
      section: 'education'
    },
    {
      title: 'Gallery',
      value: stats.totalGallery,
      icon: ImageIcon,
      color: 'from-pink-500 to-rose-500',
      section: 'gallery'
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: Mail,
      color: 'from-red-500 to-orange-500',
      section: 'messages'
    }
  ]

  // Show loading screen while checking authentication
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Memverifikasi autentikasi...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Portfolio Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Button
                  key={item.value}
                  variant={activeSection === item.value ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveSection(item.value)
                    setSidebarOpen(false)
                  }}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.label}
                  {item.value === 'messages' && stats.unreadMessages > 0 && (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                      {stats.unreadMessages}
                    </span>
                  )}
                </Button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-card border-b border-border">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            <h2 className="text-lg font-semibold capitalize">{activeSection}</h2>
            
            <div className="text-sm text-muted-foreground">
              {currentTime && `Last updated: ${currentTime}`}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeSection === 'dashboard' && (
              <DashboardContent 
                key="dashboard"
                stats={stats}
                statCards={statCards}
                isLoading={isLoading}
                onNavigate={setActiveSection}
              />
            )}
            {activeSection === 'about' && (
              <AboutContent key="about" onRefresh={fetchStats} />
            )}
            {activeSection === 'homepage' && (
              <HomepageContent key="homepage" onRefresh={fetchStats} />
            )}
            {activeSection === 'experience' && (
              <ExperienceContent key="experience" onRefresh={fetchStats} />
            )}
            {activeSection === 'certification' && (
              <CertificationContent key="certification" onRefresh={fetchStats} />
            )}
            {activeSection === 'skills' && (
              <SkillsContent key="skills" onRefresh={fetchStats} />
            )}
            {activeSection === 'education' && (
              <EducationContent key="education" onRefresh={fetchStats} />
            )}
            {activeSection === 'gallery' && (
              <GalleryContent key="gallery" onRefresh={fetchStats} />
            )}
            {activeSection === 'messages' && (
              <MessagesContent key="messages" onRefresh={fetchStats} />
            )}
            {activeSection === 'settings' && (
              <SettingsContent key="settings" onRefresh={fetchStats} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

// Dashboard Content Component
function DashboardContent({ stats, statCards, isLoading, onNavigate }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your portfolio content and view statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card: any, index: number) => {
          const IconComponent = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => onNavigate(card.section)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${card.color} flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? (
                              <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                    ) : (
                      card.value
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// Experience Content Component (simplified - you'll need to add full CRUD)
function ExperienceContent({ onRefresh }: any) {
  const [experiences, setExperiences] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>({})
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const triggerUpdate = useTriggerUpdate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/experience')
      const data = await res.json()
      if (Array.isArray(data)) {
        setExperiences(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = '/api/experience'
      const method = isEditing ? 'PUT' : 'POST'
      const body = isEditing ? { ...currentItem, id: currentItem.id } : currentItem

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error('Failed to save')

      toast({
        title: 'Success',
        description: `Experience ${isEditing ? 'updated' : 'added'} successfully`
      })

      setIsDialogOpen(false)
      fetchData()
      onRefresh()
      triggerUpdate() // Trigger realtime update
      setCurrentItem({})
      setIsEditing(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save experience',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/experience?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'Experience deleted successfully'
      })

      fetchData()
      onRefresh()
      triggerUpdate() // Trigger realtime update
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete experience',
        variant: 'destructive'
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-muted-foreground">Manage your professional experience</p>
        </div>
        <Button onClick={() => { setCurrentItem({}); setIsEditing(false); setIsDialogOpen(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <Card key={exp.id} className="overflow-hidden">
              {/* Image Section */}
              {exp.image ? (
                <div className="relative h-48 bg-muted">
                  <img 
                    src={exp.image} 
                    alt={exp.company} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white truncate">{exp.title}</h3>
                    <p className="text-sm text-white/80">{exp.company}</p>
                  </div>
                </div>
              ) : (
                <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-primary/40" />
                </div>
              )}
              
              {/* Content Section */}
              <CardContent className="p-4">
                {!exp.image && (
                  <div className="mb-3">
                    <h3 className="text-lg font-bold truncate">{exp.title}</h3>
                    <p className="text-sm text-primary font-medium">{exp.company}</p>
                  </div>
                )}
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>
                      {new Date(exp.startDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })} - 
                      {exp.current ? ' Sekarang' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}` : ''}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
                
                {exp.description && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {exp.description}
                  </p>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Pencil className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Edit Experience?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda ingin mengedit data ini?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tidak</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { setCurrentItem(exp); setIsEditing(true); setIsDialogOpen(true) }}>
                          Ya
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Experience?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tidak</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(exp.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Ya, Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
          {experiences.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No experiences found. Add one to get started.
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={currentItem.title || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={currentItem.company || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, company: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={currentItem.location || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={currentItem.startDate ? new Date(currentItem.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, startDate: new Date(e.target.value).toISOString() })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={currentItem.endDate ? new Date(currentItem.endDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, endDate: new Date(e.target.value).toISOString() })}
                  disabled={currentItem.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={currentItem.current || false}
                onCheckedChange={(checked) => setCurrentItem({ ...currentItem, current: checked as boolean })}
              />
              <Label htmlFor="current">I currently work here</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentItem.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                className="h-32"
              />
            </div>

            <ImageUpload
              label="Company Logo / Image (Optional)"
              value={currentItem.image || ''}
              onChange={(url) => setCurrentItem({ ...currentItem, image: url })}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// Similar components for Certification, Education, and Gallery
// (I'll create these in separate messages due to length)

function CertificationContent({ onRefresh }: any) {
  const [certifications, setCertifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>({})
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/certification')
      const data = await res.json()
      if (Array.isArray(data)) {
        setCertifications(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = '/api/certification'
      const method = isEditing ? 'PUT' : 'POST'
      const body = isEditing ? { ...currentItem, id: currentItem.id } : currentItem

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error('Failed to save')

      toast({
        title: 'Success',
        description: `Certification ${isEditing ? 'updated' : 'added'} successfully`
      })

      setIsDialogOpen(false)
      fetchData()
      onRefresh()
      setCurrentItem({})
      setIsEditing(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save certification',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/certification?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'Certification deleted successfully'
      })

      fetchData()
      onRefresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete certification',
        variant: 'destructive'
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Certifications</h2>
          <p className="text-muted-foreground">Manage your professional certifications</p>
        </div>
        <Button onClick={() => { setCurrentItem({}); setIsEditing(false); setIsDialogOpen(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <Card key={cert.id} className="group relative overflow-hidden h-[300px] border-0 shadow-lg">
              {/* Full Background Image */}
              {cert.image ? (
                <div className="absolute inset-0">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center">
                  <Award className="w-20 h-20 text-white/30" />
                </div>
              )}

              {/* Content Overlay with Blur */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="backdrop-blur-md bg-black/30 rounded-xl p-4 border border-white/10 text-white space-y-2 transform transition-all duration-300 hover:bg-black/40">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-lg leading-tight line-clamp-2">{cert.title}</h3>
                      <div className="text-white/90 font-medium text-sm mt-1">{cert.issuer}</div>
                    </div>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors shrink-0"
                        title="Verify Credential"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-white/70 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      📅 {new Date(cert.issueDate).toLocaleDateString()}
                    </span>
                    {cert.expiryDate && (
                      <span className="flex items-center gap-1">
                        ⏳ Exp: {new Date(cert.expiryDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 mt-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="secondary" size="sm" className="flex-1 bg-white/90 hover:bg-white text-black h-8">
                          <Pencil className="w-3 h-3 mr-1" /> Edit
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Edit Certification?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda ingin mengedit data ini?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Tidak</AlertDialogCancel>
                          <AlertDialogAction onClick={() => { setCurrentItem(cert); setIsEditing(true); setIsDialogOpen(true) }}>
                            Ya
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="h-8 px-3">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Certification?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Tidak</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(cert.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Ya, Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {certifications.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No certifications found. Add one to get started.
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Certification' : 'Add Certification'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Certification Title</Label>
              <Input
                id="title"
                value={currentItem.title || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Organization</Label>
              <Input
                id="issuer"
                value={currentItem.issuer || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, issuer: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={currentItem.issueDate ? new Date(currentItem.issueDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, issueDate: new Date(e.target.value).toISOString() })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={currentItem.expiryDate ? new Date(currentItem.expiryDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, expiryDate: new Date(e.target.value).toISOString() })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                <Input
                  id="credentialId"
                  value={currentItem.credentialId || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, credentialId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credentialUrl">Credential URL (Optional)</Label>
                <Input
                  id="credentialUrl"
                  value={currentItem.credentialUrl || ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, credentialUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>


            <ImageUpload
              label="Certificate Image (Optional)"
              value={currentItem.image || ''}
              onChange={(url) => setCurrentItem({ ...currentItem, image: url })}
            />

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={currentItem.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                className="h-32"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

function EducationContent({ onRefresh }: any) {
  const [educationList, setEducationList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>({})
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/education')
      const data = await res.json()
      if (Array.isArray(data)) {
        setEducationList(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = '/api/education'
      const method = isEditing ? 'PUT' : 'POST'
      const body = isEditing ? { ...currentItem, id: currentItem.id } : currentItem

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error('Failed to save')

      toast({
        title: 'Success',
        description: `Education ${isEditing ? 'updated' : 'added'} successfully`
      })

      setIsDialogOpen(false)
      fetchData()
      onRefresh()
      setCurrentItem({})
      setIsEditing(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save education',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/education?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'Education deleted successfully'
      })

      fetchData()
      onRefresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete education',
        variant: 'destructive'
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-muted-foreground">Manage your educational background</p>
        </div>
        <Button onClick={() => { setCurrentItem({}); setIsEditing(false); setIsDialogOpen(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4">
          {educationList.map((edu) => (
            <Card key={edu.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <div className="text-lg font-medium text-primary">{edu.institution}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(edu.startDate).toLocaleDateString()} - 
                      {edu.current ? ' Present' : edu.endDate ? ` ${new Date(edu.endDate).toLocaleDateString()}` : ''}
                    </div>
                    {edu.location && <div className="text-sm text-muted-foreground">{edu.location}</div>}
                    {edu.gpa && <div className="text-sm font-medium">GPA: {edu.gpa}</div>}
                    {edu.description && <p className="mt-2 text-muted-foreground">{edu.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Edit Education?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda ingin mengedit data ini?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Tidak</AlertDialogCancel>
                          <AlertDialogAction onClick={() => { setCurrentItem(edu); setIsEditing(true); setIsDialogOpen(true) }}>
                            Ya
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Education?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Tidak</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(edu.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Ya, Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {educationList.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No education records found. Add one to get started.
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Education' : 'Add Education'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={currentItem.degree || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, degree: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={currentItem.institution || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, institution: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                value={currentItem.location || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={currentItem.startDate ? new Date(currentItem.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, startDate: new Date(e.target.value).toISOString() })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={currentItem.endDate ? new Date(currentItem.endDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentItem({ ...currentItem, endDate: new Date(e.target.value).toISOString() })}
                  disabled={currentItem.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={currentItem.current || false}
                onCheckedChange={(checked) => setCurrentItem({ ...currentItem, current: checked as boolean })}
              />
              <Label htmlFor="current">I currently study here</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpa">GPA (Optional)</Label>
              <Input
                id="gpa"
                value={currentItem.gpa || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, gpa: e.target.value })}
                placeholder="e.g. 3.8/4.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={currentItem.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                className="h-32"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

function GalleryContent({ onRefresh }: any) {
  const [gallery, setGallery] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>({})
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      if (Array.isArray(data)) {
        setGallery(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = '/api/gallery'
      const method = isEditing ? 'PUT' : 'POST'
      const body = isEditing ? { ...currentItem, id: currentItem.id } : currentItem

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error('Failed to save')

      toast({
        title: 'Success',
        description: `Gallery item ${isEditing ? 'updated' : 'added'} successfully`
      })

      setIsDialogOpen(false)
      fetchData()
      onRefresh()
      setCurrentItem({})
      setIsEditing(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save gallery item',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'Gallery item deleted successfully'
      })

      fetchData()
      onRefresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete gallery item',
        variant: 'destructive'
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gallery</h2>
          <p className="text-muted-foreground">Manage your portfolio gallery images</p>
        </div>
        <Button onClick={() => { setCurrentItem({}); setIsEditing(false); setIsDialogOpen(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                {item.category && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary/80 backdrop-blur-sm">{item.category}</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
                )}
                <div className="flex gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Edit Gallery Item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda ingin mengedit data ini?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tidak</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { setCurrentItem(item); setIsEditing(true); setIsDialogOpen(true) }}>
                          Ya
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Gallery Item?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tidak</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Ya, Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
          {gallery.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No gallery items found. Add one to get started.
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Gallery Item' : 'Add Gallery Item'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={currentItem.title || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                required
              />
            </div>


            <ImageUpload
              label="Image"
              value={currentItem.imageUrl || ''}
              onChange={(url) => setCurrentItem({ ...currentItem, imageUrl: url })}
            />

            <div className="space-y-2">
              <Label htmlFor="category">Category (Optional)</Label>
              <Input
                id="category"
                value={currentItem.category || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                placeholder="e.g. Web Design, Photography, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={currentItem.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                className="h-24"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}