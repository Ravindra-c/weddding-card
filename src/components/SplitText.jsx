import { motion } from 'framer-motion';

/**
 * Word-by-word staggered reveal. Splits on spaces only (never inside a word),
 * so Telugu conjuncts and ligatures always render correctly.
 */
export default function SplitText({ text, className = '', delay = 0, stagger = 0.09, as = 'span', inView = true, wordClassName = '' }) {
  const words = String(text).split(' ');
  const Tag = motion[as] || motion.span;
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, amount: 0.6 } } : { animate: 'show' };
  return (
    <Tag
      className={className}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className={`inline-block ${wordClassName}`}
          variants={{ hidden: { opacity: 0, y: 22, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  );
}
