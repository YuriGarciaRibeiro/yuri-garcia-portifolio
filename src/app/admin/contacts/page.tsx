'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, User, Calendar, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  replied: boolean;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/contact');
      setContacts(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/api/contact/${id}`);
      await fetchContacts();
    } catch (err) {
      console.error('Failed to delete contact:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/api/contact/${id}`, { status: 'Read' });
      await fetchContacts();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
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
        <Button onClick={fetchContacts}>Retry</Button>
      </div>
    );
  }

  const newMessages = contacts.filter(c => c.status === 'New').length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-[#a0a0a0]">
            {newMessages > 0 ? `${newMessages} new message${newMessages > 1 ? 's' : ''}` : 'No new messages'}
          </p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <Card className="p-12 bg-[#1a1a1a] border-[#2a2a2a] text-center">
          <Mail className="h-12 w-12 text-[#a0a0a0] mx-auto mb-4" />
          <p className="text-[#a0a0a0]">No messages yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-6 bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#6366f1] transition-colors ${
                  contact.status === 'New' ? 'border-l-4 border-l-[#6366f1]' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#6366f1]/10 rounded-lg">
                        <User className="h-5 w-5 text-[#6366f1]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-sm text-[#6366f1] hover:underline"
                        >
                          {contact.email}
                        </a>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          contact.status === 'New'
                            ? 'bg-green-500/10 text-green-500 border-green-500/30'
                            : contact.status === 'Read'
                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/30'
                            : 'bg-purple-500/10 text-purple-500 border-purple-500/30'
                        }`}
                      >
                        {contact.status}
                      </Badge>
                    </div>

                    <p className="text-[#a0a0a0] mb-3 whitespace-pre-wrap">{contact.message}</p>

                    <div className="flex items-center gap-2 text-xs text-[#666]">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(contact.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {contact.status === 'New' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(contact.id)}
                        className="border-[#333] hover:border-[#6366f1]"
                      >
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#333] hover:border-red-500 text-red-500"
                      onClick={() => handleDelete(contact.id)}
                      disabled={deletingId === contact.id}
                    >
                      {deletingId === contact.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
