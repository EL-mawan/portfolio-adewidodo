'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Loader2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface Experience {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
  current: boolean
  order: number
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentExperience, setCurrentExperience] = useState<Partial<Experience>>({})
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience')
      const data = await res.json()
      if (Array.isArray(data)) {
        setExperiences(data)
      }
    } catch (error) {
      console.error('Error fetching experiences:', error)
      toast({
        title: 'Error',
        description: 'Failed to load experiences',
        variant: 'destructive'
      })
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
      const body = isEditing 
        ? { ...currentExperience, id: currentExperience.id }
        : currentExperience

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
      fetchExperiences()
      resetForm()
    } catch (error) {
      console.error('Error saving experience:', error)
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
      const res = await fetch(`/api/experience?id=${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'Experience deleted successfully'
      })

      fetchExperiences()
    } catch (error) {
      console.error('Error deleting experience:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete experience',
        variant: 'destructive'
      })
    }
  }

  const resetForm = () => {
    setCurrentExperience({})
    setIsEditing(false)
  }

  const openEditDialog = (experience: Experience) => {
    setCurrentExperience(experience)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Experience</h1>
              <p className="text-muted-foreground">Manage your work experience</p>
            </div>
          </div>
          <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6">
            {experiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">{experience.title}</h3>
                      <div className="text-lg font-medium text-primary">{experience.company}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(experience.startDate).toLocaleDateString()} - 
                        {experience.current ? ' Present' : experience.endDate ? ` ${new Date(experience.endDate).toLocaleDateString()}` : ''}
                      </div>
                      {experience.location && (
                        <div className="text-sm text-muted-foreground">{experience.location}</div>
                      )}
                      {experience.description && (
                        <p className="mt-2 text-muted-foreground">{experience.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(experience)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Experience?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this experience record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(experience.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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

        {/* Edit/Add Dialog */}
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
                    value={currentExperience.title || ''}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={currentExperience.company || ''}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={currentExperience.location || ''}
                  onChange={(e) => setCurrentExperience({ ...currentExperience, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={currentExperience.startDate ? new Date(currentExperience.startDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, startDate: new Date(e.target.value).toISOString() })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={currentExperience.endDate ? new Date(currentExperience.endDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCurrentExperience({ ...currentExperience, endDate: new Date(e.target.value).toISOString() })}
                    disabled={currentExperience.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={currentExperience.current || false}
                  onCheckedChange={(checked) => setCurrentExperience({ ...currentExperience, current: checked as boolean })}
                />
                <Label htmlFor="current">I currently work here</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentExperience.description || ''}
                  onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
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
      </div>
    </div>
  )
}
