"use client"

import { forwardRef } from "react"
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react"
import type { ResumeData, TemplateType, ThemeColor } from "@/types/resume"
import { themeColors } from "@/types/resume"

interface ResumePreviewProps {
  data: ResumeData
  template: TemplateType
  themeColor: ThemeColor
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  function ResumePreview({ data, template, themeColor }, ref) {
    const colors = themeColors[themeColor]
    
    const templates = {
      classic: <ClassicTemplate data={data} colors={colors} />,
      modern: <ModernTemplate data={data} colors={colors} />,
      minimal: <MinimalTemplate data={data} colors={colors} />,
    }

    return (
      <div
        ref={ref}
        className="bg-white text-gray-900 w-full max-w-[210mm] mx-auto shadow-lg"
        style={{ minHeight: "297mm" }}
      >
        {templates[template]}
      </div>
    )
  }
)

interface TemplateProps {
  data: ResumeData
  colors: { primary: string; secondary: string; name: string }
}

function ClassicTemplate({ data, colors }: TemplateProps) {
  return (
    <div className="p-8" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Header */}
      <header className="text-center pb-6 mb-6" style={{ borderBottom: `3px solid ${colors.primary}` }}>
        <h1 className="text-3xl font-bold mb-3" style={{ color: colors.primary }}>
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" style={{ color: colors.primary }} />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" style={{ color: colors.primary }} />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" style={{ color: colors.primary }} />
              {data.personalInfo.location}
            </span>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
          {data.personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3.5 w-3.5" style={{ color: colors.primary }} />
              {data.personalInfo.linkedin}
            </span>
          )}
          {data.personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" style={{ color: colors.primary }} />
              {data.personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Profile/Summary */}
      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: colors.primary }}>
            Profile
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ color: colors.primary }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{exp.position || "Position"}</h3>
                    <p className="text-sm font-medium" style={{ color: colors.primary }}>
                      {exp.company || "Company"}{exp.location && ` | ${exp.location}`}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ color: colors.primary }}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{edu.institution || "Institution"}</h3>
                  <p className="text-sm text-gray-600">
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wide mb-2" style={{ color: colors.primary }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: colors.secondary, color: colors.primary }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ color: colors.primary }}>
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800">{proj.name || "Project Name"}</h3>
                  {proj.link && (
                    <a href={proj.link} style={{ color: colors.primary }}>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-sm text-gray-700">{proj.description}</p>
                )}
                {proj.technologies && (
                  <p className="text-xs mt-1" style={{ color: colors.primary }}>
                    {proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function ModernTemplate({ data, colors }: TemplateProps) {
  return (
    <div className="flex" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      {/* Sidebar */}
      <div className="w-1/3 p-6 min-h-[297mm]" style={{ backgroundColor: colors.primary }}>
        <div className="space-y-6 text-white">
          {/* Photo & Name */}
          <div className="text-center">
            {data.personalInfo.photo ? (
              <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white/30">
                <img 
                  src={data.personalInfo.photo} 
                  alt={data.personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {data.personalInfo.fullName?.charAt(0) || "?"}
                </span>
              </div>
            )}
            <h1 className="text-xl font-bold">
              {data.personalInfo.fullName || "Your Name"}
            </h1>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider opacity-80 border-b border-white/30 pb-1">
              Contact
            </h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <div className="flex items-center gap-2 break-all">
                  <Mail className="h-4 w-4 flex-shrink-0 opacity-80" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0 opacity-80" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0 opacity-80" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-2 break-all">
                  <Linkedin className="h-4 w-4 flex-shrink-0 opacity-80" />
                  <span>{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2 break-all">
                  <Globe className="h-4 w-4 flex-shrink-0 opacity-80" />
                  <span>{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-80 border-b border-white/30 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/20 text-white text-xs px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-80 border-b border-white/30 pb-1">
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <h3 className="font-semibold">{edu.institution || "Institution"}</h3>
                    <p className="opacity-80 text-xs">
                      {edu.degree}{edu.field && ` in ${edu.field}`}
                    </p>
                    <p className="text-xs opacity-60">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider opacity-80 border-b border-white/30 pb-1">
              Languages
            </h2>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>English</span>
                <span className="opacity-60">Fluent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6 space-y-5">
        {/* Profile */}
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.primary }}>
              Profile
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4" style={{ borderLeft: `2px solid ${colors.secondary}` }}>
                  <div 
                    className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <div>
                      <h3 className="font-bold text-gray-800">{exp.position || "Position"}</h3>
                      <p className="text-sm font-medium" style={{ color: colors.primary }}>
                        {exp.company || "Company"}
                      </p>
                    </div>
                    <span 
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: colors.secondary, color: colors.primary }}
                    >
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-xs text-gray-500">{exp.location}</p>
                  )}
                  {exp.description && (
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div 
                  key={proj.id} 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">{proj.name || "Project Name"}</h3>
                    {proj.link && (
                      <a href={proj.link} style={{ color: colors.primary }}>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                  )}
                  {proj.technologies && (
                    <p className="text-xs mt-1 font-medium" style={{ color: colors.primary }}>
                      {proj.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reference */}
        <section className="mt-auto pt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: colors.primary }}>
            Reference
          </h2>
          <p className="text-sm text-gray-500 italic">Available upon request</p>
        </section>
      </div>
    </div>
  )
}

function MinimalTemplate({ data, colors }: TemplateProps) {
  return (
    <div className="p-10" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-light text-gray-900 mb-1">
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg font-medium" style={{ color: colors.primary }}>
              {data.experience[0]?.position || "Professional Title"}
            </p>
          </div>
          {data.personalInfo.photo && (
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <img 
                src={data.personalInfo.photo} 
                alt={data.personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
          {data.personalInfo.website && (
            <span>{data.personalInfo.website}</span>
          )}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {data.personalInfo.summary && (
            <section>
              <p className="text-sm text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-widest mb-4 pb-2"
                style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primary }}
              >
                Experience
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-gray-900">{exp.position || "Position"}</h3>
                      <span className="text-xs text-gray-500">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: colors.primary }}>
                      {exp.company || "Company"}{exp.location && ` · ${exp.location}`}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-widest mb-4 pb-2"
                style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primary }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{proj.name || "Project Name"}</h3>
                      {proj.link && (
                        <a href={proj.link} className="text-gray-400 hover:text-gray-600">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-sm text-gray-600">{proj.description}</p>
                    )}
                    {proj.technologies && (
                      <p className="text-xs mt-1" style={{ color: colors.primary }}>
                        {proj.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-widest mb-3 pb-2"
                style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primary }}
              >
                Skills
              </h2>
              <div className="space-y-1.5">
                {data.skills.map((skill) => (
                  <div 
                    key={skill}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    />
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 
                className="text-xs font-bold uppercase tracking-widest mb-3 pb-2"
                style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primary }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-gray-900 text-sm">{edu.institution || "Institution"}</h3>
                    <p className="text-xs text-gray-600">
                      {edu.degree}{edu.field && ` in ${edu.field}`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Social Links */}
          <section>
            <h2 
              className="text-xs font-bold uppercase tracking-widest mb-3 pb-2"
              style={{ borderBottom: `2px solid ${colors.primary}`, color: colors.primary }}
            >
              Links
            </h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Linkedin className="h-4 w-4" style={{ color: colors.primary }} />
                  <span className="truncate">{data.personalInfo.linkedin}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="h-4 w-4" style={{ color: colors.primary }} />
                  <span className="truncate">{data.personalInfo.website}</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
