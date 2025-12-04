// Placeholder components for additional admin sections
// These will be implemented based on the existing patterns

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { ImageUpload } from '@/components/ui/image-upload'
import { FileUpload } from '@/components/ui/file-upload'
import { useTriggerUpdate } from '@/contexts/realtime-context'



// About Content Component
export function AboutContent({ onRefresh }: any) {
  const [about, setAbout] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const triggerUpdate = useTriggerUpdate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/about')
      const data = await res.json()
      if (data) {
        setAbout(data)
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
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(about)
      })

      if (!res.ok) throw new Error('Failed to save')

      toast({
        title: 'Success',
        description: 'About content updated successfully'
      })

      fetchData()
      onRefresh()
      triggerUpdate() // Trigger realtime update
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save about content',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
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
      <div>
        <h2 className="text-2xl font-bold">About Me</h2>
        <p className="text-muted-foreground">Manage your about section content</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={about.fullName || ''}
                  onChange={(e) => setAbout({ ...about, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={about.profession || ''}
                  onChange={(e) => setAbout({ ...about, profession: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={about.bio || ''}
                  onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                  className="h-32"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="story">Story (Optional)</Label>
                <Textarea
                  id="story"
                  value={about.story || ''}
                  onChange={(e) => setAbout({ ...about, story: e.target.value })}
                  className="h-48"
                />
              </div>


              <ImageUpload
                label="Profile Image (Optional)"
                value={about.profileImage || ''}
                onChange={(url) => setAbout({ ...about, profileImage: url })}
              />

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSaving}>
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}

// Homepage Content Component
export function HomepageContent({ onRefresh }: any) {
  const [homepage, setHomepage] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const triggerUpdate = useTriggerUpdate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/homepage')
      const data = await res.json()
      if (data) {
        setHomepage(data)
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
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homepage)
      })

      if (!res.ok) throw new Error('Failed to save')

      toast({
        title: 'Success',
        description: 'Homepage content updated successfully'
      })

      fetchData()
      onRefresh()
      triggerUpdate() // Trigger realtime update to frontend
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save homepage content',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
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
      <div>
        <h2 className="text-2xl font-bold">Homepage Hero</h2>
        <p className="text-muted-foreground">Manage your homepage hero section</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  value={homepage.heroTitle || ''}
                  onChange={(e) => setHomepage({ ...homepage, heroTitle: e.target.value })}
                  placeholder="Nama Anda"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Input
                  id="heroSubtitle"
                  value={homepage.heroSubtitle || ''}
                  onChange={(e) => setHomepage({ ...homepage, heroSubtitle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvUrl">CV URL (Link Download)</Label>
                <Input
                  id="cvUrl"
                  value={homepage.cvUrl || ''}
                  onChange={(e) => setHomepage({ ...homepage, cvUrl: e.target.value })}
                  placeholder="https://drive.google.com/file/..."
                />
                <p className="text-xs text-muted-foreground">
                  Masukkan link ke file CV Anda (contoh: Google Drive, Dropbox, dll)
                </p>
              </div>



              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSaving}>
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}

// Skills Content Component
export function SkillsContent({ onRefresh }: any) {
  const [skills, setSkills] = useState<any[]>([])
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
      const res = await fetch('/api/skills')
      const data = await res.json()
      if (Array.isArray(data)) {
        setSkills(data)
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
      const url = '/api/skills'
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
        description: `Skill ${isEditing ? 'updated' : 'added'} successfully`
      })

      setIsDialogOpen(false)
      fetchData()
      onRefresh()
      setCurrentItem({})
      setIsEditing(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save skill',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/skills?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'Skill deleted successfully'
      })

      fetchData()
      onRefresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete skill',
        variant: 'destructive'
      })
    }
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    const category = skill.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {})

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
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-muted-foreground">Manage your technical and professional skills</p>
        </div>
        <Button onClick={() => { setCurrentItem({}); setIsEditing(false); setIsDialogOpen(true) }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {Object.keys(groupedSkills).map((category) => (
            <Card key={category}>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">{category}</h3>
                <div className="grid gap-4">
                  {groupedSkills[category].map((skill: any) => (
                    <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">Level: {skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Edit Skill?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda ingin mengedit data ini?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Tidak</AlertDialogCancel>
                              <AlertDialogAction onClick={() => { setCurrentItem(skill); setIsEditing(true); setIsDialogOpen(true) }}>
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
                              <AlertDialogTitle>Hapus Skill?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Tidak</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(skill.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Ya, Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {skills.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No skills found. Add one to get started.
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                value={currentItem.name || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={currentItem.category || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                placeholder="e.g. Frontend, Backend, Tools"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Proficiency Level (%)</Label>
              <Input
                id="level"
                type="number"
                min="0"
                max="100"
                value={currentItem.level || 0}
                onChange={(e) => setCurrentItem({ ...currentItem, level: parseInt(e.target.value) })}
                required
              />
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentItem.level || 0}%` }}
                />
              </div>
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

// Messages Content Component
export function MessagesContent({ onRefresh }: any) {
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      if (Array.isArray(data)) {
        setMessages(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsRead = async (id: string, read: boolean) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read })
      })

      if (!res.ok) throw new Error('Failed to update')

      toast({
        title: 'Success',
        description: `Message marked as ${read ? 'read' : 'unread'}`
      })

      fetchData()
      onRefresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update message',
        variant: 'destructive'
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'Message deleted successfully'
      })

      fetchData()
      onRefresh()
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive'
      })
    }
  }

  const openMessage = (message: any) => {
    setSelectedMessage(message)
    setIsDialogOpen(true)
    if (!message.read) {
      handleMarkAsRead(message.id, true)
    }
  }

  const unreadCount = messages.filter(m => !m.read).length

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
          <h2 className="text-2xl font-bold">Messages</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card 
              key={message.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${!message.read ? 'border-primary' : ''}`}
              onClick={() => openMessage(message)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {!message.read && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                      <h3 className="font-bold">{message.name}</h3>
                      <span className="text-sm text-muted-foreground">{message.email}</span>
                    </div>
                    {message.subject && (
                      <div className="text-sm font-medium mb-1">{message.subject}</div>
                    )}
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(message.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMarkAsRead(message.id, !message.read)
                      }}
                    >
                      {message.read ? '📧' : '✉️'}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(message.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {messages.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No messages yet.
            </div>
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>From</Label>
                  <div className="font-medium">{selectedMessage.name}</div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div className="font-medium">{selectedMessage.email}</div>
                </div>
              </div>
              {selectedMessage.subject && (
                <div>
                  <Label>Subject</Label>
                  <div className="font-medium">{selectedMessage.subject}</div>
                </div>
              )}
              <div>
                <Label>Message</Label>
                <div className="mt-2 p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              <div>
                <Label>Received</Label>
                <div className="text-sm text-muted-foreground">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline"
                  onClick={() => handleMarkAsRead(selectedMessage.id, !selectedMessage.read)}
                >
                  Mark as {selectedMessage.read ? 'Unread' : 'Read'}
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// Settings Content Component
export function SettingsContent({ onRefresh }: any) {
  const [settings, setSettings] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const triggerUpdate = useTriggerUpdate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data) {
        setSettings(data)
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
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (!res.ok) throw new Error('Failed to save')

      toast({
        title: 'Success',
        description: 'Settings updated successfully'
      })

      fetchData()
      onRefresh()
      triggerUpdate()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">General</h3>
                <div className="space-y-2">
                  <Label htmlFor="footerUrl">Footer Redirect URL</Label>
                  <Input
                    id="footerUrl"
                    value={settings.footerUrl || ''}
                    onChange={(e) => setSettings({ ...settings, footerUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                  <p className="text-sm text-muted-foreground">
                    This URL will be used for the footer link redirection.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={settings.email || ''}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={settings.phone || ''}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={settings.location || ''}
                      onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                      placeholder="Jakarta, Indonesia"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      value={settings.githubUrl || ''}
                      onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      value={settings.linkedinUrl || ''}
                      onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterUrl">Twitter/X URL</Label>
                    <Input
                      id="twitterUrl"
                      value={settings.twitterUrl || ''}
                      onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
