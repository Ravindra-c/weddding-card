import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const variants = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(12px)' }, show: { opacity: 1, filter: 'blur(0px)' } },
  rotate: { hidden: { opacity: 0, y: 30, rotate: -3 }, show: { opacity: 1, y: 0, rotate: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

/** Scroll-triggered reveal. variant: up | left | right | scale | blur | rotate | fade */
export default function Reveal({ as = 'div', variant = 'up', delay = 0, duration = 0.9, amount = 0.2, className = '', children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={variants[variant] || variants.up}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
