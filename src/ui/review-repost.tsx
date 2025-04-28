import { Button } from "../components/ui/button"

interface ReviewRepostProps {
    onClickModal: () => void;
}

export default function ReviewRepost({ onClickModal } : ReviewRepostProps) {
    return (
        <Button variant="outline" className="w-fit bg-buttonRed hover:bg-[#f06e6e] hover:text-white text-white font-normal shadow-none drop-shadow-none" onClick={onClickModal}>
            수정
        </Button>
    )
}