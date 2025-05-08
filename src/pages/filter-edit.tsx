import { Link } from "react-router";
import FilterKeywords from "../organisms/filter-keywords";
import { LeftIcon } from "../atoms/left-icon";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";

export default function FilterEdit (){
    
    return (
        <section className="w-full h-full text-center flex flex-col gap-6 px-[5%] pb-3">
            <Link to="/profile" className="py-3 mb-auto">
                <LeftIcon />
            </Link>
            <Text as={"h2"} weight={"semibold"} size={"lg"}>어떤 카페를 찾고 계신가요?</Text>
            <Text>키워드 기반으로 <br/>맞춤 필터 기능을 제공해 드리겠습니다.</Text>
            <FilterKeywords />
            <Button size="full" color="black" className="rounded-[10px] mt-auto text-sm mx-auto">완료</Button>
        </section>
    )
}