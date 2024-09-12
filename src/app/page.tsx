import AboutMe from '@/components/self-components/landing/AboutMe';
import Collaboration from '@/components/self-components/landing/Collaboration';
import Cover from '@/components/self-components/landing/Cover';
import Grid from '@/components/self-components/landing/Grid';
import SelectedProject from '@/components/self-components/landing/SelectedProject';
import SocialMedia from '@/components/self-components/landing/SocialMedia';
import SomeWord from '@/components/self-components/landing/SomeWord';
import TechStack from '@/components/self-components/landing/TechStack';

import fetcher from '@/utils/fetcher';

export default async function Page() {
  const landingData: any = await fetcher(
    '/landing?populate[tech_skills][populate]=icon&populate[selected_projects][populate][0]=cover&populate[selected_projects][populate][1]=links&populate=social_medias',
  );

  return (
    <main>
      {/* grid area */}
      <div>
        {/* grid backgroud */}
        <div className="absolute top-0 -z-10 h-[240vh] w-full">
          <Grid />
        </div>

        {/* cover */}
        <Cover />

        {/* about me */}
        <AboutMe />
      </div>

      {/* tech skill */}
      <TechStack icons={landingData.data.attributes.tech_skills.data} />

      {/* some word */}
      <SomeWord />

      {/* showcase selected project */}
      <SelectedProject
        data={landingData.data.attributes.selected_projects.data}
      />

      {/* offering project */}
      <Collaboration />

      {/* my social media and etc */}
      <SocialMedia data={landingData.data.attributes.social_medias.data} />
    </main>
  );
}
