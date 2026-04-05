"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { 
  Download, 
  FileText, 
  Home, 
  LayoutTemplate, 
  Settings,
  ArrowRight,
  ArrowLeft,
  Share2,
  FileImage,
  FileIcon,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ResumeForm } from "./resume-form"
import { ResumePreview } from "./resume-preview"
import { ThemeToggle } from "./theme-toggle"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { usePdfDownload } from "@/hooks/use-pdf-download"
import type { ResumeData, TemplateType, ThemeColor } from "@/types/resume"
import { themeColors } from "@/types/resume"
import { cn } from "@/lib/utils"

type ViewType = 'home' | 'form' | 'preview'

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
    photo: "",
  },
  skills: [],
  education: [],
  experience: [],
  projects: [],
}

// Sample resumes for the home screen
const sampleResumes = [
  { id: '1', name: 'Software Engineer Resume', progress: 75, lastEdited: '2 days ago' },
  { id: '2', name: 'Product Manager Resume', progress: 50, lastEdited: '1 week ago' },
  { id: '3', name: 'IT Help Desk', progress: 90, lastEdited: '3 month ago' },
]

export function ResumeBuilder() {
  const previewRef = useRef<HTMLDivElement>(null)
  const { downloadPdf, isGenerating } = usePdfDownload()
  const [currentView, setCurrentView] = useState<ViewType>('home')
  const [formStep, setFormStep] = useState(0)
  
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>(
    "resume-data",
    defaultResumeData
  )
  const [template, setTemplate] = useLocalStorage<TemplateType>(
    "resume-template",
    "modern"
  )
  const [themeColor, setThemeColor] = useLocalStorage<ThemeColor>(
    "resume-color",
    "blue"
  )
  const [appTheme, setAppTheme] = useLocalStorage<"light" | "dark">(
    "app-theme",
    "light"
  )

  useEffect(() => {
    if (appTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [appTheme])

  const handleDownload = useCallback(async (format: 'pdf' | 'png' | 'jpg') => {
    if (previewRef.current) {
      const filename = resumeData.personalInfo.fullName
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume`
        : "Resume"
      
      if (format === 'pdf') {
        await downloadPdf(previewRef.current, filename)
      } else {
        // For image formats, use html2canvas
        const html2canvas = (await import('html2canvas')).default
        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        })
        const link = document.createElement('a')
        link.download = `${filename}.${format}`
        link.href = canvas.toDataURL(`image/${format}`, 1.0)
        link.click()
      }
    }
  }, [resumeData.personalInfo.fullName, downloadPdf])

  const toggleTheme = () => {
    setAppTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const calculateProgress = useCallback(() => {
    let filled = 0
    let total = 7
    if (resumeData.personalInfo.fullName) filled++
    if (resumeData.personalInfo.email) filled++
    if (resumeData.personalInfo.phone) filled++
    if (resumeData.personalInfo.summary) filled++
    if (resumeData.skills.length > 0) filled++
    if (resumeData.education.length > 0) filled++
    if (resumeData.experience.length > 0) filled++
    return Math.round((filled / total) * 100)
  }, [resumeData])

  const formSteps = ['personal', 'skills', 'education', 'experience', 'projects']
  
  const handleNextStep = () => {
    if (formStep < formSteps.length - 1) {
      setFormStep(formStep + 1)
    } else {
      setCurrentView('preview')
    }
  }

  const handlePrevStep = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1)
    } else {
      setCurrentView('home')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Home View */}
      {currentView === 'home' && (
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Resume Builder</span>
            </div>
            <ThemeToggle theme={appTheme} onToggle={toggleTheme} />
          </header>

          {/* Main Content */}
          <main className="flex-1 px-6 pb-24">
            {/* Welcome Section */}
            <div className="mt-8 mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back!
              </h1>
              <p className="text-muted-foreground">
                Create a professional resume in minutes with our easy-to-use builder.
              </p>
            </div>

            {/* Start New Button */}
            <Button 
              onClick={() => {
                setResumeData(defaultResumeData)
                setFormStep(0)
                setCurrentView('form')
              }}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/25 mb-8"
            >
              Start New Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* My Resumes */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">My Resumes</h2>
              <div className="space-y-4">
                {/* Current Resume */}
                {resumeData.personalInfo.fullName && (
                  <button
                    onClick={() => {
                      setFormStep(0)
                      setCurrentView('form')
                    }}
                    className="w-full bg-card rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition-shadow text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                        {resumeData.personalInfo.photo ? (
                          <img 
                            src={resumeData.personalInfo.photo} 
                            alt="Resume thumbnail" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileText className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Last edited: just now</p>
                        <h3 className="font-semibold text-foreground">
                          {resumeData.personalInfo.fullName || 'Untitled'} Resume
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all"
                              style={{ width: `${calculateProgress()}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-primary">{calculateProgress()}%</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )}

                {/* Sample Resumes */}
                {sampleResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="w-full bg-card/50 rounded-xl p-4 border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Last edited: {resume.lastEdited}</p>
                        <h3 className="font-semibold text-muted-foreground">{resume.name}</h3>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-slate-300 dark:bg-slate-600 rounded-full"
                              style={{ width: `${resume.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{resume.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3">
            <div className="flex items-center justify-around max-w-md mx-auto">
              <button className="flex flex-col items-center gap-1 text-primary">
                <Home className="h-5 w-5" />
                <span className="text-xs font-medium">Home</span>
              </button>
              <button 
                onClick={() => setCurrentView('form')}
                className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LayoutTemplate className="h-5 w-5" />
                <span className="text-xs">Templates</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="h-5 w-5" />
                <span className="text-xs">Settings</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Form View */}
      {currentView === 'form' && (
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="px-4 py-4 flex items-center justify-between bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
            <button 
              onClick={handlePrevStep}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <div className="text-center">
              <h1 className="font-semibold text-foreground">
                {formStep === 0 && 'Personal Information'}
                {formStep === 1 && 'Skills'}
                {formStep === 2 && 'Education'}
                {formStep === 3 && 'Experience'}
                {formStep === 4 && 'Projects'}
              </h1>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-teal-500 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Autosaved
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  {Math.round(((formStep + 1) / formSteps.length) * 100)}%
                </span>
              </div>
            </div>
            <button 
              onClick={() => setCurrentView('preview')}
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Preview
            </button>
          </header>

          {/* Progress Bar */}
          <div className="h-1 bg-muted">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${((formStep + 1) / formSteps.length) * 100}%` }}
            />
          </div>

          {/* Form Content */}
          <main className="flex-1 p-4 pb-32">
            <ResumeForm 
              data={resumeData} 
              onChange={setResumeData}
              currentStep={formSteps[formStep]}
            />
          </main>

          {/* Bottom Action */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
            <Button 
              onClick={handleNextStep}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
            >
              {formStep < formSteps.length - 1 ? 'NEXT STEP' : 'VIEW PREVIEW'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Preview View */}
      {currentView === 'preview' && (
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="px-4 py-4 flex items-center justify-between bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
            <button 
              onClick={() => setCurrentView('form')}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">Resume Preview</h1>
            <ThemeToggle theme={appTheme} onToggle={toggleTheme} />
          </header>

          {/* Preview Content */}
          <main className="flex-1 p-4 pb-80 lg:pb-48">
            <div className="max-w-2xl mx-auto">
              {/* Preview Card */}
              <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
                <div className="overflow-auto max-h-[60vh]">
                  <div className="transform scale-[0.5] origin-top">
                    <ResumePreview 
                      ref={previewRef} 
                      data={resumeData} 
                      template={template}
                      themeColor={themeColor}
                    />
                  </div>
                </div>
              </div>

              {/* Info Text */}
              <div className="mt-6 mb-6">
                <h2 className="font-semibold text-foreground mb-1">Resume Preview</h2>
                <p className="text-sm text-muted-foreground">
                  Review your resume before downloading or sharing. Ensure all sections are complete and accurate.
                </p>
              </div>

              {/* Template Selector */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Choose Template</h3>
                <div className="flex gap-3">
                  {(['classic', 'modern', 'minimal'] as TemplateType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemplate(t)}
                      className={cn(
                        "flex-1 p-3 rounded-xl border-2 transition-all text-sm font-medium capitalize",
                        template === t 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border bg-card text-muted-foreground hover:border-primary/50"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Theme */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Customize Theme</h3>
                <div className="flex gap-3 flex-wrap">
                  {(Object.keys(themeColors) as ThemeColor[]).map((color) => (
                    <button
                      key={color}
                      onClick={() => setThemeColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full transition-all flex items-center justify-center",
                        themeColor === color ? "ring-2 ring-offset-2 ring-foreground" : ""
                      )}
                      style={{ backgroundColor: themeColors[color].primary }}
                    >
                      {themeColor === color && (
                        <Check className="h-5 w-5 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Download Options */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Download Options</h3>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDownload('pdf')}
                    disabled={isGenerating}
                    className="flex flex-col items-center gap-1 h-auto py-3 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-950/50"
                  >
                    {isGenerating ? (
                      <Spinner className="h-5 w-5" />
                    ) : (
                      <Download className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-xs font-medium text-red-600">PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload('png')}
                    className="flex flex-col items-center gap-1 h-auto py-3 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/50"
                  >
                    <FileImage className="h-5 w-5 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">PNG</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload('jpg')}
                    className="flex flex-col items-center gap-1 h-auto py-3 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-950/50"
                  >
                    <FileIcon className="h-5 w-5 text-amber-600" />
                    <span className="text-xs font-medium text-amber-600">JPG</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-1 h-auto py-3 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-950/50"
                  >
                    <FileText className="h-5 w-5 text-green-600" />
                    <span className="text-xs font-medium text-green-600">SVG</span>
                  </Button>
                </div>
              </div>

              {/* Share Button */}
              <Button
                variant="outline"
                className="w-full h-12 text-base"
              >
                <Share2 className="mr-2 h-4 w-4" />
                SHARE
              </Button>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
