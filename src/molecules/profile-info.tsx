import { Link } from "react-router-dom";
import { Image } from "../atoms/Image";
import { Text } from "../atoms/Text";

interface ProfileInfoProps {
    profileImageUrl: string;
}

export default function ProfileInfo (profileImageUrl: ProfileInfoProps) {
    return (
        <div className="w-full h-fit bg-white px-3">
            <div className="flex flex-wrap items-center gap-6 py-2 pt-6 px-3 text-sm">
            <div className="bg-white lg:w-24 base:w-23 sm:w-22 aspect-square rounded-full border overflow-hidden">
                <Image 
                    src={profileImageUrl.profileImageUrl} 
                    className="w-full h-full object-cover" 
                    alt="프로필 이미지"
                />
            </div>
                <div className="flex flex-col justify-center gap-4">
                    <Text size="responsive-sm" weight={"semibold"}>상협</Text>
                    <div className="flex items-center gap-3">
                        <Text size="responsive-sm">팔로워 0</Text>
                        <Text size="responsive-sm">팔로잉 0</Text>
                    </div>
                </div>
                <div className="w-full flex gap-3 text-responsive-xs py-1">
                    <Link className="w-1/2 py-1.5 border rounded-[10px] text-center" to="/profile-edit">프로필 관리</Link>
                    <Link className="w-1/2 py-1.5 border rounded-[10px] text-center" to="/filter-edit">맞춤 필터 편집</Link>
                </div>
            </div>
        </div>
    )
}
