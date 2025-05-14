import { Button } from '@atoms/elements/button';
import { BookMarkIcon } from '@atoms/icons/book-mark-icon';
import { getOpenStatusFromDescriptions } from '@utils/openingHours';
import { useSelector } from 'react-redux';
import type { RootState } from 'src/app/redux/store';

export function SelectedPlace({ inBottomSheet = false }) {
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);
  const weekdayDescriptions =
    selectedPlace?.regularOpeningHours?.weekdayDescriptions;
  const status = Array.isArray(weekdayDescriptions)
    ? getOpenStatusFromDescriptions(weekdayDescriptions)
    : null;

  return (
    <div className="sm:px-6 md:px-6 lg:px-8">
      {!inBottomSheet && (
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gray-200" />
      )}
      {selectedPlace ? (
        <div className="flex flex-col gap-1 sm:py-0 md:py-1 lg:py-2">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-responsive">{selectedPlace.displayName}</h2>
            <Button
              size="fit"
              outline
              className="group mt-2 rounded-full transition duration-200 hover:border-blue-500"
            >
              <BookMarkIcon className="text-neutral-400 group-hover:text-blue-500" />
              <p color="gray" className="group-hover:text-blue-500">
                저장
              </p>
            </Button>
          </div>
          <p className="text-responsive-sm">{selectedPlace.address}</p>
          <p className="text-responsive-sm" color={'gray'}>
            {selectedPlace.nationalPhoneNumber}
          </p>
          {weekdayDescriptions && weekdayDescriptions.length > 0 ? (
            <>
              {status?.isOpen ? (
                <div className="flex gap-2">
                  <p className="text-responsive-sm" color={'blue'}>
                    영업 중
                  </p>
                  <p className="text-responsive-sm" color={'black'}>
                    {status?.message}
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <p className="text-responsive-sm" color={'red'}>
                    영업 종료
                  </p>
                  <p className="text-responsive-sm" color={'black'}>
                    {status?.message}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-responsive-sm" color={'red'}>
              영업 정보 없음
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
