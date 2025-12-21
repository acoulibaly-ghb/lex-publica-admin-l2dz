
import React, { useState, useEffect } from 'react';
import { MessageSquare, Mic, GraduationCap, Lock, Unlock, Moon, Sun } from 'lucide-react';
import { TextChat } from './components/TextChat';
import { VoiceChat } from './components/VoiceChat';
import { CourseEditor } from './components/CourseEditor';
import { AppMode } from './types';
import { DEFAULT_COURSE_CONTENT, DEFAULT_VOICE_SUMMARY, SYSTEM_INSTRUCTION, VOICE_SYSTEM_INSTRUCTION, DEFAULT_THEME_COLOR } from './constants';

const themeStyles: Record<string, { bg: string, text: string }> = {
  blue: { bg: 'bg-blue-600', text: 'text-blue-600' },
  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600' },
  indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600' },
  rose: { bg: 'bg-[#ad5c51]', text: 'text-[#ad5c51]' }, // Rose Brique Toulouse
  amber: { bg: 'bg-amber-600', text: 'text-amber-600' },
};

const App = () => {
  const [activeMode, setActiveMode] = useState<AppMode>(AppMode.TEXT);
  const [courseContent, setCourseContent] = useState<string>(DEFAULT_COURSE_CONTENT);
  const [voiceSummary, setVoiceSummary] = useState<string>(DEFAULT_VOICE_SUMMARY);
  const [systemInstruction, setSystemInstruction] = useState<string>(SYSTEM_INSTRUCTION);
  const [voiceInstruction, setVoiceInstruction] = useState<string>(VOICE_SYSTEM_INSTRUCTION);
  const [themeColor, setThemeColor] = useState<string>(DEFAULT_THEME_COLOR);
  
  const apiKey = process.env.API_KEY || '';
  const teacherPassword = process.env.TEACHER_PASSWORD || 'admin';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  }, [isDarkMode]);

  useEffect(() => {
    const storedContent = localStorage.getItem('course_content');
    const storedVoice = localStorage.getItem('voice_summary');
    const storedInstruction = localStorage.getItem('system_instruction');
    const storedVoiceInst = localStorage.getItem('voice_instruction');
    const storedTheme = localStorage.getItem('theme_color');
    
    if (storedContent) setCourseContent(storedContent);
    if (storedVoice) setVoiceSummary(storedVoice);
    if (storedInstruction) setSystemInstruction(storedInstruction);
    if (storedVoiceInst) setVoiceInstruction(storedVoiceInst);
    if (storedTheme) setThemeColor(storedTheme);
  }, []);

  const handleContentSave = (content: string) => { setCourseContent(content); localStorage.setItem('course_content', content); };
  const handleVoiceSave = (summary: string) => { setVoiceSummary(summary); localStorage.setItem('voice_summary', summary); };
  const handleInstructionSave = (instruction: string) => { setSystemInstruction(instruction); localStorage.setItem('system_instruction', instruction); };
  const handleVoiceInstSave = (instruction: string) => { setVoiceInstruction(instruction); localStorage.setItem('voice_instruction', instruction); };
  const handleThemeSave = (color: string) => { setThemeColor(color); localStorage.setItem('theme_color', color); };

  const activeTheme = themeStyles[themeColor] || themeStyles.blue;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === teacherPassword) { setIsAuthenticated(true); setPasswordInput(''); }
    else { alert('Mot de passe incorrect'); }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <aside className="w-20 md:w-64 bg-slate-900 dark:bg-black text-slate-300 flex flex-col border-r border-slate-800">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className={`w-10 h-10 ${activeTheme.bg} rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg`}>
                <GraduationCap size={24} />
            </div>
            <span className="font-montserrat font-bold text-xl text-white hidden md:block tracking-wide">Droit Public</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <button onClick={() => setActiveMode(AppMode.TEXT)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMode === AppMode.TEXT ? `${activeTheme.bg} text-white shadow-md` : 'hover:bg-slate-800'}`}>
                <MessageSquare size={20} /><span className="hidden md:block font-medium">Discussion</span>
            </button>
            <button onClick={() => setActiveMode(AppMode.VOICE)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMode === AppMode.VOICE ? `${activeTheme.bg} text-white shadow-md` : 'hover:bg-slate-800'}`}>
                <Mic size={20} /><span className="hidden md:block font-medium">Mode vocal</span>
            </button>
            <button onClick={() => setActiveMode(AppMode.SETTINGS)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMode === AppMode.SETTINGS ? `${activeTheme.bg} text-white shadow-md` : 'hover:bg-slate-800'}`}>
                {isAuthenticated ? <Unlock size={20} /> : <Lock size={20} />}<span className="hidden md:block font-medium">Configuration</span>
            </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}<span className="hidden md:block text-sm">{isDarkMode ? 'Mode clair' : 'Mode sombre'}</span>
            </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0 z-10">
  {/* Gauche : Titre */}
  <div className="min-w-0">
    <h1 className="font-montserrat text-xl md:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white truncate">
      {activeMode === AppMode.TEXT && (
        <>
          Lex publica IA{' '}
          <span className="font-normal opacity-60">by A. Coulibaly</span>
        </>
      )}
      {activeMode === AppMode.VOICE && 'Entretien Virtuel'}
      {activeMode === AppMode.SETTINGS && 'Administration'}
    </h1>

    {/* Optionnel : sous-ligne informative, très discrète (tu peux supprimer si tu n’en veux pas) */}
    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 truncate">
      Assistant pédagogique — Droit administratif général
    </p>
  </div>

  {/* Droite : Statut */}
  <div className="ml-6 flex items-center gap-2 shrink-0">
    <span className={`h-2 w-2 rounded-full ${activeTheme.bg}`} aria-hidden="true" />
    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
      Système prêt
    </span>
  </div>
</header>

        <div className="flex-1 p-4 md:p-6 overflow-hidden">
            {activeMode === AppMode.TEXT && (
                <TextChat courseContent={courseContent} systemInstruction={systemInstruction} apiKey={apiKey} themeColor={themeColor} />
            )}
            {activeMode === AppMode.VOICE && (
                <VoiceChat courseContent={voiceSummary} systemInstruction={voiceInstruction} apiKey={apiKey} themeColor={themeColor} />
            )}
            {activeMode === AppMode.SETTINGS && (
                isAuthenticated ? (
                    <CourseEditor 
                        initialContent={courseContent} 
                        onSaveContent={handleContentSave} 
                        initialVoiceSummary={voiceSummary}
                        onSaveVoiceSummary={handleVoiceSave}
                        initialInstruction={systemInstruction} 
                        onSaveInstruction={handleInstructionSave} 
                        initialVoiceInstruction={voiceInstruction}
                        onSaveVoiceInstruction={handleVoiceInstSave}
                        initialThemeColor={themeColor} 
                        onSaveThemeColor={handleThemeSave} 
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <form onSubmit={handleLogin} className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 space-y-6">
                            <h2 className="text-xl font-serif font-bold text-center text-slate-800 dark:text-white">Accès Professeur</h2>
                            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Mot de passe" autoFocus />
                            <button type="submit" className={`w-full py-3 ${activeTheme.bg} text-white font-medium rounded-xl shadow-lg active:scale-95 transition-transform`}>Accéder</button>
                        </form>
                    </div>
                )
            )}
        </div>
      </main>
    </div>
  );
};

export default App;


