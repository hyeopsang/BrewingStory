import { Link } from "react-router";
import FilterKeywords from "../organisms/filter-keywords";
import { LeftIcon } from "../atoms/left-icon";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";

export default function FilterEdit (){
    
    return (
        <section className="w-full h-full text-center flex flex-col gap-6 px-[5%] pb-3 bg-white">
            <Link to="/profile" className="py-3 mb-auto">
                <LeftIcon />
            </Link>
            <Text as={"h2"} weight={"semibold"} className="text-responsive-lg">어떤 카페를 찾고 계신가요?</Text>
            <Text className="text-responsive-sm">개인의 취향에 맞춘 필터 기능으로<br/> 나에게 딱 맞는 카페를 손쉽게 찾아보세요.</Text>
            <FilterKeywords />
            <Button
                className="justify-center mt-auto mb-4 text-responsive sm:py-2 lg:py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                size="full"
            >
                완료
            </Button>
        </section>
    )
}
