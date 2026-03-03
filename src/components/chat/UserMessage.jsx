export function UserMessage({ content, time, avatarUrl }) {
    return (
        <div className="flex justify-end gap-3 max-w-4xl ml-auto">
            <div className="flex flex-col items-end gap-1.5">
                <div className="bg-blue-700 p-4 rounded-2xl text-white rounded-tr-none shadow-sm">
                    <p className="text-sm leading-relaxed">{content}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{time}</span>
            </div>
            {avatarUrl && (
                <div
                    className="size-8 rounded-full bg-slate-200 shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${avatarUrl}')` }}
                ></div>
            )}
        </div>
    );
}
