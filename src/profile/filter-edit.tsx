import { Link } from "react-router";
import FilterKeywords from "./filter-keywords";
import LeftIcon from "./left-icon";

export default function FilterEdit (){
    
    return (
        <section className="w-full h-full text-center flex flex-col gap-6 px-[5%] pb-3">
            <Link to="/profile" className="py-3 mb-auto">
                <LeftIcon />
            </Link>
            <h2 className="text-lg font-semibold">어떤 카페를 찾고 계신가요?</h2>
            <p className="text-[#2d2d2d] text-sm">키워드 기반으로 <br/>맞춤 필터 기능을 제공해 드리겠습니다.</p>
            <FilterKeywords />
            <button className="w-full bg-[#232323] text-white rounded-[10px] mt-auto py-2.5 text-sm mx-auto">완료</button>
        </section>
    )
}