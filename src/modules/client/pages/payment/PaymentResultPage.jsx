import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ClientLayout } from "@client/components/layout/ClientLayout";
import { PaymentSuccess } from "@client/components/payment/PaymentSuccess";
import { PaymentFailed } from "@client/components/payment/PaymentFailed";
import { useAuth } from "@shared/hooks/useAuth";
import SettingsModal from "@shared/components/ui/SettingsModal";
import "./PaymentResultPage.css";

export function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const { refreshSubscription } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  
  const status = searchParams.get("status"); // "success" | "failed"
  const orderId = searchParams.get("orderId");
  const code = searchParams.get("code");
  const message = searchParams.get("message");

  useEffect(() => {
    if (status === "success") {
      // Refresh subscription state globally
      refreshSubscription();
    }
  }, [status, refreshSubscription]);

  return (
    <ClientLayout>
      <div className="payment-result-container bg-slate-50 dark:bg-[#0b0f19] min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
        {status === "success" ? (
          <PaymentSuccess 
            orderId={orderId} 
            onShowQuota={() => setShowSettings(true)} 
          />
        ) : (
          <PaymentFailed 
            orderId={orderId} 
            code={code} 
            message={message} 
          />
        )}
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </ClientLayout>
  );
}
