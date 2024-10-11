const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-w-full max-w-full box-border overflow-y-auto pb-12 h-full"
      style={{ minHeight: "calc(100vh - 190px)" }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
