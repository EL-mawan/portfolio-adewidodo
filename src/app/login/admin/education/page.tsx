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

interface Education {
  id: string
  degree: string
  institution: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  gpa?: string
  description?: string
  order: number
}

export default function AdminEducation() {
  const [educationList, setEducationList] = useState<Education[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentEdu, setCurrentEdu] = useState<Partial<Education>>({})
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    try {
      const res = await fetch('/api/education')
      const data = await res.json()
      if (Array.isArray(data)) {
        setEducationList(data)
      }
    } catch (error) {
      console.error('Error fetching education:', error)
      toast({
        title: 'Error',
        description: 'Failed to load education',
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
      const url = '/api/education'
      const method = isEditing ? 'PUT' : 'POST'
      const body = isEditing 
        ? { ...currentEdu, id: currentEdu.id }
        : currentEdu

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
      fetchEducation()
      resetForm()
    } catch (error) {
      console.error('Error saving education:', error)
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
      const res = await fetch(`/api/education?id=${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'Education deleted successfully'
      })

      fetchEducation()
    } catch (error) {
      console.error('Error deleting education:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete education',
        variant: 'destructive'
      })
    }
  }

  const resetForm = () => {
    setCurrentEdu({})
    setIsEditing(false)
  }

  const openEditDialog = (edu: Education) => {
    setCurrentEdu(edu)
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
              <h1 className="text-3xl font-bold">Education</h1>
              <p className="text-muted-foreground">Manage your educational background</p>
            </div>
          </div>
          <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6">
            {educationList.map((edu) => (
              <Card key={edu.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <div className="text-lg font-medium text-primary">{edu.institution}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(edu.startDate).toLocaleDateString()} - 
                        {edu.current ? ' Present' : edu.endDate ? ` ${new Date(edu.endDate).toLocaleDateString()}` : ''}
                      </div>
                      {edu.location && (
                        <div className="text-sm text-muted-foreground">{edu.location}</div>
                      )}
                      {edu.gpa && (
                        <div className="text-sm font-medium">GPA: {edu.gpa}</div>
                      )}
                      {edu.description && (
                        <p className="mt-2 text-muted-foreground">{edu.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(edu)}>
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
                            <AlertDialogTitle>Delete Education?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this education record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(edu.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
            {educationList.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No education records found. Add one to get started.
              </div>
            )}
          </div>
        )}

        {/* Edit/Add Dialog */}
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
                  value={currentEdu.degree || ''}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, degree: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={currentEdu.institution || ''}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, institution: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={currentEdu.location || ''}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={currentEdu.startDate ? new Date(currentEdu.startDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCurrentEdu({ ...currentEdu, startDate: new Date(e.target.value).toISOString() })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={currentEdu.endDate ? new Date(currentEdu.endDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCurrentEdu({ ...currentEdu, endDate: new Date(e.target.value).toISOString() })}
                    disabled={currentEdu.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={currentEdu.current || false}
                  onCheckedChange={(checked) => setCurrentEdu({ ...currentEdu, current: checked as boolean })}
                />
                <Label htmlFor="current">I currently study here</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gpa">GPA</Label>
                <Input
                  id="gpa"
                  value={currentEdu.gpa || ''}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, gpa: e.target.value })}
                  placeholder="e.g. 3.8/4.0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentEdu.description || ''}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, description: e.target.value })}
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
