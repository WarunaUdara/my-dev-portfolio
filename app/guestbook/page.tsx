"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  Timestamp,
  limit,
  startAfter,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { NavBar } from '@/app/ui/TubelightNavbar';
import Footer from '@/app/sections/Footer';
import Toast from '@/components/Toast';
import { MessageSkeleton } from '@/components/MessageSkeleton';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { IconBrandGithub, IconBrandGoogle, IconPin, IconTrash, IconX, IconSend, IconHome, IconUser, IconBriefcase, IconFileText } from '@tabler/icons-react';
import Image from 'next/image';

interface Message {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  message: string;
  timestamp: Timestamp;
  uid: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

const MESSAGES_PER_PAGE = 10;

const placeholders = [
  "Share your thoughts about my work...",
  "Leave a comment or feedback...",
  "Tell me what you think...",
  "Drop a message here...",
  "Your ideas and suggestions...",
];

export default function GuestbookPage() {
  const { user, signInWithGoogle, signInWithGitHub, signOut } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lastVisible, setLastVisible] = useState<any>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', url: '/', icon: IconHome },
    { name: 'About', url: '/#about', icon: IconUser },
    { name: 'Projects', url: '/#projects', icon: IconBriefcase },
    { name: 'More', url: '#', icon: IconFileText }
  ];

  // Initial load with real-time updates
  useEffect(() => {
    const q = query(
      collection(db, 'guestbook'), 
      orderBy('timestamp', 'desc'),
      limit(MESSAGES_PER_PAGE)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages: Message[] = [];
      snapshot.forEach((doc) => {
        loadedMessages.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(loadedMessages);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === MESSAGES_PER_PAGE);
      setInitialLoading(false);
    }, (error) => {
      console.error('Error loading messages:', error);
      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Intersection Observer for infinite scroll
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || !lastVisible) return;

    setLoadingMore(true);
    try {
      const q = query(
        collection(db, 'guestbook'),
        orderBy('timestamp', 'desc'),
        startAfter(lastVisible),
        limit(MESSAGES_PER_PAGE)
      );

      const snapshot = await getDocs(q);
      const newMessages: Message[] = [];
      snapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data() } as Message);
      });

      if (newMessages.length > 0) {
        setMessages((prev) => [...prev, ...newMessages]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === MESSAGES_PER_PAGE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more messages:', error);
      setToast({ show: true, message: 'Failed to load more messages', type: 'error' });
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, lastVisible]);

  useEffect(() => {
    if (initialLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [initialLoading, hasMore, loadingMore, loadMore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!newMessage.trim() || newMessage.length > 500) {
      setToast({ show: true, message: 'Message must be between 1-500 characters', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'guestbook'), {
        name: user.displayName || 'Anonymous',
        email: user.email || '',
        photoURL: user.photoURL || '',
        message: newMessage.trim(),
        timestamp: serverTimestamp(),
        uid: user.uid,
      });

      setNewMessage('');
      setToast({ show: true, message: 'Message posted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error posting message:', error);
      setToast({ show: true, message: 'Failed to post message. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      await deleteDoc(doc(db, 'guestbook', messageId));
      setToast({ show: true, message: 'Message deleted successfully', type: 'success' });
    } catch (error) {
      console.error('Error deleting message:', error);
      setToast({ show: true, message: 'Failed to delete message', type: 'error' });
    }
  };

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGitHub();
      }
      setShowAuthModal(false);
      setToast({ show: true, message: 'Signed in successfully!', type: 'success' });
    } catch (error) {
      console.error('Sign in error:', error);
      setToast({ show: true, message: 'Failed to sign in. Please try again.', type: 'error' });
    }
  };

  const formatTimestamp = (timestamp: Timestamp) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate();
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (diffMins < 60) {
      return `${dateStr} (about ${diffMins} min ago)`;
    } else if (diffHours < 24) {
      return `${dateStr} (about ${diffHours} h ago)`;
    } else if (diffDays < 30) {
      return `${dateStr} (${diffDays}d ago)`;
    }
    
    return dateStr;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <NavBar items={navItems} />
      
      <main className="min-h-screen bg-black text-white pt-24 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">
              THE GUESTBOOK
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[var(--color-8)] via-[var(--color-9)] to-[var(--color-8)] bg-clip-text text-transparent italic">
                Got a message?{'  '}
              </span>{'  '}
              I&apos;d <br /> love to hear from you!
            </h1>
            
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Sign my guestbook and share your idea. You can tell me anything here!
            </p>
          </div>

          {/* Pinned Message */}
          <div className="mb-8 rounded-2xl bg-gradient-to-br from-purple-600/20 via-purple-500/20 to-cyan-500/20 p-[1px]">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-950/80 via-purple-950/80 to-cyan-950/80 p-6 backdrop-blur-xl">
              <div className="flex items-start gap-3 mb-2">
                <IconPin className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <h3 className="text-white font-semibold">Pinned</h3>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                Hey there! Thanks for visiting my website. If you have a moment, I&apos;d love to hear your thoughts on my work. Please log in with your account to leave a comment. Thanks!
              </p>
            </div>
          </div>

          {/* Sign In Button / User Input */}
          {!user ? (
            <div className="mb-12">
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 hover:from-pink-600 hover:via-rose-600 hover:to-orange-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
              >
                <IconSend className="w-5 h-5" />
                Sign In
                <span className="text-sm text-white/90">to continue leaving a message</span>
              </button>
            </div>
          ) : (
            <div className="mb-12">
              <div className="rounded-2xl bg-zinc-900/50 border border-white/10 p-5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.photoURL || '/default-avatar.png'}
                      alt={user.displayName || 'User'}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="text-white font-medium text-sm">{user.displayName}</h4>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>

                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onSubmit={handleSubmit}
                  value={newMessage}
                  disabled={loading}
                />
                
                <div className="mt-3 text-right">
                  <span className="text-xs text-gray-500">
                    {newMessage.length}/500
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Messages List */}
          <div className="space-y-4">
            {initialLoading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <MessageSkeleton key={i} />
                ))}
              </>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="group rounded-xl bg-zinc-900/50 border border-white/10 p-5 hover:bg-zinc-900/70 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={msg.photoURL || '/default-avatar.png'}
                        alt={msg.name}
                        width={48}
                        height={48}
                        className="rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <h4 className="text-white font-semibold text-sm truncate">{msg.name}</h4>
                            <span className="text-gray-500 text-xs whitespace-nowrap">
                              {formatTimestamp(msg.timestamp)}
                            </span>
                          </div>
                          {user && user.uid === msg.uid && (
                            <button
                              onClick={() => handleDelete(msg.id)}
                              className="opacity-70 sm:opacity-0 sm:group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all"
                              title="Delete message"
                            >
                              <IconTrash className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More Trigger */}
                {hasMore && (
                  <div ref={loadMoreRef} className="py-4">
                    {loadingMore && (
                      <>
                        <MessageSkeleton />
                        <div className="mt-4">
                          <MessageSkeleton />
                        </div>
                      </>
                    )}
                  </div>
                )}

                {!hasMore && messages.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">You&apos;ve reached the end</p>
                  </div>
                )}
              </>
            )}

            {!initialLoading && messages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-base">No messages yet. Be the first to sign the guestbook!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 rounded-2xl p-8 max-w-sm w-full border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Sign in</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-6">to continue to guestbook</p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleSignIn('github')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-semibold text-sm transition-colors"
              >
                <IconBrandGithub className="w-5 h-5" />
                Continue with GitHub
              </button>
              
              <button
                onClick={() => handleSignIn('google')}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-black border border-white/20 hover:bg-white/5 text-white font-semibold text-sm transition-colors"
              >
                <IconBrandGoogle className="w-5 h-5" />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Toast Notifications */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </>
  );
}
