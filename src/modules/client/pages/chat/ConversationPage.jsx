import { ConversationLayout } from "@client/components/layout/ConversationLayout";
import { ChatHeader } from "@client/components/chat/ChatHeader";
import { ChatInput } from "@client/components/chat/ChatInput";
import { ChatWelcome } from "@client/components/chat/ChatWelcome";
import { useAuth } from "@shared/hooks/useAuth";
import AuthModal from "@client/components/auth/AuthModal";
import { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import {
  getMyConversation,
  getConversationById,
  deleteConversation,
  updatePinnedConversation,
  updateConversation,
  reactionMessage,
  commentMessage,
} from "@client/api/conversationApi";
import ChatContent from "@client/components/chat/ChatContent";
import { sendMessage } from "@client/api/chatApi";
import { ROUTES } from "@shared/constants/routes";

export default function ConversationPage() {
  const { user } = useAuth();
  const { conversationId } = useParams();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [pendingMessage, setPendingMessage] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchConversations();
  }, [user]);

  useEffect(() => {
    if (!user || !conversationId) {
      setCurrentConversation(null);
      return;
    }

    const fetchCurrentConversation = async () => {
      try {
        const data = await getConversationById(conversationId);
        if (data.success) {
          setCurrentConversation(data.result);
        } else {
          console.log(data.result.message);
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchCurrentConversation();
  }, [user, conversationId]);

  const fetchConversations = async () => {
    try {
      const data = await getMyConversation();

      if (data.success) {
        setConversations(data.result);
      } else {
        console.log(data.result.messages);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSelectConversation = (conversation) => {
    setPendingMessage(null);
    setIsThinking(false);
    navigate(`${ROUTES.CHAT}/${conversation.id}`);
  };

  const handleNewConversation = () => {
    setCurrentConversation(null);
    setPendingMessage(null);
    setIsThinking(false);
    navigate(ROUTES.CHAT);
  };

  const handleSendMessage = async (message) => {
    setPendingMessage(message);
    setIsThinking(true);

    try {
      const data = await sendMessage({
        conversationId: currentConversation?.id,
        message: message,
      });

      if (data.success) {
        if (data.result?.id != currentConversation?.id) {
          setConversations((prev) =>
            prev ? [data.result, ...prev] : [data.result],
          );
        } else {
          setCurrentConversation(data.result);
        }

        if (data.result?.id) {
          navigate(`${ROUTES.CHAT}/${data.result.id}`, { replace: true });
        }
      } else {
        console.log(data.result.message);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setPendingMessage(null);
      setIsThinking(false);
    }
  };

  const handleDeleteConversation = async (id) => {
    try {
      const data = await deleteConversation(id);

      if (data.success) {
        setConversations((prev) => prev.filter((c) => c.id !== id));

        if (currentConversation?.id === id) {
          setCurrentConversation(null);
          navigate(ROUTES.CHAT);
        }
      } else {
        alert(data.result.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handlePinConversation = async (id, pinned) => {
    try {
      const data = await updatePinnedConversation(id, { pinned: pinned });

      if (data.success) {
        setConversations((prev) =>
          prev?.map((c) => (c.id === id ? { ...c, pinned: pinned } : c)),
        );
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleRenameConversation = async (id, title) => {
    try {
      const data = await updateConversation(id, { title });

      if (data.success) {
        setConversations((prev) =>
          prev?.map((c) => (c.id === id ? { ...c, title } : c)),
        );

        if (currentConversation?.id === id) {
          setCurrentConversation((prev) => ({ ...prev, title }));
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleMessageReaction = async (id, messageId, reaction) => {
    try {
      const data = await reactionMessage(id, messageId, { reaction: reaction });
      if (data.success) {
        setCurrentConversation(data.result);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleMessageComment = async (id, messageId, comment) => {
    try {
      const data = await commentMessage(id, messageId, { comment });
      if (data.success) {
        // Optionally update the conversation if the comment triggers any reaction update
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const isNewChat = !conversationId && !pendingMessage && !isThinking;

  return (
    <>
      <AuthModal open={!user} />

      <ConversationLayout
        conversations={conversations}
        currentConversationId={currentConversation?.id}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onPinConversation={handlePinConversation}
        onRenameConversation={handleRenameConversation}
      >
        {isNewChat ? (
          <>
            <ChatWelcome />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <>
            <ChatHeader
              title={currentConversation?.title || "Cuộc trò chuyện mới"}
            />
            <ChatContent
              messages={currentConversation?.messages}
              pendingMessage={pendingMessage}
              isThinking={isThinking}
              onMessageReaction={handleMessageReaction}
              onMessageComment={handleMessageComment}
            />
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isThinking}
            />
          </>
        )}
      </ConversationLayout>
    </>
  );
}
