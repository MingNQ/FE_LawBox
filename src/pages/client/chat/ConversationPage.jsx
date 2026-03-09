import { ConversationLayout } from "../../../components/layout/client/ConversationLayout";
import { ChatHeader } from "../../../components/chat/ChatHeader";
import { ChatInput } from "../../../components/chat/ChatInput";
import { ChatWelcome } from "../../../components/chat/ChatWelcome";
import { useAuth } from "../../../hooks/useAuth";
import AuthModal from "../../../components/auth/AuthModal";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMyConversation,
  getConversationById,
} from "../../../api/conversationApi";
import ChatContent from "../../../components/chat/ChatContent";
import { sendMessage } from "../../../api/chatApi";
import { ROUTES } from "../../../constants/routes";

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
            prev ? [...prev, data.result] : [data.result],
          );
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

  const isNewChat = !conversationId && !pendingMessage && !isThinking;

  return (
    <>
      <AuthModal open={!user} />

      <ConversationLayout
        conversations={conversations}
        currentConversationId={currentConversation?.id}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
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
