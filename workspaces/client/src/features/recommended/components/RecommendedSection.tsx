import { StandardSchemaV1 } from '@standard-schema/spec';
import { getRecommendedModulesResponse } from '@wsh-2025/schema/src/openapi/schema';
import React, { useEffect, useState } from 'react';

import { CarouselSection } from '@wsh-2025/client/src/features/recommended/components/CarouselSection';
import { JumbotronSection } from '@wsh-2025/client/src/features/recommended/components/JumbotronSection';
import { recommendedService } from '@wsh-2025/client/src/features/recommended/services/recommendedService';

interface Props {
  count: number;
  isHomePage?: boolean;
  referenceId: string;
}

export const RecommendedSection = React.memo(function RecommendedSection({
  count,
  isHomePage = false,
  referenceId,
}: Props) {
  console.log('render: ', referenceId);

  const [modules, setData] = useState<StandardSchemaV1.InferOutput<typeof getRecommendedModulesResponse> | null>(null);

  useEffect(() => {
    const getRecommend = async () => {
      await recommendedService.fetchRecommendedModulesByReferenceId({ referenceId }).then((modules) => {
        setData(modules);
      });
    };
    void getRecommend();
  }, [referenceId]);

  if (modules == null) {
    return <p>Loading...</p>;
  }

  if (count === 0) {
    count = modules.length;
  }

  if (modules[0] == null) {
    return null;
  }

  if (isHomePage) {
    return (
      <>
        {modules.map((module) => {
          return (
            <div key={module.id} className="mb-[24px] px-[24px]">
              {module.type === 'jumbotron' ? (
                <JumbotronSection key={module.id} module={module} />
              ) : (
                <CarouselSection key={module.id} module={module} />
              )}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      {modules.slice(0, count).map((module) => {
        if (module.type === 'jumbotron') {
          return <JumbotronSection key={module.id} module={module} />;
        } else {
          return <CarouselSection key={module.id} module={module} />;
        }
      })}
    </>
  );
});
