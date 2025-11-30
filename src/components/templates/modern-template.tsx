import { CVData } from "@/lib/types";
import { Mail, MapPin, Globe, Phone, ExternalLink } from "lucide-react";

export function ModernTemplate({ data }: { data: CVData }) {
  const { personal, education, experience, projects, skills, settings } = data;
  const themeColor = settings?.themeColor || "#3b82f6";
  const fontFamily = settings?.fontFamily || "sans";

  return (
    <div
      className={`flex h-full min-h-[297mm] w-full max-w-[210mm] mx-auto bg-white text-slate-800 font-${fontFamily}`}
    >
      {/* Sidebar */}
      <aside className="w-1/3 text-white p-8 flex flex-col gap-8" style={{ backgroundColor: "#1e293b" }}>
        <div className="text-center">
          {personal.photo && (
            <img
              src={personal.photo}
              alt={personal.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4"
              style={{ borderColor: themeColor }}
            />
          )}
          <h1 className="text-2xl font-bold tracking-tight mb-2">{personal.name}</h1>
          <p className="text-slate-400 text-sm leading-relaxed">{personal.summary}</p>
        </div>

        <div className="space-y-4 text-sm">
          {personal.email && (
            <div className="flex items-center gap-3 text-slate-300">
              <Mail size={16} className="shrink-0" style={{ color: themeColor }} />
              <span className="break-all">{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-3 text-slate-300">
              <Phone size={16} className="shrink-0" style={{ color: themeColor }} />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin size={16} className="shrink-0" style={{ color: themeColor }} />
              <span>{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-3 text-slate-300">
              <Globe size={16} className="shrink-0" style={{ color: themeColor }} />
              <span className="break-all">{personal.website}</span>
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 mb-4" style={{ color: themeColor }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold border-b border-slate-700 pb-2 mb-4" style={{ color: themeColor }}>Education</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-medium text-white">{edu.institution}</div>
                  <div className="text-slate-400 text-xs">{edu.degree}</div>
                  <div className="text-slate-500 text-xs mt-1">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8 space-y-8">
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 pb-2 mb-6 inline-block" style={{ borderColor: themeColor }}>Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-white" style={{ backgroundColor: themeColor }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                    <span className="text-sm font-medium px-2 py-0.5 rounded" style={{ color: themeColor, backgroundColor: `${themeColor}15` }}>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-slate-600 font-medium mb-2">{exp.company}</div>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-800 border-b-2 pb-2 mb-6 inline-block" style={{ borderColor: themeColor }}>Projects</h2>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{proj.name}</h3>
                    <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">{proj.date}</span>
                  </div>
                  {proj.url && (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:underline mb-2" style={{ color: themeColor }}>
                      <ExternalLink size={12} /> {proj.url}
                    </a>
                  )}
                  <p className="text-slate-600 text-sm leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
