import { Button } from '@atoms/elements/button';
import { FilterKeywords } from '@molecules/map/filter-keywords';
import { BackButton } from '@molecules/shared/back-button';

export function FilterEdit() {
  return (
    <section className="flex h-full w-full flex-col gap-6 bg-white px-[5%] py-6 text-center">
      <BackButton />
      <div className="mt-auto mb-auto flex flex-col items-center justify-center gap-3">
        <h2 className="text-responsive text-blk">어떤 카페를 찾고 계신가요?</h2>
        <p className="text-responsive-xs">
          개인의 취향에 맞춘 필터 기능으로
          <br /> 나에게 딱 맞는 카페를 손쉽게 찾아보세요.
        </p>
        <FilterKeywords />
      </div>
      <Button
        className="text-responsive-sm bg-blk focus:ring-blk/30 mt-auto mb-4 justify-center rounded-full py-2.5 text-white focus:ring-3 focus:outline-none"
        size="full"
      >
        완료
      </Button>
    </section>
  );
}
