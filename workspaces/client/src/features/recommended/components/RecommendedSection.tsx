import { CarouselSection } from '@wsh-2025/client/src/features/recommended/components/CarouselSection';
import { JumbotronSection } from '@wsh-2025/client/src/features/recommended/components/JumbotronSection';
import { useRecommended } from '@wsh-2025/client/src/features/recommended/hooks/useRecommended';

interface Props {
  count: number;
  isHomePage?: boolean;
  referenceId: string;
}

export const RecommendedSection = ({ count, isHomePage = false, referenceId }: Props) => {
  console.log('render: ', referenceId);

  const modules = useRecommended({ referenceId: referenceId });
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
};
