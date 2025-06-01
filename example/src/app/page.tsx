"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../styles/components/ui/button";
import { Input } from "../styles/components/ui/input";
import { KeyValueDialog } from "../components/KeyValueDialog";

export default function Page() {
  const [userId, setUserId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<{ key: string; value: string } | null>(null);

  const count = useQuery(api.keyvalue.countKeys);
  const userKeys = useQuery(
    api.keyvalue.getKeysForUserId,
    userId ? { userId } : "skip"
  );

  const handleAddNew = () => {
    setEditingKey(null);
    setDialogOpen(true);
  };

  const handleEdit = (key: string, value: string) => {
    setEditingKey({ key, value });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingKey(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header with total count */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Key-Value Store</h1>
        <div className="text-sm font-medium text-gray-600">
          Total Keys: {count ?? 0}
        </div>
      </div>

      {/* User ID input */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label htmlFor="userId" className="block text-sm font-medium mb-2">
          User ID
        </label>
        <Input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID to view/manage keys"
          className="max-w-md"
        />
      </div>

      {/* Keys table */}
      {userId && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Keys for User: {userId}
            </h2>
            <Button onClick={handleAddNew}>Add New Key</Button>
          </div>

          <div className="p-6">
            {userKeys && Object.keys(userKeys).length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Key</th>
                    <th className="text-left py-2 px-4 font-medium">Value</th>
                    <th className="text-right py-2 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(userKeys).map(([key, value]) => (
                    <tr key={key} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-sm">{key}</td>
                      <td className="py-3 px-4">{value}</td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(key, value)}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No keys found for this user. Click &quot;Add New Key&quot; to get started.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Dialog */}
      {dialogOpen && userId && (
        <KeyValueDialog
          userId={userId}
          initialKey={editingKey?.key}
          initialValue={editingKey?.value}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}