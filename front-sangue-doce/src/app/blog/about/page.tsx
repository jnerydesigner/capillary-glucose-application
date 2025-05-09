"use client";

import { fetchAbout } from "@/fetch";
import { AboutType } from "@/types/about";
import { useEffect, useState } from "react";

export default function About() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [about, setAbout] = useState<AboutType | null>(null);
  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const data = await fetchAbout<AboutType>();
        setAbout(data);
      } catch {
        setError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutPage();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <section className="p-4">
      <h1 className="title-general my-2">{about?.data.about}</h1>
      <h2>Teste de Deploy</h2>
      <p className="paragraph-general my-2 leading-[32px]">
        {about?.data.content}
      </p>
    </section>
  );
}
