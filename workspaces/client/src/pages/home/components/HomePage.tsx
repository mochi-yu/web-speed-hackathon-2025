import { createStore } from '@wsh-2025/client/src/app/createStore';
import { RecommendedSection } from '@wsh-2025/client/src/features/recommended/components/RecommendedSection';

export const prefetch = async (store: ReturnType<typeof createStore>) => {
  const modules = await store
    .getState()
    .features.recommended.fetchRecommendedModulesByReferenceId({ referenceId: 'entrance' });
  return { modules };
};

export const HomePage = () => {
  return (
    <>
      <title>Home - AremaTV</title>

      <div className="w-full py-[48px]">
        <RecommendedSection isHomePage count={0} referenceId="entrance" />
      </div>
    </>
  );
};
