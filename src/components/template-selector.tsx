'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TemplateSelectorProps = {
    onValueChange: (value: string) => void;
    value: string;
}

export default function TemplateSelector({ onValueChange, value }: TemplateSelectorProps) {
    return (
        <div className="mb-4 flex justify-center">
            <Tabs value={value} onValueChange={onValueChange} className="w-auto">
                <TabsList className="bg-primary/10">
                    <TabsTrigger value="modern">Modern</TabsTrigger>
                    <TabsTrigger value="classic">Classic</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
}
