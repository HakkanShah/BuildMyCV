import { CVData } from "@/lib/types";
import { Mail, MapPin, Globe, Phone } from "lucide-react";

export function MinimalistTemplate({ data }: { data: CVData }) {
    const { personal, education, experience, projects, skills, settings } = data;
    const themeColor = settings?.themeColor || "#000000";
    const fontFamily = settings?.fontFamily || "sans";

    return (
        <div className={`p-12 font-${fontFamily} text-gray-800 max-w-[210mm] mx-auto min-h-[297mm]`}>
            {/* Header */}
            <header className="mb-12 border-b-2 pb-8" style={{ borderColor: themeColor }}>
                <h1 className="text-5xl font-light tracking-tight mb-4 uppercase" style={{ color: themeColor }}>{personal.name}</h1>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {personal.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>{personal.email}</span>
                        </div>
                    )}
                    {personal.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>{personal.phone}</span>
                        </div>
                    )}
                    {personal.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>{personal.location}</span>
                        </div>
                    )}
                    {personal.website && (
                        <div className="flex items-center gap-2">
                            <Globe size={14} />
                            <span>{personal.website}</span>
                        </div>
                    )}
                </div>
                {personal.summary && (
                    <p className="mt-6 text-gray-700 leading-relaxed max-w-2xl">{personal.summary}</p>
                )}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="md:col-span-8 space-y-12">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b pb-2" style={{ color: themeColor, borderColor: themeColor }}>Experience</h2>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-lg font-semibold">{exp.role}</h3>
                                            <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-gray-700 font-medium mb-2">{exp.company}</div>
                                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b pb-2" style={{ color: themeColor, borderColor: themeColor }}>Projects</h2>
                            <div className="space-y-6">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-lg font-semibold">{proj.name}</h3>
                                            <span className="text-sm text-gray-500">{proj.date}</span>
                                        </div>
                                        {proj.url && (
                                            <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline mb-2 block">
                                                {proj.url}
                                            </a>
                                        )}
                                        <p className="text-sm text-gray-600 leading-relaxed">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="md:col-span-4 space-y-12">
                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b pb-2" style={{ color: themeColor, borderColor: themeColor }}>Education</h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-semibold">{edu.institution}</h3>
                                        <div className="text-sm text-gray-700 mt-1">{edu.degree}</div>
                                        <div className="text-xs text-gray-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                                        {edu.details && <p className="text-xs text-gray-600 mt-2">{edu.details}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b pb-2" style={{ color: themeColor, borderColor: themeColor }}>Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
