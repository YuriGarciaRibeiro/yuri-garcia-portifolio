'use client';

import { useState } from 'react';
import { useCertifications } from '@/hooks/use-certifications';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Plus, Pencil, Trash2, ExternalLink, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CertificationsPage() {
  const { certifications, loading, error, deleteCertification, refetch } = useCertifications();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    const success = await deleteCertification(id);
    if (success) {
      await refetch();
    }
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#6366f1]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Certifications</h1>
          <p className="text-[#a0a0a0]">Manage your professional certifications</p>
        </div>
        <Button className="bg-[#6366f1] hover:bg-[#4f46e5]">
          <Plus className="mr-2 h-4 w-4" />
          Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <Card className="p-12 bg-[#1a1a1a] border-[#2a2a2a] text-center">
          <p className="text-[#a0a0a0] mb-4">No certifications yet</p>
          <Button className="bg-[#6366f1] hover:bg-[#4f46e5]">
            <Plus className="mr-2 h-4 w-4" />
            Add your first certification
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#6366f1] transition-colors h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-[#6366f1]/10 rounded-lg">
                    <Award className="h-5 w-5 text-[#6366f1]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{cert.title}</h3>
                    <p className="text-sm text-[#a0a0a0]">{cert.issuer}</p>
                  </div>
                </div>

                <div className="text-sm text-[#a0a0a0] mb-3">
                  <p>Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                  {cert.expiryDate && (
                    <p>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</p>
                  )}
                  {cert.credentialId && (
                    <p className="text-xs mt-1">ID: {cert.credentialId}</p>
                  )}
                </div>

                {cert.description && (
                  <p className="text-sm text-[#a0a0a0] mb-3 flex-1">{cert.description}</p>
                )}

                {cert.credentialUrl && (
                  <Link
                    href={cert.credentialUrl}
                    target="_blank"
                    className="text-[#6366f1] hover:underline text-sm flex items-center gap-1 mb-3"
                  >
                    View Certificate <ExternalLink className="h-3 w-3" />
                  </Link>
                )}

                <div className="flex gap-2 mt-auto pt-3 border-t border-[#2a2a2a]">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#333] hover:border-[#6366f1]"
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#333] hover:border-red-500 text-red-500"
                    onClick={() => handleDelete(cert.id, cert.title)}
                    disabled={deletingId === cert.id}
                  >
                    {deletingId === cert.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Trash2 className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
