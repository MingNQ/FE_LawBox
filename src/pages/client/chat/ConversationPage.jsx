import { ConversationLayout } from "../../../components/layout/client/ConversationLayout";
import { ChatHeader } from "../../../components/chat/ChatHeader";
import { UserMessage } from "../../../components/chat/UserMessage";
import { AIMessage, DocumentCard } from "../../../components/chat/AIMessage";
import { ChatInput } from "../../../components/chat/ChatInput";

export default function ConversationPage() {
    return (
        <ConversationLayout>
            <ChatHeader title="Tư vấn hợp đồng thuê nhà" />

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                <UserMessage
                    content="Chào Luật sư, tôi chuẩn bị ký hợp đồng thuê mặt bằng kinh doanh 5 năm. Tôi cần lưu ý gì về các điều khoản đơn phương chấm dứt hợp đồng theo quy định mới nhất?"
                    time="14:20 PM"
                    avatarUrl="images/default-avatar.jpg"
                />

                <AIMessage time="14:21 PM">
                    <p>
                        Chào bạn, đối với hợp đồng thuê mặt bằng kinh doanh (thường được
                        điều chỉnh bởi <strong>Bộ luật Dân sự 2015</strong> và{" "}
                        <strong>Luật Kinh doanh Bất động sản</strong>), bạn cần đặc biệt
                        lưu ý các điểm sau về đơn phương chấm dứt hợp đồng:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Quyền đơn phương chấm dứt (Điều 428 BLDS 2015):</strong>{" "}
                            Một bên có quyền đơn phương chấm dứt thực hiện hợp đồng và không
                            phải bồi thường thiệt hại khi bên kia vi phạm nghiêm trọng nghĩa
                            vụ.
                        </li>
                        <li>
                            <strong>Thời hạn báo trước:</strong> Theo quy định, bên đơn phương
                            chấm dứt phải thông báo ngay cho bên kia biết. Nếu không thông báo
                            mà gây thiệt hại thì phải bồi thường. Trong hợp đồng 5 năm,
                            thông thường các bên thỏa thuận báo trước từ{" "}
                            <strong>30 đến 90 ngày</strong>.
                        </li>
                        <li>
                            <strong>Hoàn trả tiền cọc:</strong> Cần làm rõ trường hợp nào
                            được lấy lại cọc nếu chủ nhà lấy lại mặt bằng trước hạn mà không
                            có lỗi của bên thuê.
                        </li>
                    </ul>
                    <p className="pt-2 border-t border-slate-100 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
                        Tài liệu liên quan bạn nên tham khảo:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <DocumentCard
                            title="Bộ luật Dân sự 2015"
                            code="Số: 91/2015/QH13"
                            variant="red"
                        />
                        <DocumentCard
                            title="Luật Kinh doanh BĐS 2023"
                            code="Số: 29/2023/QH15"
                            variant="blue"
                        />
                    </div>
                </AIMessage>
            </div>

            <ChatInput />
        </ConversationLayout>
    );
}