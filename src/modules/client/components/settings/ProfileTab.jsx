import { useState, useRef, useContext } from "react";
import { Camera, User, Loader2 } from "lucide-react";
import { useAuth } from "@shared/hooks/useAuth";
import { useLanguage } from "@shared/hooks/useLanguage";
import { ToastContext } from "@shared/contexts/ToastContext";
import { updateProfile } from "@client/api/userApi";
import { uploadSingleFile } from "@shared/api/fileStorageApi";

export default function ProfileTab() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useContext(ToastContext);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    userName: user?.userName || "",
    avatarId: user?.avatar || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar?.fullPathUrl || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await uploadSingleFile({ fileData: file });
        if (res.success) {
          const url = URL.createObjectURL(file);
          setPreviewAvatar(url);
          setFormData((prev) => ({ ...prev, avatarId: res.result.id }));
        }
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        toast.error(t("settings.profile.error"));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedUser = await updateProfile(formData);

      toast.success(t("settings.profile.success"));
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(t("settings.profile.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col items-center gap-6">
        <div className="relative group">
          <div
            onClick={handleAvatarClick}
            className="size-24 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden bg-slate-100 dark:bg-slate-700 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            {previewAvatar ? (
              <img
                src={previewAvatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                <User className="w-10 h-10" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          <button
            type="button"
            onClick={handleAvatarClick}
            className="absolute bottom-0 right-0 size-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800 transition-all hover:scale-110"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {t("settings.profile.title")}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {user?.email || user?.contact || ""}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
              {t("settings.profile.firstName")}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t("settings.profile.firstName")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
              {t("settings.profile.lastName")}
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t("settings.profile.lastName")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
            {t("settings.profile.username")}
          </label>
          <div className="relative">
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder={t("settings.profile.username")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("settings.profile.updating")}
            </>
          ) : (
            t("settings.profile.save")
          )}
        </button>
      </form>
    </div>
  );
}
