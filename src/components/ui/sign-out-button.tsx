"use client";

export function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await fetch("/api/sign-out", { credentials: "include" });
    } catch {
      // 401 is expected — it clears the cached credentials
    }
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleSignOut}
      className="fixed bottom-6 left-6 z-50 text-[10px] uppercase font-mono tracking-wider text-muted-foreground hover:text-foreground transition-colors border border-border/50 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded flex items-center gap-2 group"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-red-500 transition-colors" />
      Sign Out
    </button>
  );
}
