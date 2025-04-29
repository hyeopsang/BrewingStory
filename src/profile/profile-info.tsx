import { Link } from "react-router-dom";

interface ProfileInfoProps {
    profileImageUrl: string;
}

export default function ProfileInfo (profileImageUrl: ProfileInfoProps) {
    return (
        <div className="w-full h-fit bg-white px-3 py-6">
            <div className="flex flex-wrap items-center gap-3 px-3 text-sm">
            <div className="bg-white w-20 aspect-square rounded-full border overflow-hidden">
                <img 
                    src={profileImageUrl.profileImageUrl} 
                    className="w-full h-full object-cover" 
                    alt="프로필 이미지"
                />
            </div>
                <div className="flex flex-col justify-center gap-3">
                    <p className="text-lg font-semibold">상협</p>
                    <div className="flex items-center gap-3">
                        <p>팔로워 0</p>
                        <p>팔로잉 0</p>
                    </div>
                </div>
                <div className="w-full flex gap-3 text-xs pt-1">
                    <Link className="w-1/2 py-1.5 border rounded-[10px] text-center" to="/profile-edit">프로필 관리</Link>
                    <Link className="w-1/2 py-1.5 border rounded-[10px] text-center" to="/filter-edit">맞춤 필터 편집</Link>
                </div>
            </div>
        </div>
    )
}
