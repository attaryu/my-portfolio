import { MdCall, MdLocationOn, MdMail } from 'react-icons/md';

import Button from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';
import Grid from './self-components/Grid';
import Time from './self-components/Time';
import Marquee from './self-components/Marquee';

import { projects, socialMedias } from '@/utils/constant';

export default function MainPage() {
  return (
    <main>
      {/* grid area */}
      <div>
        {/* grid backgroud */}
        <div className="absolute top-0 h-[240vh] w-full -z-10">
          <Grid />
        </div>

        {/* cover */}
        <section className="flex h-svh max-h-highest flex-col justify-end gap-10 px-8 pt-16 md:items-center md:px-20 md:pt-24 xl:h-svh">
          <h1 className="font-tusker-grotesk-medium text-7xl leading-tight md:mt-auto md:text-6xl lg:text-7xl xl:text-6xl">
            HELLO, <br className="md:hidden" />
            I'M ATTAR
          </h1>

          <div className="flex w-full flex-col justify-between py-8 md:mt-auto md:flex-row md:items-center md:py-10 md:text-lg lg:py-12 lg:text-xl xl:py-5 xl:text-lg">
            <Time />
            <p>&copy;2024 All rights reserved.</p>
          </div>
        </section>

        {/* about me */}
        <section className="grid h-screen max-h-highest place-items-center px-8">
          <p className="text-xl !leading-relaxed md:w-4/5 md:text-center md:text-3xl lg:w-2/3 lg:text-4xl xl:text-3xl">
            I'm 19 years old, with almost 3 years of in-depth experience in web
            development field. While I haven't stepped into the professional
            world yet, I've honed my skills through a variety of online courses,
            collaborative projects, solo projects, and even hackathons. Whether
            collaborating on a team or venturing solo, my ethos remains rooted
            in upholding best practices and ensuring precision.
          </p>
        </section>
      </div>

      {/* tech skill */}
      <section className="w-full overflow-hidden py-14 md:py-32">
        <h2 className="-rotate-1 px-8 font-neue-montreal-medium text-3xl md:px-20 md:text-5xl lg:text-6xl">
          Proudly presenting my expertise coupled with an understanding of the
          technology I use.
        </h2>

        <Marquee />

        <p className="mx-auto -rotate-1 px-8 text-right text-sm leading-tight md:px-20 md:text-xl lg:text-2xl xl:text-xl">
          <span className="md:inline-block md:w-3/4 lg:w-4/5">
            Even though I navigate a variety of technologies, mastery of certain
            technologies still eludes me; Nevertheless, I accepted the journey
            of rediscovering these tools in a short time.
          </span>
        </p>
      </section>

      {/* some word */}
      <section>
        <p className="grid h-[150vh] max-h-[1600px] w-full grid-rows-2 place-items-center md:h-[200vh]">
          <span className="text-center font-tusker-grotesk-semibold text-6xl leading-snug">
            MAKE YOUR <br className="md:hidden" />
            DREAM WEBSITE...
          </span>

          <span className="whitespace-nowrap font-tusker-grotesk-medium text-6xl md:text-[8rem] lg:text-[10rem] xl:text-[14rem]">
            INTO A REALITY
          </span>
        </p>
      </section>

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
      <section className="relative my-16 flex h-[80vh] max-h-highest flex-col overflow-hidden px-8 py-16 md:h-[60vh] md:max-h-[650px] md:p-20 xl:h-screen">
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
  );
}
