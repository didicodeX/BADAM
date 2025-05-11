import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Content from "@/shared/components/Content";
import Section from "@/shared/components/Section";
import FollowedSessionsPage from "./FollowedSessionsPage";
import CreatedSessionsPage from "./CreatedSessionsPage";
import FavoritesPage from "./FavoritesPage";

export default function SessionsIndexPage() {
  const location = useLocation();
  const tabFromState = location.state?.tab;

  const [isFocused, setIsFocused] = useState(false);
  const [activeTab, setActiveTab] = useState(tabFromState || "all");
  useEffect(() => {
    if (tabFromState) {
      setActiveTab(tabFromState);
    }
  }, [tabFromState])

  return (
    <Content>
      <h2 className="mb-4">Mes sessions</h2>

      {/* Tabs navigation */}
      <div className="flex gap-4 border-b mb-6">
        {[
          { key: "all", label: "Toutes" },
          { key: "followed", label: "Suivies" },
          { key: "created", label: "Créées" },
          { key: "favorites", label: "Favoris" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 font-medium border-b-2 ${
              activeTab === key
                ? "border-cta-500 text-cta-500"
                : "border-transparent text-text-500 hover:text-cta-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="py-4 flex justify-center">
        <div
          className={`flex items-center justify-between border rounded-full px-6 py-3 w-full max-w-[500px] ${
            isFocused ? "border-cta-500" : "border-text-200"
          }`}
        >
          <input
            type="search"
            placeholder="Rechercher une session..."
            className="w-full text-sm focus:outline-none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Search className="w-5 h-5" />
        </div>
      </div>

      {/* Onglets conditionnels */}
      <Section last>
        {activeTab === "all" && (
          <>
            {/* Suivies */}
            <FollowedSessionsPage />

            {/* Créées */}
            <CreatedSessionsPage />

            {/* Favoris */}
            <FavoritesPage />
          </>
        )}

        {activeTab === "followed" && <FollowedSessionsPage />}

        {activeTab === "created" && <CreatedSessionsPage />}

        {activeTab === "favorites" && <FavoritesPage />}
      </Section>
    </Content>
  );
}
