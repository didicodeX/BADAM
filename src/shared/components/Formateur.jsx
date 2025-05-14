import React from "react";
import { formatDate } from "../utils/formatDate";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { getInitials } from "../utils/getInitials";

export default function Formateur({ name = "", joinedDate, bio, phone, avatar }) {
  return (
    <div className="flex flex-col items-start md:flex-row gap-6 md:items-center max-w-[800px]">
      {avatar ? (
        <img
          src={avatar}
          alt={name || "Photo du formateur"}
          className="w-32 h-48 object-cover rounded-full"
        />
      ) : (
        <span className="text-cta-700 bg-background-100 w-32 h-48 px-12 flex items-center justify-center rounded-full text-5xl">
          {getInitials(name || "?" )}
        </span>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-text-900">
            {capitalizeFirstLetter(name || "Inconnu")}
          </h2>

          {joinedDate && (
            <small className="text-text-500">
              Membre depuis le {formatDate(joinedDate)}
            </small>
          )}

          {phone && (
            <small>
              <a
                href={`tel:${phone.replace(/[^0-9]/g, "")}`}
                className="text-cta-500 hover:underline"
              >
                {phone}
              </a>
            </small>
          )}
        </div>

        {bio && (
          <p className="text-text-900 leading-relaxed">{bio}</p>
        )}
      </div>
    </div>
  );
}
