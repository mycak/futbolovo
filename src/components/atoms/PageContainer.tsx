const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-full max-w-full min-h-screen box-border overflow-y-auto pb-16">
      {children}
    </div>
  );
};

export default PageContainer;
