import { TextArea } from "../atoms/TextArea";

export function PostText(){
    return (
        <div className="w-full px-6 py-4 text-[#232323] bg-white">
            <TextArea className="w-full" rows={10} placeholder="문구 추가..." />
        </div>
    )
}