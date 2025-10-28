function CustomSection({
  asDiv = false,
  children,
  className = "",
}: {
  asDiv?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  const style = `w-[95%] md:w-4/5 max-w-[1440px] mx-auto ${className}`;
  if (asDiv) {
    return <div className={style}>{children}</div>;
  }

  return <section className={style}>{children}</section>;
}

export default CustomSection;
