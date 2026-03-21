"use client";

import { useState, useEffect } from "react";

export const useItemNote = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteValue, setNoteValue] = useState("");

  /**
   * ✅ ONLY itemid (no variant)
   */
  const storageKey = `${data?.itemid}`;

  /**
   * Load note when item changes
   */
  useEffect(() => {
    if (!storageKey) return;

    const savedNote = localStorage.getItem(storageKey) || "";
    setNoteValue(savedNote);
    setIsEditing(false);
  }, [storageKey]);

  /**
   * Save / Open
   */
  const handleNoteClick = () => {
    if (!storageKey) return;

    // SAVE
    if (isEditing) {
      const trimmed = noteValue.trim();

      if (trimmed) {
        localStorage.setItem(storageKey, trimmed);
      } else {
        localStorage.removeItem(storageKey);
      }

      setIsEditing(false);
      return;
    }

    // OPEN
    setIsEditing(true);
  };

  /**
   * Cancel
   */
  const handleCancelNote = () => {
    const savedNote = localStorage.getItem(storageKey) || "";
    setNoteValue(savedNote);
    setIsEditing(false);
  };

  /**
   * Remove
   */
  const handleRemoveNote = () => {
    localStorage.removeItem(storageKey);
    setNoteValue("");
    setIsEditing(false);
  };

  /**
   * Derived state
   */
  const hasNote = !!localStorage.getItem(storageKey);

  return {
    noteValue,
    setNoteValue,
    isEditing,
    hasNote,
    handleNoteClick,
    handleCancelNote,
    handleRemoveNote,
  };
};