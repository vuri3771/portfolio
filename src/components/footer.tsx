export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <p>&copy; {new Date().getFullYear()} 김부희. All rights reserved.</p>
        <p>Built with Next.js · Tailwind CSS · Framer Motion</p>
      </div>
    </footer>
  );
}
