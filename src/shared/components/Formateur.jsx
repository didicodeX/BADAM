import React from "react";
import { formatDate } from "../utils/formatDate";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { getInitials } from "../utils/getInitials";

export default function Formateur({ name, joinedDate, bio, avatar }) {
  return (
    <div className="flex flex-col items-start md:flex-row gap-6 md:items-center max-w-[800px]">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-32 h-48 object-cover rounded-full"
        />
      ) : (
        <span className="text-cta-700 bg-background-100 w-32 h-48 flex items-center justify-center rounded-full text-5xl">
          {getInitials(name)}
        </span>
      )}
      <div>
        <h2 className="text-lg font-semibold text-text-900">
          {capitalizeFirstLetter(name)}
        </h2>
        <small className=" text-text-500">
          Membre depuis le {formatDate(joinedDate)}
        </small>
        <p className="text-text-900 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}
