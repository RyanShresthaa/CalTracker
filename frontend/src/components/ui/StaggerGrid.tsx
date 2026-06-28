import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react';

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export default function StaggerGrid({ children, className = '', delayMs = 60 }: StaggerGridProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        const el = child as ReactElement<{ className?: string; style?: React.CSSProperties }>;
        return cloneElement(el, {
          className: `${el.props.className ?? ''} stagger-item`.trim(),
          style: { ...el.props.style, animationDelay: `${i * delayMs}ms` },
        });
      })}
    </div>
  );
}
