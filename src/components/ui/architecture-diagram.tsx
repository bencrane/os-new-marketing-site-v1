import { cn } from "@/lib/utils";

interface NodeProps {
  title: string;
  description: string;
  status: "active" | "standby" | "locked";
  className?: string;
}

function ArchNode({ title, description, status, className }: NodeProps) {
  return (
    <div className={cn("flex flex-col border border-border p-4 bg-background relative group", className)}>
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-mono text-sm tracking-widest uppercase text-foreground">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {status === "active" && (
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          )}
          {status === "standby" && (
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
          )}
          {status === "locked" && (
            <div className="w-1.5 h-1.5 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          )}
          <span className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">
            {status}
          </span>
        </div>
      </div>
      <p className="font-heading text-lg leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
        {description}
      </p>
      
      {/* Corner crosshairs for technical feel */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="w-full relative py-12">
      {/* Background connecting lines */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 hidden md:block z-0" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <ArchNode 
          title="01 Ingestion" 
          description="Proprietary pipelines gathering 40+ million unstructured public records daily." 
          status="active" 
        />
        <ArchNode 
          title="02 Signal" 
          description="Behavioral detection algorithms flagging structural shifts and inflection points." 
          status="active" 
        />
        <ArchNode 
          title="03 Infrastructure" 
          description="Isolated sending nodes with automated IP warmup and algorithmic rotation." 
          status="standby" 
        />
        <ArchNode 
          title="04 Output" 
          description="Live qualification transfers and booked sequences placed directly on calendar." 
          status="locked" 
        />
      </div>
    </div>
  );
}
