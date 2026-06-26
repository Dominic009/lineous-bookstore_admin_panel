export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20">
        B
      </div>

      <div>
        <h2 className="font-semibold text-sm tracking-tight text-sidebar-foreground">
          Bookstore CMS
        </h2>
        <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
      </div>
    </div>
  );
}
