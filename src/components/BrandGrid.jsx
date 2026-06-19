import { motion } from 'framer-motion';

export default function BrandGrid({ brands, title, kicker }) {
  return (
    <div>
      {(title || kicker) && (
        <div className="mb-8">
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              {kicker}
            </p>
          )}
          {title && (
            <h3 className="mt-2 font-display text-2xl font-bold text-ink-900">{title}</h3>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand, idx) => (
          <motion.a
            key={brand.id}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: idx * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="group flex flex-col items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-ink-100 shadow-soft card-hover text-center"
          >
            <div className="h-20 w-full grid place-items-center">
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className="max-h-16 max-w-[80%] object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-ink-900 leading-tight">
                {brand.name}
              </p>
              {brand.note && (
                <p className="mt-1 text-xs text-ink-500 leading-relaxed line-clamp-2">
                  {brand.note}
                </p>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
