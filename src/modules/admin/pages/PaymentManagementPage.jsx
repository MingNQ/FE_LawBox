import { useState, useEffect } from "react";
import { CreditCard, Search, Calendar, User, ArrowUpRight, CheckCircle2, XCircle, Clock } from "lucide-react";
import AdminLayout from "@admin/components/layout/AdminLayout";
import { getAllTransactions } from "@admin/api/paymentApi";
import { useToast } from "@shared/hooks/useToast";
import Pagination from "@shared/components/ui/Pagination";

export default function PaymentManagementPage() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTransactions();
      if (data && data.success) {
        setTransactions(data.result || []);
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh sách giao dịch");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Success":
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
            <CheckCircle2 size={12} /> Thành công
          </span>
        );
      case "Failed":
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100">
            <XCircle size={12} /> Thất bại
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
            <Clock size={12} /> Đang chờ
          </span>
        );
    }
  };

  const filteredTransactions = transactions.filter(t => 
    t.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.userFullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.tierName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="text-blue-600" size={24} />
            Quản lý Giao dịch
          </h1>
          <p className="text-sm text-gray-500">
            Theo dõi và quản lý các giao dịch đăng ký gói cước của người dùng.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn hàng, người dùng, gói cước..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
          />
        </div>
        <button 
          onClick={fetchTransactions}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition px-4 py-2 rounded-lg hover:bg-blue-50"
        >
          <Calendar size={18} /> Làm mới dữ liệu
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-2"></div>
            Đang tải dữ liệu...
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <div className="flex justify-center mb-4 text-gray-300">
              <CreditCard size={48} />
            </div>
            Không tìm thấy giao dịch nào.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Mã đơn hàng</th>
                  <th className="px-6 py-4">Người dùng</th>
                  <th className="px-6 py-4">Gói cước</th>
                  <th className="px-6 py-4">Số tiền</th>
                  <th className="px-6 py-4">Thời gian</th>
                  <th className="px-6 py-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {transaction.orderId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {transaction.userFullName ? transaction.userFullName.charAt(0).toUpperCase() : <User size={14} />}
                        </div>
                        <span className="font-medium text-gray-900">{transaction.userFullName || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700 font-medium">{transaction.tierName}</span>
                    </td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {formatDate(transaction.paymentDate)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(transaction.paymentStatus)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalCount={filteredTransactions.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
