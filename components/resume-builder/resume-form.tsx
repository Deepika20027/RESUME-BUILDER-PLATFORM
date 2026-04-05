"use client"

import { useState, useRef } from "react"
import { Plus, Trash2, Upload, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ResumeData, Education, Experience, Project } from "@/types/resume"

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
  currentStep: string
}

export function ResumeForm({ data, onChange, currentStep }: ResumeFormProps) {
  const [skillInput, setSkillInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updatePersonalInfo = (field: keyof ResumeData["personalInfo"], value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePersonalInfo("photo", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    updatePersonalInfo("photo", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      onChange({ ...data, skills: [...data.skills, skillInput.trim()] })
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    onChange({ ...data, skills: data.skills.filter((s) => s !== skill) })
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    }
    onChange({ ...data, education: [...data.education, newEducation] })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    })
  }

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((edu) => edu.id !== id) })
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    onChange({ ...data, experience: [...data.experience, newExperience] })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    })
  }

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter((exp) => exp.id !== id) })
  }

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    }
    onChange({ ...data, projects: [...data.projects, newProject] })
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    })
  }

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter((proj) => proj.id !== id) })
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      {currentStep === 'personal' && (
        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="flex items-start gap-4">
            <div>
              <Label className="text-muted-foreground text-sm mb-2 block">Add Photo</Label>
              <p className="text-xs text-muted-foreground mb-3">Optional</p>
              
              <div className="relative">
                {data.personalInfo.photo ? (
                  <div className="relative w-20 h-20">
                    <img 
                      src={data.personalInfo.photo} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-xl object-cover border-2 border-border"
                    />
                    <button
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-md"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-border bg-muted/50 flex flex-col items-center justify-center gap-1 hover:bg-muted transition-colors"
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Upload</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
            
            <div className="flex-1 w-20 h-20 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center">
              <User className="h-10 w-10 text-teal-500/50" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Liam Bennett"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                className="h-12 bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="liam.bennett@email.com"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="h-12 bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">Phone</Label>
              <Input
                id="phone"
                placeholder="(555) 987-6543"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="h-12 bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-foreground">Location</Label>
              <Input
                id="location"
                placeholder="San Francisco, CA"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                className="h-12 bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-foreground">LinkedIn</Label>
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/liambennett"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                className="h-12 bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-foreground">Website</Label>
              <Input
                id="website"
                placeholder="liambennett.dev"
                value={data.personalInfo.website}
                onChange={(e) => updatePersonalInfo("website", e.target.value)}
                className="h-12 bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary" className="text-foreground">Professional Summary</Label>
              <Textarea
                id="summary"
                placeholder="A brief summary of your professional background and goals..."
                rows={4}
                value={data.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                className="bg-card border-border resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Skills */}
      {currentStep === 'skills' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Add Your Skills</h2>
            <p className="text-sm text-muted-foreground mb-4">
              List your technical and soft skills. These help recruiters find you.
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Type a skill and press enter..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              className="h-12 bg-card border-border flex-1"
            />
            <Button onClick={addSkill} className="h-12 px-6 bg-primary">
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="gap-2 px-3 py-2 text-sm bg-primary/10 text-primary border-0"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          {data.skills.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No skills added yet. Start typing above to add skills.</p>
            </div>
          )}

          {/* Suggested Skills */}
          <div>
            <p className="text-sm text-muted-foreground mb-3">Popular skills:</p>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'SQL', 'Git', 'AWS'].map((skill) => (
                !data.skills.includes(skill) && (
                  <button
                    key={skill}
                    onClick={() => onChange({ ...data, skills: [...data.skills, skill] })}
                    className="px-3 py-1.5 text-sm bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
                  >
                    + {skill}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Education */}
      {currentStep === 'education' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Education</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add your educational background, starting with the most recent.
            </p>
          </div>

          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <Card key={edu.id} className="bg-card border-border">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Education {index + 1}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      placeholder="University of California, Berkeley"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      className="h-11 bg-background"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        placeholder="Bachelor's"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        className="h-11 bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        placeholder="Computer Science"
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                        className="h-11 bg-background"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        placeholder="Sep 2018"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                        className="h-11 bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        placeholder="May 2022"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                        className="h-11 bg-background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            onClick={addEducation} 
            variant="outline" 
            className="w-full h-12 border-dashed border-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>
      )}

      {/* Experience */}
      {currentStep === 'experience' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Work Experience</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add your work history, starting with your most recent position.
            </p>
          </div>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <Card key={exp.id} className="bg-card border-border">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Experience {index + 1}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        placeholder="Google"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        className="h-11 bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input
                        placeholder="Software Engineer"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                        className="h-11 bg-background"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="Mountain View, CA"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                      className="h-11 bg-background"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        placeholder="Jan 2022"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        className="h-11 bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        placeholder="Present"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        className="h-11 bg-background"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      className="bg-background resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            onClick={addExperience} 
            variant="outline" 
            className="w-full h-12 border-dashed border-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </div>
      )}

      {/* Projects */}
      {currentStep === 'projects' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Projects</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Showcase your best work and personal projects.
            </p>
          </div>

          <div className="space-y-4">
            {data.projects.map((proj, index) => (
              <Card key={proj.id} className="bg-card border-border">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Project {index + 1}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeProject(proj.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input
                      placeholder="E-commerce Platform"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                      className="h-11 bg-background"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe what the project does..."
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                      className="bg-background resize-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Technologies Used</Label>
                    <Input
                      placeholder="React, Node.js, MongoDB"
                      value={proj.technologies}
                      onChange={(e) => updateProject(proj.id, "technologies", e.target.value)}
                      className="h-11 bg-background"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Project Link</Label>
                    <Input
                      placeholder="github.com/username/project"
                      value={proj.link}
                      onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                      className="h-11 bg-background"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            onClick={addProject} 
            variant="outline" 
            className="w-full h-12 border-dashed border-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      )}
    </div>
  )
}
