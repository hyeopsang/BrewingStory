import type { RootState } from '@app/redux/store';
import { LoadingIcon } from '@atoms/icons/loading-icon';
import { PostCard } from '@molecules/profile/post-card';
import { EmptyState } from '@molecules/shared/empty-state';
import { getOpenStatusFromDescriptions } from '@utils/openingHours';
import { usePlaceInfinitePosts } from '@utils/usePlaceIntinitePosts';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const PlaceDetail = () => {
  const navigate = useNavigate();
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace);
  const weekdayDescriptions =
    selectedPlace?.regularOpeningHours?.weekdayDescriptions;
  const status = Array.isArray(weekdayDescriptions)
    ? getOpenStatusFromDescriptions(weekdayDescriptions)
    : null;
  const { posts, loading, hasMore, setTarget } = usePlaceInfinitePosts(
    String(selectedPlace?.id)
  );
  return (
    <section>
      {selectedPlace ? (
        <div className="flex flex-col gap-1 sm:py-0 md:py-1 lg:py-2">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-responsive"># {selectedPlace?.displayName}</h2>
          </div>
          <p className="text-responsive-sm">{selectedPlace?.address}</p>
          <p className="text-responsive-sm" color={'gray'}>
            {selectedPlace?.nationalPhoneNumber}
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
      <p>상세 영업 정보</p>
      <ul>
        {selectedPlace?.regularOpeningHours?.weekdayDescriptions.map(
          (des, idx) => <li key={idx}>{des}</li>
        )}
      </ul>
      {posts.length === 0 && !loading ? (
        <EmptyState />
      ) : (
        <div className="w-full">
          <ul className="grid w-full grid-cols-3">
            {posts.map((post, idx) => (
              <PostCard
                key={idx}
                photoUrls={post.photoUrls?.[0]}
                thumbnail={post.thumbnail}
                openView={() =>
                  navigate('/post-view', { state: { index: idx } })
                }
              />
            ))}
          </ul>

          {hasMore && <div ref={setTarget} style={{ height: '10px' }} />}

          {loading && <LoadingIcon />}
        </div>
      )}
    </section>
  );
};
