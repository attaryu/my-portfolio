import { MdCall, MdLocationOn, MdMail } from 'react-icons/md';

import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import { projects, socialMedias } from '@/utils/constant';
import Cover from './self-components/Cover';
import Grid from './self-components/Grid';
import Loading from './self-components/Loading';
import AboutMe from './self-components/AboutMe';
import TechStack from './self-components/TechStack';
import SomeWord from './self-components/SomeWord';

export default function Page() {
  return (
    // ? for development, disable loading animation with uncomment below
    // <div className="root-container">
    <div className="root-container h-svh overflow-hidden">
      <Loading />

      <Navbar />
      
      <main>
      {/* grid area */}
      <div>
        {/* grid backgroud */}
        <div className="absolute top-0 h-[240vh] w-full -z-10">
          <Grid />
        </div>

        {/* cover */}
        <Cover />

        {/* about me */}
        <AboutMe />
      </div>

      {/* tech skill */}
      <TechStack />

      {/* some word */}      
      <SomeWord />

      {/* showcase selected project */}
      <section className="my-32 px-8 md:px-20">
        <h2 className="text-center font-neue-montreal-medium text-4xl lg:text-5xl xl:text-6xl">
          There are my <br className="md:hidden" />
          selected project
        </h2>

        <ul className="mt-14 space-y-8 md:space-y-12 lg:mt-20 lg:space-y-16">
          {projects.map((data) => (
            <li key={data.id}>
              <ProjectCard project={data} detailURL={data.detailURL} />
            </li>
          ))}
        </ul>
      </section>

      {/* offering project */}
      <section className="relative my-16 flex h-[90vh] max-h-highest flex-col overflow-hidden px-8 py-16 md:h-[60vh] md:max-h-[650px] md:p-20 xl:h-screen">
        <p className="font-neue-montreal-medium text-[3.4rem] leading-none lg:text-[5rem] xl:text-[5.5rem]">
          Don't you think about making a masterpiece together after seeing all
          that?
        </p>

        <img
          src="/ui_assets/wave-light.svg"
          alt=""
          className="-rotate-5 absolute right-1/3 top-3/4 w-full scale-[2.7] md:left-0 md:top-[55%] md:w-full md:rotate-0 md:scale-125 xl:top-1/2 xl:scale-100"
        />

        <p className="mt-auto flex items-center gap-4 self-end font-neue-montreal-medium md:gap-8">
          <Button href="#" primary>
            Contact Me
          </Button>{' '}
          <span className="md:text-xl lg:text-2xl">right now!</span>
        </p>
      </section>

      {/* my social media and etc */}
      <section className="mb-6 mt-32 px-8 md:mb-8 md:px-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-0">
          <h2 className="w-full font-tusker-grotesk-medium text-[5.2rem] leading-[1.1] md:text-8xl lg:text-9xl xl:text-[9rem]">
            HOW TO
            <br />
            FIND ME
          </h2>

          <div className="flex flex-wrap content-end items-end gap-x-4 gap-y-4 md:justify-end">
            {socialMedias.map((data) => (
              <Button key={data.id} href={data.url} target="_blank" secondary>
                {data.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-t-zinc-800 py-5 lg:mt-16 lg:flex-row">
          <address className="flex items-center gap-4">
            <MdLocationOn className="text-xl md:text-2xl xl:text-3xl" />

            <span className="text-sm not-italic md:text-lg xl:text-xl">
              Brantas street, Jombang, East Java, INA
            </span>
          </address>

          <p className="flex items-center gap-4">
            <MdMail className="text-xl md:text-2xl xl:text-3xl" />

            <span className="text-sm not-italic md:text-lg xl:text-xl">
              mattarannaufal@gmail.com
            </span>
          </p>

          <p className="flex items-center gap-4">
            <MdCall className="text-xl md:text-2xl xl:text-3xl" />

            <span className="text-sm not-italic md:text-lg xl:text-xl">
              (+62) 857 0707 1585
            </span>
          </p>
        </div>
      </section>
    </main>
      
      <Footer />
    </div>
  );
}
