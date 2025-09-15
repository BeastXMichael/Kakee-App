'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Comment = {
  id: number;
  user: string;
  avatar: string;
  avatarHint: string;
  text: string;
};

const initialComments: Comment[] = [
  { id: 1, user: '@user123', avatar: PlaceHolderImages.find(i => i.id === 'commenter-1')?.imageUrl!, avatarHint: PlaceHolderImages.find(i => i.id === 'commenter-1')?.imageHint!, text: 'Wah, the CEO so handsome one!' },
  { id: 2, user: '@anotheruser', avatar: PlaceHolderImages.find(i => i.id === 'commenter-2')?.imageUrl!, avatarHint: PlaceHolderImages.find(i => i.id === 'commenter-2')?.imageHint!, text: 'This one confirm will cry later.' },
];

type CommentPanelProps = {
    show: boolean;
    onClose: () => void;
};

export default function CommentPanel({ show, onClose }: CommentPanelProps) {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(show) {
            inputRef.current?.focus();
        }
    }, [show]);

    const handlePostComment = () => {
        if (newComment.trim()) {
            const newCommentObj: Comment = {
                id: Date.now(),
                user: '@general_buddy',
                avatar: PlaceHolderImages.find(i => i.id === 'user-avatar')?.imageUrl!,
                avatarHint: PlaceHolderImages.find(i => i.id === 'user-avatar')?.imageHint!,
                text: newComment.trim(),
            };
            setComments([newCommentObj, ...comments]);
            setNewComment('');
        }
    };
    
    return (
        <div className={`absolute bottom-0 left-0 w-full h-3/5 bg-gray-800/90 backdrop-blur-md rounded-t-2xl flex flex-col transition-transform duration-300 ease-in-out ${show ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="text-center py-3 border-b border-white/10 flex-shrink-0 relative">
                <h4 className="font-bold text-white text-sm">{comments.length} Comments</h4>
                <button onClick={onClose} className="absolute top-1/2 -translate-y-1/2 right-4 text-white/50 text-2xl font-light">&times;</button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto no-scrollbar space-y-4">
                {comments.map(comment => (
                    <div key={comment.id} className="flex items-start space-x-3">
                        <Image src={comment.avatar} alt={comment.user} width={32} height={32} className="w-8 h-8 rounded-full flex-shrink-0" data-ai-hint={comment.avatarHint}/>
                        <div>
                            <p className="text-xs text-gray-400">{comment.user}</p>
                            <p className="text-sm text-white">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-2 border-t border-white/10 flex-shrink-0 flex items-center space-x-2">
                <Input
                    ref={inputRef}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-gray-700 text-white rounded-full py-2 px-4 placeholder-gray-400 text-sm border-transparent focus-visible:ring-primary"
                />
                <Button onClick={handlePostComment} variant="ghost" className="text-primary hover:text-primary/90 font-bold text-sm p-2">Post</Button>
            </div>
        </div>
    );
}
