import clsx from 'clsx';

export default function Content({ children, public: isPublic = false }) {
  return (
    <div className={clsx(
      'padd-x flex flex-col gap-6 md:gap-10',
      { 'padd-y': !isPublic }
    )}>
      {children}
    </div>
  );
}
