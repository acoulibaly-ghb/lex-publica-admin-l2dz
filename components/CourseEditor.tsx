
import React, { useState, useEffect } from 'react';
import { Save, FileText, Upload, Bot, Book, Info, Check, Loader2, Download, UploadCloud, RefreshCw, FileCode, Code, Palette } from 'lucide-react';

interface CourseEditorProps {
  initialContent: string;
  onSaveContent: (newContent: string) => void;
  initialInstruction: string;
  onSaveInstruction: (newInstruction: string) => void;
  initialThemeColor: string;
  onSaveThemeColor: (newColor: string) => void;
}

type Tab = 'content' | 'instruction' | 'appearance';

const themes = [
  { id: 'blue', name: 'Droit Administratif (Bleu)', class: 'bg-blue-600' },
  { id: 'emerald', name: 'Libertés Fondamentales (Vert)', class: 'bg-emerald-600' },
  { id: 'indigo', name: 'Droit International (Indigo)', class: 'bg-indigo-600' },
  { id: 'rose', name: 'Droit Public Toulousain (Rose Brique)', class: 'bg-[#ad5c51]' },
  { id: 'amber', name: 'Droit Fiscal (Ambre)', class: 'bg-amber-600' },
];

export const CourseEditor: React.FC<CourseEditorProps> = ({ 
  initialContent, 
  onSaveContent,
  initialInstruction,
  onSaveInstruction,
  initialThemeColor,
  onSaveThemeColor
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('content');
  
  const [content, setContent] = useState(initialContent);
  const [instruction, setInstruction] = useState(initialInstruction);
  const [themeColor, setThemeColor] = useState(initialThemeColor);
  
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [isSavingInstruction, setIsSavingInstruction] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Auto-save logic
  useEffect(() => {
    if (content === initialContent) return;
    setIsSavingContent(true);
    const timer = setTimeout(() => {
      onSaveContent(content);
      setIsSavingContent(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    if (instruction === initialInstruction) return;
    setIsSavingInstruction(true);
    const timer = setTimeout(() => {
      onSaveInstruction(instruction);
      setIsSavingInstruction(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [instruction]);

  const handleTextFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setContent(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full transition-colors pb-10">
      
      {/* Transfert de données */}
      <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-stretch gap-4 animate-in fade-in slide-in-from-top-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 self-start md:self-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                    <RefreshCw size={20} />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Sauvegarde & Transfert</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Pour dupliquer cette application vers une autre matière.</p>
                </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
                <button onClick={() => {/* logic handled by parent exports */}} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg transition-colors shadow-sm">
                    <Download size={16} /><span>Exporter</span>
                </button>
                <label className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer">
                    <UploadCloud size={16} /><span>Restaurer</span>
                    <input type="file" accept=".json" className="hidden" />
                </label>
            </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center gap-1 mb-0 border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => setActiveTab('content')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'content' ? 'bg-white dark:bg-slate-900 text-blue-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Book size={18} /><span>Savoir</span>
        </button>
        <button onClick={() => setActiveTab('instruction')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'instruction' ? 'bg-white dark:bg-slate-900 text-purple-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Bot size={18} /><span>IA</span>
        </button>
        <button onClick={() => setActiveTab('appearance')} className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-medium text-sm transition-colors relative top-[1px] ${activeTab === 'appearance' ? 'bg-white dark:bg-slate-900 text-emerald-600 border border-slate-200 border-b-white z-10' : 'text-slate-500'}`}>
          <Palette size={18} /><span>Apparence</span>
        </button>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 rounded-b-xl rounded-tr-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col p-6 transition-colors">
        
        {activeTab === 'content' && (
          <div className="flex flex-col h-full animate-in fade-in duration-200">
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                spellCheck={false}
                className="flex-1 w-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-slate-50 dark:bg-slate-950"
                placeholder="Contenu du cours..."
            />
          </div>
        )}

        {activeTab === 'instruction' && (
          <div className="flex flex-col h-full animate-in fade-in duration-200">
            <textarea 
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="flex-1 w-full h-full p-4 resize-none border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-slate-700 dark:text-slate-200 font-mono text-sm bg-slate-50 dark:bg-slate-950"
            />
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="flex flex-col h-full animate-in fade-in duration-200">
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-2">Couleur thématique de la matière</h4>
                    <p className="text-sm text-slate-500 mb-4">Choisissez une couleur pour aider les étudiants à identifier instantanément le cours concerné.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {themes.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setThemeColor(t.id);
                                    onSaveThemeColor(t.id);
                                }}
                                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${themeColor === t.id ? 'border-slate-900 dark:border-white ring-2 ring-slate-400/20 shadow-md' : 'border-transparent bg-slate-50 dark:bg-slate-800 hover:bg-slate-100'}`}
                            >
                                <div className={`w-8 h-8 rounded-lg ${t.class} shadow-inner`}></div>
                                <span className={`text-sm font-medium ${themeColor === t.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{t.name}</span>
                                {themeColor === t.id && <Check size={16} className="ml-auto text-slate-900 dark:text-white" />}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
                    <p className="text-xs text-blue-800 dark:text-blue-300">
                        <strong>Conseil :</strong> Si vous avez plusieurs copies de cette application, utilisez une couleur radicalement différente pour chacune (ex: Bleu pour Administratif, Indigo pour International).
                    </p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
