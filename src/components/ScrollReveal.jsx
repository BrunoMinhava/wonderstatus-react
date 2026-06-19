import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } }
  },
  'slide-up': {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
  },
  'slide-left': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } }
  },
  'slide-right': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } }
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } }
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 16 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.9, ease: EASE } }
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.88, y: 24 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.85, ease: EASE } }
  }
};

export default function ScrollReveal({
  as: Component = 'div',
  variant = 'slide-up',
  delay = 0,
  once = true,
  amount = 0.2,
  className = '',
  children,
  ...rest
}) {
  const MotionComp = motion[Component] || motion.div;
  const resolved = variants[variant] || variants['slide-up'];
  return (
    <MotionComp
      className={className}
      variants={{
        hidden: resolved.hidden,
        visible: {
          ...resolved.visible,
          transition: { ...resolved.visible.transition, delay }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </MotionComp>
  );
}
