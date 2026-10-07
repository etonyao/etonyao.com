import type { Metadata } from "next";
import { favorites } from "@/app/data/interests";
import { FavoritesCards } from "@/components/favorites-cards";

export const metadata: Metadata = {
  title: "Interests",
  description: "A collage of Eton Yao's favorite things: books, music, movies, games and more.",
};

export default function InterestsPage() {
  return (
    <div className="w-full px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-4">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">Interests</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">These are my favorite things in different categories!</p>
      <div className="mt-8">
        <FavoritesCards items={favorites} />
      </div>
    </div>
  );
}
