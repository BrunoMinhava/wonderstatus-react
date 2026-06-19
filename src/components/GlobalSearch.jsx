import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { searchAll } from '../data/search-index.js';

const TYPE_ICON = {
  page:    '🗂',
  brand:   '🏷',
  section: '📂',
  product: '🔬',
  item:    '·',
};

const PAGE_COLOR = {
  'Material de Laboratório': 'bg-blue-50 text-blue-700',
  'Oceanografia':            'bg-teal-50 text-teal-700',
  'Marcas':                  'bg-purple-50 text-purple-700',
  'Páginas':                 'bg-brand-50 text-brand-700',
};

export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  // Search in real time
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const found = searchAll(trimmed, 14);
    setResults(found);
    setActiveIndex(0);
  }, [query]);

  const goTo = useCallback((result) => {
    onClose();
    const url = result.url;
    // External URLs open in new tab
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  }, [navigate, onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && results[activeIndex]) {
        goTo(results[activeIndex]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, results, activeIndex, goTo, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="search-overlay"
        className="fixed inset-0 z-50 flex flex-col items-center pt-[10vh] px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink-950/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Search panel */}
        <motion.div
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ y: -24, scale: 0.97, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -16, scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Input row */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-ink-100">
            <svg className="w-5 h-5 text-ink-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar produtos, marcas, famílias… / Search in EN or PT"
              className="flex-1 text-base text-ink-900 placeholder:text-ink-400 outline-none bg-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-ink-400 hover:text-ink-700 transition-colors p-1 rounded-full"
                aria-label="Limpar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-1 text-xs font-medium text-ink-400 bg-ink-100 rounded-lg px-2.5 py-1.5 hover:bg-ink-200 transition-colors flex-shrink-0"
            >
              Esc
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
            {query.trim().length >= 2 && results.length === 0 && (
              <div className="py-12 text-center text-ink-400 text-sm">
                Sem resultados para <span className="font-semibold text-ink-600">"{query}"</span>
              </div>
            )}

            {results.length > 0 && (
              <ul className="py-2">
                {results.map((result, i) => {
                  const isActive = i === activeIndex;
                  const pageColorClass = PAGE_COLOR[result.page] || 'bg-ink-50 text-ink-600';
                  return (
                    <li key={result.id}>
                      <button
                        type="button"
                        onClick={() => goTo(result)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`w-full flex items-start gap-3.5 px-5 py-3 text-left transition-colors ${
                          isActive ? 'bg-brand-50' : 'hover:bg-ink-50'
                        }`}
                      >
                        {/* Thumbnail / icon */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl overflow-hidden bg-ink-50 border border-ink-100 grid place-items-center text-lg">
                          {result.image ? (
                            <img
                              src={result.image}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          ) : (
                            <span>{TYPE_ICON[result.type] || '·'}</span>
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-ink-900 truncate">
                              {result.title}
                            </span>
                            {result.badge && (
                              <span className="text-[11px] font-medium text-ink-500 bg-ink-100 rounded px-1.5 py-0.5 flex-shrink-0">
                                {result.badge}
                              </span>
                            )}
                          </div>
                          {result.description && (
                            <p className="text-xs text-ink-500 mt-0.5 line-clamp-1">
                              {result.description}
                            </p>
                          )}
                        </div>

                        {/* Page badge */}
                        <span className={`flex-shrink-0 text-[11px] font-semibold rounded-full px-2.5 py-1 ${pageColorClass}`}>
                          {result.page}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Empty state hint */}
            {query.trim().length < 2 && (
              <div className="py-10 px-6 text-center space-y-3">
                <p className="text-sm text-ink-500">
                  Pesquise em Português ou Inglês — o resultado é sempre o mesmo produto.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['micropipeta', 'niskin', 'filtration', 'dispenser', 'suporte 3D', 'CTD', 'water purification'].map((hint) => (
                    <button
                      key={hint}
                      type="button"
                      onClick={() => setQuery(hint)}
                      className="text-xs font-medium bg-brand-50 text-brand-700 rounded-full px-3 py-1.5 hover:bg-brand-100 transition-colors"
                    >
                      {hint}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer hint */}
          {results.length > 0 && (
            <div className="border-t border-ink-100 px-5 py-2.5 flex items-center gap-4 text-xs text-ink-400">
              <span><kbd className="font-mono bg-ink-100 rounded px-1.5 py-0.5">↑↓</kbd> navegar</span>
              <span><kbd className="font-mono bg-ink-100 rounded px-1.5 py-0.5">Enter</kbd> abrir</span>
              <span><kbd className="font-mono bg-ink-100 rounded px-1.5 py-0.5">Esc</kbd> fechar</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
