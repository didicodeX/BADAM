import React from "react";

export default function Formateur({ name, joinedDate, bio, imageUrl }) {
  return (
    <div className="p-6 rounded-lg max-w-5xl">
      <div className="flex  gap-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-fit h-fit object-cover rounded-lg"
        />
        <div>
          <h2 className="text-lg font-semibold text-text-900">{name}</h2>
          <p className="text-sm text-text-500">{joinedDate}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-text-900 leading-relaxed">{bio}</p>
    </div>
  );
}