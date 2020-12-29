import clsx from 'clsx';

export default function Card({ className, children }) {
  const classNames = clsx('shadow-md p-6 m-4 rounded-lg', className);
  return <div className={classNames}>{children}</div>;
}
