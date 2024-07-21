const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        h-full
        pb-12
    "
    >
      <div
        className="
        flex
        flex-col
        gap-4
        shadow-slate-300
        shadow-xl
        rounded-md
        max-w-[550px]
        w-full
        p-4
        md: p-8
        "
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
