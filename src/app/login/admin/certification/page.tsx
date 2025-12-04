'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Loader2, ArrowLeft, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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

interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  image?: string
  description?: string
  order: number
}

export default function AdminCertification() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentCert, setCurrentCert] = useState<Partial<Certification>>({})
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      const res = await fetch('/api/certification')
      const data = await res.json()
      if (Array.isArray(data)) {
        setCertifications(data)
      }
    } catch (error) {
      console.error('Error fetching certifications:', error)
      toast({
        title: 'Error',
        description: 'Failed to load certifications',
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
      const url = '/api/certification'
      const method = isEditing ? 'PUT' : 'POST'
      const body = isEditing 
        ? { ...currentCert, id: currentCert.id }
        : currentCert

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
      fetchCertifications()
      resetForm()
    } catch (error) {
      console.error('Error saving certification:', error)
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
      const res = await fetch(`/api/certification?id=${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) throw new Error('Failed to delete')

      toast({
        title: 'Success',
        description: 'Certification deleted successfully'
      })

      fetchCertifications()
    } catch (error) {
      console.error('Error deleting certification:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete certification',
        variant: 'destructive'
      })
    }
  }

  const resetForm = () => {
    setCurrentCert({})
    setIsEditing(false)
  }

  const openEditDialog = (cert: Certification) => {
    setCurrentCert(cert)
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
              <h1 className="text-3xl font-bold">Certifications</h1>
              <p className="text-muted-foreground">Manage your professional certifications</p>
            </div>
          </div>
          <Button onClick={() => { resetForm(); setIsDialogOpen(true) }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Certification
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6">
            {certifications.map((cert) => (
              <Card key={cert.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      {cert.image && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold">{cert.title}</h3>
                        <div className="text-lg font-medium text-primary">{cert.issuer}</div>
                        <div className="text-sm text-muted-foreground">
                          Issued: {new Date(cert.issueDate).toLocaleDateString()}
                          {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
                        </div>
                        {cert.credentialId && (
                          <div className="text-sm text-muted-foreground font-mono">ID: {cert.credentialId}</div>
                        )}
                        {cert.credentialUrl && (
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                            Verify Credential <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(cert)}>
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
                            <AlertDialogTitle>Delete Certification?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this certification record.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(cert.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
            {certifications.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No certifications found. Add one to get started.
              </div>
            )}
          </div>
        )}

        {/* Edit/Add Dialog */}
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
                  value={currentCert.title || ''}
                  onChange={(e) => setCurrentCert({ ...currentCert, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuing Organization</Label>
                <Input
                  id="issuer"
                  value={currentCert.issuer || ''}
                  onChange={(e) => setCurrentCert({ ...currentCert, issuer: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={currentCert.issueDate ? new Date(currentCert.issueDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCurrentCert({ ...currentCert, issueDate: new Date(e.target.value).toISOString() })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={currentCert.expiryDate ? new Date(currentCert.expiryDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setCurrentCert({ ...currentCert, expiryDate: new Date(e.target.value).toISOString() })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="credentialId">Credential ID</Label>
                  <Input
                    id="credentialId"
                    value={currentCert.credentialId || ''}
                    onChange={(e) => setCurrentCert({ ...currentCert, credentialId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credentialUrl">Credential URL</Label>
                  <Input
                    id="credentialUrl"
                    value={currentCert.credentialUrl || ''}
                    onChange={(e) => setCurrentCert({ ...currentCert, credentialUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={currentCert.image || ''}
                  onChange={(e) => setCurrentCert({ ...currentCert, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentCert.description || ''}
                  onChange={(e) => setCurrentCert({ ...currentCert, description: e.target.value })}
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
