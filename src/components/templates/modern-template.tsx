import type { CVData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin, ExternalLink, Briefcase, GraduationCap, Lightbulb, Wrench, User } from 'lucide-react';
import Image from 'next/image';

export default function ModernTemplate({ cvData }: { cvData: CVData }) {
  const { personal, experience, education, projects, skills } = cvData;

  const renderDescription = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="text-sm text-gray-700">{line}</p>
    ));
  };

  return (
    <div className="p-8 font-sans bg-white text-gray-800" style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}>
      <header className="flex items-center justify-between mb-8 gap-6">
        <div className="flex-grow">
          <h1 className="text-4xl font-bold text-gray-900">{personal.name || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
            {personal.email && <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail size={14} />{personal.email}</a>}
            {personal.phone && <span className="flex items-center gap-1.5"><Phone size={14} />{personal.phone}</span>}
            {personal.website && <a href={`https://${personal.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Globe size={14} />{personal.website}</a>}
            {personal.location && <span className="flex items-center gap-1.5"><MapPin size={14} />{personal.location}</span>}
          </div>
        </div>
        {personal.photo ? (
          <Image src={personal.photo} alt={personal.name} width={100} height={100} className="rounded-full" data-ai-hint="profile picture" />
        ) : (
          <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-500" />
          </div>
        )}
      </header>
      
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b-2 border-gray-200 pb-1 mb-3 text-gray-800 flex items-center gap-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700">{personal.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <section className="mb-6">
            <h2 className="text-lg font-semibold border-b-2 border-gray-200 pb-1 mb-3 text-gray-800 flex items-center gap-2">
              <Briefcase size={18} /> Work Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={exp.id} className={index < experience.length - 1 ? "mb-4" : ""}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-gray-900">{exp.role || 'Role'}</h3>
                  <span className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm font-semibold italic text-gray-700">{exp.company || 'Company'}</p>
                <div className="mt-1 space-y-1">{renderDescription(exp.description)}</div>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold border-b-2 border-gray-200 pb-1 mb-3 text-gray-800 flex items-center gap-2">
              <Lightbulb size={18} /> Projects
            </h2>
            {projects.map((proj, index) => (
              <div key={proj.id} className={index < projects.length - 1 ? "mb-4" : ""}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-gray-900">{proj.name || 'Project Name'}</h3>
                  <span className="text-xs font-medium text-gray-500">{proj.date}</span>
                </div>
                {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1.5 -mt-1 mb-1"><ExternalLink size={12}/>{proj.url}</a>}
                <p className="text-sm text-gray-700">{proj.description}</p>
              </div>
            ))}
          </section>
        </div>
        
        <div className="md:col-span-1">
          <section className="mb-6">
            <h2 className="text-lg font-semibold border-b-2 border-gray-200 pb-1 mb-3 text-gray-800 flex items-center gap-2">
              <GraduationCap size={18} /> Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu.id} className={index < education.length - 1 ? "mb-4" : ""}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-bold text-gray-900">{edu.institution || 'Institution'}</h3>
                  <span className="text-xs font-medium text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-sm italic text-gray-700">{edu.degree || 'Degree'}</p>
                {edu.details && <p className="text-sm text-gray-600 mt-1">{edu.details}</p>}
              </div>
            ))}
          </section>

          {skills.length > 0 && (
            <section>
                <h2 className="text-lg font-semibold border-b-2 border-gray-200 pb-1 mb-3 text-gray-800 flex items-center gap-2">
                    <Wrench size={18} /> Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
