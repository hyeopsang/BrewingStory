export default function ProfileInfo () {
    return (
        <div className="w-full h-fit bg-neutral-700 px-3 py-3 text-white">
            <div className="flex flex-wrap items-center gap-3 px-3 text-sm">
                <div className="bg-white w-20 aspect-square rounded-full"></div>
                <div className="flex items-center gap-3">
                    <p>followers 0</p>
                    <p>following 0</p>
                </div>
                <div className="w-full flex  gap-3">
                    <button className="w-1/2 py-2 border rounded-[10px]">프로필 관리</button>
                    <button className="w-1/2 py-2 border rounded-[10px]">맞춤 필터 편집</button>
                </div>
            </div>
        </div>
    )
}