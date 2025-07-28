import type { CVData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin, ExternalLink, Briefcase, GraduationCap, Lightbulb, Wrench, User } from 'lucide-react';
import Image from 'next/image';

export default function ClassicTemplate({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, projects, skills } = cvData;

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="text-sm">{line.startsWith('- ') ? `\u2022 ${line.substring(2)}` : line}</p>
    ));
  };
  
  return (
    <div className="bg-white text-gray-800 font-sans" style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}>
        <div className="flex">
            {/* Left Column */}
            <aside className="w-1/3 bg-gray-100 p-8 space-y-8">
                {personal.photo ? (
                     <Image src={personal.photo} alt={personal.name} width={150} height={150} className="rounded-full mx-auto" data-ai-hint="profile picture"/>
                ) : (
                    <div className="w-[150px] h-[150px] bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-500" />
                    </div>
                )}
               
                <section>
                    <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">CONTACT</h2>
                    <div className="space-y-3 text-sm">
                        {personal.email && <div className="flex items-start gap-3"><Mail size={16} className="mt-1 shrink-0" /><a href={`mailto:${personal.email}`} className="break-all hover:text-primary">{personal.email}</a></div>}
                        {personal.phone && <div className="flex items-center gap-3"><Phone size={16} className="shrink-0" /><span>{personal.phone}</span></div>}
                        {personal.website && <div className="flex items-start gap-3"><Globe size={16} className="mt-1 shrink-0" /><a href={`https://${personal.website}`} target="_blank" rel="noopener noreferrer" className="break-all hover:text-primary">{personal.website}</a></div>}
                        {personal.location && <div className="flex items-start gap-3"><MapPin size={16} className="mt-1 shrink-0" /><span>{personal.location}</span></div>}
                    </div>
                </section>
                
                {skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">SKILLS</h2>
                        <ul className="space-y-2 text-sm">
                            {skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </aside>

            {/* Right Column */}
            <main className="w-2/3 p-8">
                <header className="mb-8">
                    <h1 className="text-5xl font-extrabold text-gray-900">{personal.name || 'Your Name'}</h1>
                </header>

                {personal.summary && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold uppercase tracking-wider text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Summary</h2>
                        <p className="text-sm">{personal.summary}</p>
                    </section>
                )}

                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={exp.id} className={index < experience.length - 1 ? "mb-6" : ""}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-bold text-gray-800">{exp.role || 'Role'}</h3>
                                <span className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <p className="text-md font-semibold text-gray-700">{exp.company || 'Company'}</p>
                            <div className="mt-2 text-gray-600 space-y-1">{renderDescription(exp.description)}</div>
                        </div>
                    ))}
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase tracking-wider text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Education</h2>
                    {education.map((edu, index) => (
                        <div key={edu.id} className={index < education.length - 1 ? "mb-6" : ""}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-bold text-gray-800">{edu.institution || 'Institution'}</h3>
                                <span className="text-xs font-medium text-gray-500">{edu.startDate} - {edu.endDate}</span>
                            </div>
                            <p className="text-md italic text-gray-700">{edu.degree || 'Degree'}</p>
                            {edu.details && <p className="text-sm text-gray-600 mt-1">{edu.details}</p>}
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="text-xl font-bold uppercase tracking-wider text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Projects</h2>
                    {projects.map((proj, index) => (
                        <div key={proj.id} className={index < projects.length - 1 ? "mb-6" : ""}>
                             <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-bold text-gray-800">{proj.name || 'Project Name'}</h3>
                                <span className="text-xs font-medium text-gray-500">{proj.date}</span>
                            </div>
                            {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1.5 mb-1"><ExternalLink size={12}/>{proj.url}</a>}
                            <p className="text-sm text-gray-600">{proj.description}</p>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    </div>
  );
}
