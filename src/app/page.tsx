import { MdCall, MdLocationOn, MdMail } from 'react-icons/md';

import Button from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';
import { logos, projects, socialMedias } from '@/utils/constant';

export default function Home() {
  const date = new Date();

  return (
    <main>
      {/* grid area */}
      <div>
        {/* grid backgroud */}
        <div className="after:contents-[''] absolute top-0 -z-10 grid h-[230vh] w-full grid-cols-[repeat(auto-fit,_minmax(2rem,_1fr))] overflow-hidden after:absolute after:bottom-0 after:left-0 after:block after:h-1/5 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent xl:h-fit">
          {Array(50 * 37)
            .fill(1)
            .map((box, i) => (
              <div
                key={box + i}
                className="grid-box w-full border border-b-zinc-50 border-l-zinc-50 pt-[100%]"
              />
            ))}
        </div>

        {/* cover */}
        <section className="flex h-svh max-h-highest flex-col gap-10 px-8 pt-16 sm:items-center md:px-20 xl:h-dvh">
          <h1 className="mt-auto font-tusker-grotesk-medium text-7xl leading-tight md:text-6xl lg:text-7xl">
            HELLO, <br className="sm:hidden" />
            I'M ATTAR
          </h1>

          <div className="flex w-full flex-col justify-between py-8 md:mt-auto md:flex-row md:items-center md:py-10 md:text-lg lg:py-12 lg:text-xl">
            <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>
            <p>&copy;2024 All rights reserved.</p>
          </div>
        </section>

        {/* about me */}
        <section className="grid h-screen max-h-highest place-items-center px-8">
          <p className="text-xl leading-relaxed md:w-4/5 md:text-center md:text-3xl lg:w-2/3 lg:text-4xl">
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

        <div className="before:contents-[''] after:contents-[''] relative my-16 -rotate-1 before:pointer-events-none before:absolute before:-left-1 before:z-10 before:block before:h-full before:w-1/4 before:bg-gradient-to-l before:from-transparent before:to-white after:pointer-events-none after:absolute after:-right-1 after:top-0 after:z-10 after:block after:h-full after:w-1/4 after:bg-gradient-to-r after:from-transparent after:to-white md:my-20 before:xl:w-1/6 after:xl:w-1/6">
          <div className="w-full overflow-x-auto">
            <ul className="grid h-56 w-full min-w-[750px] grid-cols-7 grid-rows-2 place-items-center gap-x-6 md:h-72 md:w-[120vw] md:gap-x-8 lg:w-full xl:h-96">
              {logos.map((logo) => (
                <img
                  key={logo}
                  src={`/logo/${logo}-light.svg`}
                  alt={`${logo} logo`}
                  className="w-full rounded-lg border border-zinc-900 p-4 lg:rounded-xl lg:p-6 xl:p-8"
                />
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto -rotate-1 px-8 text-right text-sm leading-tight md:px-20 md:text-xl lg:text-2xl">
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
