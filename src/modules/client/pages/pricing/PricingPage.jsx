import { useState, useEffect } from "react";
import { ClientLayout } from "@client/components/layout/ClientLayout";
import { PricingHero } from "@client/components/pricing/PricingHero";
import { PlanCard } from "@client/components/pricing/PlanCard";
import { getPlans, createPayment } from "@client/api/paymentApi";
import { useAuth } from "@shared/hooks/useAuth";
import { useToast } from "@shared/hooks/useToast";
import { Loader2 } from "lucide-react";
import { ROUTES } from "@shared/constants/routes"
import "./PricingPage.css";

export function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribingId, setSubscribingId] = useState(null);
  const { subscription, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await getPlans();
        if (res.success) {
          setPlans(res.result);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        toast.error("Không thể tải danh sách gói. Vui lòng thử lại sau.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [toast]);

  const handleSubscribe = async (tierId) => {
    if (!user) {
      window.location.href = ROUTES.AUTH.SIGN_IN;
    }

    try {
      setSubscribingId(tierId);
      const res = await createPayment({ tierId, provider: "VnPay" });
      if (res.success && res.result.paymentUrl) {
        window.location.href = res.result.paymentUrl;
      } else {
        toast.error(res.message || "Không thể tạo thanh toán.", "error");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Có lỗi xảy ra khi khởi tạo thanh toán.", "error");
    } finally {
      setSubscribingId(null);
    }
  };

  return (
    <ClientLayout>
      <div className="pricing-page-container bg-slate-50 dark:bg-[#0b0f19] min-h-screen">
        <PricingHero />
        
        <div className="max-w-[1200px] mx-auto px-6 pb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-slate-500 font-medium animate-pulse">Đang tải bảng giá...</p>
            </div>
          ) : (
            <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isCurrentPlan={subscription?.tierId === plan.id && subscription?.isActive}
                  remainingDays={subscription?.remainingDays || 0}
                  onSubscribe={handleSubscribe}
                  loading={subscribingId === plan.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
}
