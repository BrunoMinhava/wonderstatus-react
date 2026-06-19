import { motion } from 'framer-motion';

/**
 * Tabela responsiva premium:
 *  - Em desktop (md+) mostra tabela normal
 *  - Em mobile transforma cada linha numa "card" com labels de coluna
 *
 * Props:
 *   headers: [str]           — cabeçalhos da tabela
 *   rows: [[cell, cell, ...]] — linhas (valores por coluna, mesma ordem que headers)
 *   primaryColIndex: int     — coluna destacada (default 0 — título da card em mobile)
 *   monoColIndexes: [int]    — colunas em font-mono (referências/part numbers)
 *   renderCell?: (value, colIndex, rowIndex) => node  — opção de render custom
 */
export default function ResponsiveTable({
  headers,
  rows,
  primaryColIndex = 0,
  monoColIndexes = [],
  renderCell,
  emptyMessage = 'Sem resultados.'
}) {
  if (!rows || rows.length === 0) {
    return (
      <div className="p-8 md:p-10 text-center text-ink-500 bg-white rounded-2xl border border-ink-100">
        {emptyMessage}
      </div>
    );
  }

  const renderValue = (cell, colIndex, rowIndex) => {
    if (renderCell) {
      const result = renderCell(cell, colIndex, rowIndex);
      if (result !== undefined) return result;
    }
    return cell;
  };

  return (
    <>
      {/* Desktop: tabela normal */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-ink-50 text-ink-700 sticky top-0">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.015, 0.3) }}
                className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-6 py-3 ${
                      j === primaryColIndex
                        ? 'font-semibold text-ink-900'
                        : monoColIndexes.includes(j)
                        ? 'font-mono text-brand-700'
                        : 'text-ink-700'
                    }`}
                  >
                    {renderValue(cell, j, i)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards por linha */}
      <div className="md:hidden divide-y divide-ink-100">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.3) }}
            className="p-4 bg-white"
          >
            <p className="font-display text-base font-bold text-ink-900 mb-3">
              {renderValue(row[primaryColIndex], primaryColIndex, i)}
            </p>
            <dl className="space-y-2">
              {row.map((cell, j) => {
                if (j === primaryColIndex) return null;
                const value = renderValue(cell, j, i);
                if (value === null || value === undefined || value === '') return null;
                return (
                  <div key={j} className="flex items-start justify-between gap-3 text-sm">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500 flex-shrink-0 max-w-[45%]">
                      {headers[j]}
                    </dt>
                    <dd
                      className={`text-right flex-1 ${
                        monoColIndexes.includes(j)
                          ? 'font-mono text-brand-700 text-xs'
                          : 'text-ink-700'
                      }`}
                    >
                      {value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </motion.div>
        ))}
      </div>
    </>
  );
}
