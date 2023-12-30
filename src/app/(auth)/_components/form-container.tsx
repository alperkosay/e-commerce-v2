import React from "react";

export default function FormContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <main>
      <section className="py-12 min-h-screen">
        <div className="container">
          <div className="max-w-xs border border-muted rounded-sm mx-auto p-4 space-y-4">
            <h1 className="text-xl">{title}</h1>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
