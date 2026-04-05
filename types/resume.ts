export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link: string
}

export interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
    summary: string
    photo?: string
  }
  skills: string[]
  education: Education[]
  experience: Experience[]
  projects: Project[]
}

export type TemplateType = 'classic' | 'modern' | 'minimal'

export type ThemeColor = 'blue' | 'red' | 'teal' | 'amber' | 'purple' | 'green'

export const themeColors: Record<ThemeColor, { primary: string; secondary: string; name: string }> = {
  blue: { primary: '#3B82F6', secondary: '#DBEAFE', name: 'Blue' },
  red: { primary: '#EF4444', secondary: '#FEE2E2', name: 'Red' },
  teal: { primary: '#14B8A6', secondary: '#CCFBF1', name: 'Teal' },
  amber: { primary: '#F59E0B', secondary: '#FEF3C7', name: 'Amber' },
  purple: { primary: '#8B5CF6', secondary: '#EDE9FE', name: 'Purple' },
  green: { primary: '#22C55E', secondary: '#DCFCE7', name: 'Green' },
}
