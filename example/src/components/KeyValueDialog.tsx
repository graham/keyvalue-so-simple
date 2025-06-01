"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../styles/components/ui/button";
import { Input } from "../styles/components/ui/input";

interface KeyValueDialogProps {
  userId: string;
  initialKey?: string;
  initialValue?: string;
  onClose: () => void;
}

export function KeyValueDialog({
  userId,
  initialKey = "",
  initialValue = "",
  onClose,
}: KeyValueDialogProps) {
  const [key, setKey] = useState(initialKey);
  const [value, setValue] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setKeyValue = useMutation(api.keyvalue.setKeyForUserId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim() || !value.trim()) return;

    setIsSubmitting(true);
    try {
      await setKeyValue({ userId, key, value });
      onClose();
    } catch (error) {
      console.error("Failed to set key-value:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialKey ? "Update Key-Value" : "Add New Key-Value"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="key" className="block text-sm font-medium mb-1">
              Key
            </label>
            <Input
              id="key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key"
              disabled={!!initialKey}
              required
            />
          </div>

          <div>
            <label htmlFor="value" className="block text-sm font-medium mb-1">
              Value
            </label>
            <Input
              id="value"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !key.trim() || !value.trim()}
            >
              {isSubmitting ? "Saving..." : initialKey ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
