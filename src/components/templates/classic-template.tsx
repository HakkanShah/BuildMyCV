import { CVData } from "@/lib/types";

export function ClassicTemplate({ data }: { data: CVData }) {
  const { personal, education, experience, projects, skills, settings } = data;
  const themeColor = settings?.themeColor || "#000000";
  const fontFamily = settings?.fontFamily || "serif";

  return (
    <div className={`p-12 font-${fontFamily} text-gray-900 max-w-[210mm] mx-auto min-h-[297mm] leading-relaxed`}>
      <header className="text-center border-b-2 pb-6 mb-8" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>{personal.name}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>• {personal.phone}</span>}
          {personal.location && <span>• {personal.location}</span>}
          {personal.website && <span>• {personal.website}</span>}
          {personal.linkedin && <span>• {personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
          {personal.github && <span>• {personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
        </div>
      </header>

      {personal.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b mb-3 pb-1" style={{ color: themeColor, borderColor: themeColor }}>Professional Summary</h2>
          <p className="text-justify text-gray-800">{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b mb-4 pb-1" style={{ color: themeColor, borderColor: themeColor }}>Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-lg">
                  <h3>{exp.company}</h3>
                  <span>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="italic font-medium mb-2" style={{ color: themeColor }}>{exp.role}</div>
                <p className="text-gray-800 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b mb-4 pb-1" style={{ color: themeColor, borderColor: themeColor }}>Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold">
                  <h3>{edu.institution}</h3>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
                <div>{edu.degree}</div>
                {edu.details && <div className="text-sm text-gray-700 mt-1">{edu.details}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b mb-4 pb-1" style={{ color: themeColor, borderColor: themeColor }}>Projects</h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold">
                  <h3>{proj.name}</h3>
                  <span className="text-sm font-normal">{proj.date}</span>
                </div>
                {proj.url && <div className="text-sm italic mb-1" style={{ color: themeColor }}>{proj.url}</div>}
                <p className="text-gray-800">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase border-b mb-3 pb-1" style={{ color: themeColor, borderColor: themeColor }}>Skills</h2>
          <p className="text-gray-800 leading-relaxed">
            {skills.join(" • ")}
          </p>
        </section>
      )}
    </div>
  );
}
