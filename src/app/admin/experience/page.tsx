'use client';

import { useState } from 'react';
import { useExperience, Experience } from '@/hooks/use-experience';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Loader2, Plus, Pencil, Trash2, Briefcase, MapPin, Calendar, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceFormData {
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorkingHere: boolean;
  location: string;
  technologies: string[];
  highlights: string[];
}

const initialFormData: ExperienceFormData = {
  companyName: '',
  position: '',
  description: '',
  startDate: '',
  endDate: '',
  isCurrentlyWorkingHere: false,
  location: '',
  technologies: [],
  highlights: [],
};

export default function ExperiencePage() {
  const { experiences, loading, error, createExperience, updateExperience, deleteExperience, refetch } = useExperience();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<ExperienceFormData>(initialFormData);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');

  const handleOpenCreate = () => {
    setEditingExperience(null);
    setFormData(initialFormData);
    setTechInput('');
    setHighlightInput('');
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingExperience(exp);
    setFormData({
      companyName: exp.companyName,
      position: exp.position,
      description: exp.description,
      startDate: exp.startDate.split('T')[0],
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      isCurrentlyWorkingHere: exp.isCurrentlyWorkingHere,
      location: exp.location || '',
      technologies: exp.technologies || [],
      highlights: exp.highlights || [],
    });
    setTechInput('');
    setHighlightInput('');
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingExperience(null);
    setFormData(initialFormData);
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData({ ...formData, technologies: formData.technologies.filter(t => t !== tech) });
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({ ...formData, highlights: [...formData.highlights, highlightInput.trim()] });
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData({ ...formData, highlights: formData.highlights.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const expData = {
      ...formData,
      endDate: formData.isCurrentlyWorkingHere ? undefined : formData.endDate || undefined,
    };

    let success;
    if (editingExperience) {
      success = await updateExperience(editingExperience.id, expData);
    } else {
      success = await createExperience(expData);
    }

    if (success) {
      handleCloseDialog();
      await refetch();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, position: string) => {
    if (!confirm(`Are you sure you want to delete "${position}"?`)) {
      return;
    }

    setDeletingId(id);
    const success = await deleteExperience(id);
    if (success) {
      await refetch();
    }
    setDeletingId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#6366f1]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Experience</h1>
          <p className="text-[#a0a0a0]">Manage your work experience</p>
        </div>
        <Button className="bg-[#6366f1] hover:bg-[#4f46e5]" onClick={handleOpenCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card className="p-12 bg-[#1a1a1a] border-[#2a2a2a] text-center">
          <p className="text-[#a0a0a0] mb-4">No experience entries yet</p>
          <Button className="bg-[#6366f1] hover:bg-[#4f46e5]" onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add your first experience
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#6366f1] transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-[#6366f1]/10 rounded-lg">
                        <Briefcase className="h-5 w-5 text-[#6366f1]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                        <p className="text-lg text-[#a0a0a0]">{exp.companyName}</p>

                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-[#a0a0a0]">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {formatDate(exp.startDate)} - {
                                exp.isCurrentlyWorkingHere
                                  ? 'Present'
                                  : exp.endDate ? formatDate(exp.endDate) : 'N/A'
                              }
                            </span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-[#a0a0a0] mb-3">{exp.description}</p>

                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-white mb-2">Key Achievements:</p>
                        <ul className="list-disc list-inside text-sm text-[#a0a0a0] space-y-1">
                          {exp.highlights.slice(0, 3).map((highlight, i) => (
                            <li key={i}>{highlight}</li>
                          ))}
                          {exp.highlights.length > 3 && (
                            <li className="text-[#6366f1]">+{exp.highlights.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-[#0f0f0f] text-[#a0a0a0] border-[#333]"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#333] hover:border-[#6366f1]"
                      onClick={() => handleOpenEdit(exp)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#333] hover:border-red-500 text-red-500"
                      onClick={() => handleDelete(exp.id, exp.position)}
                      disabled={deletingId === exp.id}
                    >
                      {deletingId === exp.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Experience Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingExperience ? 'Edit Experience' : 'Add Experience'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position" className="text-white">Position *</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Software Engineer"
                  required
                  className="bg-[#0f0f0f] border-[#333] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-white">Company *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Company Name"
                  required
                  className="bg-[#0f0f0f] border-[#333] text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="San Francisco, CA"
                className="bg-[#0f0f0f] border-[#333] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your role and responsibilities..."
                required
                rows={3}
                className="w-full px-3 py-2 bg-[#0f0f0f] border border-[#333] rounded-md text-white resize-none focus:outline-none focus:border-[#6366f1]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-white">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="bg-[#0f0f0f] border-[#333] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-white">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  disabled={formData.isCurrentlyWorkingHere}
                  className="bg-[#0f0f0f] border-[#333] text-white disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isCurrentlyWorkingHere"
                checked={formData.isCurrentlyWorkingHere}
                onCheckedChange={(checked) => setFormData({ ...formData, isCurrentlyWorkingHere: checked as boolean })}
              />
              <Label htmlFor="isCurrentlyWorkingHere" className="text-white cursor-pointer">
                I currently work here
              </Label>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <Label className="text-white">Technologies</Label>
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                  placeholder="Add technology..."
                  className="bg-[#0f0f0f] border-[#333] text-white"
                />
                <Button type="button" onClick={handleAddTechnology} className="bg-[#6366f1] hover:bg-[#4f46e5]">
                  Add
                </Button>
              </div>
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-[#0f0f0f] text-[#a0a0a0] border-[#333]">
                      {tech}
                      <button type="button" onClick={() => handleRemoveTechnology(tech)} className="ml-1 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <Label className="text-white">Key Achievements</Label>
              <div className="flex gap-2">
                <Input
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHighlight())}
                  placeholder="Add achievement..."
                  className="bg-[#0f0f0f] border-[#333] text-white"
                />
                <Button type="button" onClick={handleAddHighlight} className="bg-[#6366f1] hover:bg-[#4f46e5]">
                  Add
                </Button>
              </div>
              {formData.highlights.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {formData.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center justify-between bg-[#0f0f0f] p-2 rounded border border-[#333]">
                      <span className="text-sm text-[#a0a0a0]">{highlight}</span>
                      <button type="button" onClick={() => handleRemoveHighlight(index)} className="text-red-500 hover:text-red-400">
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={handleCloseDialog} className="border-[#333]">
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-[#6366f1] hover:bg-[#4f46e5]">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editingExperience ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
