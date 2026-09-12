import useScrollReveal from '../hooks/useScrollReveal'

export default function ScrollReveal({
  as: Tag = 'div',
  className = '',
  stagger = false,
  children,
  ...props
}) {
  const ref = useScrollReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${stagger ? 'reveal-stagger' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  )
}
